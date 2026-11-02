import * as React from "react"

import { LineGrow, Reveal, TraceWipe } from "@/components/motion"
import { Container, Section } from "@/components/section"
import { Typography } from "@/components/typography"
import { cn } from "@/lib/utils"

const quietServices = [
  {
    figure: "3,200",
    name: "Catalog",
    detail:
      "About 3,200 brand, generic and OTC SKUs. We buy only from manufacturers and their authorized distributors.",
  },
  {
    figure: "III to V",
    name: "Controlled substances",
    detail: "Schedules III to V by application. No Schedule II.",
  },
  {
    figure: "Net 30",
    name: "Terms and freight",
    detail:
      "Net 30 after credit approval. $150 minimum order, with free freight over $500.",
  },
  {
    figure: "30 days",
    name: "Returns",
    detail:
      "Send back unopened product within 30 days for credit. Short-dated and recall handling are included.",
  },
]

const readings = [
  5.0, 5.3, 5.5, 5.2, 4.9, 4.6, 4.4, 4.7, 5.0, 5.4, 5.6, 5.3, 5.0, 4.7, 4.5,
  4.3, 4.6, 5.0, 5.2, 5.5, 5.3, 4.9, 4.7, 4.4, 4.6, 4.9, 5.3, 5.7, 5.4, 5.1,
  4.8, 4.5, 4.4, 4.8, 5.1, 5.4, 5.5, 5.2, 4.8, 4.6, 4.3, 4.6, 5.0, 5.3, 5.6,
  5.4, 5.0, 4.8,
]
const lastReading = readings[readings.length - 1]

// The chart runs from 1 to 9 °C, so this is both the SVG y and a percentage of height.
function chartY(celsius: number) {
  return 100 - (celsius - 1) * 12.5
}

const tracePoints = readings
  .map((celsius, index) => {
    const x = (index / (readings.length - 1)) * 480
    return `${x.toFixed(1)},${chartY(celsius)}`
  })
  .join(" ")

// Drawn to look like a data-matrix code and deliberately encodes nothing.
const matrixRows = [
  "1010101010101010",
  "1011111000010011",
  "1100011100111110",
  "1111100100001101",
  "1000100000110100",
  "1011011001000111",
  "1000110001101100",
  "1000010100101101",
  "1001100001010100",
  "1001001010100101",
  "1011001110011110",
  "1101101010010011",
  "1110001000101010",
  "1101001110011111",
  "1010001000110100",
  "1111111111111111",
]

const matrixPath = matrixRows
  .flatMap((row, y) =>
    [...row].map((module, x) => (module === "1" ? `M${x} ${y}h1v1h-1z` : ""))
  )
  .join("")

const sampleFields = [
  { label: "NDC", value: "00000-000-00" },
  { label: "Serial", value: "000000000000" },
  { label: "Lot", value: "000000" },
  { label: "Expiry", value: "MM/YYYY" },
]

function Figure({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      as="p"
      variant="h3"
      className="font-sans font-medium whitespace-nowrap text-primary tabular-nums"
    >
      {children}
    </Typography>
  )
}

function DiagramLabel({
  as = "span",
  className,
  ...props
}: { as?: "span" | "dt" | "dd" } & React.ComponentProps<"span">) {
  return (
    <Typography
      as={as}
      variant="eyebrow"
      className={cn(
        "block font-normal tracking-normal text-muted-foreground tabular-nums normal-case",
        className
      )}
      {...props}
    />
  )
}

function DiagramCard({
  name,
  figure,
  detail,
  diagram,
  index,
  className,
}: {
  name: React.ReactNode
  figure: string
  detail: string
  diagram: React.ReactNode
  index?: number
  className?: string
}) {
  return (
    <Reveal
      as="li"
      index={index}
      className={cn(
        "flex flex-col gap-6 rounded-3xl border bg-card p-6 text-card-foreground sm:col-span-2 md:grid md:grid-cols-[15rem_minmax(0,1fr)] md:gap-8",
        className
      )}
    >
      <div className="flex flex-col gap-1">
        <Typography as="h3" variant="h3">
          {name}
        </Typography>
        <Figure>{figure}</Figure>
        <Typography
          variant="small"
          className="mt-2 text-pretty text-muted-foreground"
        >
          {detail}
        </Typography>
      </div>
      {diagram}
    </Reveal>
  )
}

