"use client"

// RichTextKit, after frappe-ui's: one extension bundle for every editor in
// the project, configured per use. The field editor turns the document's
// blocks off; the document editor takes the lot. `false` drops a feature,
// an object configures it.
import { Extension, type AnyExtension } from "@tiptap/core"
import StarterKit from "@tiptap/starter-kit"
import { Details, DetailsContent, DetailsSummary } from "@tiptap/extension-details"
import Highlight from "@tiptap/extension-highlight"
import Image from "@tiptap/extension-image"
import { TaskItem, TaskList } from "@tiptap/extension-list"
import Mention from "@tiptap/extension-mention"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import {
  TableCell,
  TableHeader,
  TableKit,
  TableRow,
} from "@tiptap/extension-table"
import TextAlign from "@tiptap/extension-text-align"
import {
  Color,
  FontFamily,
  FontSize,
  LineHeight,
  TextStyle,
} from "@tiptap/extension-text-style"
import Youtube from "@tiptap/extension-youtube"
import { Placeholder } from "@tiptap/extensions"

import { ReactNodeViewRenderer } from "@tiptap/react"

import { BlockSelect } from "./block-select"
import { LinkEditor } from "./link-card"
import { EmbedView, ImageView } from "./media"
import {
  Attachment,
  LinkPaste,
  Audio,
  Callout,
  CommentMark,
  DetailsTweaks,
  detailsNodeView,
  Video,
  Column,
  Columns,
  Embed,
  embedFrameAttributes,
  AtomSelection,
  ListBackspace,
  EdgeKeys,
  MediaKeys,
  TabKeys,
  TabTrap,
  SmoothBlocks,
  EmbedSlot,
  ImageSlot,
  Limit,
  LinkOn,
  PEOPLE,
  SlashCommands,
  suggestionPopup,
  type SuggestItem,
  TableCellColor,
  TableSelectionOverlay,
} from "./extensions"

export interface RichTextKitOptions {
  /** heading levels, or false for none */
  heading?: { levels: (1 | 2 | 3 | 4 | 5 | 6)[] } | false
  placeholder?: { placeholder?: string; showOnlyWhenEditable?: boolean } | false
  textAlign?: false
  color?: false
  fontFamily?: false
  fontSize?: false
  lineHeight?: false
  highlight?: false
  image?: false
  table?: false
  taskList?: false
  details?: false
  columns?: false
  callout?: false
  attachment?: false
  audio?: false
  embed?: false
  /** the YouTube video node */
  video?: false
  /** the "@" list; by default the branch's people, or the caller's for a
   * query */
  mention?: false | { items: (query: string) => SuggestItem[] }
  slashCommands?: false
  subscript?: false
  superscript?: false
  /** Tab kept on the page, Notion's way (off: Tab moves the focus on, as a
   * form's field should let it) */
  tabKeys?: false
  /** the most characters the document holds */
  limit?: number | false
}

