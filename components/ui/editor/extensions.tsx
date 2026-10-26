"use client"

// The editor molecule's extensions, after frappe-ui's src/molecules/editor:
// the palette, the document's own nodes (callout, audio, embed, columns,
// attachment), the "@" and "/" suggestion machinery, and the block/font
// tables the toolbars read. One source, so the field editor and the
// document editor never drift apart.
import * as React from "react"
import {
  Extension,
  Mark,
  mergeAttributes,
  Node,
  type ChainedCommands,
  type Editor as TiptapEditor,
} from "@tiptap/core"
import { Fragment, type Node as PMNode } from "@tiptap/pm/model"
import {
  NodeSelection,
  Plugin,
  PluginKey,
  TextSelection,
  type Transaction,
} from "@tiptap/pm/state"
import { CellSelection } from "@tiptap/pm/tables"
import {
  Decoration,
  DecorationSet,
  type EditorView as PMEditorView,
} from "@tiptap/pm/view"
import { ReactRenderer, ReactNodeViewRenderer } from "@tiptap/react"
import Suggestion, { type SuggestionProps } from "@tiptap/suggestion"

import {
  AttachmentView,
  AudioView,
  EMBED_TYPES,
  EmbedSlotView,
  EmbedView,
  ImageSlotView,
  VideoView,
  openEmbedSourcePopup,
  openImageSourcePopup,
  openRemoveEmbedModal,
} from "./media"
import { chosenBlocks } from "./block-select"

import { cn } from "@/lib/utils"
import {
  AudioWavesIcon,
  CodeIcon,
  FileUploadIcon,
  GroupIcon,
  ImageIcon,
  VideoIcon,
  DividerIcon,
  Grid2Icon,
  Grid3Icon,
  Grid4Icon,
  Grid5Icon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  MultipleListIcon,
  NumberedListIcon,
  ParagraphIcon,
  QuoteIcon,
  SmallRightIcon,
  TableViewIcon,
  TodoIcon,
  LinkIcon,
} from "@/components/ui/rich-text-editor-icons"

export type View = TiptapEditor["view"]

/* ---------------------------------- limit -----------------------------------
 * A change that would carry the text past the limit is refused, and the
 * field's foot counts down what is left.
 */
export const Limit = Extension.create<{ limit: number }>({
  name: "editorLimit",
  addOptions: () => ({ limit: 450 }),
  addProseMirrorPlugins() {
    const { limit } = this.options
    return [
      new Plugin({
        filterTransaction: (tr, state) =>
          !tr.docChanged ||
          tr.doc.textContent.length <= limit ||
          tr.doc.textContent.length <= state.doc.textContent.length,
      }),
    ]
  },
})

/* --------------------------------- palette --------------------------------- */

export const PALETTE = [
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "cyan",
  "blue",
  "indigo",
  "purple",
  "pink",
  "gray",
] as const
export const hue = (name: string) => (name === "indigo" ? "violet" : name)
export const textValue = (name: string) => `var(--color-${hue(name)}-600)`
export const highlightValue = (name: string) => `var(--color-${hue(name)}-100)`

/* ------------------------- table selection overlay --------------------------
 * Draws ONE rounded box around a multi-cell selection instead of ringing
 * each cell on its own: the editor takes `table-cell-range` (the per-cell
 * ring steps aside) and a `.table-selection-box` spans the union of the
 * selected cells, appended to the `.tableWrapper` so it tracks the card's
 * horizontal scroll for free. A port of the branch's extension.
 */
/** fired on window when a table's moved line starts to settle */
export const TABLE_SETTLE = "rte-table-settle"

class SelectionOverlay {
  private el: HTMLElement | null = null
  private resizeObserver: ResizeObserver | null = null
  private observed: HTMLElement | null = null
  private onResize = () => this.update(this.view)

  constructor(private view: PMEditorView) {
    window.addEventListener("resize", this.onResize)
    window.addEventListener(TABLE_SETTLE, this.onResize)
    if (typeof ResizeObserver !== "undefined")
      this.resizeObserver = new ResizeObserver(() => this.update(this.view))
    this.update(view)
  }

  update(view: PMEditorView): void {
    this.view = view
    const { selection } = view.state
    const isRange =
      selection instanceof CellSelection ||
      ("$anchorCell" in selection &&
        (selection as CellSelection).$anchorCell.pos !==
          (selection as CellSelection).$headCell.pos)
    const range =
      isRange &&
      "$anchorCell" in selection &&
      (selection as CellSelection).$anchorCell.pos !==
        (selection as CellSelection).$headCell.pos
    view.dom.classList.toggle("table-cell-range", !!range)
    if (!range) {
      this.remove()
      return
    }
    this.draw(view, selection as CellSelection)
  }

  private draw(view: PMEditorView, selection: CellSelection): void {
    let union: { left: number; top: number; right: number; bottom: number } | null =
      null
    selection.forEachCell((_cell, pos) => {
      const dom = view.nodeDOM(pos)
      if (!(dom instanceof HTMLElement)) return
      const r = dom.getBoundingClientRect()
      union = union
        ? {
            left: Math.min(union.left, r.left),
            top: Math.min(union.top, r.top),
            right: Math.max(union.right, r.right),
            bottom: Math.max(union.bottom, r.bottom),
          }
        : { left: r.left, top: r.top, right: r.right, bottom: r.bottom }
    })
    if (!union) {
      this.remove()
      return
    }
    const box: { left: number; top: number; right: number; bottom: number } =
      union
    const anchorDom = view.nodeDOM(selection.$anchorCell.pos)
    const host =
      (anchorDom instanceof HTMLElement
        ? (anchorDom.closest(".tableWrapper") as HTMLElement | null)
        : null) ?? (view.dom as HTMLElement)
    const hostRect = host.getBoundingClientRect()
    this.observe(host)
    const el = this.ensure(host)
    // the cells measure where they are drawn, mid-slide included: while a
    // moved line settles the ring waits, out of sight, and is drawn once
    // the cells have landed
    if (this.sliding(host).length) {
      el.style.visibility = "hidden"
      this.settleWith(host)
      return
    }
    el.style.left = `${box.left - hostRect.left - host.clientLeft + host.scrollLeft}px`
    el.style.top = `${box.top - hostRect.top - host.clientTop + host.scrollTop}px`
    el.style.width = `${box.right - box.left}px`
    el.style.height = `${box.bottom - box.top}px`
    this.fit(el, host, box)
    if (el.style.visibility === "hidden") {
      el.style.visibility = ""
      el.animate?.([{ opacity: 0 }, { opacity: 1 }], { duration: 120 })
    }
  }

  /**
   * The ring's corners and edges, from where the run stands in the table,
   * fitted in the same draw as its place so they never fall out of step
   * (a moved column ringed where it lands, with the corners of where it
   * landed). On the card's edge the ring keeps to the cell's own edge and
   * turns on the card's 11px inner radius; inside, it lies on the rule
   * around the run. A run reaching the foot of a scrolling card closes
   * above the card's bar.
   */
  private fit(
    el: HTMLElement,
    host: HTMLElement,
    box: { left: number; top: number; right: number; bottom: number }
  ): void {
    const table = host.querySelector("table")
    const t = table?.getBoundingClientRect()
    if (!table || !t) return
    const at = (a: number, b: number) => Math.abs(a - b) <= 1.5
    const top = at(box.top, t.top)
    const bottom = at(box.bottom, t.bottom)
    const left = at(box.left, t.left)
    const right = at(box.right, t.right)
    el.style.marginLeft = left ? "0px" : "-1px"
    el.style.paddingRight = left ? "0px" : "1px"
    el.style.marginTop = top ? "0px" : "-1px"
    el.style.paddingBottom = top ? "0px" : "1px"
    const bar = bottom
      ? Math.max(0, -parseFloat(getComputedStyle(table).marginBottom))
      : 0
    el.style.height = `${box.bottom - box.top - bar}px`
    const radius = (corner: boolean) => (corner ? "11px" : "0px")
    el.style.borderTopLeftRadius = radius(top && left)
    el.style.borderTopRightRadius = radius(top && right)
    el.style.borderBottomLeftRadius = radius(bottom && left)
    el.style.borderBottomRightRadius = radius(bottom && right)
  }

  // A row/column move settles with a WAAPI slide: for its duration the
  // cells measure at their OLD positions, and Safari fires a late update
  // mid-slide that would freeze the box there (the double-ring-after-drop
  // bug). When the table is animating, redraw once more after it lands.
  /** the table's cells still sliding into place (the ring's own fade aside) */
  private sliding(host: HTMLElement): Animation[] {
    if (typeof host.getAnimations !== "function") return []
    return host.getAnimations({ subtree: true }).filter((a) => {
      const target = (a.effect as KeyframeEffect | null)?.target
      return (
        a.playState === "running" &&
        a.effect?.getTiming().iterations !== Infinity &&
        target !== this.el
      )
    })
  }
  private settling = false
  private settleWith(host: HTMLElement): void {
    if (this.settling) return
    const anims = this.sliding(host)
    if (!anims.length) return
    this.settling = true
    Promise.allSettled(anims.map((a) => a.finished)).then(() => {
      this.settling = false
      this.update(this.view)
    })
  }

  private ensure(host: HTMLElement): HTMLElement {
    if (this.el && this.el.parentElement === host) return this.el
    this.remove()
    const el = document.createElement("div")
    el.className = "table-selection-box"
    el.setAttribute("aria-hidden", "true")
    host.appendChild(el)
    this.el = el
    return el
  }

  private observe(host: HTMLElement): void {
    if (!this.resizeObserver || this.observed === host) return
    this.resizeObserver.disconnect()
    this.resizeObserver.observe(host)
    this.observed = host
  }

  private remove(): void {
    this.el?.remove()
    this.el = null
    this.resizeObserver?.disconnect()
    this.observed = null
  }

  destroy(): void {
    this.view.dom.classList.remove("table-cell-range")
    this.remove()
    window.removeEventListener("resize", this.onResize)
    window.removeEventListener(TABLE_SETTLE, this.onResize)
    this.resizeObserver = null
  }
}

export const TableSelectionOverlay = Extension.create({
  name: "tableSelectionOverlay",
  addProseMirrorPlugins() {
    return [new Plugin({ view: (view) => new SelectionOverlay(view) })]
  },
})

