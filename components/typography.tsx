import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const typographyVariants = cva("[font-synthesis:none]", {
  variants: {
    variant: {
      h1: "font-heading text-4xl leading-[1.08] font-semibold tracking-[-0.012em] text-balance sm:text-5xl lg:text-6xl",
      h2: "font-heading text-3xl leading-[1.14] font-semibold tracking-[-0.008em] text-balance md:text-4xl",
      h3: "font-heading text-xl leading-[1.25] font-semibold text-balance md:text-2xl",
      h4: "font-heading text-lg leading-[1.3] font-semibold text-balance",
      lead: "max-w-prose font-sans text-lg leading-[1.5] text-pretty md:text-xl",
      body: "max-w-prose font-sans text-base leading-[1.6]",
      small: "font-sans text-sm leading-[1.5]",
      eyebrow:
        "font-sans text-xs leading-[1.4] font-semibold tracking-[0.08em] uppercase",
    },
  },
  defaultVariants: {
    variant: "body",
  },
})

type Variant = NonNullable<VariantProps<typeof typographyVariants>["variant"]>

const defaultElement = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  lead: "p",
  body: "p",
  small: "p",
  eyebrow: "p",
} satisfies Record<Variant, React.ElementType>

type TypographyProps<T extends React.ElementType> = {
  as?: T
  variant?: Variant
} & Omit<React.ComponentProps<T>, "as" | "variant">

function Typography<T extends React.ElementType = "p">({
  as,
  variant = "body",
  className,
  ...props
}: TypographyProps<T>) {
  const Component: React.ElementType = as ?? defaultElement[variant]

  return (
    <Component
      data-slot="typography"
      data-variant={variant}
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Typography }
