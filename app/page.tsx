import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { LogoCarousel } from "@/components/logo-carousel"
import { Awards } from "@/components/awards"
import { Services } from "@/components/services"
import { ERPProcess } from "@/components/erp-process"
import { Differentiators } from "@/components/differentiators"
import { Testimonials } from "@/components/testimonials"
import { CTASection } from "@/components/cta-section"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ScrollProgress } from "@/components/scroll-progress"

export const metadata = {
  title: "Merit Advisory Services | Excellence in ERP & Digital Transformation",
  description: "Simplifying enterprise complexity through expert ERP implementation and strategic digital transformation.",
}

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <LogoCarousel />
        <Awards />
        <Services />
        <ERPProcess />
        <Differentiators />
        <Testimonials />
        <CTASection />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
