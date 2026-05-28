"use client"

import * as React from "react"
import { useState } from "react"
import { toast } from "sonner"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Building2, Globe, MessageCircle } from "lucide-react"

const regionalCoverage = {
  countries: [
    "Somalia", "Kenya", "Ethiopia", "Uganda",
    "Tanzania", "Rwanda", "Burundi", "South Sudan",
    "Mozambique", "Zambia", "Congo (DRC)"
  ],
  stats: "Serving 500+ clients across 11 countries with 4 strategic physical offices."
}

const offices = [
  {
    city: "Mogadishu",
    region: "Head Office",
    address: "407 - Waaberi Mall, Waberi District, Mogadishu, Somalia",
    phones: ["+252 61 3294814", "+252 61 5424921"],
    email: "info@meritadvisory.so",
    color: "from-[#0f55ba] to-[#c11e1e]",
  },
  {
    city: "Garowe",
    region: "Puntland Office",
    address: "Along 30th Avenue\nNear Globle Rd Junction, Garowe",
    phones: ["+252 907795588", "+252 906795155"],
    email: "info@meritadvisory.so",
    color: "from-[#c11e1e] to-[#0f55ba]",
  },
  {
    city: "Hargeisa",
    region: "Somaliland Office",
    address: "404 - Burj Omaar\n26 June District, Hargeisa - Somaliland",
    phones: ["+252 65 9006000", "+252 63 8538888"],
    email: "info@meritadvisory.so",
    color: "from-[#0f55ba] to-[#c11e1e]",
  },
  {
    city: "Bosaso",
    region: "Puntland Office",
    address: "Israac Building, Airport Road\nBosaso, PL, Somalia",
    phones: ["+252 906795420"],
    email: "info@meritadvisory.so",
    color: "from-[#c11e1e] to-[#0f55ba]",
  },
]

