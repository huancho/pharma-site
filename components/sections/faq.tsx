import { Container, Section } from "@/components/section"
import { Typography } from "@/components/typography"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const questions = [
  {
    question: "What do I need to open an account?",
    answer:
      "A state pharmacy or facility license and a resale certificate. If you plan to order controlled products, add your DEA registration.",
  },
  {
    question: "How long does approval take?",
    answer:
      "3 business days once your documents are in. Terms are Net 30 after credit approval.",
  },
  {
    question: "How do I check that you’re licensed?",
    answer:
      "Our Kentucky wholesale license is no. WD-20417, issued by the Kentucky Board of Pharmacy. Look it up with the board, or ask Dana Whitlock, RPh, our co-founder and designated representative.",
  },
  {
    question: "Do you ship to my state?",
    answer: (
      <>
        We ship to licensed buyers in 14 states. Put your state on the{" "}
        <a href="#contact">form</a> or call the sales desk at{" "}
        <a href="tel:+15025550142" className="whitespace-nowrap">
          (502) 555-0142
        </a>
        , and we’ll tell you.
      </>
    ),
  },
  {
    question: "Is there a minimum order?",
    answer:
      "$150 per order, and freight is free over $500. We don’t push volume minimums on small buyers.",
  },
  {
    question: "What’s the order cutoff?",
    answer:
      "5:00 pm ET for next-business-day delivery. The sales desk is open Monday to Friday, 7:00 am to 7:00 pm ET.",
  },
  {
    question: "Can I order controlled substances?",
    answer:
      "Schedules III to V, by application, with your DEA registration. We don’t carry Schedule II.",
  },
  {
    question: "How do you ship refrigerated product?",
    answer:
      "We store it at 2 to 8 °C and ship it in validated shippers, with a temperature logger in every refrigerated shipment.",
  },
]

function Faq() {
  return (
    <Section id="faq" tone="muted" spacing="default">
      <Container size="sm">
        <Typography variant="eyebrow" className="text-muted-foreground">
          FAQ
        </Typography>
        <Typography variant="h2" className="mt-3">
          What buyers ask before they apply
        </Typography>

        <Accordion
          className="mt-8 border-t border-t-foreground motion-reduce:**:data-[slot=accordion-content]:animate-none"
          defaultValue={[questions[0].question]}
        >
          {questions.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger className="-mx-px rounded-none py-5 underline-offset-4 aria-expanded:pb-2 **:data-[slot=accordion-trigger-icon]:mt-1">
                <Typography as="span" variant="h4" className="pr-4">
                  {item.question}
                </Typography>
              </AccordionTrigger>
              <AccordionContent
                keepMounted
                className="pr-8 pb-5 pointer-coarse:[&_a]:py-3.5"
              >
                <Typography className="text-pretty text-muted-foreground">
                  {item.answer}
                </Typography>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  )
}

export { Faq }