/* ------------------------------ cell colours -------------------------------
 * The cells' named fills, as the branch's TableCellColor: the attribute
 * stores the hue and renders as `data-bg`, which the stylesheet tints for
 * either theme; `setCellBackground` fans out over the selected cells
 * through the table extension's own setCellAttribute.
 */
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    tableCellColor: {
      /** Fill the selected cell(s) with a named background; `null` clears it. */
      setCellBackground: (name: string | null) => ReturnType
    }
  }
}

export const TableCellColor = Extension.create({
  name: "tableCellColor",
  addCommands() {
    return {
      setCellBackground:
        (name) =>
        ({ chain }) =>
          chain()
            .setCellAttribute("backgroundColor", name ? hue(name) : null)
            .run(),
    }
  },
})

/* -------------------------------- link paste --------------------------------
 * A URL pasted over a selected run of text links the run instead of
 * replacing it, as the branch's link-paste-plugin does: single line only,
 * validated as an absolute http(s) address — bare words and relative
 * paths paste as the text they are.
 */
export const LinkPaste = Extension.create({
  name: "rteLinkPaste",
  addProseMirrorPlugins() {
    const editor = this.editor
    return [
      new Plugin({
        key: new PluginKey("handlePasteLink"),
        props: {
          handlePaste: (view, _event, slice): boolean => {
            const { selection } = view.state
            if (selection.empty) return false

            // single node, single line only
            if (slice.content.childCount > 1) return false
            let textContent = ""
            slice.content.forEach((node) => {
              textContent += node.textContent
            })
            const text = textContent.trim()
            if (!text || /[\r\n]/.test(text)) return false

            let parsed: URL
            try {
              parsed = new URL(text)
            } catch {
              return false
            }
            if (parsed.protocol !== "http:" && parsed.protocol !== "https:")
              return false

            return editor
              .chain()
              .setTextSelection({ from: selection.from, to: selection.to })
              .setLink({ href: text })
              .setTextSelection(selection.to)
              .command(({ tr }) => {
                tr.setStoredMarks([])
                return true
              })
              .run()
          },
        },
      }),
    ]
  },
})

/* --------------------------------- link-on ---------------------------------
 * The link the caret is in is drawn as the file's Selected state: on a
 * gray-100 ground, 22px tall on 4px corners (.rte-link-on).
 */
/**
 * The link a link card is about, while the card is up. The ground marks it,
 * and only it: a caret merely resting in a link (a whole paragraph linked,
 * say) would otherwise sit under a gray slab. The card sets the range (the
 * link it opened over, by caret or by hover) and clears it as it goes; the
 * range rides the document's changes meanwhile.
 */
export const LINK_ON_KEY = new PluginKey<{ from: number; to: number } | null>(
  "rteLinkOn"
)

export const LinkOn = Extension.create({
  name: "rteLinkOn",
  addProseMirrorPlugins() {
    return [
      new Plugin<{ from: number; to: number } | null>({
        key: LINK_ON_KEY,
        state: {
          init: () => null,
          apply: (tr, range) => {
            const next = tr.getMeta(LINK_ON_KEY) as
              | { from: number; to: number }
              | null
              | undefined
            if (next !== undefined) return next
            if (!range || !tr.docChanged) return range
            const from = tr.mapping.map(range.from, 1)
            const to = tr.mapping.map(range.to, -1)
            return from < to ? { from, to } : null
          },
        },
        props: {
          decorations(state) {
            const range = LINK_ON_KEY.getState(state)
            if (!range) return null
            const size = state.doc.content.size
            const from = Math.max(0, Math.min(range.from, size))
            const to = Math.max(from, Math.min(range.to, size))
            if (from === to) return null
            return DecorationSet.create(state.doc, [
              Decoration.inline(from, to, { class: "rte-link-on" }),
            ])
          },
        },
      }),
    ]
  },
})

/* ---------------------------------- comment --------------------------------
 * The amber run the toolbar's comment button lays on a selection; the
 * thread itself lives beside the editor.
 */
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    rteComment: {
      setComment: (id: string) => ReturnType
      unsetComment: () => ReturnType
    }
  }
}

export const CommentMark = Mark.create({
  name: "comment",
  inclusive: false,
  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (el) => el.getAttribute("data-comment"),
        renderHTML: (attrs) => ({ "data-comment": attrs.id }),
      },
    }
  },
  parseHTML: () => [{ tag: "span[data-comment]" }],
  renderHTML: ({ HTMLAttributes }) => [
    "span",
    mergeAttributes(HTMLAttributes, { class: "rte-comment" }),
    0,
  ],
  addCommands() {
    return {
      setComment:
        (id) =>
        ({ commands }) =>
          commands.setMark(this.name, { id }),
      unsetComment:
        () =>
        ({ commands }) =>
          commands.unsetMark(this.name),
    }
  },
})



/* ------------------------------ expand / collapse --------------------------
 * The official details nodes, drawn to the file's markup (.rte-details, a
 * 16px chevron, the content folded under) and given the branch's commands:
 * Enter on the summary as Notion's toggle takes it, the select's "Toggle
 * list", and Alt+↑/↓ carrying the block.
 */
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    rteDetails: {
      insertDetails: () => ReturnType
      /** the caret's block made a toggle's summary — or a summary unwrapped */
      setToggleList: () => ReturnType
      /** carry the block the cursor is in one place up or down */
      moveDetails: (dir: -1 | 1) => ReturnType
    }
  }
}

const CHEVRON =
  '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>'

export const DetailsTweaks = Extension.create({
  name: "rteDetails",
  priority: 1000,
  addKeyboardShortcuts() {
    return {
      "Alt-ArrowUp": () => this.editor.commands.moveDetails(-1),
      "Alt-ArrowDown": () => this.editor.commands.moveDetails(1),
      // Enter on the summary, as Notion's toggle takes it: on an open
      // toggle the caret goes into its body, what followed it starting the
      // body's first line; on a closed one a new closed toggle follows,
      // titled with what followed the caret; on an empty toggle, the
      // toggle turns back into a plain line
      Enter: ({ editor }) => {
        const { state } = editor
        const { $from, $to } = state.selection
        const summaryType = state.schema.nodes.detailsSummary
        const detailsType = state.schema.nodes.details
        const paragraph = state.schema.nodes.paragraph
        if (!summaryType || !detailsType) return false
        if ($from.parent.type !== summaryType || !$from.sameParent($to))
          return false
        const details = $from.node(-1)
        const pos = $from.before(-1)
        const body = details.child(1)
        const tr = state.tr
        if (
          !$from.parent.content.size &&
          body.childCount === 1 &&
          body.firstChild!.isTextblock &&
          !body.firstChild!.content.size
        ) {
          tr.replaceWith(pos, pos + details.nodeSize, paragraph.create())
          tr.setSelection(TextSelection.create(tr.doc, pos + 1))
          editor.view.dispatch(tr.scrollIntoView())
          return true
        }
        const rest = $from.parent.content.cut($to.parentOffset)
        tr.delete($from.pos, $from.end())
        if (!details.attrs.open) {
          const after = pos + tr.doc.nodeAt(pos)!.nodeSize
          tr.insert(
            after,
            detailsType.create({ open: false }, [
              summaryType.create(null, rest),
              state.schema.nodes.detailsContent.create(
                null,
                paragraph.create()
              ),
            ])
          )
          tr.setSelection(TextSelection.create(tr.doc, after + 2))
          editor.view.dispatch(tr.scrollIntoView())
          return true
        }
        // the body's first line, after the summary as the delete left it
        const mapped = tr.doc.nodeAt(pos)!
        const bodyStart = pos + 1 + mapped.child(0).nodeSize + 1
        const first = mapped.child(1).firstChild
        if (!rest.size && first?.isTextblock && !first.content.size) {
          tr.setSelection(TextSelection.create(tr.doc, bodyStart + 1))
        } else {
          tr.insert(bodyStart, paragraph.create(null, rest))
          tr.setSelection(TextSelection.create(tr.doc, bodyStart + 1))
        }
        editor.view.dispatch(tr.scrollIntoView())
        return true
      },
    }
  },
  addCommands() {
    return {
      moveDetails:
        (dir) =>
        ({ state, tr, dispatch }) => {
          const { $from } = state.selection
          let depth = $from.depth
          while (depth > 0 && $from.node(depth).type.name !== "details")
            depth--
          if (depth === 0) return false
          const node = $from.node(depth)
          const pos = $from.before(depth)
          const parent = $from.node(depth - 1)
          const index = $from.index(depth - 1)
          const other = dir < 0 ? index - 1 : index + 1
          if (other < 0 || other >= parent.childCount) return false
          const sibling = parent.child(other)
          if (!dispatch) return true
          const offset = $from.pos - pos
          tr.delete(pos, pos + node.nodeSize)
          const at = dir < 0 ? pos - sibling.nodeSize : pos + sibling.nodeSize
          tr.insert(at, node)
          tr.setSelection(TextSelection.near(tr.doc.resolve(at + offset)))
          tr.scrollIntoView()
          return true
        },
      insertDetails:
        () =>
        ({ commands }) =>
          commands.insertContent({
            type: "details",
            attrs: { open: false },
            content: [
              { type: "detailsSummary" },
              { type: "detailsContent", content: [{ type: "paragraph" }] },
            ],
          }),
      // the select's "Toggle list", a block style like a heading is
      setToggleList:
        () =>
        ({ state, tr, dispatch }) => {
          const { schema } = state
          const { $from } = state.selection
          const summaryType = schema.nodes.detailsSummary
          const contentType = schema.nodes.detailsContent
          const detailsType = schema.nodes.details
          const paragraph = schema.nodes.paragraph
          if (!summaryType || !detailsType) return false

          // on a summary: unwrap the toggle
          for (let d = $from.depth; d > 0; d--) {
            if ($from.node(d).type !== summaryType) continue
            const details = $from.node(d - 1)
            const pos = $from.before(d - 1)
            if (!dispatch) return true
            const blocks = [
              paragraph.create(null, details.child(0).content),
              ...(details.child(1)?.content.content ?? []),
            ]
            tr.replaceWith(pos, pos + details.nodeSize, blocks)
            tr.setSelection(
              TextSelection.near(
                tr.doc.resolve(pos + 1 + ($from.pos - $from.start(d)))
              )
            )
            return true
          }

          // elsewhere: the caret's text block becomes a toggle's summary
          const depth = $from.depth
          const block = $from.node(depth)
          if (!block.isTextblock) return false
          if (!dispatch) return true
          const pos = $from.before(depth)
          const details = detailsType.create({ open: false }, [
            summaryType.create(null, block.content),
            contentType.create(null, paragraph.create()),
          ])
          tr.replaceWith(pos, pos + block.nodeSize, details)
          tr.setSelection(
            TextSelection.near(
              tr.doc.resolve(pos + 2 + ($from.pos - $from.start(depth)))
            )
          )
          return true
        },
    }
  },
})

