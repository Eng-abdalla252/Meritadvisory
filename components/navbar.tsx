"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, ChevronDown } from "lucide-react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { servicesDetail } from "@/lib/services-data"

const navLinks = [
  { label: "About", href: "/about" },
  {
    label: "Solutions",
    href: "/solutions",
    items: [
      { label: "Enterprise ERP Platforms", href: "/solutions", description: "SAP, Oracle, Odoo, and more expert implementations." },
      { label: "Intelligent Automation", href: "/solutions", description: "RPA and AI-powered workflows for efficiency." },
      { label: "Advanced Analytics", href: "/solutions", description: "Data-driven insights and BI dashboards." },
      { label: "System Integrations", href: "/solutions", description: "Seamlessly connecting your technology ecosystem." },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    items: [
      { label: "Manufacturing", href: "/industries", description: "Production, inventory, and supply chain optimization." },
      { label: "Financial Services", href: "/industries", description: "Regulatory compliance and risk management." },
      { label: "Healthcare", href: "/industries", description: "Compliant systems for patient and operations." },
      { label: "Retail & E-Commerce", href: "/industries", description: "Omnichannel commerce and integrated POS." },
    ],
  },
  {
    label: "Insights",
    href: "#",
    items: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "Success Stories", href: "/case-studies" },
      { label: "Our Team", href: "/team" },
      { label: "Our Clients", href: "/clients" },
      { label: "Project Questionnaire", href: "/questionnaire" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Helpdesk", href: "/#contact" },
    ],
  },
  { label: "Contact", href: "/#contact" },
]

interface NavItem {
  label: string
  href: string
  items?: { label: string; href: string }[]
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false)
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false)
  const [mobileInsightsOpen, setMobileInsightsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-white shadow-md border-b border-border text-[#222222]"
        : "bg-transparent text-[#222222]"
        }`}
    >
      {/* Top bar */}
      <div
        className={`overflow-hidden transition-all duration-300 ${scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
          }`}
      >
        <div className="bg-accent/90 text-accent-foreground">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5 text-xs">
            <span>Empowering enterprises with cutting-edge digital solutions</span>
            <div className="hidden items-center gap-4 sm:flex">
              <a href="tel:+15552345678" className="flex items-center gap-1 hover:underline">
                <Phone className="h-3 w-3" />
                +252906795155
              </a>
              <span>outreach@meritadvisory.org</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Merit Advisory Logo" className="h-16 w-auto object-contain mix-blend-multiply" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/about"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent text-[#222222] hover:bg-accent/10 hover:text-accent focus:bg-accent/10 focus:text-accent"
                    )}
                  >
                    About
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "bg-transparent text-[#222222] hover:bg-accent/10 hover:text-accent data-[state=open]:bg-accent/10 data-[state=open]:text-accent"
                  )}
                >
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {servicesDetail.map((service) => (
                      <ListItem
                        key={service.slug}
                        title={service.title}
                        href={`/services/${service.slug}`}
                      >
                        {service.subtitle}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {(navLinks as NavItem[]).slice(1).map((link) => (
            <NavigationMenu key={link.label}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  {link.items ? (
                    <>
                      <NavigationMenuTrigger
                        className={cn(
                          "bg-transparent text-[#222222] hover:bg-accent/10 hover:text-accent data-[state=open]:bg-accent/10 data-[state=open]:text-accent"
                        )}
                      >
                        {link.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className={cn(
                          "gap-2 p-2",
                          link.label === "Insights" ? "w-[240px] flex flex-col" : "w-[400px] grid md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                        )}>
                          {link.items.map((subItem: any) => (
                            <ListItem
                              key={subItem.label}
                              title={subItem.label}
                              href={subItem.href}
                              className={cn(link.label === "Insights" && "p-2")}
                            >
                              {subItem.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link
                        href={link.href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "bg-transparent text-[#222222] hover:bg-accent/10 hover:text-accent focus:bg-accent/10 focus:text-accent"
                        )}
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          ))}

          <Button
            size="sm"
            variant="outline"
            className="rounded-full border-accent text-accent hover:bg-accent/10"
            asChild
          >
            <a href={process.env.ODOO_URL || "#"} target="_blank" rel="noopener noreferrer">
              Portal
            </a>
          </Button>

          <Button
            size="sm"
            className="rounded-full bg-accent px-6 text-accent-foreground shadow-sm hover:bg-accent/90"
            asChild
          >
            <Link href="#contact">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-[#222222] hover:text-accent"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-[top-bar-height] h-[calc(100vh-theme(spacing.16))] overflow-y-auto border-t border-border bg-background px-6 py-6 lg:hidden">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="text-lg font-medium text-foreground transition-colors hover:text-primary"
            >
              About
            </Link>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setMobileServicesOpen(!mobileServicesOpen);
                  setMobileSolutionsOpen(false);
                  setMobileIndustriesOpen(false);
                  setMobileInsightsOpen(false);
                }}
                className="flex w-full items-center justify-between text-lg font-medium text-foreground transition-colors hover:text-primary"
              >
                Services
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${mobileServicesOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {mobileServicesOpen && (
                <div className="ml-4 flex flex-col space-y-3 border-l-2 border-border pl-4">
                  {servicesDetail.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="text-sm font-medium text-muted-foreground hover:text-primary"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <div key={link.label} className="flex flex-col gap-2">
                {link.items ? (
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        if (link.label === "Solutions") {
                          setMobileSolutionsOpen(!mobileSolutionsOpen);
                          setMobileIndustriesOpen(false);
                          setMobileInsightsOpen(false);
                        } else if (link.label === "Industries") {
                          setMobileIndustriesOpen(!mobileIndustriesOpen);
                          setMobileSolutionsOpen(false);
                          setMobileInsightsOpen(false);
                        } else if (link.label === "Insights") {
                          setMobileInsightsOpen(!mobileInsightsOpen);
                          setMobileSolutionsOpen(false);
                          setMobileIndustriesOpen(false);
                        }
                      }}
                      className="flex w-full items-center justify-between text-lg font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 transition-transform",
                          ((link.label === "Solutions" && mobileSolutionsOpen) ||
                            (link.label === "Industries" && mobileIndustriesOpen) ||
                            (link.label === "Insights" && mobileInsightsOpen)) && "rotate-180"
                        )}
                      />
                    </button>

                    {((link.label === "Solutions" && mobileSolutionsOpen) ||
                      (link.label === "Industries" && mobileIndustriesOpen) ||
                      (link.label === "Insights" && mobileInsightsOpen)) && (
                        <div className="ml-4 flex flex-col space-y-3 border-l-2 border-border pl-4">
                          {link.items.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              onClick={() => setMobileOpen(false)}
                              className="text-sm font-medium text-muted-foreground hover:text-primary"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}

            <div className="flex flex-col gap-3 mt-4">
              <Button className="w-full rounded-full bg-accent text-accent-foreground" asChild>
                <Link href="#contact" onClick={() => setMobileOpen(false)}>
                  Get Started
                </Link>
              </Button>
              <Button variant="outline" className="w-full rounded-full border-accent text-accent" asChild>
                <a href={process.env.ODOO_URL || "#"} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>
                  Odoo Portal Login
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={props.href || "#"}
          ref={ref as any}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 hover:text-accent-foreground focus:bg-accent/10 focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          {children && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
              {children}
            </p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
