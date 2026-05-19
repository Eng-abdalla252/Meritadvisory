"use client"

import { useMemo } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useMedia } from "@/hooks/use-media"
import { useClients } from "@/hooks/use-clients"

export function LogoCarousel() {
  const { clients: clientsData, loading } = useClients()
  const { ref, isVisible } = useScrollAnimation()
  const { media: dynamicLogos } = useMedia('trusted-by-industry-leaders')

  const allClients = useMemo(() => {
    const staticClients = clientsData.map((client) => ({
      name: client.name,
      logo: client.logo
    }));
    
    const dynamic = (dynamicLogos || []).map((media) => ({
      name: media.name.split('.')[0].replace(/-/g, ' '),
      logo: media.url
    }));

    // Deduplicate by logo path
    const seen = new Set(staticClients.map(c => c.logo));
    const uniqueDynamic = dynamic.filter(c => !seen.has(c.logo));
    
    return [...staticClients, ...uniqueDynamic];
  }, [clientsData, dynamicLogos]);

  // Fast scroll: ~1.5s per logo minimum, base 15s
  const duration = Math.max(15, allClients.length * 1.5);

  if (loading || allClients.length === 0) return null;

  return (
    <section className="overflow-hidden bg-white/40 border-y border-border py-8 md:py-10">
      <div
        ref={ref}
        className={`mx-auto max-w-7xl px-6 transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"
          }`}
      >
        <p className="mb-8 text-center text-[10px] font-black uppercase tracking-[0.3em] text-[#1f2933]/40">
          Trusted by Industry Leaders
        </p>

        <div className="relative">
          {/* Fade edges */}
          <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-24 bg-gradient-to-r from-background/40 to-transparent lg:w-48" />
          <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-24 bg-gradient-to-l from-background/40 to-transparent lg:w-48" />

          <div 
            className="flex animate-logo-scroll gap-16 whitespace-nowrap hover:[animation-play-state:paused]"
            style={{ animationDuration: `${duration}s` }}
          >
            {/* Double the list for seamless looping with -50% translateX animation */}
            {[...allClients, ...allClients].map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="flex shrink-0 items-center justify-center transition-all duration-500 hover:scale-110"
              >
                <div className="h-14 flex items-center justify-center">
                  {client.logo ? (
                    <img
                      src={client.logo}
                      alt={`${client.name} Logo`}
                      className="max-h-full w-auto object-contain"
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
