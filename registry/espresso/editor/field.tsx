"use client"

// The field editor, after the branch's TeField.vue: one editor, three ways
// of drawing it (outline, subtle, ghost), the bar on top or at the bottom —
// composed over the editor molecule's provider with RichTextKit configured
// down to the field's own set: marks, lists, quote, code block, link,
// image, colour and alignment — none of the document's blocks or menus.
import * as React from "react"
import type { Editor as TiptapEditor } from "@tiptap/core"
import { useEditorState } from "@tiptap/react"
import { BubbleMenu } from "@tiptap/react/menus"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  BulletIcon,
  CodeIcon,
  ImageIcon,
  ItalicIcon,
  LinkIcon,
  NumberedIcon,
  QuoteIcon,
  ResizerIcon,
  StrikeIcon,
  UnderlineIcon,
} from "@/components/ui/editor-icons"

import { EditorContent, EditorProvider } from "./core"
import { RichTextKit } from "./kit"
import { highlightValue, hue, PALETTE, textValue } from "./extensions"

const nameOf = (value: string | undefined, of: (name: string) => string) =>
  PALETTE.find((n) => of(n) === value) ?? null

/* --------------------------------- toolbar -------------------------------- */

function ToolbarButton({
  label,
  pressed,
  disabled,
  onClick,
  className,
  children,
}: {
  label: string
  pressed?: boolean
  disabled?: boolean
  onClick?: () => void
  className?: string
  children: React.ReactNode
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            type="button"
            aria-label={label}
            aria-pressed={pressed}
            disabled={disabled}
            onMouseDown={(event) => event.preventDefault()}
            onClick={onClick}
            className={cn(
              "flex h-6 min-w-6 shrink-0 items-center justify-center rounded-md text-secondary-foreground transition-colors not-disabled:hover:bg-secondary aria-pressed:bg-secondary disabled:cursor-default data-popup-open:bg-secondary",
              className
            )}
          >
            {children}
          </button>
        }
      />
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

function ToolbarDivider() {
  return <span aria-hidden="true" className="mx-1 h-4 w-px shrink-0 bg-muted" />
}

function ColorPanel({
  editor,
  onPick,
}: {
  editor: TiptapEditor
  onPick: () => void
}) {
  const current = useEditorState({
    editor,
    selector: ({ editor: ed }) => ({
      text: nameOf(ed.getAttributes("textStyle").color, textValue),
      highlight: nameOf(ed.getAttributes("highlight").color, highlightValue),
    }),
  })
  const swatches = [null, ...PALETTE]
  const pickText = (name: string | null) => {
    const chain = editor.chain().focus()
    ;(name ? chain.setColor(textValue(name)) : chain.unsetColor()).run()
    onPick()
  }
  const pickHighlight = (name: string | null) => {
    const chain = editor.chain().focus()
    ;(name
      ? chain.setHighlight({ color: highlightValue(name) })
      : chain.unsetHighlight()
    ).run()
    onPick()
  }
  const swatchClass =
    "flex size-6 items-center justify-center rounded-md border bg-card text-base leading-none transition-shadow hover:shadow-[0_0_0_1px_var(--sw-line)] focus-visible:shadow-[0_0_0_1px_var(--sw-line)] focus-visible:outline-none aria-pressed:shadow-[0_0_0_2px_var(--border-normal)]"
  return (
    <div
      role="group"
      aria-label="Text and background colour"
      className="flex w-[190px] flex-col gap-4"
    >
      <section className="flex flex-col gap-2">
        <div className="text-sm leading-[15px] text-muted-foreground">
          Text color
        </div>
        <div className="grid grid-cols-6 gap-1.5">
          {swatches.map((name) => (
            <button
              key={name ?? "default"}
              type="button"
              title={name ?? "Default"}
              aria-label={name ?? "Default"}
              aria-pressed={current?.text === name}
              onClick={() => pickText(name)}
              className={swatchClass}
              style={
                name
                  ? ({
                      color: textValue(name),
                      borderColor: `var(--color-${hue(name)}-200)`,
                      "--sw-line": `var(--color-${hue(name)}-200)`,
                    } as React.CSSProperties)
                  : ({
                      color: "var(--foreground)",
                      borderColor: "var(--border)",
                      "--sw-line": "var(--border)",
                    } as React.CSSProperties)
              }
            >
              A
            </button>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-2">
        <div className="text-sm leading-[15px] text-muted-foreground">
          Background color
        </div>
        <div className="grid grid-cols-6 gap-1.5">
          {swatches.map((name) => (
            <button
              key={name ?? "default"}
              type="button"
              title={name ?? "Default"}
              aria-label={name ?? "Default"}
              aria-pressed={current?.highlight === name}
              onClick={() => pickHighlight(name)}
              className={swatchClass}
              style={
                name
                  ? ({
                      backgroundColor: `var(--color-${hue(name)}-50)`,
                      borderColor: `var(--color-${hue(name)}-200)`,
                      "--sw-line": `var(--color-${hue(name)}-200)`,
                    } as React.CSSProperties)
                  : ({
                      borderColor: "var(--border-soft)",
                      "--sw-line": "var(--border)",
                    } as React.CSSProperties)
              }
            />
          ))}
        </div>
      </section>
    </div>
  )
}

const ALIGNS = [
  { value: "left", label: "Left", Icon: AlignLeftIcon },
  { value: "center", label: "Center", Icon: AlignCenterIcon },
  { value: "right", label: "Right", Icon: AlignRightIcon },
  { value: "justify", label: "Justify", Icon: AlignJustifyIcon },
] as const

function EditorToolbar({
  editor,
  kind,
  disabled,
  onImage,
}: {
  editor: TiptapEditor
  kind: "full" | "comment"
  disabled?: boolean
  onImage?: (file: File) => void
}) {
  const active = useEditorState({
    editor,
    selector: ({ editor: ed }) => ({
      bold: ed.isActive("bold"),
      italic: ed.isActive("italic"),
      strike: ed.isActive("strike"),
      underline: ed.isActive("underline"),
      quote: ed.isActive("blockquote"),
      code: ed.isActive("codeBlock"),
      link: ed.isActive("link"),
      numbered: ed.isActive("orderedList"),
      bulleted: ed.isActive("bulletList"),
      align:
        ALIGNS.find((a) => ed.isActive({ textAlign: a.value })) ?? ALIGNS[0],
      textColor: nameOf(ed.getAttributes("textStyle").color, textValue),
      highlightColor: nameOf(
        ed.getAttributes("highlight").color,
        highlightValue
      ),
    }),
  })
  const chain = () => editor.chain().focus()

  const setLink = () => {
    if (editor.isActive("link")) {
      chain().unsetLink().run()
      return
    }
    // the source opens its link dialog here; a prompt keeps the port lean
    const href = window.prompt("Link URL")
    if (href) chain().extendMarkRange("link").setLink({ href }).run()
  }
  const fileRef = React.useRef<HTMLInputElement>(null)
  const insertImage = (file: File | undefined) => {
    if (!file) return
    if (onImage) return onImage(file)
    const reader = new FileReader()
    reader.onload = () =>
      chain().setImage({ src: reader.result as string }).run()
    reader.readAsDataURL(file)
  }

  const iconClass = "size-3.5"
  const controls: {
    name: string
    label: string
    icon: React.ReactNode
    pressed?: boolean
    run: () => void
  }[][] =
    kind === "full"
      ? [
          [
            { name: "bold", label: "Bold", icon: <BoldIcon className={iconClass} />, pressed: active?.bold, run: () => chain().toggleBold().run() },
            { name: "italic", label: "Italic", icon: <ItalicIcon className={iconClass} />, pressed: active?.italic, run: () => chain().toggleItalic().run() },
            { name: "strike", label: "Strikethrough", icon: <StrikeIcon className={iconClass} />, pressed: active?.strike, run: () => chain().toggleStrike().run() },
            { name: "underline", label: "Underline", icon: <UnderlineIcon className={iconClass} />, pressed: active?.underline, run: () => chain().toggleUnderline().run() },
          ],
          [
            { name: "quote", label: "Quote", icon: <QuoteIcon className={iconClass} />, pressed: active?.quote, run: () => chain().toggleBlockquote().run() },
            { name: "code", label: "Code block", icon: <CodeIcon className={iconClass} />, pressed: active?.code, run: () => chain().toggleCodeBlock().run() },
          ],
          [
            { name: "link", label: "Link", icon: <LinkIcon className={iconClass} />, pressed: active?.link, run: setLink },
            { name: "image", label: "Image", icon: <ImageIcon className={iconClass} />, run: () => fileRef.current?.click() },
          ],
          [
            { name: "numbered", label: "Numbered list", icon: <NumberedIcon className={iconClass} />, pressed: active?.numbered, run: () => chain().toggleOrderedList().run() },
            { name: "bulleted", label: "Bulleted list", icon: <BulletIcon className={iconClass} />, pressed: active?.bulleted, run: () => chain().toggleBulletList().run() },
          ],
        ]
      : [
          [
            { name: "bold", label: "Bold", icon: <BoldIcon className={iconClass} />, pressed: active?.bold, run: () => chain().toggleBold().run() },
            { name: "italic", label: "Italic", icon: <ItalicIcon className={iconClass} />, pressed: active?.italic, run: () => chain().toggleItalic().run() },
            { name: "strike", label: "Strikethrough", icon: <StrikeIcon className={iconClass} />, pressed: active?.strike, run: () => chain().toggleStrike().run() },
          ],
          [
            { name: "numbered", label: "Numbered list", icon: <NumberedIcon className={iconClass} />, pressed: active?.numbered, run: () => chain().toggleOrderedList().run() },
            { name: "bulleted", label: "Bulleted list", icon: <BulletIcon className={iconClass} />, pressed: active?.bulleted, run: () => chain().toggleBulletList().run() },
            { name: "link", label: "Link", icon: <LinkIcon className={iconClass} />, pressed: active?.link, run: setLink },
          ],
        ]

  const AlignIcon = active?.align.Icon ?? AlignLeftIcon

  return (
    <TooltipProvider>
      <div
        role="toolbar"
        aria-label="Formatting"
        aria-disabled={disabled || undefined}
        data-slot="editor-toolbar"
        className="flex items-center p-1"
      >
        {controls.map((group, index) => (
          <React.Fragment key={index}>
            {index > 0 && <ToolbarDivider />}
            {group.map((control) => (
              <ToolbarButton
                key={control.name}
                label={control.label}
                pressed={control.pressed}
                disabled={disabled}
                onClick={control.run}
              >
                {control.icon}
              </ToolbarButton>
            ))}
          </React.Fragment>
        ))}

        {kind === "full" && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger
                disabled={disabled}
                render={
                  <button
                    type="button"
                    aria-label={`Align: ${active?.align.label ?? "Left"}`}
                    className="flex h-6 min-w-6 shrink-0 items-center justify-center rounded-md text-secondary-foreground transition-colors not-disabled:hover:bg-secondary disabled:cursor-default data-popup-open:bg-secondary"
                  >
                    <AlignIcon className={iconClass} />
                  </button>
                }
              />
              <DropdownMenuContent align="start" sideOffset={4}>
                {ALIGNS.map((item) => (
                  <DropdownMenuItem
                    key={item.value}
                    onClick={() => chain().setTextAlign(item.value).run()}
                  >
                    <item.Icon className="size-4" />
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <ToolbarDivider />

            {/* Text and Highlight: a 13px label 8 off a 14px swatch of the
                colour in force */}
            <SwatchPopover
              editor={editor}
              label="Text"
              disabled={disabled}
              swatchStyle={
                active?.textColor
                  ? {
                      background: `var(--color-${hue(active.textColor)}-500)`,
                      borderColor: `var(--color-${hue(active.textColor)}-600)`,
                    }
                  : undefined
              }
              swatchClass="border-black/[0.07] bg-border-normal"
            />
            <SwatchPopover
              editor={editor}
              label="Highlight"
              disabled={disabled}
              swatchStyle={
                active?.highlightColor
                  ? {
                      background: `var(--color-${hue(active.highlightColor)}-100)`,
                      borderColor: `var(--color-${hue(active.highlightColor)}-300)`,
                    }
                  : undefined
              }
              swatchClass="border-border-soft bg-background"
            />
          </>
        )}

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            insertImage(event.target.files?.[0])
            event.target.value = ""
          }}
        />
      </div>
    </TooltipProvider>
  )
}

function SwatchPopover({
  editor,
  label,
  disabled,
  swatchStyle,
  swatchClass,
}: {
  editor: TiptapEditor
  label: string
  disabled?: boolean
  swatchStyle?: React.CSSProperties
  swatchClass: string
}) {
  const [open, setOpen] = React.useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        disabled={disabled}
        className={undefined}
        render={
          <button
            type="button"
            aria-label={label === "Text" ? "Text colour" : label}
            onMouseDown={(event) => event.preventDefault()}
            className="flex h-6 shrink-0 items-center justify-center gap-2 rounded-md px-1.5 text-sm text-secondary-foreground transition-colors not-disabled:hover:bg-secondary disabled:cursor-default data-popup-open:bg-secondary"
          >
            <span>{label}</span>
            <span
              className={cn(
                "size-3.5 shrink-0 rounded-sm border",
                !swatchStyle && swatchClass
              )}
              style={swatchStyle}
            />
          </button>
        }
      />
      <PopoverContent align="start" sideOffset={6} className="w-auto p-2">
        <ColorPanel editor={editor} onPick={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  )
}

/* --------------------------------- editor --------------------------------- */

export const editorVariants = cva(
  "relative flex w-full flex-col overflow-hidden rounded-xl transition-[background-color,border-color,box-shadow] duration-150",
  {
    variants: {
      variant: {
        // the Input's outline: a shadow-drawn rule that raises on hover and
        // sharpens with the caret in, under the gray focus ring
        outline:
          "bg-transparent shadow-default transition-shadow not-data-disabled:hover:shadow-raised not-data-disabled:focus-within:shadow-[0px_1px_1px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.1)]! not-data-disabled:focus-within:ring-2 not-data-disabled:focus-within:ring-[rgba(201,201,201,0.9)]",
        // the Input's subtle: filled, a shade darker under the pointer;
        // focused, white under the same rule and ring
        subtle:
          "bg-secondary not-data-disabled:hover:bg-[color-mix(in_oklch,var(--secondary),black_2%)] not-data-disabled:focus-within:bg-background not-data-disabled:focus-within:shadow-[0px_1px_1px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.1)]! not-data-disabled:focus-within:ring-2 not-data-disabled:focus-within:ring-[rgba(201,201,201,0.9)] dark:not-data-disabled:hover:bg-[color-mix(in_oklch,var(--secondary),white_5%)]",
        // the text alone; nothing may clip the floating bar
        ghost: "overflow-visible",
      },
    },
    defaultVariants: { variant: "outline" },
  }
)

const docClassName = cn(
  // the text at 14/21; the space hangs past the line's end and the text
  // reaches 1px into its right padding to take the tracking, as the file
  // counts neither
  "[&_.ProseMirror]:-mr-px [&_.ProseMirror]:min-h-full [&_.ProseMirror]:text-base [&_.ProseMirror]:leading-[1.5] [&_.ProseMirror]:whitespace-pre-wrap [&_.ProseMirror]:outline-none",
  // the placeholder, drawn on a disabled editor too
  "[&_.ProseMirror_p.is-editor-empty:first-child]:before:pointer-events-none [&_.ProseMirror_p.is-editor-empty:first-child]:before:float-left [&_.ProseMirror_p.is-editor-empty:first-child]:before:h-0 [&_.ProseMirror_p.is-editor-empty:first-child]:before:text-muted-foreground [&_.ProseMirror_p.is-editor-empty:first-child]:before:content-[attr(data-placeholder)]",
  // enough of the blocks to see the toolbar work
  "[&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-5 [&_.ProseMirror_ul_ul]:list-[circle] [&_.ProseMirror_ul_ul_ul]:list-[square] [&_.ProseMirror_ul_ul_ul_ul]:list-disc [&_.ProseMirror_ul_ul_ul_ul_ul]:list-[circle] [&_.ProseMirror_ul_ul_ul_ul_ul_ul]:list-[square] [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-5 [&_.ProseMirror_ol_ol]:list-[lower-alpha] [&_.ProseMirror_ol_ol_ol]:list-[lower-roman] [&_.ProseMirror_ol_ol_ol_ol]:list-decimal [&_.ProseMirror_ol_ol_ol_ol_ol]:list-[lower-alpha] [&_.ProseMirror_ol_ol_ol_ol_ol_ol]:list-[lower-roman] [&_.ProseMirror_blockquote]:border-l-2 [&_.ProseMirror_blockquote]:border-border [&_.ProseMirror_blockquote]:pl-3 [&_.ProseMirror_pre]:my-1 [&_.ProseMirror_pre]:rounded-md [&_.ProseMirror_pre]:bg-secondary [&_.ProseMirror_pre]:p-3 [&_.ProseMirror_pre]:font-mono [&_.ProseMirror_pre]:text-sm [&_.ProseMirror_img]:max-w-full [&_.ProseMirror_img]:rounded-md [&_.ProseMirror_a]:text-blue-600 [&_.ProseMirror_a]:underline"
)

const MIN_HEIGHT = 180

export interface EditorProps {
  variant?: "outline" | "subtle" | "ghost"
  toolbar?: "top" | "bottom" | "none"
  disabled?: boolean
  /** what it opens with */
  content?: string
  placeholder?: string
  /** the most characters it holds */
  limit?: number
  className?: string
  onChange?: (html: string) => void
  onComment?: (html: string) => void
  onDiscard?: () => void
  /** the bottom bar's buttons, in place of Discard and Comment */
  actions?: React.ReactNode | ((editor: TiptapEditor) => React.ReactNode)
  /** sizes to its text, up to `maxHeight`, in place of the fixed 180px */
  grow?: boolean
  /** with `grow`, the tallest it gets before it scrolls */
  maxHeight?: number
  /** a key pressed in the text; true takes it from the editor (Enter to send, say) */
  onKeyDown?: (event: KeyboardEvent, editor: TiptapEditor) => boolean | void
  onBlur?: () => void
  /** the text's accessible name */
  label?: string
  /** the editor once it's made, and null when it goes */
  onReady?: (editor: TiptapEditor | null) => void
  /** the bar's buttons: every control, or the comment bar's few; by default, full on top and few at the bottom */
  controls?: "full" | "comment"
  /** a picked image goes here, in place of into the text */
  onImage?: (file: File) => void
}

export function Editor({
  variant = "outline",
  toolbar = "top",
  disabled = false,
  content = "",
  placeholder = "Type something...",
  limit = 450,
  className,
  onChange,
  onComment,
  onDiscard,
  actions,
  grow = false,
  maxHeight = 240,
  onKeyDown,
  onBlur,
  label,
  onReady,
  controls,
  onImage,
}: EditorProps) {
  return (
    <EditorProvider
      extensions={[
        RichTextKit.configure({
          heading: { levels: [1, 2, 3] },
          table: false,
          taskList: false,
          details: false,
          columns: false,
          callout: false,
          attachment: false,
          audio: false,
          embed: false,
          video: false,
          mention: false,
          slashCommands: false,
          fontFamily: false,
          fontSize: false,
          lineHeight: false,
          subscript: false,
          superscript: false,
          tabKeys: false,
          placeholder: { placeholder },
          limit,
        }),
      ]}
      content={content}
      editable={!disabled}
      onUpdate={onChange}
      deps={[limit, placeholder]}
    >
      {(editor) => (
        <EditorField
          editor={editor}
          variant={variant}
          toolbar={toolbar}
          disabled={disabled}
          limit={limit}
          className={className}
          onComment={onComment}
          onDiscard={onDiscard}
          actions={actions}
          grow={grow}
          maxHeight={maxHeight}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          label={label}
          onReady={onReady}
          controls={controls}
          onImage={onImage}
        />
      )}
    </EditorProvider>
  )
}

function EditorField({
  editor,
  variant,
  toolbar,
  disabled,
  limit,
  className,
  onComment,
  onDiscard,
  actions,
  grow,
  maxHeight,
  onKeyDown,
  onBlur,
  label,
  onReady,
  controls,
  onImage,
}: {
  editor: TiptapEditor | null
  variant: "outline" | "subtle" | "ghost"
  toolbar: "top" | "bottom" | "none"
  disabled: boolean
  limit: number
  className?: string
  onComment?: (html: string) => void
  onDiscard?: () => void
  actions?: EditorProps["actions"]
  grow: boolean
  maxHeight: number
  onKeyDown?: EditorProps["onKeyDown"]
  onBlur?: () => void
  label?: string
  onReady?: EditorProps["onReady"]
  controls?: EditorProps["controls"]
  onImage?: EditorProps["onImage"]
}) {
  const [length, setLength] = React.useState(0)
  const [height, setHeight] = React.useState<number | null>(null)
  const boxRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!editor) return
    const track = () => setLength(editor.state.doc.textContent.length)
    editor.on("transaction", track)
    track()
    return () => {
      editor.off("transaction", track)
    }
  }, [editor])

  const remaining = Math.max(0, limit - length)

  // the caller's keys, blur and name, read fresh on each key so they may
  // close over the caller's latest state
  const handlers = React.useRef({ onKeyDown, onBlur })
  React.useEffect(() => {
    handlers.current = { onKeyDown, onBlur }
  })
  React.useEffect(() => {
    if (!editor) return
    editor.setOptions({
      editorProps: {
        ...editor.options.editorProps,
        attributes: {
          ...(editor.options.editorProps.attributes as Record<string, string>),
          ...(label && { "aria-label": label }),
        },
        handleKeyDown: (_view, event) =>
          handlers.current.onKeyDown?.(event, editor) === true,
      },
    })
    const blur = () => handlers.current.onBlur?.()
    editor.on("blur", blur)
    return () => {
      editor.off("blur", blur)
    }
  }, [editor, label])

  React.useEffect(() => {
    onReady?.(editor)
    return () => onReady?.(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor])

  // the resizer: dragged, the editor grows or shrinks, never under 180
  const resize = (event: React.PointerEvent) => {
    if (disabled || !boxRef.current) return
    event.preventDefault()
    const start = event.clientY
    const from = boxRef.current.getBoundingClientRect().height
    const move = (m: PointerEvent) =>
      setHeight(Math.max(MIN_HEIGHT, from + m.clientY - start))
    const up = () => {
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", up)
      document.documentElement.classList.remove("cursor-ns-resize!", "select-none!")
    }
    document.documentElement.classList.add("cursor-ns-resize!", "select-none!")
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", up)
  }

  // a press on the body's own padding puts the caret at the end; one on the
  // text is the editor's
  const focusEnd = (event: React.MouseEvent) => {
    if (!editor || disabled || event.target !== event.currentTarget) return
    event.preventDefault()
    editor.commands.focus("end")
  }

  return (
    <div
      ref={boxRef}
      data-slot="editor"
      data-variant={variant}
      {...(disabled && { "data-disabled": "" })}
      className={cn(
        editorVariants({ variant }),
        toolbar !== "none" && variant !== "ghost" && !grow && height === null && "h-[180px]",
        disabled && "opacity-50",
        className
      )}
      style={height !== null ? { height } : undefined}
    >
      {editor && toolbar === "top" && (
        <div className="flex h-[31px] shrink-0 items-start border-b border-border-soft in-data-[variant=subtle]:border-border px-1 pt-[3px] [&>[data-slot=editor-toolbar]]:p-0">
          <EditorToolbar editor={editor} kind={controls ?? "full"} disabled={disabled} onImage={onImage} />
        </div>
      )}

      <div
        style={grow ? { maxHeight } : undefined}
        className={cn(
          "min-h-0 flex-1 cursor-text overflow-y-auto px-3 py-2",
          // growing, it opens two lines tall
          grow && "min-h-[58px]",
          disabled && "cursor-default",
          variant === "ghost" && "overflow-visible",
          variant === "ghost" &&
            "[&_.ProseMirror_::selection]:bg-amber-100 dark:[&_.ProseMirror_::selection]:bg-amber-900"
        )}
        onMouseDown={focusEnd}
      >
        <EditorContent editor={editor} className={cn("h-full", docClassName)} />
      </div>

      {toolbar === "top" && (
        <>
          <p
            aria-live="polite"
            className="shrink-0 px-3 pt-1.5 pb-[11px] text-[11px] leading-[1.15] text-muted-foreground"
          >
            {remaining} characters remaining
          </p>
          <button
            type="button"
            aria-label="Resize"
            tabIndex={-1}
            disabled={disabled}
            onPointerDown={resize}
            className="absolute right-[3px] bottom-[3px] flex size-3 cursor-ns-resize items-center justify-center text-muted-foreground disabled:cursor-default"
          >
            <ResizerIcon className="size-3" />
          </button>
        </>
      )}

      {editor && toolbar === "bottom" && (
        <div className="flex h-10 shrink-0 items-center justify-between border-t border-border-soft in-data-[variant=subtle]:border-border py-1 pr-2 pl-1">
          <EditorToolbar editor={editor} kind={controls ?? "comment"} disabled={disabled} onImage={onImage} />
          {actions !== undefined ? (
            <div className="flex items-center gap-1.5">
              {typeof actions === "function" ? actions(editor) : actions}
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <Button
                size="xs"
                variant="ghost"
                disabled={disabled}
                onClick={() => {
                  editor.commands.clearContent(true)
                  onDiscard?.()
                }}
              >
                Discard
              </Button>
              <Button
                size="xs"
                disabled={disabled}
                onClick={() => {
                  if (editor.isEmpty) return
                  onComment?.(editor.getHTML())
                  editor.commands.clearContent(true)
                }}
              >
                Comment
              </Button>
            </div>
          )}
        </div>
      )}

      {/* the floating bar rises over a run of text, as the ghost editor's */}
      {editor && variant === "ghost" && (
        <BubbleMenu
          editor={editor}
          options={{ placement: "top", offset: 12 }}
          shouldShow={({ editor: ed, state, from, to }) => {
            const { selection } = state
            if (selection.empty || "node" in selection || !ed.isEditable)
              return false
            return state.doc.textBetween(from, to).length > 0
          }}
          className="z-60"
        >
          <div className="flex h-7 items-center rounded-[10px] bg-card p-0.5 shadow-elevation-lg [&>[data-slot=editor-toolbar]]:p-0">
            <EditorToolbar editor={editor} kind="full" disabled={disabled} />
          </div>
        </BubbleMenu>
      )}
    </div>
  )
}
