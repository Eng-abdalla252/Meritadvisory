"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section className="py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div
          className={`relative overflow-hidden rounded-[2.5rem] bg-navy px-8 py-12 text-center md:px-16 md:py-20 transition-all duration-700 ${
            isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          {/* Decorative elements */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/15" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-accent/10" />
          <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl font-black leading-tight tracking-tight text-navy-foreground text-balance md:text-4xl lg:text-5xl uppercase">
              Ready to Transform Your Enterprise?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-navy-foreground/70 font-medium">
              Schedule a free consultation with our experts and discover how
              Merit Advisory can accelerate your digital transformation journey.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="rounded-full bg-accent px-8 text-accent-foreground shadow-lg shadow-accent/25 hover:bg-accent/90"
                asChild
              >
                <Link href="https://wa.me/16725723750" target="_blank" rel="noopener noreferrer">
                  Book Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-navy-foreground/20 bg-transparent px-8 text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground"
                asChild
              >
                <Link href="https://wa.me/16725723750" target="_blank" rel="noopener noreferrer">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Us Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