export function Contact() {
  const { ref, isVisible } = useScrollAnimation()
  const { ref: officesRef, isVisible: officesVisible } = useScrollAnimation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [requestType, setRequestType] = useState<"sales" | "support">("sales")
  const [settings, setSettings] = useState<any>(null)

  React.useEffect(() => {
    fetch("/data/settings.json")
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(() => {})
  }, [])

  const contactData = settings?.contact || {
    email: "info@meritadvisory.so",
    phone: "+1 672-572-3750",
    phone: "+252 906795155",
    whatsapp: "16725723750"
  }

  const generalContact = [
    {
      icon: Mail,
      label: "Email",
      value: contactData.email,
      href: `mailto:${contactData.email}`,
    },
    {
      icon: Phone,
      label: "Phone (Main)",
      value: contactData.phone,
      href: `tel:${contactData.phone.replace(/\s+/g, '')}`,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Chat with us",
      href: `https://wa.me/${contactData.whatsapp}`,
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: "Sat - Thu: 8:00 AM - 5:00 PM EAT\nFriday: Closed",
    },
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      const response = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          type: "contact",
          category: requestType,
          customerName: `${data.firstName} ${data.lastName}`,
          companyName: data.company,
          message: data.message,
          subject: `Website ${requestType === "sales" ? "Inquiry" : "Support Request"}`
        }),
      })

      if (response.ok) {
        toast.success(requestType === "sales"
          ? "Message sent to our Odoo Sales team!"
          : "Support ticket created in our Odoo Helpdesk.")
          ; (e.target as HTMLFormElement).reset()
      } else {
        toast.error("Odoo connection error. Please try again later.")
      }
    } catch (error) {
      toast.error("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p
            className={`mb-3 text-sm font-semibold uppercase tracking-widest text-accent transition-all duration-600 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
          >
            Get In Touch
          </p>
          <h2
            className={`text-3xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl transition-all duration-600 delay-100 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
          >
            {"Let's Start a Conversation"}
          </h2>
          <p
            className={`mt-4 text-lg text-muted-foreground transition-all duration-600 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
          >
            Ready to explore how we can help? Reach out for sales or technical support.
          </p>
        </div>

        {/* Our Offices Section */}
        <div ref={officesRef} className="mt-16">
          <div className="mb-8 text-center">
            <h3
              className={`text-2xl font-bold text-foreground md:text-3xl transition-all duration-600 ${officesVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
            >
              Our Offices Across Somalia
            </h3>
            <p
              className={`mt-2 text-muted-foreground transition-all duration-600 delay-100 ${officesVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
            >
              We're proud to serve clients from 4 strategic locations
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {offices.map((office, i) => (
              <Card
                key={office.city}
                className={`group relative overflow-hidden p-6 transition-all duration-600 hover:-translate-y-2 hover:shadow-xl ${officesVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                {/* Gradient top border */}
                <div className={`absolute left-0 right-0 top-0 h-1 bg-gradient-to-r ${office.color}`} />

                {/* Glow effect */}
                <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${office.color} opacity-0 blur-3xl transition-opacity group-hover:opacity-20`} />

                {/* Icon */}
                <div className={`relative mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${office.color} text-white shadow-lg`}>
                  <Building2 className="h-6 w-6" />
                </div>

                {/* Content */}
                <div className="relative">
                  <h4 className="text-xl font-bold text-foreground">{office.city}</h4>
                  <p className="text-xs text-muted-foreground">{office.region}</p>

                  <div className="mt-4 space-y-3">
                    {/* Address */}
                    <div className="flex gap-2">
                      <MapPin className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                      <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                        {office.address}
                      </p>
                    </div>

                    {/* Phones */}
                    <div className="flex gap-2">
                      <Phone className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                      <div className="text-sm text-muted-foreground">
                        {office.phones.map((phone, idx) => (
                          <a
                            key={idx}
                            href={`tel:${phone}`}
                            className="block hover:text-primary transition-colors"
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex gap-2">
                      <Mail className="h-4 w-4 shrink-0 text-muted-foreground mt-0.5" />
                      <a
                        href={`mailto:${office.email}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {office.email}
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="mt-20 grid gap-12 lg:grid-cols-5">
          {/* General Contact Info */}
          <div
            className={`flex flex-col gap-6 lg:col-span-2 transition-all duration-700 ${isVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-8 opacity-0"
              }`}
          >
            <h3 className="text-xl font-bold text-foreground">General Inquiries</h3>
            {generalContact.map((info) => (
              <div key={info.label} className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <info.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {info.label}
                  </p>
                  {info.href ? (
                    <a
                      href={info.href}
                      target={info.href.startsWith("http") ? "_blank" : undefined}
                      rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="mt-1 block text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm text-muted-foreground whitespace-pre-line">
                      {info.value}
                    </p>
                  )}
                </div>
              </div>
            ))}

            <div className="mt-4 border-t border-border pt-8">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Regional Coverage</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Serving 11 countries across East, Central, and Southern Africa.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
                    {regionalCoverage.countries.map((country) => (
                      <div key={country} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                        <span className="text-xs font-medium text-foreground">{country}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-200 ${isVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-8 opacity-0"
              }`}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border bg-card p-8 shadow-sm"
            >
              <div className="mb-8 flex flex-col gap-4">
                <h3 className="text-xl font-bold text-foreground">Send Us a Message</h3>
                <div className="flex p-1 bg-muted rounded-full w-fit">
                  <button
                    type="button"
                    onClick={() => setRequestType("sales")}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${requestType === "sales" ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    Sales Inquiry
                  </button>
                  <button
                    type="button"
                    onClick={() => setRequestType("support")}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${requestType === "support" ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    Technical Support
                  </button>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    First Name
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    className="rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Last Name
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    className="rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@company.com"
                  className="rounded-lg"
                  required
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Phone Number
                </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder={contactData.phone}
                    className="rounded-lg"
                    required
                  />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="company"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Company
                </label>
                <Input
                  id="company"
                  name="company"
                  placeholder="Your Company Name"
                  className="rounded-lg"
                  required
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={requestType === "sales" ? "Tell us about your project or challenge..." : "Please describe the technical issue you are facing..."}
                  rows={5}
                  className="rounded-lg"
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="mt-6 w-full rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Syncing to ERP..." : requestType === "sales" ? "Send Inquiry (CRM)" : "Create Support Ticket"}
              </Button>

              <p className="mt-3 text-center text-xs text-muted-foreground">
                We typically respond within 24 business hours.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
