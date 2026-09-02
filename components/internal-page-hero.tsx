"use client"

import * as React from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ArrowRight, Image as ImageIcon } from "lucide-react"

interface InternalPageHeroProps {
  badge?: string
  title: string
  description?: string
  primaryCTA?: {
    label: string
    href: string
  }
  secondaryCTA?: {
    label: string
    href: string
  }
  visual?: React.ReactNode
  variant?: "split-image" | "split-dashboard" | "full-visual" | "floating-cards"
  className?: string
}

export function InternalPageHero({
  badge,
  title,
  description,
  primaryCTA,
  secondaryCTA,
  visual,
  variant = "split-image",
  className,
}: InternalPageHeroProps) {
  const { ref, isVisible } = useScrollAnimation()

  const renderSplitLayout = () => (
    <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-center">
      {/* Left - Content */}
      <div className="order-2 lg:order-1">
        {badge && (
          <Badge
            variant="outline"
            className={`mb-6 border-primary/30 bg-primary/10 text-primary text-[10px] uppercase tracking-widest font-black transition-all duration-600 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            {badge}
          </Badge>
        )}
        <h1
          className={`text-4xl font-black leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl transition-all duration-600 delay-100 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          {title}
        </h1>
        {description && (
          <p
            className={`mt-6 text-lg text-muted-foreground leading-relaxed transition-all duration-600 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            {description}
          </p>
        )}
        {(primaryCTA || secondaryCTA) && (
          <div
            className={`mt-8 flex flex-wrap gap-4 transition-all duration-600 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            {primaryCTA && (
              <Button
                size="lg"
                className="group rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
                asChild
              >
                <a href={primaryCTA.href}>
                  {primaryCTA.label}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            )}
            {secondaryCTA && (
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-2 border-border bg-background/50 backdrop-blur-sm hover:bg-accent/10 hover:border-primary/30"
                asChild
              >
                <a href={secondaryCTA.href}>{secondaryCTA.label}</a>
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Right - Visual */}
      <div
        className={`relative order-1 lg:order-2 transition-all duration-1000 delay-400 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
      >
        {visual || (
          <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl aspect-square flex items-center justify-center">
            <ImageIcon className="h-24 w-24 text-slate-400" />
          </div>
        )}
      </div>
    </div>
  )

  const renderFullVisualLayout = () => (
    <div className="relative">
      <div className="relative bg-gradient-to-br from-primary to-primary/80 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
        <div className="relative z-10 px-6 py-20 md:py-32 text-center">
          {badge && (
            <Badge
              variant="outline"
              className={`mb-6 border-white/20 bg-white/10 text-white text-[10px] uppercase tracking-widest font-black transition-all duration-600 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            >
              {badge}
            </Badge>
          )}
          <h1
            className={`text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl transition-all duration-600 delay-100 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            {title}
          </h1>
          {description && (
            <p
              className={`mt-6 max-w-2xl mx-auto text-lg text-white/90 leading-relaxed transition-all duration-600 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            >
              {description}
            </p>
          )}
          {(primaryCTA || secondaryCTA) && (
            <div
              className={`mt-8 flex flex-wrap gap-4 justify-center transition-all duration-600 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            >
              {primaryCTA && (
                <Button
                  size="lg"
                  className="group rounded-full bg-white text-primary hover:bg-white/90 shadow-lg"
                  asChild
                >
                  <a href={primaryCTA.href}>
                    {primaryCTA.label}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              )}
              {secondaryCTA && (
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-2 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50"
                  asChild
                >
                  <a href={secondaryCTA.href}>{secondaryCTA.label}</a>
                </Button>
              )}
            </div>
          )}
        </div>
        {visual && (
          <div className="absolute inset-0 opacity-20">{visual}</div>
        )}
      </div>
    </div>
  )

  return (
    <section
      ref={ref}
      className={cn(
        "relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100",
        className
      )}
    >
      {/* Subtle Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #0f172a 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Background Gradient Effects */}
      <div className="absolute top-0 right-0 -mr-32 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[150px]" />
      <div className="absolute bottom-0 left-0 -ml-32 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {variant === "full-visual" ? renderFullVisualLayout() : renderSplitLayout()}
      </div>
    </section>
  )
}
