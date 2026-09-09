"use client"

import * as React from "react"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"
import {
  CodeBlock,
  DocExample,
  DocHeader,
  DocInstall,
  DocPage,
  DocProse,
  DocSection,
  PartsTable,
  PropsTable,
} from "../../_components/doc"

const previewItems = [
  {
    name: "role",
    required: true,
    choices: [
      { value: "designer" },
      { value: "engineer" },
      { value: "other" },
    ],
  },
  { name: "email" },
] as const

function PreviewQuestionnaire() {
  const [result, setResult] = React.useState<string | null>(null)
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Questionnaire
        items={previewItems}
        onSubmit={(event) => {
          event.preventDefault()
          const data = Object.fromEntries(new FormData(event.currentTarget))
          setResult(JSON.stringify(data))
        }}
      >
        <QuestionnaireProgress />
        <QuestionnaireItem name="role" required>
          <QuestionnaireTitle>What best describes your role?</QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="designer">Designer</QuestionnaireChoice>
            <QuestionnaireChoice value="engineer">Engineer</QuestionnaireChoice>
            <QuestionnaireChoice value="other">Other</QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
        <QuestionnaireItem name="email">
          <QuestionnaireTitle>Where can we reach you?</QuestionnaireTitle>
          <QuestionnaireDescription>
            Leave an email if you want to hear about the results.
          </QuestionnaireDescription>
          <QuestionnaireInput type="email" placeholder="you@example.com" />
          <QuestionnaireError />
        </QuestionnaireItem>
        <QuestionnaireActions>
          <QuestionnairePrevious />
          <QuestionnaireSkip />
          <QuestionnaireNext />
          <QuestionnaireSubmit />
        </QuestionnaireActions>
      </Questionnaire>
      {result && (
        <p className="font-mono text-xs text-muted-foreground">{result}</p>
      )}
    </div>
  )
}

const shortcutItems = [
  {
    name: "plan",
    required: true,
    choices: [
      { value: "hobby" },
      { value: "pro" },
      { value: "enterprise", disabled: true },
    ],
  },
] as const

function ShortcutsQuestionnaire() {
  return (
    <div className="w-full max-w-sm">
      <Questionnaire
        items={shortcutItems}
        shortcuts="letters"
        onSubmit={(e) => e.preventDefault()}
      >
        <QuestionnaireItem name="plan" required>
          <QuestionnaireTitle>Choose a plan</QuestionnaireTitle>
          <QuestionnaireDescription>
            Press A or B to answer with the keyboard.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="hobby">
              Hobby
              <QuestionnaireChoiceDescription>
                For personal projects
              </QuestionnaireChoiceDescription>
            </QuestionnaireChoice>
            <QuestionnaireChoice value="pro">
              Pro
              <QuestionnaireChoiceDescription>
                For freelancers and small teams
              </QuestionnaireChoiceDescription>
            </QuestionnaireChoice>
            <QuestionnaireChoice value="enterprise" disabled>
              Enterprise
              <QuestionnaireChoiceDescription>
                Contact sales to enable this plan
              </QuestionnaireChoiceDescription>
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
        <QuestionnaireActions>
          <QuestionnaireSubmit />
        </QuestionnaireActions>
      </Questionnaire>
    </div>
  )
}

const multipleItems = [
  {
    name: "highlights",
    choices: [
      { value: "performance" },
      { value: "design" },
      { value: "docs" },
    ],
  },
] as const

function MultipleQuestionnaire() {
  return (
    <div className="w-full max-w-sm">
      <Questionnaire items={multipleItems} onSubmit={(e) => e.preventDefault()}>
        <QuestionnaireItem name="highlights" multiple>
          <QuestionnaireTitle>What stood out to you?</QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="performance" defaultChecked>
              Performance
            </QuestionnaireChoice>
            <QuestionnaireChoice value="design">Design</QuestionnaireChoice>
            <QuestionnaireChoice value="docs">Documentation</QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
        <QuestionnaireActions>
          <QuestionnaireSkip />
          <QuestionnaireSubmit />
        </QuestionnaireActions>
      </Questionnaire>
    </div>
  )
}

