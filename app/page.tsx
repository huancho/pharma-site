import { About } from "@/components/sections/about"
import { Contact } from "@/components/sections/contact"
import { Faq } from "@/components/sections/faq"
import { Footer } from "@/components/sections/footer"
import { Header } from "@/components/sections/header"
import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { Typography } from "@/components/typography"

export default function Page() {
  return (
    <>
      <Typography
        as="a"
        variant="small"
        href="#main"
        className="sr-only rounded-lg bg-primary font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:inline-flex focus:h-11 focus:items-center focus:px-5"
      >
        Skip to content
      </Typography>
      <Header />
      <main id="main" className="scroll-mt-20">
        <Hero />
        <About />
        <Services />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