/** the node view the details node takes: the file's chevron and fold */
export function detailsNodeView() {
  return ({
    node,
    editor,
    getPos,
  }: {
    node: PMNode
    editor: TiptapEditor
    getPos: () => number | undefined
  }) => {
    let current = node
    const dom = document.createElement("div")
    dom.className = "rte-details" + (current.attrs.open ? " is-open" : "")
    dom.setAttribute("data-type", "details")
    const button = document.createElement("button")
    button.type = "button"
    button.className = "rte-details-toggle"
    button.contentEditable = "false"
    button.setAttribute("aria-expanded", String(!!current.attrs.open))
    button.setAttribute(
      "aria-label",
      current.attrs.open ? "Collapse" : "Expand"
    )
    button.innerHTML = CHEVRON
    button.addEventListener("mousedown", (e) => e.preventDefault())
    button.addEventListener("click", () => {
      const pos = getPos()
      if (typeof pos !== "number") return
      editor.view.dispatch(
        editor.view.state.tr.setNodeMarkup(pos, undefined, {
          ...current.attrs,
          open: !current.attrs.open,
        })
      )
    })
    const content = document.createElement("div")
    content.className = "rte-details-body"
    dom.append(button, content)
    return {
      dom,
      contentDOM: content,
      update(next: PMNode) {
        if (next.type !== current.type) return false
        current = next
        dom.classList.toggle("is-open", !!next.attrs.open)
        button.setAttribute("aria-expanded", String(!!next.attrs.open))
        button.setAttribute(
          "aria-label",
          next.attrs.open ? "Collapse" : "Expand"
        )
        return true
      },
    }
  }
}

/* ---------------------------- callout, audio, embed ------------------------ */

// a callout: gray wash, 12px in, the emoji leading its first line
export const Callout = Node.create({
  name: "callout",
  group: "block",
  content: "block+",
  defining: true,
  addAttributes() {
    return {
      emoji: {
        default: "\u{1F4A1}",
        parseHTML: (el) => el.getAttribute("data-emoji") ?? "\u{1F4A1}",
        renderHTML: (attrs) => ({ "data-emoji": attrs.emoji }),
      },
    }
  },
  parseHTML: () => [{ tag: 'div[data-type="callout"]' }],
  renderHTML: ({ HTMLAttributes }) => [
    "div",
    mergeAttributes(HTMLAttributes, { "data-type": "callout" }),
    0,
  ],
  addCommands() {
    return {
      setCallout:
        (options: { emoji?: string } = {}) =>
        ({ commands }) =>
          commands.wrapIn(this.name, { emoji: options.emoji ?? "\u{1F4A1}" }),
    }
  },
})

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    rteCallout: {
      setCallout: (options?: { emoji?: string }) => ReturnType
    }
  }
}

// the audio bar: the file's player — play, a slider, 0:15 / 32:48, volume
// and the ⋯ — over a hidden <audio>; it serialises as <audio src title>
export const Audio = Node.create({
  name: "audio",
  group: "block",
  atom: true,
  draggable: true,
  addAttributes() {
    return {
      src: { default: null },
      title: { default: null },
    }
  },
  parseHTML: () => [
    {
      tag: "audio[src]",
      getAttrs: (el) => ({
        src: (el as HTMLElement).getAttribute("src"),
        title: (el as HTMLElement).getAttribute("title"),
      }),
    },
  ],
  renderHTML: ({ HTMLAttributes }) => ["audio", HTMLAttributes],
  addNodeView() {
    return ReactNodeViewRenderer(AudioView, {
      // anything inside a control is the player's alone: a press that went
      // to ProseMirror would select the node and close a just-opened menu
      stopEvent: ({ event }) =>
        !!(event.target as HTMLElement).closest?.(
          'button, [data-slot="slider"], [role="menu"]'
        ),
    })
  },
})

// an embed: any page in a frame
// a video file, as a plain player for the carried file
const booleanAttribute = (name: string) => ({
  default: false,
  parseHTML: (el: HTMLElement) => el.hasAttribute(name),
  renderHTML: (attrs: Record<string, unknown>) =>
    attrs[name] ? { [name]: "" } : {},
})

export const Video = Node.create({
  name: "video",
  group: "block",
  atom: true,
  draggable: true,
  addAttributes() {
    return {
      src: { default: null },
      title: { default: null },
      caption: {
        default: null,
        parseHTML: (el: HTMLElement) => el.getAttribute("data-caption"),
        renderHTML: (attrs: Record<string, unknown>) =>
          attrs.caption ? { "data-caption": attrs.caption } : {},
      },
      autoplay: booleanAttribute("autoplay"),
      loop: booleanAttribute("loop"),
      muted: booleanAttribute("muted"),
      ...embedFrameAttributes,
    }
  },
  parseHTML: () => [{ tag: "video[src]" }],
  renderHTML: ({ HTMLAttributes }) => [
    "video",
    mergeAttributes(HTMLAttributes, { controls: "true" }),
  ],
  addNodeView() {
    return ReactNodeViewRenderer(VideoView, {
      // the player's own presses (play, seek, volume) stay the player's:
      // ProseMirror taking them would select the video instead of playing it
      stopEvent: ({ event }) =>
        event.target instanceof HTMLVideoElement && !event.type.startsWith("drag"),
    })
  },
})

/**
 * A selection the browser draws around one whole leaf block (a video, an
 * embed, a picture) is that block selected. ProseMirror rebuilds a
 * selection it reads back from the page as text between its ends, which
 * for a lone atom lands on a caret beside it; Safari, nudging the
 * selection drawn around a <video> or an <iframe>, makes ProseMirror read
 * it back, and the video chosen a moment ago became a caret.
 */
/** the leaf blocks Safari will not hold a drawn selection around */
const PLAYERS = new Set(["video", "youtube", "embed"])

/**
 * Blocks move smoothly as the document changes: a new line, a block added
 * or taken away, a paragraph wrapping onto another line. The page's own
 * View Transitions cannot serve an editor (they hold the change back until
 * a screenshot is taken, and the editor's state must change at once), so
 * the blocks are animated from where they stood to where they now are
 * (FLIP): each top-level block and list item is measured after every
 * change, the next change compares, and whatever moved slides the
 * difference back to nothing; a block that is new fades in. The blocks
 * stay live — the caret, typing and clicks are never held.
 */
const SMOOTH_MS = 200
const SMOOTH_EASE = "cubic-bezier(0.2, 0, 0, 1)"
/** more new blocks than this at once is a load or a paste, not an edit */
const SMOOTH_MAX_NEW = 3

/** sent on the editor's root when blocks have come to rest after a slide */
export const BLOCKS_SETTLED = "rte-blocks-settled"
/**
 * a change that moves its own blocks, frame by frame (a column bar's drag):
 * the blocks are measured again but neither slid nor faded, since the row
 * drawn anew each frame would otherwise fade in each frame
 */
export const SMOOTH_SKIP = "rteSmoothSkip"

export const SmoothBlocks = Extension.create<object, { stop?: () => void }>({
  name: "rteSmoothBlocks",
  addStorage() {
    return {}
  },
  onCreate() {
    const editor = this.editor
    const view = editor.view
    const dom = view.dom as HTMLElement
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    let last = new Map<HTMLElement, number>()
    const running = new Set<Animation>()

    const tracked = () => {
      const out: HTMLElement[] = []
      for (const child of dom.children)
        if (child instanceof HTMLElement) out.push(child)
      dom.querySelectorAll<HTMLElement>("li").forEach((li) => out.push(li))
      return out
    }
    // a block's top against the block holding it (a list item against its
    // item or block, a block against the page): scrolling and the holder's
    // own move cancel out, so each moves by its own difference only
    const measure = () => {
      const tops = new Map<HTMLElement, number>()
      const base = dom.getBoundingClientRect().top
      const topBlock = (el: HTMLElement) => {
        let at = el
        while (at.parentElement && at.parentElement !== dom) at = at.parentElement
        return at
      }
      for (const el of tracked()) {
        const holder =
          el.parentElement === dom
            ? null
            : (el.parentElement?.closest<HTMLElement>("li") ?? topBlock(el))
        const top = el.getBoundingClientRect().top
        tops.set(
          el,
          top - (holder ? holder.getBoundingClientRect().top : base)
        )
      }
      return tops
    }
    // the transform a block is drawn with right now, mid-slide
    const drawnAt = (el: HTMLElement) => {
      const t = getComputedStyle(el).transform
      if (!t || t === "none") return 0
      return new DOMMatrixReadOnly(t).m42
    }
    const settled = () => {
      if (running.size) return
      last = measure()
      // the grips placed against the moving blocks find their places again
      dom.dispatchEvent(new Event(BLOCKS_SETTLED))
    }

    const onTransaction = ({ transaction }: { transaction: Transaction }) => {
      if (!transaction.docChanged || view.composing) {
        return
      }
      if (
        reduced.matches ||
        !last.size ||
        transaction.getMeta(SMOOTH_SKIP)
      ) {
        last = measure()
        return
      }
      // a slide still under way goes on from where it is drawn now
      const from = new Map<HTMLElement, number>()
      for (const [el, top] of last) from.set(el, top)
      const drawn = new Map<HTMLElement, number>()
      for (const a of running) {
        const el = (a.effect as KeyframeEffect | null)?.target
        if (el instanceof HTMLElement) drawn.set(el, drawnAt(el))
      }
      for (const a of [...running]) a.cancel()
      running.clear()
      const now = measure()
      const fresh = [...now.keys()].filter((el) => !from.has(el))
      const play = (a: Animation) => {
        running.add(a)
        const done = () => {
          running.delete(a)
          settled()
        }
        a.onfinish = done
        a.oncancel = () => running.delete(a)
      }
      for (const [el, top] of now) {
        const before = from.get(el)
        if (before === undefined) continue
        const dy = before + (drawn.get(el) ?? 0) - top
        if (Math.abs(dy) < 0.5) continue
        play(
          el.animate(
            [{ transform: `translateY(${dy}px)` }, { transform: "none" }],
            { duration: SMOOTH_MS, easing: SMOOTH_EASE }
          )
        )
      }
      if (fresh.length <= SMOOTH_MAX_NEW)
        for (const el of fresh)
          play(
            el.animate([{ opacity: 0 }, { opacity: 1 }], {
              duration: SMOOTH_MS,
              easing: "ease-out",
            })
          )
      last = now
    }
    // a change of layout no edit made (a picture loading, the window
    // resized) is taken as the new resting place, not slid to
    const resize = new ResizeObserver(() => settled())
    resize.observe(dom)
    const onResize = () => settled()
    window.addEventListener("resize", onResize)
    editor.on("transaction", onTransaction)
    last = measure()
    this.storage.stop = () => {
      editor.off("transaction", onTransaction)
      window.removeEventListener("resize", onResize)
      resize.disconnect()
      for (const a of running) a.cancel()
    }
  },
  onDestroy() {
    this.storage.stop?.()
  },
})