export default function QuestionnaireDocsPage() {
  return (
    <DocPage>
      <DocHeader
        title="Questionnaire"
        description="A multi-step form flow — one question at a time with choices or free text, keyboard shortcuts, validation and skip logic. Built on the @shadcn/react questionnaire primitive."
      />

      <DocSection title="Preview">
        <DocProse>
          The root renders a form and shows one{" "}
          <code>QuestionnaireItem</code> at a time. Enter advances, ⌘Enter
          submits from any step, arrow keys move between questions and
          answers, and required items block Next until answered. Choice
          surfaces sit on <code>bg-card</code> and follow the elevation ladder
          inside cards, dialogs and popovers.
        </DocProse>
        <DocExample
          code={`
const items = [
  {
    name: "role",
    required: true,
    choices: [{ value: "designer" }, { value: "engineer" }, { value: "other" }],
  },
  { name: "email" },
] as const

<Questionnaire items={items} onSubmit={handleSubmit}>
  <QuestionnaireProgress />
  <QuestionnaireItem name="role" required>
    <QuestionnaireTitle>What best describes your role?</QuestionnaireTitle>
    <QuestionnaireChoices>
      <QuestionnaireChoice value="designer">Designer</QuestionnaireChoice>
      <QuestionnaireChoice value="engineer">Engineer</QuestionnaireChoice>
      <QuestionnaireChoice value="other">Other</QuestionnaireChoice>
    </QuestionnaireChoices>
    <QuestionnaireError />
  </QuestionnaireItem>
  <QuestionnaireItem name="email">
    <QuestionnaireTitle>Where can we reach you?</QuestionnaireTitle>
    <QuestionnaireInput type="email" placeholder="you@example.com" />
    <QuestionnaireError />
  </QuestionnaireItem>
  <QuestionnaireActions>
    <QuestionnairePrevious />
    <QuestionnaireSkip />
    <QuestionnaireNext />
    <QuestionnaireSubmit />
  </QuestionnaireActions>
</Questionnaire>`}
        >
          <PreviewQuestionnaire />
        </DocExample>
      </DocSection>

      <DocSection title="Installation">
        <DocInstall name="questionnaire" />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock
          code={`
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"`}
        />
        <DocProse>
          Declare the flow once in <code>items</code> — the same names,
          choices, <code>required</code> and <code>disabled</code> flags as
          the rendered markup. The definition drives keyboard shortcuts and
          validation, and the primitive warns in development when the two
          drift apart.
        </DocProse>
      </DocSection>

      <DocSection title="Keyboard shortcuts">
        <DocProse>
          <code>shortcuts="letters"</code> (or <code>"numbers"</code>) assigns
          each enabled choice a key, shown as a badge at the end of the row.
          Pressing the key selects the choice; disabled choices are skipped
          when assigning.
        </DocProse>
        <DocExample
          code={`
<Questionnaire items={items} shortcuts="letters" onSubmit={handleSubmit}>
  <QuestionnaireItem name="plan" required>
    <QuestionnaireTitle>Choose a plan</QuestionnaireTitle>
    <QuestionnaireChoices>
      <QuestionnaireChoice value="hobby">
        Hobby
        <QuestionnaireChoiceDescription>
          For personal projects
        </QuestionnaireChoiceDescription>
      </QuestionnaireChoice>
      {/* … */}
    </QuestionnaireChoices>
  </QuestionnaireItem>
</Questionnaire>`}
        >
          <ShortcutsQuestionnaire />
        </DocExample>
      </DocSection>

      <DocSection title="Multiple selection">
        <DocProse>
          <code>multiple</code> on an item renders its choices as checkboxes
          instead of radios. Items without <code>required</code> show the Skip
          action automatically.
        </DocProse>
        <DocExample
          code={`
<QuestionnaireItem name="highlights" multiple>
  <QuestionnaireTitle>What stood out to you?</QuestionnaireTitle>
  <QuestionnaireChoices>
    <QuestionnaireChoice value="performance" defaultChecked>
      Performance
    </QuestionnaireChoice>
    <QuestionnaireChoice value="design">Design</QuestionnaireChoice>
    <QuestionnaireChoice value="docs">Documentation</QuestionnaireChoice>
  </QuestionnaireChoices>
</QuestionnaireItem>`}
        >
          <MultipleQuestionnaire />
        </DocExample>
      </DocSection>

      <DocSection title="API reference">
        <PropsTable
          title="Questionnaire"
          rows={[
            {
              prop: "items",
              type: "QuestionnaireItemDefinition[]",
              description:
                "Declarative flow definition: { name, required?, disabled?, choices? } per step. Drives shortcuts, validation and dev-time consistency warnings.",
            },
            {
              prop: "shortcuts",
              type: '"letters" | "numbers"',
              description:
                "Assigns keyboard shortcuts to choices and shows the badge on each row.",
            },
            {
              prop: "defaultItem",
              type: "string",
              description: "Name of the step shown first (uncontrolled).",
            },
            {
              prop: "item",
              type: "string",
              description: "Controlled active step name.",
            },
            {
              prop: "onItemChange",
              type: "(item: string) => void",
              description: "Fires when the active step changes.",
            },
            {
              prop: "onSubmit",
              type: "FormEventHandler",
              description:
                "Standard form submit; every answered step contributes its FormData entries. Invalid steps cancel submission and receive focus.",
            },
          ]}
        />
        <PropsTable
          title="QuestionnaireItem"
          rows={[
            {
              prop: "name",
              type: "string",
              description: "Form field name; must match an items definition.",
            },
            {
              prop: "required",
              type: "boolean",
              defaultValue: "false",
              description:
                "Blocks Next/Submit until answered and hides the Skip action.",
            },
            {
              prop: "multiple",
              type: "boolean",
              defaultValue: "false",
              description: "Checkbox choices instead of radios.",
            },
            {
              prop: "invalid",
              type: "boolean",
              defaultValue: "false",
              description: "Marks the step invalid from consumer validation.",
            },
            {
              prop: "onStatusChange",
              type: "(status) => void",
              description:
                'Reports "unanswered" | "answered" | "skipped" transitions.',
            },
          ]}
        />
        <PartsTable
          rows={[
            {
              part: "QuestionnaireProgress",
              description:
                'Live "Question X of Y" indicator (data-slot="questionnaire-progress") with progressbar semantics.',
            },
            {
              part: "QuestionnaireTitle / QuestionnaireDescription",
              description:
                "Step heading (a fieldset legend) and supporting copy wired to aria-describedby.",
            },
            {
              part: "QuestionnaireChoices / QuestionnaireChoice",
              description:
                'Choice list and card-style rows (data-slot="questionnaire-choice") with the espresso radio/checkbox indicator, elevation-aware background, and an invisible full-cover input.',
            },
            {
              part: "QuestionnaireChoiceDescription",
              description: "Muted second line inside a choice label.",
            },
            {
              part: "QuestionnaireInput",
              description:
                "Free-text answer (text, email, number, date…); filled state feeds validation.",
            },
            {
              part: "QuestionnaireError",
              description:
                "Validation message, auto-worded from required-ness and shown only while invalid.",
            },
            {
              part: "Previous / Skip / Next / Submit",
              description:
                "Espresso Buttons that show and hide themselves: Previous after step one, Skip on optional steps, Next until the last step, Submit on it.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Keyboard">
        <DocProse>
          <code>Enter</code> advances from an answered step, ⌘/Ctrl+
          <code>Enter</code> submits from anywhere, <code>ArrowUp</code>/
          <code>ArrowDown</code> move between answers,{" "}
          <code>ArrowLeft</code>/<code>ArrowRight</code> switch steps, and
          letter or number keys select choices when <code>shortcuts</code> is
          on. Every control carries <code>aria-keyshortcuts</code>, steps
          render as fieldsets with legends, and inactive steps are inert and
          hidden.
        </DocProse>
      </DocSection>
    </DocPage>
  )
}
