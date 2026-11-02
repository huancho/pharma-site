import { Logo } from "@/components/logo"
import { Container, Section } from "@/components/section"
import { Typography } from "@/components/typography"

const sectionLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
]

const unsplashParams = "utm_source=proposal_demo&utm_medium=referral"

const unsplashProfile = (username: string) =>
  `https://unsplash.com/@${username}?${unsplashParams}`

const focusClass = "focus-visible:outline-band-foreground"

const touchClass =
  "pointer-coarse:inline-flex pointer-coarse:min-h-11 pointer-coarse:min-w-11 pointer-coarse:items-center pointer-coarse:justify-center"

const linkClass = `${focusClass} ${touchClass} underline decoration-band-foreground/40 underline-offset-4 transition-colors hover:text-band-foreground hover:decoration-current active:decoration-current`

const mutedClass = "text-band-foreground/70"

function Footer() {
  return (
    <Section as="footer" tone="primary" spacing="sm">
      <Container className="flex flex-col gap-10">
        <div className="grid items-end gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          <Logo className="text-5xl lg:col-span-2 lg:text-6xl" />

          <nav aria-label="Footer" className="lg:col-span-2">
            <Typography
              as="ul"
              variant="small"
              className="flex flex-wrap gap-x-6 pointer-coarse:-my-3"
            >
              {sectionLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`${focusClass} ${touchClass} text-band-foreground/80 underline-offset-4 transition-colors hover:text-band-foreground hover:underline active:text-band-foreground active:underline`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </Typography>
          </nav>
        </div>

        <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Typography as="dt" variant="eyebrow" className={mutedClass}>
              Address
            </Typography>
            <Typography as="dd" variant="small">
              4100 Produce Road, Suite 200
              <br />
              Louisville, KY 40218
            </Typography>
          </div>
          <div className="flex flex-col gap-2">
            <Typography as="dt" variant="eyebrow" className={mutedClass}>
              Sales desk
            </Typography>
            <Typography
              as="dd"
              variant="small"
              className="flex flex-col items-start pointer-coarse:-my-3"
            >
              <a href="tel:+15025550142" className={`${linkClass} tabular-nums`}>
                (502) 555-0142
              </a>
              <a href="mailto:accounts@haldenpharma.com" className={linkClass}>
                accounts@haldenpharma.com
              </a>
            </Typography>
          </div>
          <div className="flex flex-col gap-2">
            <Typography as="dt" variant="eyebrow" className={mutedClass}>
              Hours
            </Typography>
            <Typography as="dd" variant="small" className="tabular-nums">
              Monday to Friday
              <br />
              7:00 am to 7:00 pm ET
            </Typography>
          </div>
          <div className="flex flex-col gap-2">
            <Typography as="dt" variant="eyebrow" className={mutedClass}>
              License
            </Typography>
            <Typography as="dd" variant="small">
              Kentucky Board of Pharmacy
              <br />
              License no. WD-20417
            </Typography>
          </div>
        </dl>

        <div
          className={`grid gap-x-8 gap-y-2 border-t border-band-foreground/20 pt-6 sm:grid-cols-2 lg:grid-cols-4 pointer-coarse:gap-y-0 ${mutedClass}`}
        >
          <Typography variant="small">© 2026 Halden Pharma Supply.</Typography>
          <Typography variant="small" className="text-pretty lg:col-span-2">
            Photos by{" "}
            <a href={unsplashProfile("mavishopper")} className={linkClass}>
              Mavis Hopper
            </a>
            ,{" "}
            <a href={unsplashProfile("brechtcorbeel")} className={linkClass}>
              Brecht Corbeel
            </a>{" "}
            and{" "}
            <a href={unsplashProfile("jkoblitz")} className={linkClass}>
              Julia Koblitz
            </a>{" "}
            on{" "}
            <a
              href={`https://unsplash.com/?${unsplashParams}`}
              className={linkClass}
            >
              Unsplash
            </a>
            .
          </Typography>
          <Typography variant="small" className="sm:col-start-2 lg:col-start-4">
            <a
              href="https://www.linkedin.com/company/halden-pharma-supply"
              className={linkClass}
            >
              LinkedIn
            </a>
          </Typography>
        </div>
      </Container>
    </Section>
  )
}

export { Footer }
