"use client"

import * as React from "react"
import { MenuIcon, XIcon } from "lucide-react"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from "motion/react"

import { Logo } from "@/components/logo"
import { Container } from "@/components/section"
import { ThemeToggle } from "@/components/theme-toggle"
import { Typography } from "@/components/typography"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const links = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
]

const spiedIds = ["top", ...links.map((link) => link.id)]
const lastId = spiedIds[spiedIds.length - 1]

// The gap between the two keeps the bar from flickering at the boundary.
const condenseAt = 40
const expandAt = 24

// Section's scroll margins land an anchored section's top at 32px at most, so the
// line sits inside the section you jumped to and that's the one that gets marked.
const spyLine = 84

const instantly: Transition = { duration: 0 }
const morph: Transition = { type: "spring", duration: 0.4, bounce: 0 }
const fade: Transition = { duration: 0.18, ease: [0.32, 0.72, 0, 1] }
const phoneEnter: Transition = { ...fade, delay: 0.12 }
const phoneExit: Transition = { duration: 0.1, ease: [0.32, 0.72, 0, 1] }
const activeGlide: Transition = { type: "spring", duration: 0.35, bounce: 0 }
const hoverGlide: Transition = { type: "spring", duration: 0.25, bounce: 0 }
const hoverFade: Transition = { duration: 0.15, ease: [0.32, 0.72, 0, 1] }

function useCondensed() {
  const [condensed, setCondensed] = React.useState(false)

  React.useEffect(() => {
    const sync = () =>
      setCondensed((was) => window.scrollY > (was ? expandAt : condenseAt))

    sync()
    window.addEventListener("scroll", sync, { passive: true })
    return () => window.removeEventListener("scroll", sync)
  }, [])

  return condensed
}

// True until the first frame has passed, so a reload halfway down the page starts
// condensed instead of playing the morph.
function useFirstFrame() {
  const [firstFrame, setFirstFrame] = React.useState(true)

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => setFirstFrame(false))
    return () => cancelAnimationFrame(frame)
  }, [])

  return firstFrame
}

function useActiveSection() {
  const [active, setActive] = React.useState<string | null>(null)

  React.useEffect(() => {
    const sections = spiedIds.flatMap((id) => {
      const section = document.getElementById(id)
      return section ? [section] : []
    })
    const footer = document.querySelector("footer")
    const underLine = new Set<string>()
    let atPageEnd = false
    let lineObserver: IntersectionObserver | undefined

    // With the footer fully in view the page can't scroll further, so a short last
    // section may never reach the line. The footer itself keeps the last section
    // marked, because no spied section is under the line there.
    const publish = () => {
      const current = atPageEnd
        ? lastId
        : spiedIds.findLast((id) => underLine.has(id))
      if (current) setActive(current === "top" ? null : current)
    }

    const watchLine = () => {
      lineObserver?.disconnect()
      underLine.clear()
      lineObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) underLine.add(entry.target.id)
            else underLine.delete(entry.target.id)
          }
          publish()
        },
        {
          rootMargin: `-${spyLine}px 0px ${spyLine + 1 - window.innerHeight}px`,
        }
      )
      for (const section of sections) lineObserver.observe(section)
    }

    const endObserver = new IntersectionObserver(
      ([entry]) => {
        atPageEnd = entry.intersectionRatio >= 0.99
        publish()
      },
      { threshold: 0.99 }
    )

    watchLine()
    if (footer) endObserver.observe(footer)
    window.addEventListener("resize", watchLine)

    return () => {
      window.removeEventListener("resize", watchLine)
      lineObserver?.disconnect()
      endObserver.disconnect()
    }
  }, [])

  return active
}