/**
 * Backspace in an empty list item takes the item away and puts the caret at
 * the end of the one above, so the list stays one list. Left to the default,
 * the item is lifted out as a loose line, splitting the list in two around
 * it (the halves numbered afresh, the line set apart by the lists' margins).
 * The first item, with nothing above it, keeps the default: it becomes a line.
 */
/* ------------------------------------ tab ----------------------------------
 * Tab as Notion has it: it never leaves the page. On a list item it nests
 * the item under the one above, Shift+Tab lifts it back — but never out
 * of its list, which a top-level item stays in. A block just after a list
 * or a toggle goes into it (the list's last item, the toggle's body, opened
 * to show it), and Shift+Tab sets a list item's or a toggle's own blocks
 * back out after it, those after them coming along so the order holds.
 * In code Tab indents the caret's lines two spaces and Shift+Tab takes
 * them back; a table's cells are stepped through by the table's own keys.
 */
const LISTS = new Set(["bulletList", "orderedList", "taskList"])
const ITEMS = new Set(["listItem", "taskItem"])
const INDENT = "  "

type TabState = TiptapEditor["state"]

/** the caret's lines in a code block, as offsets in its text */
function codeLines(state: TabState) {
  const { $from, $to } = state.selection
  const text = $from.parent.textContent
  const starts: number[] = []
  let at = text.lastIndexOf("\n", $from.parentOffset - 1) + 1
  starts.push(at)
  const end = $to.sameParent($from) ? $to.parentOffset : $from.parentOffset
  for (;;) {
    const next = text.indexOf("\n", at)
    if (next < 0 || next >= end) break
    at = next + 1
    starts.push(at)
  }
  return { text, starts, base: $from.start() }
}

function indentCode(editor: TiptapEditor, out: boolean) {
  const { state } = editor
  const { empty } = state.selection
  const { text, starts, base } = codeLines(state)
  const tr = state.tr
  if (!out && empty) {
    tr.insertText(INDENT)
  } else {
    // the last line first, so the earlier offsets still hold
    for (const start of [...starts].reverse()) {
      if (!out) tr.insertText(INDENT, base + start)
      else {
        const lead = /^( {1,2}|\t)/.exec(text.slice(start))
        if (lead) tr.delete(base + start, base + start + lead[0].length)
      }
    }
  }
  if (!tr.docChanged) return true
  editor.view.dispatch(tr.scrollIntoView())
  return true
}

/** the caret's block set into the list or toggle just before it */
function nestInto(editor: TiptapEditor) {
  const { state } = editor
  const { $from } = state.selection
  const depth = $from.depth
  if (depth < 1) return false
  const index = $from.index(depth - 1)
  if (index === 0) return false
  const container = $from.node(depth - 1)
  const prev = container.child(index - 1)
  const blockPos = $from.before(depth)
  const block = $from.parent
  const prevPos = blockPos - prev.nodeSize
  let holder: PMNode
  let at: number
  if (LISTS.has(prev.type.name)) {
    holder = prev.lastChild!
    at = prevPos + prev.nodeSize - 2
  } else if (prev.type.name === "details" && prev.lastChild) {
    holder = prev.lastChild
    at = prevPos + prev.nodeSize - 2
  } else return false
  if (!holder.canReplace(holder.childCount, holder.childCount, Fragment.from(block)))
    return false
  const tr = state.tr
  tr.delete(blockPos, blockPos + block.nodeSize)
  tr.insert(at, block)
  if (prev.type.name === "details" && prev.attrs.open === false)
    tr.setNodeMarkup(prevPos, undefined, { ...prev.attrs, open: true })
  tr.setSelection(TextSelection.near(tr.doc.resolve(at + ($from.pos - blockPos))))
  editor.view.dispatch(tr.scrollIntoView())
  return true
}

/** the caret's block, and the blocks after it in the same holder, set back
 * out after the list item or toggle holding them */
function liftOut(editor: TiptapEditor) {
  const { state } = editor
  const { $from } = state.selection
  const depth = $from.depth
  if (depth < 3) return false
  const holder = $from.node(depth - 1)
  const index = $from.index(depth - 1)
  const name = holder.type.name
  const inItem = ITEMS.has(name) && index > 0
  const inToggle = name === "detailsContent"
  if (!inItem && !inToggle) return false
  const from = $from.before(depth)
  const to = $from.end(depth - 1)
  const content = state.doc.slice(from, to).content
  const tr = state.tr
  let at: number
  if (inToggle) {
    // past the toggle
    at = $from.after(depth - 2)
    tr.insert(at, content)
  } else {
    // past the item: the rest of its list goes on after the blocks
    const itemEnd = $from.after(depth - 1)
    const list = $from.node(depth - 2)
    const last = $from.index(depth - 2) === list.childCount - 1
    if (last) at = $from.after(depth - 2)
    else {
      tr.split(itemEnd, 1)
      at = itemEnd + 1
    }
    tr.insert(at, content)
  }
  const placed = tr.steps.length
  // a toggle's body holds a block at least: emptied, an empty line stays
  if (inToggle && index === 0)
    tr.replaceWith(from, to, state.schema.nodes.paragraph.create())
  else tr.delete(from, to)
  const start = tr.mapping.slice(placed).map(at, 1)
  tr.setSelection(TextSelection.near(tr.doc.resolve(start + ($from.pos - from))))
  editor.view.dispatch(tr.scrollIntoView())
  return true
}

/** where the caret stands: in code, a table, a list item's first line */
function tabPlace(state: TabState) {
  const { $from } = state.selection
  let table = false
  for (let d = $from.depth; d > 0; d--)
    if ($from.node(d).type.spec.tableRole === "cell") table = true
  const holder = $from.depth > 0 ? $from.node($from.depth - 1) : null
  const itemHead =
    !!holder && ITEMS.has(holder.type.name) && $from.index($from.depth - 1) === 0
  // the item's list stands in another item: it can be lifted
  const nested =
    itemHead && $from.depth >= 4 && ITEMS.has($from.node($from.depth - 3).type.name)
  return {
    code: $from.parent.type.spec.code === true,
    table,
    itemHead,
    nested,
    summary: $from.parent.type.name === "detailsSummary",
  }
}

export const TabKeys = Extension.create({
  name: "rteTabKeys",
  // ahead of the lists' own Tab and Shift+Tab, which this hands back to
  priority: 1000,
  addKeyboardShortcuts() {
    return {
      Tab: ({ editor }) => {
        const { state } = editor
        // chosen blocks hold still
        if (chosenBlocks(state)) return true
        const at = tabPlace(state)
        if (at.code) return indentCode(editor, false)
        if (at.table || at.itemHead) return false
        if (at.summary) return true
        return nestInto(editor)
      },
      "Shift-Tab": ({ editor }) => {
        const { state } = editor
        if (chosenBlocks(state)) return true
        const at = tabPlace(state)
        if (at.code) return indentCode(editor, true)
        if (at.table) return false
        // a top-level item stays in its list
        if (at.itemHead) return !at.nested
        if (at.summary) return true
        return liftOut(editor)
      },
    }
  },
})

/** whatever no other key took: Tab stays on the page, as in Notion */
export const TabTrap = Extension.create({
  name: "rteTabTrap",
  priority: 1,
  addKeyboardShortcuts() {
    return { Tab: () => true, "Shift-Tab": () => true }
  },
})

/* --------------------------------- backspace --------------------------------
 * Backspace and Delete at a block's edge, as Notion has them. A heading's
 * start makes it text first; a code block's start is left alone, its code
 * never glued onto the line before. A toggle's first inner line steps out
 * of the toggle. Next to a toggle, a table or a row of columns, a line
 * joins the last line inside it — never the block chosen whole, never a
 * new column made of it — and Delete before one is left alone. A picture,
 * a video, a file or a rule next to the line is chosen first, taken away
 * on the next press. Blocks chosen with the box take the keys themselves.
 */
const ATOMS = new Set([
  "image",
  "video",
  "audio",
  "embed",
  "youtube",
  "attachment",
  "horizontalRule",
  "imageSlot",
  "embedSlot",
])
const HOLDERS = new Set(["details", "table", "columns"])

/** the last line of text inside a block, at the end of its last child,
 * or none (a picture last) */
function lastLine(node: PMNode, pos: number): { node: PMNode; pos: number } | null {
  let n = node
  let p = pos
  // a closed toggle's last line is its title
  if (n.type.name === "details" && n.attrs.open === false && n.firstChild)
    return { node: n.firstChild, pos: p + 1 }
  while (!n.isTextblock) {
    if (n.isAtom || !n.lastChild) return null
    const last: PMNode = n.lastChild
    p = p + 1 + n.content.size - last.nodeSize
    n = last
    if (n.type.name === "details" && n.attrs.open === false && n.firstChild)
      return { node: n.firstChild, pos: p + 1 }
  }
  return { node: n, pos: p }
}

/** the caret's line taken into the end of `into`: emptied, it goes; with
 * words, they go on after the words there */
function joinInto(editor: TiptapEditor, into: { node: PMNode; pos: number }) {
  const { state } = editor
  const { $from } = state.selection
  const block = $from.parent
  const blockPos = $from.before()
  const end = into.pos + 1 + into.node.content.size
  if (
    block.content.size &&
    !into.node.canReplace(into.node.childCount, into.node.childCount, block.content)
  )
    return false
  const tr = state.tr.delete(blockPos, blockPos + block.nodeSize)
  if (block.content.size) tr.insert(end, block.content)
  tr.setSelection(TextSelection.create(tr.doc, end))
  editor.view.dispatch(tr.scrollIntoView())
  return true
}

