import Link from "next/link"
import { Linkedin, Twitter, Facebook, Youtube } from "lucide-react"
import { servicesDetail } from "@/lib/services-data"

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/team" },
    { label: "Our Clients", href: "/clients" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
  ],
  services: servicesDetail.map(service => ({
    label: service.title,
    href: `/services/${service.slug}`
  })),
  solutions: [
    { label: "Enterprise ERP", href: "/solutions" },
    { label: "Intelligent Automation", href: "/solutions" },
    { label: "Advanced Analytics", href: "/solutions" },
    { label: "System Integrations", href: "/solutions" },
  ],
  industries: [
    { label: "Manufacturing", href: "/industries" },
    { label: "Financial Services", href: "/industries" },
    { label: "Healthcare", href: "/industries" },
    { label: "Retail & E-Commerce", href: "/industries" },
  ],
  support: [
    { label: "Technical Helpdesk", href: "/#contact" },
    { label: "Project Questionnaire", href: "/questionnaire" },
    { label: "Careers Portal", href: "/careers" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
}

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

export function Footer() {
  return (
    <footer className="bg-[#d2d2d2] text-[#1f2933]">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8">
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-6">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-6 inline-block">
              <img
                src="/logo.png"
                alt="Merit Advisory Logo"
                className="h-10 w-auto object-contain mix-blend-multiply"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[#4b5563]">
              Leading digital transformation and ERP consulting company helping
              enterprises modernize and grow.
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1f2933]/5 text-[#1f2933]/70 transition-colors hover:bg-primary hover:text-white"
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-[#1f2933]">
              Company
            </h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#4b5563] transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-[#1f2933]">
              Services
            </h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#4b5563] transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-[#1f2933]">
              Solutions
            </h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#4b5563] transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-[#1f2933]">
              Industries
            </h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.industries.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#4b5563] transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-[#1f2933]">
              Support & Portfolio
            </h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#4b5563] transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[#1f2933]/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-[#4b5563]">
              {`\u00A9 ${new Date().getFullYear()} Merit Advisory Services. All rights reserved.`}
            </p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-xs text-[#4b5563] transition-colors hover:text-primary"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-xs text-[#4b5563] transition-colors hover:text-primary"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-xs text-[#4b5563] transition-colors hover:text-primary"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
