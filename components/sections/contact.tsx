"use client"

import * as React from "react"
import { CircleAlertIcon, Loader2Icon } from "lucide-react"
import { toast } from "sonner"

import { Container, Section } from "@/components/section"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const documents = [
  "State pharmacy or facility license",
  "DEA registration, if you order controlled products",
  "Resale certificate",
]

const buyerTypes = [
  { value: "independent-pharmacy", label: "Independent pharmacy" },
  { value: "clinic", label: "Clinic" },
  { value: "long-term-care", label: "Long-term care" },
  { value: "other", label: "Other" },
]

function AccountForm() {
  const [buyerType, setBuyerType] = React.useState<string | null>(null)
  const [buyerTypeMissing, setBuyerTypeMissing] = React.useState(false)
  const [pending, setPending] = React.useState(false)
  const buyerTypeTrigger = React.useRef<HTMLButtonElement>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Cmd/Ctrl+Enter calls requestSubmit(), which the disabled button doesn't block.
    if (pending) return

    if (!buyerType) {
      setBuyerTypeMissing(true)
      buyerTypeTrigger.current?.focus()
      return
    }

    const form = event.currentTarget
    setPending(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.success(
      "Application received. Your rep will call you about next steps."
    )
    form.reset()
    setBuyerType(null)
    setPending(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border bg-card p-6 text-card-foreground md:p-8 lg:p-10"
    >
      <FieldGroup>
        <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              name="name"
              autoComplete="name"
              required
              className="h-11"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="business">Business name</FieldLabel>
            <Input
              id="business"
              name="business"
              autoComplete="organization"
              required
              className="h-11"
            />
          </Field>
          <Field data-invalid={buyerTypeMissing}>
            <FieldLabel htmlFor="buyer-type">Buyer type</FieldLabel>
            <Select
              name="buyerType"
              items={buyerTypes}
              value={buyerType}
              onValueChange={(value) => {
                setBuyerType(value)
                setBuyerTypeMissing(false)
              }}
            >
              <SelectTrigger
                ref={buyerTypeTrigger}
                id="buyer-type"
                aria-invalid={buyerTypeMissing}
                aria-describedby={
                  buyerTypeMissing ? "buyer-type-error" : undefined
                }
                className="w-full data-[size=default]:h-11"
              >
                <SelectValue placeholder="Choose one" />
              </SelectTrigger>
              <SelectContent>
                {buyerTypes.map((type) => (
                  <SelectItem
                    key={type.value}
                    value={type.value}
                    className="pointer-coarse:py-3"
                  >
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {buyerTypeMissing && (
              <FieldError
                id="buyer-type-error"
                className="flex items-center gap-1.5"
              >
                <CircleAlertIcon
                  aria-hidden="true"
                  className="size-4 shrink-0"
                />
                Choose a buyer type.
              </FieldError>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="state">State</FieldLabel>
            <Input
              id="state"
              name="state"
              autoComplete="address-level1"
              required
              className="h-11"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              spellCheck={false}
              required
              className="h-11"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="phone">Phone</FieldLabel>
            <Input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              className="h-11"
            />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="message">Message (optional)</FieldLabel>
          <Textarea
            id="message"
            name="message"
            rows={3}
            className="min-h-24"
            placeholder="What you buy most, and who you buy it from now"
            onKeyDown={(event) => {
              if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
                event.currentTarget.form?.requestSubmit()
              }
            }}
          />
        </Field>
        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="h-11 w-full sm:w-auto sm:min-w-44 sm:self-start sm:px-5"
        >
          {pending && <Loader2Icon className="animate-spin" />}
          {pending ? "Sending…" : "Send application"}
        </Button>
      </FieldGroup>
    </form>
  )
}

function Contact() {
  return (
    <Section id="contact" tone="default" spacing="default">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="flex flex-col gap-8 lg:justify-between">
          <div>
            <Typography variant="eyebrow" className="text-muted-foreground">
              Contact
            </Typography>
            <Typography variant="h2" className="mt-3">
              Open a wholesale account
            </Typography>
            <Typography variant="lead" className="mt-4 text-muted-foreground">
              3 business days to approval, once your documents are in.
            </Typography>
          </div>

          <div className="flex flex-col gap-3">
            <Typography
              as="h3"
              variant="small"
              className="font-medium text-muted-foreground"
            >
              Have these ready
            </Typography>
            <ul className="divide-y border-t">
              {documents.map((document) => (
                <Typography as="li" key={document} className="py-2.5">
                  {document}
                </Typography>
              ))}
            </ul>
          </div>

          <div>
            <Typography
              as="h3"
              variant="small"
              className="font-medium text-muted-foreground"
            >
              Rather talk? Call the sales desk
            </Typography>
            <Typography
              as="a"
              variant="h4"
              href="tel:+15025550142"
              className="inline-flex min-h-11 items-center whitespace-nowrap tabular-nums underline decoration-foreground/40 underline-offset-4 transition-colors hover:decoration-current active:decoration-current"
            >
              (502) 555-0142
            </Typography>
            <Typography variant="small" className="text-muted-foreground">
              Monday to Friday, 7:00 am to 7:00 pm ET
            </Typography>
          </div>
        </div>

        <AccountForm />
      </Container>
    </Section>
  )
}

export { Contact }