export const EdgeKeys = Extension.create({
  name: "rteEdgeKeys",
  // after the lists' own empty-item Backspace, ahead of the editor's
  priority: 999,
  addKeyboardShortcuts() {
    const back = (editor: TiptapEditor) => {
      const { state } = editor
      if (chosenBlocks(state)) return false
      const sel = state.selection
      if (!sel.empty || !(sel instanceof TextSelection)) return false
      const { $from } = sel
      if ($from.parentOffset !== 0 || $from.depth < 1) return false
      const block = $from.parent
      // a heading's start: text first
      if (block.type.name === "heading")
        return editor.commands.setNode("paragraph")
      // a code block's start: left as it is, the code kept apart
      if (block.type.spec.code && block.content.size) return true
      const container = $from.node($from.depth - 1)
      const index = $from.index($from.depth - 1)
      if (container.type.name === "detailsContent" && index === 0) {
        // a toggle's lone empty line: the caret to the end of its title
        if (container.childCount === 1 && block.content.size === 0) {
          const summaryEnd = $from.before($from.depth - 1) - 1
          editor.view.dispatch(
            state.tr.setSelection(TextSelection.create(state.doc, summaryEnd))
          )
          return true
        }
        return liftOut(editor)
      }
      if (index === 0) return false
      const prev = container.child(index - 1)
      const prevPos = $from.before() - prev.nodeSize
      if (ATOMS.has(prev.type.name)) {
        // emptied, the line goes and the picture is chosen; with words,
        // the picture is chosen and the words stay
        if (block.content.size === 0) return false
        editor.view.dispatch(
          state.tr.setSelection(NodeSelection.create(state.doc, prevPos))
        )
        return true
      }
      if (HOLDERS.has(prev.type.name)) {
        const line = lastLine(prev, prevPos)
        return line ? joinInto(editor, line) : false
      }
      return false
    }
    const forward = (editor: TiptapEditor) => {
      const { state } = editor
      if (chosenBlocks(state)) return false
      const sel = state.selection
      if (!sel.empty || !(sel instanceof TextSelection)) return false
      const { $from } = sel
      const block = $from.parent
      if ($from.parentOffset !== block.content.size || $from.depth < 1)
        return false
      const container = $from.node($from.depth - 1)
      const index = $from.index($from.depth - 1)
      if (index + 1 >= container.childCount) return false
      const next = container.child(index + 1)
      const nextPos = $from.after()
      if (ATOMS.has(next.type.name)) {
        if (block.content.size === 0) return false
        editor.view.dispatch(
          state.tr.setSelection(NodeSelection.create(state.doc, nextPos))
        )
        return true
      }
      // a toggle, a table or a row of columns after the line: an empty
      // line goes, words stay where they are
      if (HOLDERS.has(next.type.name)) return block.content.size > 0
      // a list after the line: its first item's words come up into it
      if (LISTS.has(next.type.name) && block.content.size) {
        const item = next.firstChild!
        if (item.childCount !== 1 || !item.firstChild!.isTextblock) return true
        const words = item.firstChild!.content
        const tr = state.tr
        if (next.childCount === 1) tr.delete(nextPos, nextPos + next.nodeSize)
        else tr.delete(nextPos + 1, nextPos + 1 + item.nodeSize)
        const end = $from.pos
        tr.insert(end, words)
        tr.setSelection(TextSelection.create(tr.doc, end))
        editor.view.dispatch(tr.scrollIntoView())
        return true
      }
      return false
    }
    return {
      Backspace: ({ editor }) => back(editor),
      Delete: ({ editor }) => forward(editor),
    }
  },
})

/**
 * Keys on a picture, a player or a slot. A press on a video, an audio
 * player's controls, a slot's face or an embed leaves the focus with it,
 * where the editor's keys never reach; Backspace or Delete there still
 * takes the block away (a caption being typed keeps its own keys). A press
 * into an embedded page hands the keys back to the page, the embed chosen.
 * A letter typed on a chosen picture or player does not replace it.
 */
const TEXT_FIELD =
  'textarea, [contenteditable="true"], input:not([type]), input[type="text"], input[type="url"], input[type="search"], input[type="email"], input[type="number"], input[type="tel"], input[type="password"]'

/** the media block an element draws part of, with its position */
function mediaAt(view: PMEditorView, el: Element) {
  for (let at: Element | null = el; at && at !== view.dom; at = at.parentElement) {
    let pos: number
    try {
      pos = view.posAtDOM(at, 0)
    } catch {
      continue
    }
    const $pos = view.state.doc.resolve(pos)
    const candidates = [pos, pos - 1]
    for (let d = $pos.depth; d > 0; d--) candidates.push($pos.before(d))
    for (const c of candidates) {
      if (c < 0) continue
      const node = view.state.doc.nodeAt(c)
      if (node && ATOMS.has(node.type.name) && view.nodeDOM(c)?.contains(el))
        return { pos: c, node }
    }
  }
  return null
}

export const MediaKeys = Extension.create({
  name: "rteMediaKeys",
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("rteMediaKeys"),
        props: {
          handleTextInput(view) {
            const sel = view.state.selection
            return sel instanceof NodeSelection && ATOMS.has(sel.node.type.name)
          },
        },
        view(view) {
          const onKey = (event: KeyboardEvent) => {
            if (event.key !== "Backspace" && event.key !== "Delete") return
            if (event.metaKey || event.ctrlKey || event.altKey) return
            const target = event.target
            if (!(target instanceof Element) || target === view.dom) return
            if (!view.editable) return
            // a field of its own (a caption) keeps its keys; the page's own
            // editable root is no such field
            const field = target.closest(TEXT_FIELD)
            if (field && field !== view.dom) return
            const media = mediaAt(view, target)
            if (!media) return
            event.preventDefault()
            event.stopPropagation()
            const tr = view.state.tr.delete(media.pos, media.pos + media.node.nodeSize)
            tr.setSelection(
              TextSelection.near(
                tr.doc.resolve(Math.min(media.pos, tr.doc.content.size)),
                event.key === "Backspace" ? -1 : 1
              )
            )
            view.dispatch(tr.scrollIntoView())
            view.focus()
          }
          // the page lost the focus to an embedded page: the embed is
          // chosen and the keys come back, the press still the embed's
          const onBlur = () => {
            setTimeout(() => {
              const frame = document.activeElement
              if (!(frame instanceof HTMLIFrameElement) || !view.dom.contains(frame))
                return
              if (!view.editable) return
              const media = mediaAt(view, frame)
              if (!media) return
              view.dispatch(
                view.state.tr.setSelection(
                  NodeSelection.create(view.state.doc, media.pos)
                )
              )
              view.focus()
            }, 0)
          }
          view.dom.addEventListener("keydown", onKey, true)
          window.addEventListener("blur", onBlur)
          return {
            destroy() {
              view.dom.removeEventListener("keydown", onKey, true)
              window.removeEventListener("blur", onBlur)
            },
          }
        },
      }),
    ]
  },
})

export const ListBackspace = Extension.create({
  name: "rteListBackspace",
  priority: 1000,
  addKeyboardShortcuts() {
    return {
      Backspace: ({ editor }) => {
        const { selection } = editor.state
        const { $from, empty } = selection
        if (!empty || $from.parent.content.size > 0 || $from.depth < 3)
          return false
        const item = $from.node(-1)
        if (!["listItem", "taskItem"].includes(item.type.name)) return false
        if (item.childCount !== 1) return false
        if ($from.index(-2) === 0) return false
        const start = $from.before(-1)
        const tr = editor.state.tr.delete(start, $from.after(-1))
        const caret = TextSelection.findFrom(tr.doc.resolve(start - 1), -1, true)
        if (!caret) return false
        editor.view.dispatch(tr.setSelection(caret).scrollIntoView())
        return true
      },
    }
  },
})

export const AtomSelection = Extension.create({
  name: "rteAtomSelection",
  addProseMirrorPlugins() {
    // a key just pressed moved the selection itself (an arrow off the
    // player), which is no read-back to refuse
    let lastKey = 0
    return [
      new Plugin({
        key: new PluginKey("rteAtomSelection"),
        // Safari collapses the selection drawn around a player to a caret
        // beside it, and ProseMirror reads that back: a selection-only step
        // from a selected player to a bare caret at its edge, made by no
        // click, key or scroll, is that read, and the player stays chosen
        filterTransaction(tr, state) {
          const was = state.selection
          if (!(was instanceof NodeSelection) || !PLAYERS.has(was.node.type.name))
            return true
          if (tr.docChanged || !tr.selectionSet) return true
          if (tr.getMeta("pointer") || tr.scrolledIntoView) return true
          if (Date.now() - lastKey < 150) return true
          const next = tr.selection
          if (!(next instanceof TextSelection) || !next.empty) return true
          const pos = next.from
          return pos < was.from - 1 || pos > was.to + 1
        },
        props: {
          handleKeyDown() {
            lastKey = Date.now()
            return false
          },
          createSelectionBetween(view, $anchor, $head) {
            const from = Math.min($anchor.pos, $head.pos)
            const to = Math.max($anchor.pos, $head.pos)
            const node = view.state.doc.nodeAt(from)
            if (!node || !node.isAtom || !node.isBlock) return null
            if (from + node.nodeSize !== to) return null
            if (!NodeSelection.isSelectable(node)) return null
            return NodeSelection.create(view.state.doc, from)
          },
        },
      }),
    ]
  },
})

/** an embed's place on the page: its width once resized, its alignment,
 * its caption — kept alike on the embed card's node and a YouTube video */
export const embedFrameAttributes = {
  frameWidth: {
    default: null,
    parseHTML: (el: HTMLElement) => {
      const n = Number(el.getAttribute("data-frame-width"))
      return Number.isFinite(n) && n > 0 ? n : null
    },
    renderHTML: (attrs: Record<string, unknown>) =>
      attrs.frameWidth ? { "data-frame-width": attrs.frameWidth } : {},
  },
  align: {
    default: null,
    parseHTML: (el: HTMLElement) => el.getAttribute("data-align"),
    renderHTML: (attrs: Record<string, unknown>) =>
      attrs.align ? { "data-align": attrs.align } : {},
  },
}

