"use client"

import { useState, useEffect, useCallback } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Quote, ChevronLeft, ChevronRight, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface Testimonial {
  id: string
  title: string
  client: string
  author: string
  role: string
  quote: string
  image: string
  videoUrl: string
  category: string
  impact: string
}

// Hardcoded testimonials - no fetch needed, fastest load possible
const TESTIMONIALS: Testimonial[] = [
  {
    id: "arafat-hospital",
    title: "Empowering Healthcare Management",
    client: "Arafat Hospital",
    author: "Dr. Mohamed Ali Maslax",
    role: "CEO",
    image: "/testimonials/mohamed-ali-maslax.jpeg",
    quote:
      "Merit Advisory's Odoo ERP implementation has revolutionized our hospital management. Their deep understanding of healthcare workflows and commitment to data integrity has allowed us to focus more on patient care.",
    videoUrl: "https://www.youtube.com/embed/5mI_fN-U9x0",
    category: "Healthcare",
    impact: "Unified Healthcare Workflows",
  },
  {
    id: "vista-real-estate",
    title: "Scaling Real Estate Operations",
    client: "Vista Real Estate",
    author: "Mr. Hassan Abdi Awad",
    role: "CEO",
    image: "/testimonials/hassan-abdi-awad.jpeg",
    quote:
      "As a leader in real estate, we needed a partner who could handle the scale of our operations. Merit Advisory delivered a customized financial framework that provides us with real-time insights.",
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    category: "Real Estate",
    impact: "Real-time Financial Reporting",
  },
  {
    id: "laws-advisory",
    title: "Strategic Board Empowerment",
    client: "LAWS",
    author: "Sir Abdikani Ismail",
    role: "Board Director",
    image: "/testimonials/abdikani-ismail.jpeg",
    quote:
      "The strategic advisory provided by Merit has been instrumental in our organizational growth. Their ability to translate complex data into actionable strategies has strengthened our board's decision-making.",
    videoUrl: "/testimonials/WhatsApp Video 2026-05-12 at 18.06.33.mp4",
    category: "Public Sector",
    impact: "Data-Driven Governance",
  },
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const { ref, isVisible } = useScrollAnimation()

  const testimonials = TESTIMONIALS

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [testimonials.length])

  useEffect(() => {
    const interval = setInterval(next, 7000)
    return () => clearInterval(interval)
  }, [next])

  // Close modal on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedVideo(null)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  return (
    <section id="testimonials" className="py-16 bg-white border-y border-slate-100">
      <div ref={ref} className="mx-auto max-w-5xl px-6">
        <div
          className={cn(
            "relative bg-slate-50 rounded-[2rem] p-6 lg:p-12 border border-slate-200/60 shadow-sm transition-all duration-1000",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
        >
          {/* Quote Icon Overlay */}
          <div className="absolute -top-5 left-12 lg:left-20">
            <div className="h-10 w-10 bg-[#b22222] rounded-xl flex items-center justify-center shadow-lg shadow-[#b22222]/20 rotate-3">
              <Quote className="h-5 w-5 text-white fill-current" />
            </div>
          </div>

          <div className="relative overflow-hidden min-h-[400px] lg:min-h-[280px]">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className={cn(
                  "transition-all duration-700 ease-in-out absolute inset-0 flex flex-col lg:flex-row items-center gap-10 lg:gap-16",
                  activeIndex === i
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-12 pointer-events-none"
                )}
              >
                {/* Portrait */}
                <div
                  className="relative h-28 w-28 lg:h-40 lg:w-40 shrink-0 group cursor-pointer"
                  onClick={() => setSelectedVideo(t.videoUrl)}
                >
                  <div className="absolute inset-0 rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl rotate-[-2deg]">
                    <img
                      src={t.image}
                      alt={t.author}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="h-10 w-10 rounded-full bg-[#b22222]/80 text-white flex items-center justify-center backdrop-blur-sm">
                      <Play className="h-4 w-4 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center lg:text-left pb-12 lg:pb-0">
                  <blockquote
                    className="text-xl lg:text-2xl font-medium text-slate-800 leading-relaxed mb-6 italic"
                    style={{ fontFamily: '"Times New Roman", Times, serif' }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="space-y-1">
                    <h4 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight uppercase leading-none">
                      {t.author}
                    </h4>
                    <p className="text-[10px] lg:text-xs font-black text-[#b22222] uppercase tracking-[0.2em]">
                      {t.role} — {t.client}
                    </p>
                  </div>

                  <div className="pt-8 flex items-center justify-center lg:justify-start gap-8">
                    <button
                      onClick={() => setSelectedVideo(t.videoUrl)}
                      className="inline-flex items-center gap-2 text-sm font-black text-[#b22222] uppercase tracking-widest hover:text-slate-900 transition-colors"
                    >
                      Watch Video
                      <Play className="h-4 w-4 fill-current" />
                    </button>
                    <Link
                      href="/success-stories"
                      className="inline-flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-widest hover:text-[#b22222] transition-colors group"
                    >
                      More Stories
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Minimal Controls */}
          <div className="absolute bottom-8 right-8 lg:right-16 flex items-center gap-4">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="h-10 w-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:bg-white hover:text-[#b22222] hover:border-[#b22222] transition-all shadow-sm"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={cn(
                    "h-1.5 transition-all duration-300 rounded-full",
                    activeIndex === i ? "w-8 bg-[#b22222]" : "w-1.5 bg-slate-200"
                  )}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="h-10 w-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:bg-white hover:text-[#b22222] hover:border-[#b22222] transition-all shadow-sm"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/95 backdrop-blur-sm"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-6 right-6 h-12 w-12 rounded-full bg-white/10 hover:bg-[#b22222] text-white flex items-center justify-center z-10 transition-colors backdrop-blur-md"
                aria-label="Close video"
              >
                <X className="h-6 w-6" />
              </button>
              {selectedVideo.includes("youtube.com") || selectedVideo.includes("vimeo.com") ? (
                <iframe
                  src={selectedVideo + "?autoplay=1&rel=0"}
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={selectedVideo}
                  className="w-full h-full"
                  controls
                  autoPlay
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
