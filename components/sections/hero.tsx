import Image from "next/image"

import { Entrance } from "@/components/motion"
import { Container, Section } from "@/components/section"
import { Typography } from "@/components/typography"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import heroPhoto from "@/public/images/hero-flask.webp"

function Hero() {
  return (
    <Section id="top" spacing="sm">
      <Container className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col gap-10">
          <div className="lg:my-auto">
            <Entrance index={0}>
              <Typography variant="eyebrow" className="text-muted-foreground">
                Licensed pharmaceutical wholesale, Louisville, KY
              </Typography>
              <Typography variant="h1" className="mt-4">
                A&nbsp;drug wholesaler you&nbsp;can&nbsp;call by&nbsp;name.
              </Typography>
            </Entrance>
            <Entrance index={1}>
              <Typography variant="lead" className="mt-6 text-muted-foreground">
                Halden Pharma Supply ships brand, generic and OTC products to
                licensed pharmacies, clinics and long-term care facilities in 14
                states. Your account gets one named rep and a phone a person
                answers.
              </Typography>
            </Entrance>
            <Entrance
              index={2}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <a
                href="#contact"
                className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}
              >
                Open a wholesale account
              </a>
              <a
                href="tel:+15025550142"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 px-5 tabular-nums"
                )}
              >
                Call (502) 555-0142
              </a>
            </Entrance>
          </div>
          <Entrance index={3}>
            <Typography variant="small" className="text-muted-foreground">
              Kentucky Board of Pharmacy license no.{" "}
              <span className="font-medium whitespace-nowrap text-foreground tabular-nums">
                WD-20417
              </span>
            </Typography>
          </Entrance>
        </div>

        {/* Not wrapped in Entrance: its opacity start would delay LCP. */}
        <div
          className="photo-frame relative isolate aspect-[5/7] w-full overflow-hidden rounded-3xl sm:aspect-square lg:aspect-auto lg:min-h-[clamp(30rem,calc(100svh-10.5rem),46rem)] dark:brightness-85"
          style={{ "--photo-color": "#c8d8c8" } as React.CSSProperties}
        >
          {/* A tall desktop frame crops the 4:5 photo by height, so it renders wider
              than the frame: sizes follows the photo, not the column. */}
          <Image
            src={heroPhoto}
            alt="Glass laboratory flask of pale golden-green botanical extract on a moss-covered stone, beside a fresh green leaf."
            fill
            sizes="(min-width: 1152px) 590px, (min-width: 1024px) 58vw, 100vw"
            placeholder="blur"
            loading="eager"
            fetchPriority="high"
            className="object-cover object-[50%_60%]"
          />
        </div>
      </Container>
    </Section>
  )
}

export { Hero }