export const Embed = Node.create({
  name: "embed",
  group: "block",
  atom: true,
  draggable: true,
  addAttributes() {
    return {
      src: { default: null },
      aspectRatio: { default: null },
      title: {
        default: null,
        parseHTML: (el: HTMLElement) =>
          el.getAttribute("data-title") ??
          el.querySelector("iframe")?.getAttribute("title") ??
          null,
        renderHTML: (attrs: Record<string, unknown>) =>
          attrs.title ? { "data-title": attrs.title } : {},
      },
      ...embedFrameAttributes,
    }
  },
  parseHTML: () => [{ tag: 'div[data-type="embed"]' }],
  renderHTML: ({ node, HTMLAttributes }) => [
    "div",
    mergeAttributes(HTMLAttributes, { "data-type": "embed" }),
    [
      "iframe",
      {
        src: node.attrs.src,
        allowfullscreen: "true",
        loading: "lazy",
        ...(node.attrs.title ? { title: node.attrs.title } : {}),
        ...(node.attrs.aspectRatio
          ? { style: `aspect-ratio: ${node.attrs.aspectRatio}` }
          : {}),
      },
    ],
    ...(node.attrs.title
      ? [["div", { class: "rte-media-caption" }, node.attrs.title]]
      : []),
  ],
  addNodeView() {
    return ReactNodeViewRenderer(EmbedView)
  },
})

/* ------------------------------ the slots ----------------------------------
 * The empty rows /image and /embed lay down (32243:108985, 32354:128378):
 * each stands in the document until it is filled, and filling it is the
 * one gesture its card asks for — a file off the disk or a link. A row of
 * image slots inside a media columns row is the file's columns-wise
 * upload. The views live in ./media.
 */
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    rteEmbedSlot: {
      /** lay an empty embed slot down, to be filled by link */
      insertEmbedSlot: () => ReturnType
      /** raise the embed card beside the embed at `pos` */
      replaceEmbed: (pos: number) => ReturnType
      /** ask before the embed at `pos` goes */
      removeEmbed: (pos: number) => ReturnType
    }
    rteImageSlot: {
      /** lay an empty image slot down, to be filled by file or by link */
      insertImageSlot: () => ReturnType
      /** a row of empty slots, one per column — one column is a bare slot */
      insertImageColumns: (count?: number) => ReturnType
      /** raise the image card beside the picture at `pos` */
      replaceImage: (pos: number) => ReturnType
    }
  }
}

/**
 * An embed slot laid down by the toolbar or /embed raises its card at
 * once, as Notion's does; one already in the document waits for a press.
 */
export const freshEmbedSlot = { pending: false }

export const EmbedSlot = Node.create({
  name: "embedSlot",
  group: "block",
  atom: true,
  draggable: true,
  selectable: true,
  parseHTML: () => [{ tag: 'div[data-type="embed-slot"]' }],
  renderHTML: ({ HTMLAttributes }) => [
    "div",
    mergeAttributes(HTMLAttributes, { "data-type": "embed-slot" }),
  ],
  addNodeView() {
    return ReactNodeViewRenderer(EmbedSlotView)
  },
  addCommands() {
    return {
      insertEmbedSlot:
        () =>
        ({ commands }) => {
          freshEmbedSlot.pending = true
          const done = commands.insertContent({ type: this.name })
          // the slot mounts on the next tick; should none take it, it lapses
          setTimeout(() => (freshEmbedSlot.pending = false), 300)
          return done
        },
      replaceEmbed:
        (pos: number) =>
        ({ editor }) => {
          const node = editor.state.doc.nodeAt(pos)
          if (!node || !EMBED_TYPES.has(node.type.name)) return false
          openEmbedSourcePopup(
            editor,
            pos,
            (at: number, embed: { src: string; aspectRatio: number }) => {
              const live = editor.state.doc.nodeAt(at)
              if (!live || !EMBED_TYPES.has(live.type.name)) return
              // a new link is the embed card's own node, whatever stood
              // there; its place, width and caption carry over
              const type = editor.state.schema.nodes.embed
              editor.view.dispatch(
                editor.state.tr.setNodeMarkup(at, type, {
                  src: embed.src,
                  aspectRatio: embed.aspectRatio,
                  title: live.attrs.title ?? null,
                  align: live.attrs.align ?? null,
                  frameWidth: live.attrs.frameWidth ?? null,
                })
              )
            }
          )
          return true
        },
      removeEmbed:
        (pos: number) =>
        ({ editor }) => {
          const node = editor.state.doc.nodeAt(pos)
          if (!node || !EMBED_TYPES.has(node.type.name)) return false
          openRemoveEmbedModal(editor, pos)
          return true
        },
    }
  },
})

export const ImageSlot = Node.create({
  name: "imageSlot",
  group: "block",
  atom: true,
  draggable: true,
  selectable: true,
  parseHTML: () => [{ tag: 'div[data-type="image-slot"]' }],
  renderHTML: ({ HTMLAttributes }) => [
    "div",
    mergeAttributes(HTMLAttributes, { "data-type": "image-slot" }),
  ],
  addNodeView() {
    return ReactNodeViewRenderer(ImageSlotView)
  },
  addCommands() {
    return {
      insertImageSlot:
        () =>
        ({ commands }) =>
          commands.insertContent({ type: this.name }),
      // one slot per column; a single column is no grid at all
      insertImageColumns:
        (count = 2) =>
        ({ commands }) =>
          count < 2
            ? commands.insertContent({ type: this.name })
            : commands.insertContent({
                type: "columns",
                attrs: { count, media: true },
                content: Array.from({ length: count }, () => ({
                  type: "column",
                  content: [{ type: this.name }],
                })),
              }),
      replaceImage:
        (pos: number) =>
        ({ editor }) => {
          const node = editor.state.doc.nodeAt(pos)
          if (!node || node.type.name !== "image") return false
          openImageSourcePopup(
            editor,
            pos,
            (at: number, image: { src: string }) => {
              const live = editor.state.doc.nodeAt(at)
              if (!live || live.type.name !== "image") return
              editor.view.dispatch(
                editor.state.tr.setNodeMarkup(at, undefined, {
                  ...live.attrs,
                  ...image,
                })
              )
            }
          )
          return true
        },
    }
  },
  // A row of pictures keeps every cell either filled or offering: a cell
  // whose picture goes gets its slot back, and a cell a picture lands in
  // gives its slot up.
  addProseMirrorPlugins() {
    const slot = this.type
    const blankParagraph = (n: PMNode) =>
      n.type.name === "paragraph" && n.content.size === 0
    return [
      new Plugin({
        key: new PluginKey("rteImageSlots"),
        appendTransaction: (transactions, _old, state) => {
          if (!transactions.some((tr) => tr.docChanged)) return null
          const edits: { from: number; to: number; slot?: boolean }[] = []
          state.doc.descendants((row, rowPos) => {
            if (row.type.name !== "columns") return true
            if (!row.attrs.media) return false
            row.forEach((column, offset) => {
              const start = rowPos + 1 + offset + 1
              let picture = false
              column.descendants((n) => {
                if (n.type.name === "image") picture = true
                return !picture
              })
              let slots = 0
              column.forEach((child) => {
                if (child.type === slot) slots++
              })
              if (picture) {
                column.forEach((child, at) => {
                  if (child.type === slot)
                    edits.push({
                      from: start + at,
                      to: start + at + child.nodeSize,
                    })
                })
              } else if (slots) {
                column.forEach((child, at) => {
                  if (blankParagraph(child))
                    edits.push({
                      from: start + at,
                      to: start + at + child.nodeSize,
                    })
                })
              } else {
                let blank = true
                column.forEach((child) => {
                  if (!blankParagraph(child)) blank = false
                })
                if (blank)
                  edits.push({
                    from: start,
                    to: start + column.content.size,
                    slot: true,
                  })
              }
            })
            return false
          })
          if (!edits.length) return null
          const tr = state.tr
          for (const e of edits.sort((a, b) => b.from - a.from)) {
            if (e.slot) tr.replaceWith(e.from, e.to, slot.create())
            else tr.delete(e.from, e.to)
          }
          return tr
        },
      }),
    ]
  },
})

/* ------------------------- mentions and slash commands ---------------------
 * The "@" list offers the branch's people, each with the face the file
 * gives them; "/" offers every block the editor can insert. Both ride the
 * same popup.
 */
export const PEOPLE = [
  { id: "faris", label: "Faris" },
  { id: "gowtham", label: "Gowtham" },
  { id: "harsha", label: "Harsha" },
  { id: "jayaprakash", label: "Jayaprakash" },
  { id: "sandeep", label: "Sandeep" },
  { id: "shruti", label: "Shruti" },
].map((person) => ({
  ...person,
  image: `/images/rte-people/avatar-${person.id}.png`,
}))

export type SuggestItem = {
  id: string
  label: string
  /** the section of the menu the item belongs under */
  group?: string
  image?: string
  icon?: React.ReactNode
  run?: (editor: TiptapEditor) => void
}

export type SuggestionListHandle = {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean
}

export const SuggestionList = React.forwardRef<
  SuggestionListHandle,
  { items: SuggestItem[]; command: (item: SuggestItem) => void }
>(function SuggestionList({ items, command }, ref) {
  const [index, setIndex] = React.useState(0)
  React.useEffect(() => setIndex(0), [items])
  React.useImperativeHandle(
    ref,
    () => ({
      onKeyDown: ({ event }) => {
        if (event.key === "ArrowDown") {
          setIndex((i) => (i + 1) % Math.max(1, items.length))
          return true
        }
        if (event.key === "ArrowUp") {
          setIndex(
            (i) => (i - 1 + Math.max(1, items.length)) % Math.max(1, items.length)
          )
          return true
        }
        if (event.key === "Enter") {
          const item = items[index]
          if (item) command(item)
          return true
        }
        return false
      },
    }),
    [items, index, command]
  )
  if (!items.length) return null
  // the items under their sections, in the order they arrive
  const groups: { name: string | undefined; items: SuggestItem[] }[] = []
  for (const item of items) {
    const last = groups[groups.length - 1]
    if (last && last.name === item.group) last.items.push(item)
    else groups.push({ name: item.group, items: [item] })
  }
  return (
    <div
      data-slot="rich-text-editor-suggestions"
      className="flex max-h-72 w-56 flex-col overflow-y-auto rounded-xl border border-border-soft bg-card p-1 shadow-elevation-lg"
    >
      {groups.map((group, g) => (
        <React.Fragment key={group.name ?? g}>
          {group.name ? (
            <div className="px-2 pt-1.5 pb-0.5 text-sm leading-[15px] text-card-foreground select-none">
              {group.name}
            </div>
          ) : null}
          {group.items.map((item) => {
            const i = items.indexOf(item)
            return (
              <button
                key={item.id}
                type="button"
                onMouseEnter={() => setIndex(i)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => command(item)}
                className={cn(
                  "flex h-7 shrink-0 items-center gap-2 rounded-lg px-2 text-left text-base text-secondary-foreground",
                  i === index && "bg-secondary"
                )}
              >
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt=""
                    className="size-5 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  item.icon
                )}
                <span className="truncate">{item.label}</span>
              </button>
            )
          })}
        </React.Fragment>
      ))}
    </div>
  )
})