function DesktopNav({
  active,
  condensed,
  motionFor,
}: {
  active: string | null
  condensed: boolean
  motionFor: (transition: Transition) => Transition
}) {
  // The surface stays mounted on the last link while it fades, and `glide` tells a
  // move between links from a fresh entry, which should appear in place.
  const [hover, setHover] = React.useState<{
    id: string | null
    visible: boolean
    glide: boolean
  }>({ id: null, visible: false, glide: false })

  return (
    <motion.nav
      aria-label="Main"
      layout="position"
      layoutDependency={condensed}
      transition={motionFor(morph)}
      className="hidden items-center md:flex"
      onPointerLeave={() => setHover((was) => ({ ...was, visible: false }))}
    >
      {links.map((link) => {
        const isActive = active === link.id

        return (
          <Typography
            key={link.id}
            as="a"
            variant="small"
            href={`#${link.id}`}
            aria-current={isActive ? "location" : undefined}
            onPointerEnter={(event: React.PointerEvent) => {
              if (event.pointerType !== "mouse") return
              setHover((was) => ({
                id: link.id,
                visible: true,
                glide: was.visible,
              }))
            }}
            className={cn(
              "relative inline-flex h-10 items-center rounded-lg px-3 font-medium whitespace-nowrap transition-[color] duration-150 hover:text-foreground active:text-foreground motion-reduce:transition-none pointer-coarse:h-11",
              isActive ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {hover.id === link.id && (
              <motion.span
                aria-hidden="true"
                layoutId="header-nav-hover"
                initial={hover.glide ? false : { opacity: 0 }}
                animate={{ opacity: hover.visible ? 1 : 0 }}
                transition={{
                  layout: hover.glide ? motionFor(hoverGlide) : instantly,
                  opacity: motionFor(hoverFade),
                }}
                style={{ borderRadius: 10 }}
                className="absolute inset-0 bg-muted"
              />
            )}
            {isActive && (
              <motion.span
                aria-hidden="true"
                layoutId="header-nav-active"
                transition={motionFor(activeGlide)}
                className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-primary"
              />
            )}
            <span className="relative">{link.label}</span>
          </Typography>
        )
      })}
    </motion.nav>
  )
}

function Header() {
  const condensed = useCondensed()
  const active = useActiveSection()
  const firstFrame = useFirstFrame()
  const reducedMotion = useReducedMotion()

  const motionFor = (transition: Transition) =>
    reducedMotion || firstFrame ? instantly : transition

  return (
    // Not Section: its tone paints an opaque background, and this strip has to stay
    // see-through around the floating bar. layoutRoot keeps the layout animations
    // measured against this sticky element rather than the scrolling page.
    <motion.header
      layoutRoot
      className="pointer-events-none sticky top-0 z-40 h-[calc(4rem+env(safe-area-inset-top))] pt-[env(safe-area-inset-top)] md:h-[calc(4.5rem+env(safe-area-inset-top))]"
    >
      <Container className="flex h-full items-center">
        <div
          className={cn(
            "pointer-events-auto relative isolate flex w-full items-center",
            condensed
              ? "h-13 gap-2 pr-1 pl-3 md:mx-auto md:h-14 md:w-fit md:gap-6 md:pr-2 md:pl-4"
              : "h-full gap-8 lg:gap-12"
          )}
        >
          <motion.div
            aria-hidden="true"
            layout
            layoutDependency={condensed}
            initial={false}
            animate={{ opacity: condensed ? 1 : 0 }}
            transition={{ layout: motionFor(morph), opacity: motionFor(fade) }}
            style={{ borderRadius: 18 }}
            className="absolute inset-0 -z-10 border bg-card shadow-lg shadow-black/5"
          />

          <motion.div
            layout="position"
            layoutDependency={condensed}
            transition={motionFor(morph)}
            className="shrink-0"
          >
            {/* A Link to "/" is a no-op on this page: it keeps the scroll position. */}
            <a
              href="#"
              aria-label="Halden Pharma Supply"
              className="relative inline-flex h-11 items-center rounded-lg text-primary"
            >
              <LogoLayer
                visible={!condensed}
                descriptor
                transition={motionFor(fade)}
              />
              <LogoLayer
                visible={condensed}
                descriptor={false}
                transition={motionFor(fade)}
              />
            </a>
          </motion.div>

          <DesktopNav
            active={active}
            condensed={condensed}
            motionFor={motionFor}
          />

          <div
            className={cn(
              "relative ml-auto flex items-center",
              condensed ? "gap-2" : "gap-4"
            )}
          >
            <motion.div
              layout="position"
              layoutDependency={condensed}
              transition={motionFor(morph)}
              className="hidden md:block"
            >
              <ThemeToggle />
            </motion.div>

            <AnimatePresence mode="popLayout" initial={false}>
              {!condensed && (
                <motion.div
                  key="phone"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: motionFor(phoneEnter) }}
                  exit={{ opacity: 0, transition: motionFor(phoneExit) }}
                  className="hidden lg:block"
                >
                  <Typography
                    as="a"
                    variant="small"
                    href="tel:+15025550142"
                    className="inline-flex h-11 items-center font-medium whitespace-nowrap tabular-nums underline-offset-4 hover:underline active:underline"
                  >
                    (502) 555-0142
                  </Typography>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              layout="position"
              layoutDependency={condensed}
              transition={motionFor(morph)}
              className="flex items-center"
            >
              <a
                href="#contact"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "hidden h-10 px-4 md:inline-flex pointer-coarse:h-11"
                )}
              >
                Open an account
              </a>
              <Sheet>
                <SheetTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon-lg"
                      aria-label="Open menu"
                      className={cn(
                        "size-11 md:hidden",
                        !condensed && "-mr-3"
                      )}
                    />
                  }
                >
                  <MenuIcon className="size-5" />
                </SheetTrigger>
                <SheetContent
                  side="right"
                  showCloseButton={false}
                  className="gap-0 overflow-y-auto overscroll-contain pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)]"
                >
                  <div className="flex h-16 shrink-0 items-center justify-between border-b pr-3 pl-6">
                    <SheetTitle>Menu</SheetTitle>
                    <div className="flex items-center">
                      <ThemeToggle />
                      <SheetClose
                        render={
                          <Button
                            variant="ghost"
                            size="icon-lg"
                            aria-label="Close menu"
                            className="size-11"
                          />
                        }
                      >
                        <XIcon className="size-5" />
                      </SheetClose>
                    </div>
                  </div>
                  <nav aria-label="Mobile" className="flex flex-col p-3">
                    {links.map((link) => {
                      const isActive = active === link.id

                      return (
                        <SheetClose
                          key={link.id}
                          nativeButton={false}
                          render={
                            <a
                              href={`#${link.id}`}
                              aria-current={isActive ? "location" : undefined}
                              className={cn(
                                "relative rounded-lg px-3 py-3 hover:bg-muted active:bg-muted",
                                isActive
                                  ? "before:absolute before:inset-y-3 before:left-0 before:w-0.5 before:rounded-full before:bg-primary"
                                  : "text-muted-foreground"
                              )}
                            />
                          }
                        >
                          <Typography as="span" variant="h4">
                            {link.label}
                          </Typography>
                        </SheetClose>
                      )
                    })}
                  </nav>
                  <div className="mt-auto flex flex-col gap-3 px-6 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
                    <SheetClose
                      nativeButton={false}
                      render={
                        <a
                          href="#contact"
                          className={cn(buttonVariants({ size: "lg" }), "h-11")}
                        />
                      }
                    >
                      Open an account
                    </SheetClose>
                    <a
                      href="tel:+15025550142"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "h-11 tabular-nums"
                      )}
                    >
                      Call (502) 555-0142
                    </a>
                  </div>
                </SheetContent>
              </Sheet>
            </motion.div>
          </div>
        </div>
      </Container>
    </motion.header>
  )
}

// Both logos stay mounted and only the visible one takes up width, so the slot gets
// the right size for each state while the two cross-fade on the same left edge.
function LogoLayer({
  visible,
  descriptor,
  transition,
}: {
  visible: boolean
  descriptor: boolean
  transition: Transition
}) {
  return (
    <motion.span
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={transition}
      className={cn(
        "flex",
        !visible && "pointer-events-none absolute top-1/2 left-0 -translate-y-1/2"
      )}
    >
      <Logo descriptor={descriptor} />
    </motion.span>
  )
}

export { Header }
