"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useCounter } from "@/hooks/use-counter"
import { useState, useEffect } from "react"

const stats = [
  { value: 350, suffix: "+", label: "Successful Projects" },
  { value: 800, suffix: "+", label: "Enterprise Clients" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
]

const heroWords = ["Digital Innovation", "ERP Solutions", "Business Growth", "Smart Automation"]

function StatCounter({
  value,
  suffix,
  label,
  isVisible,
}: {
  value: number
  suffix: string
  label: string
  isVisible: boolean
}) {
  const count = useCounter(value, 2000, isVisible)

  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-navy-foreground md:text-4xl">
        <span className="text-accent">{count}</span>
        {suffix}
      </div>
      <div className="mt-1 text-sm text-navy-foreground/60">{label}</div>
    </div>
  )
}

export function Hero() {
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation(0.3)
  const [wordIndex, setWordIndex] = useState(0)
  const [settings, setSettings] = useState<any>(null)

  useEffect(() => {
    fetch("/data/settings.json")
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(() => {})

    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % heroWords.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const content = settings?.hero || {
    title: "Transforming Enterprises Through",
    subtitle: "We partner with forward-thinking organizations to implement world-class ERP solutions, modernize accounting systems, and drive end-to-end digital transformation.",
    ctaText: "Book a Free Consultation",
    secondaryCtaText: "Explore Services"
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#d2d2d2] text-[#1f2933]">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, #0f55ba 0%, #c11e1e 100%)",
          }}
        />
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" stroke="#000000" strokeWidth="0.1" />
        </svg>
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-[15%] h-72 w-72 animate-pulse rounded-full bg-[#0f55ba]/10 blur-3xl" />
        <div className="absolute right-[10%] bottom-1/3 h-96 w-96 animate-pulse rounded-full bg-[#c11e1e]/5 blur-3xl" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 pt-24 pb-16 text-center">


        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1f2933]/15 bg-white/50 px-4 py-2 text-xs font-bold text-[#1f2933]/90 backdrop-blur-sm uppercase tracking-wider">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Leading ERP & Digital Transformation Consultants
        </div>

        <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-[#1f2933] text-balance md:text-5xl lg:text-6xl">
          {content.title.includes("Through") ? (
            <>
              {content.title.split("Through")[0]} Through{" "}
              <span className="relative inline-block">
                <span
                  key={wordIndex}
                  className="animate-fade-in bg-gradient-to-r from-[#0f55ba] to-[#c11e1e] bg-clip-text text-transparent"
                >
                  {heroWords[wordIndex]}
                </span>
              </span>
            </>
          ) : content.title}
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#4b5563] text-balance md:text-lg font-medium">
          {content.subtitle}
        </p>

        {/* Trust badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[#4b5563]">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            Odoo Gold Partner
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            ISO 27001 Certified
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            CMMI Level 3
          </span>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="rounded-full bg-accent px-8 text-accent-foreground shadow-lg shadow-accent/25 hover:bg-accent/90"
            asChild
          >
            <Link href={`https://wa.me/${settings?.contact?.whatsapp || "16725723750"}`} target="_blank" rel="noopener noreferrer">
              {content.ctaText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-[#1f2933]/20 bg-white/20 px-8 text-[#1f2933] hover:bg-white/40 hover:text-[#1f2933]"
            asChild
          >
            <Link href="#services">
              <Play className="mr-2 h-4 w-4" />
              {content.secondaryCtaText}
            </Link>
          </Button>
        </div>

        {/* Stats bar */}
        <div
          ref={statsRef}
          className="mt-20 grid w-full max-w-4xl grid-cols-2 gap-8 rounded-2xl border border-[#1f2933]/10 bg-white/30 p-8 backdrop-blur-md md:grid-cols-4"
        >
          {stats.map((stat) => (
            <StatCounter
              key={stat.label}
              {...stat}
              isVisible={statsVisible}
            />
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t from-background to-transparent opacity-20" />
    </section>
  )
}
