import { cn } from "@/lib/utils"

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 26 24"
      fill="currentColor"
      aria-hidden="true"
      className={cn("aspect-[13/12] h-8 w-auto shrink-0", className)}
    >
      <path d="M1.25 0H6.75A1.25 1.25 0 0 1 8 1.25V8.579A4.8 4.8 0 0 0 8 17.646V22.75A1.25 1.25 0 0 1 6.75 24H1.25A1.25 1.25 0 0 1 0 22.75V1.25A1.25 1.25 0 0 1 1.25 0ZM24.75 24H19.25A1.25 1.25 0 0 1 18 22.75V15.421A4.8 4.8 0 0 0 18 6.354V1.25A1.25 1.25 0 0 1 19.25 0H24.75A1.25 1.25 0 0 1 26 1.25V22.75A1.25 1.25 0 0 1 24.75 24ZM11.407 9.363L8.649 10.259A3 3 0 0 0 10.503 15.966L13.261 15.069ZM14.593 14.637L17.351 13.741A3 3 0 0 0 15.497 8.034L12.739 8.931Z" />
    </svg>
  )
}

function Logo({
  className,
  descriptor = true,
}: {
  className?: string
  descriptor?: boolean
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-2xl [font-synthesis:none]",
        descriptor ? "gap-[0.46em]" : "gap-[0.42em]",
        className
      )}
    >
      <LogoMark className={descriptor ? "h-[1.5em]" : "h-[1.18em]"} />
      <span className="flex flex-col whitespace-nowrap">
        <span className="font-heading leading-none font-semibold tracking-[-0.008em]">
          Halden
        </span>
        {descriptor && (
          <span className="mt-[0.42em] font-sans text-[0.46em] leading-none opacity-80">
            Pharma Supply
          </span>
        )}
      </span>
    </span>
  )
}

export { Logo }
