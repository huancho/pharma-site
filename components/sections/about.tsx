import Image from "next/image"

import { Reveal } from "@/components/motion"
import { Container, Section } from "@/components/section"
import { Typography } from "@/components/typography"

// Photo: Brecht Corbeel, Unsplash.
const room = {
  src: "https://images.unsplash.com/photo-1791783436957-29290ecdf315?ixid=M3wxMTE4NjM0fDB8MXxzZWFyY2h8Mnx8Y2xlYW4lMjBtb2Rlcm4lMjBsYWJvcmF0b3J5JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzkzNjU5MjU4fDA&ixlib=rb-4.1.0&w=2400&q=80&fm=jpg&fit=max",
  color: "#f3f3f3",
  alt: "Green liquid pouring from a glass beaker into a dish of botanical samples on a white table, in a sage-green room with sample jars on wooden shelves",
}

// Photo: Julia Koblitz, Unsplash.
const hands = {
  src: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?ixid=M3wxMTE4NjM0fDB8MXxzZWFyY2h8MXx8cGhhcm1hY2V1dGljYWwlMjByZXNlYXJjaCUyMHNjaWVudGlzdCUyMGxhYm9yYXRvcnl8ZW58MXx8fHwxNzkzNjU5MjU3fDA&ixlib=rb-4.1.0&w=2400&q=80&fm=jpg&fit=max",
  color: "#f3f3f3",
  alt: "Gloved hands using a pipette to add purple liquid to a small tube above a rack of test tubes",
}

const founders = [
  {
    name: "Dana Whitlock, RPh",
    detail: "Co-founder. Compliance and designated representative.",
  },
  {
    name: "Marcus Oyelaran",
    detail: "Co-founder. Operations.",
  },
]

const factCell =
  "flex flex-col gap-1.5 border-t pt-6 first:border-t-0 first:pt-0 md:border-t-0 md:border-l md:pt-0 md:pl-6 md:first:border-l-0 md:first:pl-0 lg:col-span-3 lg:even:col-span-2"

function About() {
  return (
    <Section id="about" tone="muted" spacing="default">
      {/* One 8-column grid runs through all three rows, so the paragraph, the
          narrow photo and the last fact share a left edge. */}
      <Container className="flex flex-col gap-8">
        <div className="grid gap-4 lg:grid-cols-8 lg:items-end lg:gap-x-6">
          <div className="lg:col-span-5">
            <Typography variant="eyebrow" className="text-muted-foreground">
              About
            </Typography>
            <Typography variant="h2" className="mt-3">
              We&rsquo;re new and we&rsquo;re small. Check our license.
            </Typography>
          </div>
          <Typography className="text-muted-foreground lg:col-span-3">
            Dana Whitlock and Marcus Oyelaran founded Halden Pharma Supply in
            Louisville in 2026. The big three national distributors push volume
            minimums on small buyers. We don&rsquo;t. Every account here gets
            one named rep and a phone a person answers.
          </Typography>
        </div>

        <div className="grid gap-4 lg:h-90 lg:grid-cols-8 lg:gap-x-6">
          <Reveal
            className="photo-frame relative aspect-[3/2] overflow-hidden rounded-3xl sm:aspect-video lg:col-span-5 lg:aspect-auto dark:brightness-85"
            style={{ "--photo-color": room.color } as React.CSSProperties}
          >
            <Image
              src={room.src}
              alt={room.alt}
              fill
              sizes="(min-width: 1024px) 680px, 100vw"
              className="object-cover object-[30%_50%]"
            />
          </Reveal>
          <Reveal
            index={1}
            className="photo-frame relative aspect-square overflow-hidden rounded-3xl sm:aspect-[3/2] lg:col-span-3 lg:aspect-auto dark:brightness-85"
            style={{ "--photo-color": hands.color } as React.CSSProperties}
          >
            {/* Zooming from the bottom edge starts the crop below the person's
                chin. The zoom is why sizes runs wider than the frame. */}
            <Image
              src={hands.src}
              alt={hands.alt}
              fill
              sizes="(min-width: 1024px) 720px, (min-width: 640px) 125vw, 175vw"
              className="origin-bottom scale-125 object-cover object-[100%_100%]"
            />
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-8">
          <div className={factCell}>
            <Typography
              variant="h2"
              as="h3"
              className="flex flex-col gap-1 text-primary tabular-nums"
            >
              <Typography
                variant="eyebrow"
                as="span"
                className="text-muted-foreground"
              >
                License no.
              </Typography>
              WD-20417
            </Typography>
            <Typography
              variant="small"
              className="text-pretty text-muted-foreground"
            >
              Kentucky Board of Pharmacy. We ship to licensed buyers in 14
              states.
            </Typography>
          </div>
          {founders.map((founder) => (
            <div key={founder.name} className={factCell}>
              <Typography variant="h4" as="h3">
                {founder.name}
              </Typography>
              <Typography
                variant="small"
                className="text-pretty text-muted-foreground"
              >
                {founder.detail}
              </Typography>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export { About }
