"use client"

import * as React from "react"
import { X, Download, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PDFViewerProps {
  isOpen: boolean
  onClose: () => void
  documentUrl: string
  documentTitle: string
}

export function PDFViewer({ isOpen, onClose, documentUrl, documentTitle }: PDFViewerProps) {
  const [isLoading, setIsLoading] = React.useState(true)

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = documentUrl
    link.download = documentTitle
    link.target = "_blank"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8">
      <div className="relative w-full max-w-6xl h-[90vh] bg-background rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4 bg-card">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-foreground truncate">{documentTitle}</h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* PDF Content */}
        <div className="flex-1 relative bg-slate-100">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="mt-4 text-sm text-muted-foreground">Loading document...</p>
              </div>
            </div>
          )}
          <iframe
            src={documentUrl}
            className={cn(
              "w-full h-full border-0",
              isLoading && "opacity-0"
            )}
            onLoad={() => setIsLoading(false)}
            title={documentTitle}
          />
        </div>
      </div>
    </div>
  )
}
