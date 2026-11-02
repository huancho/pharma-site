"use client"

import * as React from "react"
import { motion, useReducedMotion, type Transition } from "motion/react"

import { cn } from "@/lib/utils"

const staggerStepMs = 60

// Motion's copy of --ease-entrance.
const ease = [0.25, 0.1, 0, 1] as const
const instantly: Transition = { duration: 0 }
const diagramDelay = 0.12

// The resting state is the visible one: these keyframes only add a start pose, so
// content shows without JavaScript, and reduced motion simply skips the animation.
function Entrance({
  index = 0,
  className,
  style,
  ...props
}: { index?: number } & React.ComponentProps<"div">) {
  return (
    <div
      className={cn("motion-safe:animate-entrance", className)}
      style={{ animationDelay: `${index * staggerStepMs}ms`, ...style }}
      {...props}
    />
  )
}

// Everything renders visible and is only hidden once the observer's first reading
// says it is still below the fold, so content shows without JavaScript or if the
// observer never reports, and anything already on screen stays put. Reduced motion
// never hides anything. The trigger is the element's top edge crossing a line rather
// than an amount of its area, which a tall card on a phone may never reach.
function useHiddenUntilSeen<Target extends Element>() {
  const ref = React.useRef<Target>(null)
  const reduced = useReducedMotion()
  const [hidden, setHidden] = React.useState(false)

  React.useEffect(() => {
    const target = ref.current
    if (!target || reduced) return

    let waiting = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (waiting) {
          if (!entry.isIntersecting) return
          setHidden(false)
          observer.disconnect()
        } else if (entry.boundingClientRect.top < window.innerHeight) {
          observer.disconnect()
        } else {
          waiting = true
          setHidden(true)
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [reduced])

  return [ref, hidden && !reduced] as const
}

function Reveal({
  as = "div",
  index = 0,
  className,
  ...props
}: {
  as?: "div" | "li"
  index?: number
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}) {
  const [ref, hidden] = useHiddenUntilSeen<HTMLDivElement & HTMLLIElement>()
  const Element = motion[as]

  return (
    <Element
      ref={ref}
      initial={false}
      animate={hidden ? { opacity: 0, y: 8 } : { opacity: 1, y: 0 }}
      transition={
        hidden
          ? instantly
          : { duration: 0.35, ease, delay: (index * staggerStepMs) / 1000 }
      }
      className={cn("print:opacity-100!", className)}
      {...props}
    />
  )
}

// A left-to-right wipe rather than a drawn dash: the trace uses a non-scaling
// stroke, which makes browsers measure dashes in screen pixels, so a dash-drawn
// line stops short whenever the chart is wider than its viewBox. The -2% leaves room
// for the stroke's round caps. The outer element is the one observed, because the
// inner one has no visible area until the wipe starts.
function TraceWipe({ children }: { children: React.ReactNode }) {
  const [ref, hidden] = useHiddenUntilSeen<HTMLDivElement>()

  return (
    <div ref={ref} className="absolute inset-0">
      <motion.div
        initial={false}
        animate={{
          clipPath: hidden
            ? "inset(0% 102% 0% -2%)"
            : "inset(0% -2% 0% -2%)",
        }}
        transition={
          hidden ? instantly : { duration: 0.9, ease, delay: diagramDelay }
        }
        className="absolute inset-0 print:[clip-path:none]!"
      >
        {children}
      </motion.div>
    </div>
  )
}

// Same outer and inner split as TraceWipe: a scaleX(0) element has no area to observe.
function LineGrow({ className }: { className?: string }) {
  const [ref, hidden] = useHiddenUntilSeen<HTMLDivElement>()

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={false}
        animate={{ scaleX: hidden ? 0 : 1 }}
        transition={
          hidden ? instantly : { duration: 0.45, ease, delay: diagramDelay }
        }
        className="size-full origin-left bg-primary print:transform-none!"
      />
    </div>
  )
}

export { Entrance, LineGrow, Reveal, TraceWipe }
