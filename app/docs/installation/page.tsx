import {
  CodeBlock,
  DocHeader,
  DocPage,
  DocProse,
  DocSection,
} from "../_components/doc"

export default function InstallationDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Installation"
        description="Espresso UI ships as a shadcn registry – components are copied into your project with the shadcn CLI, so you own the code."
      />

      <DocSection title="Prerequisites">
        <DocProse>
          The components target <code>React 19</code> (Next.js 15 or later) and{" "}
          <code>Tailwind CSS v4</code> – the theme relies on v4 features like{" "}
          <code>@theme inline</code> and <code>color-mix()</code>, so it will
          not work on Tailwind v3. The type scale is tuned for the{" "}
          <code>Inter</code> font, so load it in your root layout.
        </DocProse>
      </DocSection>

      <DocSection title="New project">
        <DocProse>
          Run <code>init</code> with the Espresso style. Outside a project, the
          CLI offers to scaffold a fresh Next.js app first, then applies the
          Espresso theme – CSS variables, radius, shadow and text scales – to{" "}
          <code>app/globals.css</code>.
        </DocProse>
        <CodeBlock code="npx shadcn@latest init https://espresso-base-ui.vercel.app/r/espresso-theme.json" />
        <DocProse>
          That is the whole setup – the Inter font and the Button component are
          installed along with the theme. Every other component is one command
          away:
        </DocProse>
        <CodeBlock code="npx shadcn@latest add https://espresso-base-ui.vercel.app/r/dialog.json" />
      </DocSection>

      <DocSection title="Existing project">
        <DocProse>
          In a project that already has React and Tailwind v4, initialize shadcn
          as usual – this creates <code>components.json</code>, the import
          aliases and the <code>cn</code> utility – then add components by URL.
        </DocProse>
        <CodeBlock
          code={`
npx shadcn@latest init
npx shadcn@latest add https://espresso-base-ui.vercel.app/r/dialog.json`}
        />
        <DocProse>
          Every Espresso component depends on the Espresso theme, so adding any
          component also merges the theme tokens into your{" "}
          <code>globals.css</code>. Note: running <code>init</code> with the
          Espresso style URL instead overwrites <code>app/globals.css</code> –
          intended for new projects, so prefer the flow above when you have
          existing styles.
        </DocProse>
      </DocSection>

      <DocSection title="Registry namespace">
        <DocProse>
          Instead of pasting full URLs, register the Espresso registry once in
          your <code>components.json</code>:
        </DocProse>
        <CodeBlock
          code={`
{
  "registries": {
    "@espresso": "https://espresso-base-ui.vercel.app/r/{name}.json"
  }
}`}
        />
        <DocProse>Then add components like first-party shadcn items:</DocProse>
        <CodeBlock code="npx shadcn@latest add @espresso/button @espresso/command @espresso/mobile-shell" />
      </DocSection>

      <DocSection title="What gets installed">
        <DocProse>
          The CLI copies the component source into <code>components/ui/</code>,
          installs its npm dependencies (for example <code>@base-ui/react</code>{" "}
          or <code>cmdk</code>), pulls any registry dependencies it builds on
          (theme, dialog, input group), and vendors shared files such as hooks
          and <code>lib</code> helpers to their expected paths. The code is
          yours to edit – there is no runtime package to upgrade.
        </DocProse>
      </DocSection>

      <DocSection title="Usage">
        <DocProse>
          Import from the local path the CLI wrote to – exactly like shadcn:
        </DocProse>
        <CodeBlock
          code={`
import { Button } from "@/components/ui/button"

export default function Page() {
  return <Button>Get started</Button>
}`}
        />
        <DocProse>
          Each component page documents its parts, props and styling hooks –
          browse the sidebar or press <code>⌘K</code> to search.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