function TemperatureTrace() {
  const axis = [
    { celsius: 8, emphasis: false },
    { celsius: lastReading, emphasis: true },
    { celsius: 2, emphasis: false },
  ]

  return (
    <div
      role="img"
      aria-label="Illustrative temperature logger trace. Readings hold between 4.3 and 5.7 °C, inside the shaded 2 to 8 °C band."
      className="flex min-h-44 flex-col gap-2"
    >
      <div className="relative flex-1">
        <div className="absolute inset-y-0 right-12 left-0">
          <div className="absolute inset-x-0 top-[12.5%] bottom-[12.5%] border-y border-dashed border-input bg-accent" />
          <TraceWipe>
            <svg
              viewBox="0 0 480 100"
              preserveAspectRatio="none"
              className="absolute inset-0 size-full overflow-visible"
            >
              <polyline
                points={tracePoints}
                vectorEffect="non-scaling-stroke"
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
                className="fill-none stroke-primary"
              />
            </svg>
          </TraceWipe>
          <span
            className="absolute left-full size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
            style={{ top: `${chartY(lastReading)}%` }}
          />
        </div>
        {axis.map(({ celsius, emphasis }) => (
          <DiagramLabel
            key={celsius}
            className={cn(
              "absolute right-0 -translate-y-1/2",
              emphasis && "font-semibold text-primary"
            )}
            style={{ top: `${chartY(celsius)}%` }}
          >
            {celsius} °C
          </DiagramLabel>
        ))}
      </div>
      <DiagramLabel>Illustrative logger trace</DiagramLabel>
    </div>
  )
}

function SampleRecord() {
  return (
    <div
      role="img"
      aria-label="Sample serialized transaction record beside a data-matrix style code. All values are placeholders. The record is kept for 6 years."
      className="flex flex-col gap-3 rounded-xl bg-muted p-4 lg:mt-auto"
    >
      <div className="flex items-end gap-4">
        <svg
          viewBox="0 0 16 16"
          shapeRendering="crispEdges"
          className="size-24 shrink-0 fill-foreground"
        >
          <path d={matrixPath} />
        </svg>
        <div className="flex flex-col gap-0.5">
          <DiagramLabel>Sample record</DiagramLabel>
          <Typography variant="small" className="font-semibold tabular-nums">
            Kept 6 years
          </Typography>
        </div>
      </div>
      <dl className="flex flex-col divide-y divide-input/30">
        {sampleFields.map(({ label, value }) => (
          <div key={label} className="flex justify-between gap-4 py-1">
            <DiagramLabel as="dt">{label}</DiagramLabel>
            <DiagramLabel as="dd" className="text-foreground">
              {value}
            </DiagramLabel>
          </div>
        ))}
      </dl>
    </div>
  )
}

function DeliveryTimeline() {
  return (
    <div
      role="img"
      aria-label="Timeline from the 5:00 pm ET order cutoff to arrival the next business day."
      className="flex flex-col justify-center gap-3"
    >
      <div className="relative h-16 border-x border-dashed border-input bg-accent">
        <LineGrow className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2" />
        <span className="absolute top-1/2 left-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-accent" />
        <span className="absolute top-1/2 right-0 size-3 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
      </div>
      <div className="flex justify-between gap-4">
        <div>
          <Typography variant="small" className="font-semibold tabular-nums">
            5:00 pm ET
          </Typography>
          <DiagramLabel>Order cutoff</DiagramLabel>
        </div>
        <div className="text-right">
          <Typography variant="small" className="font-semibold">
            Next business day
          </Typography>
          <DiagramLabel>Arrival</DiagramLabel>
        </div>
      </div>
    </div>
  )
}

function Services() {
  return (
    <Section id="services" spacing="sm">
      <Container>
        <Typography variant="eyebrow" className="text-muted-foreground">
          Services
        </Typography>
        <Typography variant="h2" className="mt-3">
          Ask any wholesaler for these numbers. Here are ours.
        </Typography>

        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12">
          <DiagramCard
            name="Cold chain"
            figure="2 to 8 °C"
            detail="Refrigerated product is stored at 2 to 8 °C and ships in validated shippers. A temperature logger goes in every refrigerated shipment."
            diagram={<TemperatureTrace />}
            className="lg:col-span-8"
          />
          <DiagramCard
            name="DSCSA traceability"
            figure="6 years"
            detail="Serialized transaction data comes with every shipment, and we keep the records for 6 years."
            diagram={<SampleRecord />}
            index={1}
            className="lg:col-span-4 lg:row-span-2 lg:flex"
          />
          <DiagramCard
            name={
              <>
                <span className="whitespace-nowrap">Next-business-day</span>{" "}
                delivery
              </>
            }
            figure="5:00 pm"
            detail="Order by 5:00 pm ET and it arrives the next business day."
            diagram={<DeliveryTimeline />}
            className="lg:col-span-8"
          />

          {quietServices.map((service, index) => (
            <Reveal
              as="li"
              key={service.name}
              index={index}
              className="flex flex-col gap-1 rounded-3xl border bg-card p-6 text-card-foreground lg:col-span-3"
            >
              <Typography as="h3" variant="h4">
                {service.name}
              </Typography>
              <Figure>{service.figure}</Figure>
              <Typography
                variant="small"
                className="mt-2 text-pretty text-muted-foreground"
              >
                {service.detail}
              </Typography>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

export { Services }
