"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What ERP systems do you implement?",
    answer:
      "We specialize in implementing Odoo, SAP Business One, Microsoft Dynamics 365, Oracle NetSuite, and other leading ERP platforms. Our certified consultants assess your needs and recommend the best-fit solution for your organization's scale and industry.",
  },
  {
    question: "How long does an ERP implementation typically take?",
    answer:
      "Implementation timelines vary by scope and complexity. A standard Odoo implementation for a mid-size business typically takes 3-6 months. Enterprise-wide multi-module deployments across multiple locations can take 6-12 months. We provide a detailed timeline during the discovery phase.",
  },
  {
    question: "Do you offer ongoing support after implementation?",
    answer:
      "Absolutely. We provide tiered support packages including 24/7 monitoring, user training, system optimization, bug fixes, feature enhancements, and dedicated account management to ensure long-term success and maximum ROI.",
  },
  {
    question: "What industries do you serve?",
    answer:
      "We serve a wide range of industries including manufacturing, healthcare, financial services, retail & e-commerce, education, real estate, logistics, and agriculture. Each engagement is tailored with industry-specific modules and best practices.",
  },
  {
    question: "Can you help migrate data from our legacy systems?",
    answer:
      "Yes, data migration is a core part of our implementation process. We handle end-to-end data extraction, cleansing, mapping, transformation, and validation to ensure a smooth transition from your legacy systems with zero data loss.",
  },
  {
    question: "What makes Merit Advisory different from other consultants?",
    answer:
      "We combine deep technical expertise with real business acumen. Our team includes certified Odoo Gold Partners, former CFOs, and enterprise architects. We embed within your teams, deliver measurable outcomes, and maintain a 98% client satisfaction rate.",
  },
  {
    question: "Is Odoo suitable for large enterprises?",
    answer:
      "Yes, Odoo has evolved into a robust enterprise platform that supports complex multi-company, multi-currency, and multi-location operations. With proper customization and infrastructure planning, Odoo scales to thousands of concurrent users across global operations.",
  },
]

export function FAQ() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="faq" className="py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p
              className={`mb-3 text-sm font-semibold uppercase tracking-widest text-accent transition-all duration-600 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              FAQ
            </p>
            <h2
              className={`text-3xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl transition-all duration-600 delay-100 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              Frequently Asked Questions
            </h2>
            <p
              className={`mt-4 text-lg text-muted-foreground transition-all duration-600 delay-200 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              Everything you need to know about our services, process, and how
              we deliver results for enterprises.
            </p>
          </div>

          <div
            className={`lg:col-span-3 transition-all duration-700 delay-300 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-border"
                >
                  <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:text-primary hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
