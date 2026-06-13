"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Loader2, Upload, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

// ─── Types ─────────────────────────────────────────────────────────────────

export interface FormField {
  id: string
  label: string
  type: "text" | "email" | "phone" | "textarea" | "select" | "file" | "checkbox" | "radio"
  placeholder?: string
  required?: boolean
  options?: string[]
  order?: number
  minLength?: number
}

export interface FormSchema {
  id: string
  title: string
  description?: string
  submitButtonText?: string
  successMessage?: string
  fields: FormField[]
}

interface DynamicFormProps {
  /** The form schema to render — can be fetched from /api/admin/data-api?type=forms */
  schema: FormSchema
  /** Called after a successful submission — receives the submitted data */
  onSuccess?: (data: Record<string, string>) => void
  /** Extra data appended to the submission payload (e.g. jobId) */
  extraData?: Record<string, string>
  /** Tailwind class overrides for the form wrapper */
  className?: string
  /** Used to route the submission to the correct lead type */
  formType?: string
  /** Show the form title and description above the inputs */
  showMeta?: boolean
}

// ─── Component ──────────────────────────────────────────────────────────────

export function DynamicForm({
  schema,
  onSuccess,
  extraData = {},
  className,
  formType,
  showMeta = false,
}: DynamicFormProps) {
  const [values, setValues] = React.useState<Record<string, string>>({})
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [file, setFile] = React.useState<File | null>(null)
  const [submitting, setSubmitting] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)

  const sorted = React.useMemo(
    () => [...schema.fields].sort((a, b) => (a.order ?? 99) - (b.order ?? 99)),
    [schema.fields]
  )

  const set = (id: string, val: string) =>
    setValues(prev => ({ ...prev, [id]: val }))

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    sorted.forEach(field => {
      const val = (values[field.id] || "").trim()

      if (field.required && field.type !== "file" && !val) {
        newErrors[field.id] = `${field.label} is required`
      }
      if (field.required && field.type === "email" && val && !val.includes("@")) {
        newErrors[field.id] = "Please enter a valid email address"
      }
      if (field.required && field.type === "file" && !file) {
        newErrors[field.id] = `Please upload your ${field.label}`
      }
      if (field.minLength && val.length < field.minLength) {
        newErrors[field.id] = `Minimum ${field.minLength} characters required`
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // ── Submission ────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) {
      toast.error("Please fix the errors before submitting.")
      return
    }

    setSubmitting(true)

    try {
      const hasFile = sorted.some(f => f.type === "file")

      let response: Response

      if (hasFile && file) {
        // multipart/form-data for file uploads
        const fd = new FormData()
        fd.append("formId", schema.id)
        fd.append("formType", formType || schema.id)
        Object.entries({ ...values, ...extraData }).forEach(([k, v]) => fd.append(k, v))
        fd.append("cvFile", file)
        response = await fetch("/api/forms/submit", { method: "POST", body: fd })
      } else {
        // JSON payload for non-file forms
        response = await fetch("/api/forms/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            formId: schema.id,
            formType: formType || schema.id,
            ...values,
            ...extraData,
          }),
        })
      }

      if (response.ok) {
        setSubmitted(true)
        onSuccess?.(values)
      } else {
        const json = await response.json().catch(() => ({}))
        toast.error(json.error || "Submission failed. Please try again.")
      }
    } catch {
      toast.error("Network error. Please check your connection and try again.")
    } finally {
      setSubmitting(false)
    }
  }

  // ── Success Screen ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-3">
          {schema.successMessage ? "Submitted!" : "Thank You!"}
        </h3>
        <p className="text-slate-500 font-medium max-w-md leading-relaxed">
          {schema.successMessage || "Your submission has been received. We'll be in touch soon."}
        </p>
      </div>
    )
  }

  // ── Form Render ───────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} className={cn("space-y-5", className)} noValidate>
      {showMeta && (
        <div className="mb-6">
          <h3 className="text-xl font-black text-slate-900">{schema.title}</h3>
          {schema.description && (
            <p className="mt-1 text-sm text-slate-500">{schema.description}</p>
          )}
        </div>
      )}

      {sorted.map(field => (
        <FieldRenderer
          key={field.id}
          field={field}
          value={values[field.id] || ""}
          error={errors[field.id]}
          onChange={val => set(field.id, val)}
          onFileChange={setFile}
          file={file}
        />
      ))}

      <Button
        type="submit"
        size="lg"
        className="mt-4 w-full rounded-full font-bold"
        disabled={submitting}
      >
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting…
          </>
        ) : (
          schema.submitButtonText || "Submit"
        )}
      </Button>
    </form>
  )
}

// ─── Field Renderer ─────────────────────────────────────────────────────────

interface FieldRendererProps {
  field: FormField
  value: string
  error?: string
  onChange: (val: string) => void
  onFileChange: (file: File | null) => void
  file: File | null
}

function FieldRenderer({ field, value, error, onChange, onFileChange, file }: FieldRendererProps) {
  const baseInputClass = cn(
    "w-full rounded-lg border transition-colors",
    error
      ? "border-red-400 focus-visible:ring-red-200"
      : "border-border"
  )

  const renderInput = () => {
    switch (field.type) {
      case "textarea":
        return (
          <Textarea
            id={field.id}
            name={field.id}
            placeholder={field.placeholder}
            required={field.required}
            rows={4}
            className={baseInputClass}
            value={value}
            onChange={e => onChange(e.target.value)}
          />
        )

      case "select":
        return (
          <select
            id={field.id}
            name={field.id}
            required={field.required}
            className={cn(
              "h-10 w-full rounded-lg border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              baseInputClass
            )}
            value={value}
            onChange={e => onChange(e.target.value)}
          >
            <option value="" disabled>
              {field.placeholder || `Select ${field.label}`}
            </option>
            {field.options?.map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )

      case "file":
        return (
          <div>
            <label
              htmlFor={field.id}
              className={cn(
                "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center transition-colors hover:border-primary",
                error ? "border-red-400" : "border-border",
                file ? "border-primary bg-primary/5" : "bg-muted/30"
              )}
            >
              <Upload className={cn("mb-2 h-6 w-6", file ? "text-primary" : "text-muted-foreground")} />
              <span className="text-sm font-medium text-foreground">
                {file ? file.name : (field.placeholder || "Click to upload file")}
              </span>
              {!file && (
                <span className="mt-1 text-xs text-muted-foreground">PDF, DOCX — Max 10MB</span>
              )}
            </label>
            <input
              id={field.id}
              name={field.id}
              type="file"
              accept=".pdf,.doc,.docx"
              className="sr-only"
              required={field.required}
              onChange={e => onFileChange(e.target.files?.[0] ?? null)}
            />
          </div>
        )

      default:
        return (
          <Input
            id={field.id}
            name={field.id}
            type={field.type === "phone" ? "tel" : field.type}
            placeholder={field.placeholder}
            required={field.required}
            className={baseInputClass}
            value={value}
            onChange={e => onChange(e.target.value)}
          />
        )
    }
  }

  return (
    <div>
      <Label htmlFor={field.id} className="mb-1.5 block font-medium text-foreground">
        {field.label}
        {field.required && <span className="ml-1 text-red-500">*</span>}
      </Label>
      {renderInput()}
      {error && (
        <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-500">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  )
}
