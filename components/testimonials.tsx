"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Star } from "lucide-react"

const testimonials = [
  {
    quote:
      "Merit Advisory transformed our entire operation. Their ERP implementation was seamless and the results exceeded every expectation we had.",
    author: "Sarah Chen",
    role: "CTO, Apex Manufacturing",
    rating: 5,
  },
  {
    quote:
      "The team at Merit brought a level of expertise and professionalism that is unmatched. Our accounting modernization project was completed ahead of schedule.",
    author: "James Rodriguez",
    role: "CFO, Pacific Financial Group",
    rating: 5,
  },
  {
    quote:
      "Working with Merit Advisory has been a game-changer for our digital strategy. They truly understand the complexities of enterprise transformation.",
    author: "Amara Okafor",
    role: "VP of Operations, NovaTech Retail",
    rating: 5,
  },
  {
    quote:
      "From day one, Merit was a true partner. Their Odoo implementation for our logistics network has been flawless and highly effective.",
    author: "David Kim",
    role: "CEO, GlobalShip Logistics",
    rating: 5,
  },
]

export function Testimonials() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section className="bg-card py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className={`mb-3 text-sm font-semibold uppercase tracking-widest text-accent transition-all duration-600 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Client Testimonials
          </p>
          <h2
            className={`text-3xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl transition-all duration-600 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Trusted by Industry Leaders
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial, i) => (
            <div
              key={testimonial.author}
              className={`rounded-2xl border border-border bg-background p-8 transition-all duration-500 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: isVisible ? `${200 + i * 100}ms` : "0ms" }}
            >
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-accent text-accent"
                  />
                ))}
              </div>
              <blockquote className="mt-4 text-lg leading-relaxed text-foreground">
                {`"${testimonial.quote}"`}
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {testimonial.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