/** the popup both lists ride: a fixed layer under the caret — or over it,
 * where the window has no room below (a line at the page's foot), and kept
 * inside the window's sides. With room on neither side it takes the
 * larger, and its list scrolls in the room there is */
const POPUP_GAP = 6
const POPUP_EDGE = 8
export function suggestionPopup() {
  let component: ReactRenderer<SuggestionListHandle> | null = null
  let host: HTMLDivElement | null = null
  let watch: ResizeObserver | null = null
  let last: SuggestionProps<SuggestItem> | null = null
  const place = (props: SuggestionProps<SuggestItem>) => {
    last = props
    const rect = props.clientRect?.()
    if (!rect || !host) return
    // the scrolling list inside the renderer's own wrapper
    const list = host.querySelector<HTMLElement>(".overflow-y-auto")
    // the list's own height, before any room is taken from it
    if (list) list.style.maxHeight = ""
    const height = host.offsetHeight
    const width = host.offsetWidth
    const below = window.innerHeight - rect.bottom - POPUP_GAP - POPUP_EDGE
    const above = rect.top - POPUP_GAP - POPUP_EDGE
    const up = height > below && above > below
    const room = up ? above : below
    if (list && height > room) {
      list.style.maxHeight = `${Math.max(room, 120)}px`
    }
    const fits = Math.min(height, Math.max(room, 120))
    host.style.top = `${up ? rect.top - POPUP_GAP - fits : rect.bottom + POPUP_GAP}px`
    host.style.left = `${Math.max(
      POPUP_EDGE,
      Math.min(rect.left, window.innerWidth - width - POPUP_EDGE)
    )}px`
  }
  return {
    onStart: (props: SuggestionProps<SuggestItem>) => {
      component = new ReactRenderer(SuggestionList, {
        props,
        editor: props.editor,
      })
      host = document.createElement("div")
      host.className = "fixed z-70"
      host.appendChild(component.element)
      document.body.appendChild(host)
      place(props)
      // the list grows and shrinks as the query narrows it: placed again
      // each time, so it keeps to the side with room
      watch = new ResizeObserver(() => {
        if (last) place(last)
      })
      watch.observe(component.element)
      requestAnimationFrame(() => {
        const list = host?.querySelector(".overflow-y-auto")
        if (list) watch?.observe(list)
        if (last) place(last)
      })
    },
    onUpdate: (props: SuggestionProps<SuggestItem>) => {
      component?.updateProps(props)
      place(props)
      // and once more when the list has drawn its new items
      requestAnimationFrame(() => place(props))
    },
    onKeyDown: (props: { event: KeyboardEvent }) => {
      if (props.event.key === "Escape") {
        watch?.disconnect()
        host?.remove()
        component?.destroy()
        component = null
        host = null
        return true
      }
      return component?.ref?.onKeyDown(props) ?? false
    },
    onExit: () => {
      watch?.disconnect()
      host?.remove()
      component?.destroy()
      component = null
      host = null
    },
  }
}

const pick = (slot: string) => () =>
  (
    document.querySelector(`[data-slot=${slot}]`) as HTMLElement | null
  )?.click()

export const SLASH_ITEMS: SuggestItem[] = [
  // ---- the Text select's blocks, in the select's own order
  { id: "paragraph", label: "Text", group: "Text", icon: <ParagraphIcon className="size-4" />, run: (ed) => applyBlock(ed.chain().focus(), "paragraph") },
  { id: "h1", label: "Heading 1", group: "Text", icon: <Heading1Icon className="size-4" />, run: (ed) => applyBlock(ed.chain().focus(), "h1") },
  { id: "h2", label: "Heading 2", group: "Text", icon: <Heading2Icon className="size-4" />, run: (ed) => applyBlock(ed.chain().focus(), "h2") },
  { id: "h3", label: "Heading 3", group: "Text", icon: <Heading3Icon className="size-4" />, run: (ed) => applyBlock(ed.chain().focus(), "h3") },
  { id: "h4", label: "Heading 4", group: "Text", icon: <Heading4Icon className="size-4" />, run: (ed) => applyBlock(ed.chain().focus(), "h4") },
  { id: "h5", label: "Heading 5", group: "Text", icon: <Heading5Icon className="size-4" />, run: (ed) => applyBlock(ed.chain().focus(), "h5") },
  { id: "h6", label: "Heading 6", group: "Text", icon: <Heading6Icon className="size-4" />, run: (ed) => applyBlock(ed.chain().focus(), "h6") },
  { id: "code", label: "Code", group: "Text", icon: <CodeIcon className="size-4" />, run: (ed) => applyBlock(ed.chain().focus(), "codeBlock") },
  { id: "quote", label: "Quote", group: "Text", icon: <QuoteIcon className="size-4" />, run: (ed) => applyBlock(ed.chain().focus(), "blockquote") },
  { id: "bullet", label: "Bulleted list", group: "Lists", icon: <MultipleListIcon className="size-4" />, run: (ed) => applyBlock(ed.chain().focus(), "bulletList") },
  { id: "numbered", label: "Numbered list", group: "Lists", icon: <NumberedListIcon className="size-4" />, run: (ed) => applyBlock(ed.chain().focus(), "orderedList") },
  { id: "todo", label: "To-do list", group: "Lists", icon: <TodoIcon className="size-4" />, run: (ed) => applyBlock(ed.chain().focus(), "taskList") },
  { id: "toggle", label: "Toggle list", group: "Lists", icon: <SmallRightIcon className="size-4" />, run: (ed) => applyBlock(ed.chain().focus(), "details") },
  { id: "columns2", label: "2 columns", group: "Layout", icon: <Grid2Icon className="size-4" />, run: (ed) => applyBlock(ed.chain().focus(), "columns2") },
  { id: "columns3", label: "3 columns", group: "Layout", icon: <Grid3Icon className="size-4" />, run: (ed) => applyBlock(ed.chain().focus(), "columns3") },
  { id: "columns4", label: "4 columns", group: "Layout", icon: <Grid4Icon className="size-4" />, run: (ed) => applyBlock(ed.chain().focus(), "columns4") },
  { id: "columns5", label: "5 columns", group: "Layout", icon: <Grid5Icon className="size-4" />, run: (ed) => applyBlock(ed.chain().focus(), "columns5") },
  // ---- the media, as the toolbar's Insert menu lays them: a picture's
  // slot, audio from the disk, the embed's slot
  { id: "image", label: "Image", group: "Media", icon: <ImageIcon className="size-4" />, run: (ed) => ed.chain().focus().insertImageSlot().run() },
  { id: "video", label: "Video", group: "Media", icon: <VideoIcon className="size-4" />, run: () => pick("rte-video-input")() },
  { id: "audio", label: "Audio", group: "Media", icon: <AudioWavesIcon className="size-4" />, run: () => pick("rte-audio-input")() },
  { id: "file", label: "File", group: "Media", icon: <FileUploadIcon className="size-4" />, run: () => pick("rte-attach-input")() },
  { id: "embed", label: "Embed", group: "Media", icon: <GroupIcon className="size-4" />, run: (ed) => ed.chain().focus().insertEmbedSlot().run() },
  // ---- the Insert group: link, table, divider, and the callout
  { id: "link", label: "Link", group: "Insert", icon: <LinkIcon className="size-4" />, run: (ed) => ed.commands.openLinkEditor?.() },
  { id: "table", label: "Table", group: "Insert", icon: <TableViewIcon className="size-4" />, run: (ed) => ed.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() },
  { id: "divider", label: "Divider", group: "Insert", icon: <DividerIcon className="size-4" />, run: (ed) => ed.chain().focus().setHorizontalRule().run() },
  { id: "callout", label: "Callout", group: "Insert", icon: <QuoteIcon className="size-4" />, run: (ed) => ed.chain().focus().setCallout().run() },
]

export const SlashCommands = Extension.create({
  name: "slashCommands",
  addProseMirrorPlugins() {
    return [
      Suggestion<SuggestItem>({
        editor: this.editor,
        char: "/",
        // as Notion's: a name of more than one word is found typed in full
        allowSpaces: true,
        pluginKey: new PluginKey("slashCommands"),
        items: ({ query }) =>
          SLASH_ITEMS.filter((item) =>
            item.label.toLowerCase().includes(query.toLowerCase())
          ),
        command: ({ editor, range, props }) => {
          editor.chain().focus().deleteRange(range).run()
          props.run?.(editor)
        },
        render: suggestionPopup,
      }),
    ]
  },
})

/* ---------------------------------- columns --------------------------------
 * Two to five blocks side by side, each a column of blocks — the branch's
 * multi-column layout. `setColumns` re-counts the row the selection is in
 * (columns added empty, or the extra ones folded into the last kept), or
 * lays a fresh row.
 */
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    columns: {
      insertColumns: (count?: number) => ReturnType
      setColumns: (count?: number) => ReturnType
      /** the share of the row each column of the row at `pos` has */
      setColumnWidths: (pos: number, widths: number[] | null) => ReturnType
    }
  }
}

export const Column = Node.create({
  name: "column",
  content: "block+",
  isolating: true,
  parseHTML: () => [{ tag: 'div[data-type="column"]' }],
  renderHTML: ({ HTMLAttributes }) => [
    "div",
    mergeAttributes(HTMLAttributes, { "data-type": "column" }),
    0,
  ],
})

