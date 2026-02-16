"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useMedia } from "@/hooks/use-media"

import { clientsData } from "@/lib/clients-data"

export function LogoCarousel() {
  const { ref, isVisible } = useScrollAnimation()
  const { media: dynamicLogos } = useMedia('trusted-by-industry-leaders')

  // Combine hardcoded featured clients with dynamic uploads from the media manager
  const hardcodedClients = clientsData.slice(0, 12).map((client) => ({
    name: client.name,
    logo: client.logo
  }))

  const uploadedClients = dynamicLogos.map(file => ({
    name: file.name,
    logo: file.url
  }))

  const allClients = [...hardcodedClients, ...uploadedClients]

  return (
    <section className="overflow-hidden bg-white/40 border-y border-border py-10 md:py-14">
      <div
        ref={ref}
        className={`mx-auto max-w-7xl px-6 transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"
          }`}
      >
        <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.2em] text-[#1f2933]/40">
          Trusted by Industry Leaders
        </p>

        <div className="relative">
          {/* Fade edges */}
          <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-24 bg-gradient-to-r from-background/40 to-transparent lg:w-48" />
          <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-24 bg-gradient-to-l from-background/40 to-transparent lg:w-48" />

          <div className="flex animate-logo-scroll gap-20 whitespace-nowrap hover:[animation-play-state:paused]">
            {/* Double the list for seamless looping with -50% translateX animation */}
            {[...allClients, ...allClients].map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="flex shrink-0 items-center justify-center grayscale opacity-40 transition-all duration-500 hover:grayscale-0 hover:opacity-100"
              >
                <div className="h-12 flex items-center justify-center">
                  {client.logo ? (
                    <img
                      src={client.logo}
                      alt={`${client.name} Logo`}
                      className="max-h-full w-auto object-contain mix-blend-multiply"
                    />
                  ) : (
                    <span className="text-xl font-black tracking-tighter text-[#1f2933] md:text-2xl">
                      {client.name.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
