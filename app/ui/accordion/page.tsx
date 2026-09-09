"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-medium text-foreground">{children}</h2>
}

const faq = [
  {
    value: "shipping",
    question: "How long does shipping take?",
    answer:
      "Orders ship within 24 hours and arrive in 3–5 business days. Express delivery arrives the next business day for orders placed before noon.",
  },
  {
    value: "returns",
    question: "What is the return policy?",
    answer:
      "Every purchase can be returned within 30 days in its original condition. Refunds land on the original payment method within a week of us receiving the parcel.",
  },
  {
    value: "warranty",
    question: "Is there a warranty?",
    answer:
      "All products carry a two-year limited warranty covering manufacturing defects. Accidental damage is not covered, but discounted repairs are available.",
  },
]

export default function AccordionPage() {
  return (
    <div className="flex flex-col gap-12 p-8">
      {/* Default */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Default</SectionTitle>
        <Accordion className="w-96" multiple={false}>
          {faq.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Multiple Open */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Multiple Open</SectionTitle>
        <Accordion className="w-96" defaultValue={["shipping", "returns"]}>
          {faq.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Disabled Item */}
      <div className="flex flex-col gap-4">
        <SectionTitle>Disabled Item</SectionTitle>
        <Accordion className="w-96" multiple={false}>
          <AccordionItem value="available">
            <AccordionTrigger>Available question</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                This item opens and closes as usual.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="locked" disabled>
            <AccordionTrigger>Disabled question</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">Never visible.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="after">
            <AccordionTrigger>Another available question</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Keyboard navigation skips the disabled item above.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
