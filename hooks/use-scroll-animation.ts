"use client"

import { useCallback, useRef, useState } from "react"

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15
) {
  const [isVisible, setIsVisible] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const ref = useCallback((node: T | null) => {
    if (node) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(node)
          }
        },
        { threshold }
      )

      observer.observe(node)
      observerRef.current = observer
    } else {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [threshold])

  return { ref, isVisible }
}