export const RichTextKit = Extension.create<RichTextKitOptions>({
  name: "richTextKit",
  addOptions() {
    return {}
  },
  addExtensions() {
    const options = this.options
    const extensions: AnyExtension[] = [
      StarterKit.configure({
        heading:
          options.heading === false
            ? false
            : (options.heading ?? { levels: [1, 2, 3, 4, 5, 6] }),
        // the branch's own paste plugin links a selection in place of
        // tiptap's, which would swap the words for the pasted address
        link: { openOnClick: false, linkOnPaste: false },
      }),
      TextStyle,
    ]
    if (options.color !== false) extensions.push(Color)
    if (options.fontFamily !== false) extensions.push(FontFamily)
    if (options.fontSize !== false) extensions.push(FontSize)
    if (options.lineHeight !== false) extensions.push(LineHeight)
    if (options.highlight !== false)
      extensions.push(Highlight.configure({ multicolor: true }))
    if (options.image !== false)
      extensions.push(
        // the picture: its caption, size and alignment as attributes, and
        // the file's chrome drawn by the node view (media.tsx)
        Image.extend({
          addAttributes() {
            return {
              ...this.parent?.(),
              width: {
                default: null,
                parseHTML: (el: HTMLElement) => {
                  const raw = el.getAttribute("width")
                  const n = raw ? Number(raw) : NaN
                  return Number.isFinite(n) ? n : null
                },
              },
              height: {
                default: null,
                parseHTML: (el: HTMLElement) => {
                  const raw = el.getAttribute("height")
                  const n = raw ? Number(raw) : NaN
                  return Number.isFinite(n) ? n : null
                },
              },
              align: {
                default: null,
                parseHTML: (el: HTMLElement) => el.getAttribute("data-align"),
                renderHTML: (attrs: Record<string, unknown>) =>
                  attrs.align ? { "data-align": attrs.align } : {},
              },
              caption: {
                default: null,
                parseHTML: (el: HTMLElement) =>
                  el.getAttribute("data-caption"),
              },
              // a tall picture is clipped to a set height unless this is
              // turned off in its menu, when it shows whole
              clip: {
                default: true,
                parseHTML: (el: HTMLElement) =>
                  el.getAttribute("data-clip") !== "false",
                renderHTML: (attrs: Record<string, unknown>) =>
                  attrs.clip === false ? { "data-clip": "false" } : {},
              },
            }
          },
          renderHTML({ node, HTMLAttributes }) {
            const caption = node.attrs.caption as string | null
            const img = [
              "img",
              {
                ...HTMLAttributes,
                ...(caption ? { "data-caption": caption } : {}),
              },
            ] as const
            if (!caption) return img as never
            return [
              "div",
              { class: "rte-figure" },
              img,
              [
                "div",
                { class: "rte-media-caption", contenteditable: "false" },
                caption,
              ],
            ] as never
          },
          addNodeView() {
            return ReactNodeViewRenderer(ImageView)
          },
        })
      )
    if (options.textAlign !== false)
      extensions.push(TextAlign.configure({ types: ["paragraph", "heading"] }))
    if (options.table !== false) {
      // the cells carry the menu's colour as a named hue, which the
      // stylesheet tints for either theme
      const colouredCell = {
        backgroundColor: {
          default: null as string | null,
          parseHTML: (el: HTMLElement) => el.getAttribute("data-bg"),
          renderHTML: (attrs: Record<string, unknown>) =>
            attrs.backgroundColor ? { "data-bg": attrs.backgroundColor } : {},
        },
      }
      extensions.push(
        TableKit.configure({
          // the grip carries a table as one block, by selecting the table
          // node; without this the plugin turns that selection into its
          // every cell, and the grip would step aside mid-drag
          table: { resizable: true, allowTableNodeSelection: true },
          tableCell: false,
          tableHeader: false,
          tableRow: false,
        }),
        // the row carries the file's border option, drawn off `data-border`
        TableRow.extend({
          addAttributes() {
            return {
              ...this.parent?.(),
              border: {
                default: null as string | null,
                parseHTML: (el: HTMLElement) => el.getAttribute("data-border"),
                renderHTML: (attrs: Record<string, unknown>) =>
                  attrs.border ? { "data-border": attrs.border } : {},
              },
            }
          },
        }),
        TableCell.extend({
          addAttributes() {
            return { ...this.parent?.(), ...colouredCell }
          },
        }),
        TableHeader.extend({
          addAttributes() {
            return { ...this.parent?.(), ...colouredCell }
          },
        }),
        TableCellColor,
        TableSelectionOverlay
      )
    }
    if (options.taskList !== false)
      extensions.push(TaskList, TaskItem.configure({ nested: true }))
    if (options.details !== false)
      extensions.push(
        // the official details nodes, drawn to the file's markup and given
        // the branch's commands (Enter as Notion's, Toggle list, Alt-moves);
        // persist keeps `open` as a document attribute the chevron can set
        Details.extend({ addNodeView: detailsNodeView }).configure({
          persist: true,
        }),
        DetailsTweaks,
        DetailsSummary,
        // the source writes its content as div[data-type="details-content"];
        // the official node view keeps itself `hidden` until a native
        // <details> opens, which the file's markup never is — the fold is
        // the stylesheet's (styles.tsx), off the wrapper's is-open
        DetailsContent.extend({
          parseHTML() {
            return [
              { tag: 'div[data-type="details-content"]' },
              { tag: 'div[data-type="detailsContent"]' },
            ]
          },
          renderHTML({ HTMLAttributes }) {
            return [
              "div",
              { ...HTMLAttributes, "data-type": "details-content" },
              0,
            ]
          },
          addNodeView() {
            return () => {
              const dom = document.createElement("div")
              dom.setAttribute("data-type", "details-content")
              return { dom, contentDOM: dom }
            }
          },
        })
      )
    if (options.columns !== false) extensions.push(Columns, Column)
    if (options.image !== false) extensions.push(ImageSlot)
    if (options.embed !== false) extensions.push(EmbedSlot)
    extensions.push(
      LinkOn,
      LinkEditor,
      LinkPaste,
      CommentMark,
      AtomSelection,
      ListBackspace,
      EdgeKeys,
      MediaKeys,
      SmoothBlocks,
      BlockSelect
    )
    if (options.tabKeys !== false) extensions.push(TabKeys, TabTrap)
    if (options.callout !== false) extensions.push(Callout)
    if (options.attachment !== false) extensions.push(Attachment)
    if (options.audio !== false) extensions.push(Audio)
    if (options.embed !== false) extensions.push(Embed)
    if (options.video !== false)
      extensions.push(
        // the frame carries its caption, drawn centred beneath it
        Youtube.extend({
          addNodeView() {
            return ReactNodeViewRenderer(EmbedView)
          },
          addAttributes() {
            return {
              ...this.parent?.(),
              ...embedFrameAttributes,
              title: {
                default: null,
                parseHTML: (el: HTMLElement) =>
                  el.getAttribute("title") ??
                  el.querySelector("iframe")?.getAttribute("title") ??
                  null,
              },
            }
          },
          renderHTML(props) {
            const rendered = this.parent?.(props) as unknown as unknown[]
            const title = props.node.attrs.title as string | null
            if (!title || !Array.isArray(rendered)) return rendered as never
            return [
              ...rendered,
              ["div", { class: "rte-media-caption" }, title],
            ] as never
          },
        }).configure({ nocookie: true }),
        Video
      )
    // a run is raised or lowered, never both: setting one takes the other
    // off, or the lowered text would sit inside the raised one
    if (options.subscript !== false)
      extensions.push(Subscript.extend({ excludes: "subscript superscript" }))
    if (options.superscript !== false)
      extensions.push(Superscript.extend({ excludes: "superscript subscript" }))
    if (options.mention !== false)
      extensions.push(
        Mention.configure({
          HTMLAttributes: { class: "mention" },
          renderText: ({ node }) => `@${node.attrs.label ?? node.attrs.id}`,
          suggestion: {
            items: ({ query }) =>
              options.mention
                ? options.mention.items(query)
                : PEOPLE.filter((person) =>
                    person.label.toLowerCase().startsWith(query.toLowerCase())
                  ),
            command: ({ editor, range, props }) =>
              editor
                .chain()
                .focus()
                .insertContentAt(range, [
                  {
                    type: "mention",
                    attrs: { id: props.id, label: props.label },
                  },
                  { type: "text", text: " " },
                ])
                .run(),
            render: suggestionPopup,
          },
        })
      )
    if (options.slashCommands !== false) extensions.push(SlashCommands)
    if (options.placeholder !== false)
      extensions.push(
        Placeholder.configure({
          placeholder: "Type something...",
          showOnlyWhenEditable: false,
          ...options.placeholder,
        })
      )
    if (options.limit) extensions.push(Limit.configure({ limit: options.limit }))
    return extensions
  },
})
