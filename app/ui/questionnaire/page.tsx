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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

function SectionNote({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground">{children}</p>
}

const surveyItems = [
  {
    name: "role",
    required: true,
    choices: [
      { value: "designer" },
      { value: "engineer" },
      { value: "product-manager" },
      { value: "other" },
    ],
  },
  {
    name: "tools",
    choices: [
      { value: "figma" },
      { value: "sketch" },
      { value: "framer" },
      { value: "penpot" },
    ],
  },
  { name: "email" },
] as const

function SurveyExample() {
  const [result, setResult] = React.useState<string | null>(null)

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Questionnaire
        items={surveyItems}
        onSubmit={(event) => {
          event.preventDefault()
          const entries: Record<string, string | string[]> = {}
          for (const [key, value] of new FormData(event.currentTarget)) {
            const previous = entries[key]
            if (previous === undefined) entries[key] = String(value)
            else if (Array.isArray(previous)) previous.push(String(value))
            else entries[key] = [previous, String(value)]
          }
          setResult(JSON.stringify(entries, null, 2))
        }}
      >
        <QuestionnaireProgress />

        <QuestionnaireItem name="role" required>
          <QuestionnaireTitle>What best describes your role?</QuestionnaireTitle>
          <QuestionnaireDescription>
            This helps us tailor the next questions.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="designer">Designer</QuestionnaireChoice>
            <QuestionnaireChoice value="engineer">Engineer</QuestionnaireChoice>
            <QuestionnaireChoice value="product-manager">
              Product manager
            </QuestionnaireChoice>
            <QuestionnaireChoice value="other">Other</QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireItem name="tools" multiple>
          <QuestionnaireTitle>Which design tools do you use?</QuestionnaireTitle>
          <QuestionnaireDescription>
            Pick as many as you like, or skip this question.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="figma">Figma</QuestionnaireChoice>
            <QuestionnaireChoice value="sketch">Sketch</QuestionnaireChoice>
            <QuestionnaireChoice value="framer">Framer</QuestionnaireChoice>
            <QuestionnaireChoice value="penpot">Penpot</QuestionnaireChoice>
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
        <pre className="rounded-lg bg-secondary p-3 text-xs text-secondary-foreground">
          {result}
        </pre>
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
      { value: "team" },
      { value: "enterprise", disabled: true },
    ],
  },
  {
    name: "billing",
    required: true,
    choices: [{ value: "monthly" }, { value: "yearly" }],
  },
] as const

function ShortcutsExample() {
  const [submitted, setSubmitted] = React.useState(false)

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Questionnaire
        items={shortcutItems}
        shortcuts="letters"
        onSubmit={(event) => {
          event.preventDefault()
          setSubmitted(true)
        }}
      >
        <QuestionnaireProgress />

        <QuestionnaireItem name="plan" required>
          <QuestionnaireTitle>Choose a plan</QuestionnaireTitle>
          <QuestionnaireDescription>
            Press A, B or C to answer with the keyboard, Enter to continue.
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
            <QuestionnaireChoice value="team">
              Team
              <QuestionnaireChoiceDescription>
                For growing organisations
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

        <QuestionnaireItem name="billing" required>
          <QuestionnaireTitle>Billing period</QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="monthly">Monthly</QuestionnaireChoice>
            <QuestionnaireChoice value="yearly">
              Yearly
              <QuestionnaireChoiceDescription>
                Two months free
              </QuestionnaireChoiceDescription>
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireActions>
          <QuestionnairePrevious />
          <QuestionnaireSkip />
          <QuestionnaireNext />
          <QuestionnaireSubmit />
        </QuestionnaireActions>
      </Questionnaire>

      {submitted && (
        <p className="text-sm text-muted-foreground">
          Thanks — your plan is saved.
        </p>
      )}
    </div>
  )
}

const feedbackItems = [
  {
    name: "highlights",
    choices: [
      { value: "performance" },
      { value: "design" },
      { value: "docs" },
      { value: "support" },
    ],
  },
] as const

function MultipleChoiceExample() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Questionnaire items={feedbackItems} onSubmit={(e) => e.preventDefault()}>
        <QuestionnaireItem name="highlights" multiple>
          <QuestionnaireTitle>What stood out to you?</QuestionnaireTitle>
          <QuestionnaireDescription>
            A single question with multiple selection — choices render as
            checkboxes.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="performance" defaultChecked>
              Performance
            </QuestionnaireChoice>
            <QuestionnaireChoice value="design">Design</QuestionnaireChoice>
            <QuestionnaireChoice value="docs">Documentation</QuestionnaireChoice>
            <QuestionnaireChoice value="support">Support</QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireActions>
          <QuestionnairePrevious />
          <QuestionnaireSkip />
          <QuestionnaireNext />
          <QuestionnaireSubmit />
        </QuestionnaireActions>
      </Questionnaire>
    </div>
  )
}

export default function QuestionnairePage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Default */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Default</SectionTitle>
        <SectionNote>
          A three-step survey: a required single choice, an optional multiple
          choice and a free-text step. Enter advances, ⌘Enter submits from any
          step, and arrow keys move between questions and answers.
        </SectionNote>
        <SurveyExample />
      </div>

      {/* Keyboard shortcuts */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Keyboard Shortcuts</SectionTitle>
        <SectionNote>
          With <code className="font-mono text-xs">shortcuts=&quot;letters&quot;</code>{" "}
          each enabled choice gets a key badge; pressing it selects the choice.
          Includes choice descriptions and a disabled choice.
        </SectionNote>
        <ShortcutsExample />
      </div>

      {/* Multiple selection */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Multiple Selection</SectionTitle>
        <MultipleChoiceExample />
      </div>
    </div>
  )
}