export const Columns = Node.create({
  name: "columns",
  group: "block",
  // one column is a layout too: its blocks stacked, still carried and
  // rearranged as a layout's; a block set beside one makes columns again
  content: "column{1,5}",
  defining: true,
  addAttributes() {
    return {
      count: {
        default: 2,
        parseHTML: (el) => Number(el.getAttribute("data-count") ?? 2),
        renderHTML: (attrs) => ({ "data-count": attrs.count }),
      },
      // the share of the row each column has, as the bar between two of
      // them sets it (ColumnResizer); none means equal shares. Drawn as
      // the grid's own template, so the row needs no script to keep it.
      widths: {
        default: null,
        parseHTML: (el) => {
          const raw = el.getAttribute("data-widths")
          if (!raw) return null
          const widths = raw.split(",").map(Number)
          const count = Number(el.getAttribute("data-count") ?? widths.length)
          return widths.length === count &&
            widths.every((w) => Number.isFinite(w) && w > 0)
            ? widths
            : null
        },
        renderHTML: (attrs) => {
          const widths = attrs.widths as number[] | null
          if (!widths) return {}
          return {
            "data-widths": widths.map((w) => w.toFixed(4)).join(","),
            style: `grid-template-columns: ${widths
              .map((w) => `minmax(0, ${w.toFixed(4)}fr)`)
              .join(" ")}`,
          }
        },
      },
      // a row of pictures is ruled differently from a row of prose: the
      // file sets its cells 16 apart with nothing drawn between them
      media: {
        default: false,
        parseHTML: (el) => el.getAttribute("data-media") === "true",
        renderHTML: (attrs) => (attrs.media ? { "data-media": "true" } : {}),
      },
    }
  },
  parseHTML: () => [{ tag: 'div[data-type="columns"]' }],
  renderHTML: ({ HTMLAttributes }) => [
    "div",
    mergeAttributes(HTMLAttributes, { "data-type": "columns" }),
    0,
  ],
  addCommands() {
    return {
      insertColumns:
        (count = 2) =>
        ({ commands, tr }) => {
          const done = commands.insertContent({
            type: this.name,
            attrs: { count },
            content: Array.from({ length: count }, () => ({
              type: "column",
              content: [{ type: "paragraph" }],
            })),
          })
          if (!done) return false
          // the insert leaves the caret in the last column; writing starts
          // in the first
          const { $from } = tr.selection
          for (let d = $from.depth; d > 0; d--) {
            if ($from.node(d).type.name !== this.name) continue
            tr.setSelection(TextSelection.create(tr.doc, $from.before(d) + 3))
            break
          }
          return true
        },
      setColumnWidths:
        (pos: number, widths: number[] | null) =>
        ({ state, tr, dispatch }) => {
          const row = state.doc.nodeAt(pos)
          if (
            !row ||
            row.type !== this.type ||
            (widths !== null && widths.length !== row.childCount)
          )
            return false
          if (dispatch)
            tr.setNodeMarkup(pos, undefined, { ...row.attrs, widths })
          return true
        },
      setColumns:
        (count = 2) =>
        ({ state, tr, dispatch, commands }) => {
          const { $from } = state.selection
          let depth = 0
          for (let d = $from.depth; d > 0; d--)
            if ($from.node(d).type.name === "columns") {
              depth = d
              break
            }
          if (!depth) return commands.insertColumns(count)

          const row = $from.node(depth)
          if (row.childCount === count) return true
          if (!dispatch) return true

          const column = state.schema.nodes.column
          const columns = row.content.content.slice(0, count)
          const blank = (cell: PMNode) =>
            cell.childCount === 1 &&
            cell.firstChild!.isTextblock &&
            cell.firstChild!.content.size === 0
          if (count > row.childCount) {
            // grown: the new columns stand empty on the right
            for (let i = row.childCount; i < count; i++)
              columns.push(column.createAndFill()!)
          } else {
            // shrunk: what the dropped columns held goes to the end of the
            // last column kept, in order, so nothing is lost; a column with
            // nothing written in it brings no empty line along
            const last = columns[count - 1]
            let content = last.content
            for (let i = count; i < row.childCount; i++)
              if (!blank(row.child(i)))
                content = content.append(row.child(i).content)
            columns[count - 1] = last.copy(content)
          }

          const from = $from.before(depth)
          // a re-counted row starts from equal shares again
          const next = row.type.create(
            { ...row.attrs, count, widths: null },
            columns
          )
          tr.replaceWith(from, from + row.nodeSize, next)

          // the caret stays on its text: untouched in a kept column, and
          // carried along with the text folded into the last one
          const index = $from.index(depth)
          let pos = $from.pos
          let bias = 1
          if (index >= count) {
            let start = from + 1
            for (let i = 0; i < count - 1; i++) start += row.child(i).nodeSize
            let before = row.child(count - 1).content.size
            for (let i = count; i < index; i++)
              if (!blank(row.child(i))) before += row.child(i).content.size
            // in a blank column, which is gone: the end of the last kept
            pos = start + 1 + before
            if (blank(row.child(index))) bias = -1
            else pos += $from.pos - $from.start(depth + 1)
          }
          tr.setSelection(TextSelection.near(tr.doc.resolve(pos), bias))
          return true
        },
    }
  },
})


/* -------------------------------- attachment -------------------------------
 * The branch's attachment block: a file chip — the document glyph, the
 * file's name — carrying the name, size and mime type as attributes, and
 * round-tripping the source's `a[data-attachment]` markup.
 */
export const Attachment = Node.create({
  name: "attachment",
  group: "block",
  atom: true,
  draggable: true,
  addAttributes() {
    return {
      href: { default: "#" },
      fileName: {
        default: "",
        parseHTML: (el) => el.getAttribute("data-file-name") ?? el.textContent,
        renderHTML: (attrs) => ({ "data-file-name": attrs.fileName }),
      },
      fileSize: {
        default: 0,
        parseHTML: (el) => Number(el.getAttribute("data-file-size") ?? 0),
        renderHTML: (attrs) => ({ "data-file-size": attrs.fileSize }),
      },
      mimeType: {
        default: "",
        parseHTML: (el) => el.getAttribute("data-mime-type") ?? "",
        renderHTML: (attrs) => ({ "data-mime-type": attrs.mimeType }),
      },
    }
  },
  // ahead of the Link mark's own a[href] rule, which would otherwise
  // swallow the chip as an inline link
  parseHTML: () => [{ tag: "a[data-attachment]", priority: 100 }],
  renderHTML({ node, HTMLAttributes }) {
    return [
      "a",
      mergeAttributes(HTMLAttributes, {
        "data-attachment": "",
        href: node.attrs.href,
      }),
      String(node.attrs.fileName ?? ""),
    ]
  },
  addNodeView() {
    return ReactNodeViewRenderer(AttachmentView, {
      // the row is an <a>: its presses stay its own, and its native drag
      // is no drag of the block — the browser would carry the URL
      stopEvent: ({ event }) => {
        const target = event.target as HTMLElement
        const { type } = event
        if (type.startsWith("drag") || type === "drop") {
          if (type === "dragstart") event.preventDefault()
          return false
        }
        return !!target.closest?.("a, button")
      },
    })
  },
})

/* ---------------------------------- blocks ---------------------------------
 * The block styles the "Text" select offers: what the cursor's block is,
 * and how to make it another. (The source also lists toggle lists and
 * column layouts, which ride on its own extensions.)
 */
export const BLOCKS = [
  { value: "paragraph", label: "Text", Icon: ParagraphIcon },
  { value: "h1", label: "Heading 1", Icon: Heading1Icon },
  { value: "h2", label: "Heading 2", Icon: Heading2Icon },
  { value: "h3", label: "Heading 3", Icon: Heading3Icon },
  { value: "h4", label: "Heading 4", Icon: Heading4Icon },
  { value: "h5", label: "Heading 5", Icon: Heading5Icon },
  { value: "h6", label: "Heading 6", Icon: Heading6Icon },
  { value: "bulletList", label: "Bulleted list", Icon: MultipleListIcon },
  { value: "orderedList", label: "Numbered list", Icon: NumberedListIcon },
  { value: "taskList", label: "To-do list", Icon: TodoIcon },
  { value: "details", label: "Toggle list", Icon: SmallRightIcon },
  { value: "codeBlock", label: "Code", Icon: CodeIcon },
  { value: "blockquote", label: "Quote", Icon: QuoteIcon },
  { value: "columns2", label: "2 columns", Icon: Grid2Icon },
  { value: "columns3", label: "3 columns", Icon: Grid3Icon },
  { value: "columns4", label: "4 columns", Icon: Grid4Icon },
  { value: "columns5", label: "5 columns", Icon: Grid5Icon },
] as const
export type BlockValue = (typeof BLOCKS)[number]["value"]

/** how many columns the row around the selection has — none, if no row */
export function columnsAround(ed: TiptapEditor): number {
  const { $from } = ed.state.selection
  for (let d = $from.depth; d > 0; d--)
    if ($from.node(d).type.name === "columns") return $from.node(d).childCount
  return 0
}

export function activeBlockOf(ed: TiptapEditor): BlockValue {
  for (const level of [1, 2, 3, 4, 5, 6] as const)
    if (ed.isActive("heading", { level })) return `h${level}` as BlockValue
  if (ed.isActive("codeBlock")) return "codeBlock"
  if (ed.isActive("taskList")) return "taskList"
  if (ed.isActive("bulletList")) return "bulletList"
  if (ed.isActive("orderedList")) return "orderedList"
  if (ed.isActive("blockquote")) return "blockquote"
  // a toggle is its summary line; what it holds below are blocks of their own
  if (ed.isActive("detailsSummary")) return "details"
  const columns = columnsAround(ed)
  if (columns) return `columns${columns}` as BlockValue
  return "paragraph"
}

export function applyBlock(chain: ChainedCommands, value: BlockValue) {
  if (value === "paragraph") chain.setParagraph().run()
  else if (value.startsWith("h"))
    chain
      .toggleHeading({ level: Number(value[1]) as 1 | 2 | 3 | 4 | 5 | 6 })
      .run()
  else if (value === "bulletList") chain.toggleBulletList().run()
  else if (value === "orderedList") chain.toggleOrderedList().run()
  else if (value === "taskList") chain.toggleTaskList().run()
  else if (value === "codeBlock") chain.toggleCodeBlock().run()
  else if (value === "blockquote") chain.toggleBlockquote().run()
  else if (value === "details") chain.setToggleList().run()
  // a row the selection is already in is re-counted; elsewhere a row is laid
  else if (value === "columns2") chain.setColumns(2).run()
  else if (value === "columns3") chain.setColumns(3).run()
  else if (value === "columns4") chain.setColumns(4).run()
  else if (value === "columns5") chain.setColumns(5).run()
}

/* ------------------------------ fonts and sizes ----------------------------- */

export const FONTS = [
  { label: "Inter", value: null },
  { label: "Serif", value: 'Georgia, "Times New Roman", serif' },
  { label: "Mono", value: 'ui-monospace, "SF Mono", Menlo, monospace' },
] as const
/** the document's body size, before the view can be measured */
export const DEFAULT_SIZE = 15
export const SPACINGS = ["1", "1.15", "1.5", "2"] as const
