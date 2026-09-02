"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { CheckCircle2, Send, ClipboardCheck, DollarSign, Package } from "lucide-react"

import { toast } from "sonner"

interface BlueprintService {
    id: string
    name: string
    category: string
    description: string
    price: number
    currency: string
    status: 'active' | 'inactive'
}

const formSchema = z.object({
    blueprintId: z.string().min(1, "Blueprint selection is required"),
    customerName: z.string().min(2, "Name is required"),
    phoneNumber: z.string().min(8, "Phone number is required"),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
    companyName: z.string().min(2, "Company name is required"),
    numEmployees: z.string().min(1, "Required"),
    numBranches: z.string().min(1, "Required"),
    cities: z.string().min(2, "Required"),
    interest: z.string().min(1, "Selection is required"),
    managementIndustry: z.string().optional(),
    currentSystem: z.string().min(1, "Selection is required"),
    briefNeed: z.string().min(10, "Please describe your need in at least 10 characters"),
})

type FormValues = z.infer<typeof formSchema>

export default function ProjectQuestionnaireForm() {
    const { ref, isVisible } = useScrollAnimation()
    const [submitted, setSubmitted] = React.useState(false)
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [blueprints, setBlueprints] = React.useState<BlueprintService[]>([])
    const [selectedBlueprint, setSelectedBlueprint] = React.useState<BlueprintService | null>(null)
    const [submissionId, setSubmissionId] = React.useState<string | null>(null)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            blueprintId: "",
            customerName: "",
            phoneNumber: "",
            email: "",
            companyName: "",
            numEmployees: "",
            numBranches: "",
            cities: "",
            interest: "",
            managementIndustry: "",
            currentSystem: "",
            briefNeed: "",
        },
    })

    React.useEffect(() => {
        fetchBlueprints()
    }, [])

    const fetchBlueprints = async () => {
        try {
            const res = await fetch("/api/admin/data-api?type=blueprint-services")
            const data = await res.json()
            if (Array.isArray(data)) {
                setBlueprints(data.filter((bp: BlueprintService) => bp.status === 'active'))
            }
        } catch (error) {
            console.error("Failed to fetch blueprints:", error)
        }
    }

    async function onSubmit(values: FormValues) {
        setIsSubmitting(true)
        try {
            const blueprint = blueprints.find(bp => bp.id === values.blueprintId)
            const submissionData = {
                ...values,
                type: "questionnaire",
                blueprintData: blueprint ? {
                    id: blueprint.id,
                    name: blueprint.name,
                    category: blueprint.category,
                    price: blueprint.price,
                    currency: blueprint.currency
                } : null
            }

            const response = await fetch("/api/questionnaire", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(submissionData),
            })

            if (response.ok) {
                const result = await response.json()
                setSubmissionId(result.id || `sub_${Date.now()}`)
                setSubmitted(true)
                toast.success("Questionnaire submitted successfully")
            } else {
                toast.error("Submission failed. Please try again.")
            }
        } catch (error) {
            console.error("Submission Error:", error)
            toast.error("An error occurred during submission")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (submitted) {
        const blueprint = blueprints.find(bp => bp.id === form.getValues().blueprintId)
        return (
            <Card className="mx-auto max-w-4xl p-12 shadow-lg border-primary/20 bg-primary/5">
                <div className="flex justify-center mb-6">
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle2 className="h-10 w-10 text-primary animate-in zoom-in duration-300" />
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-foreground text-center mb-8">Project Request Summary</h2>
                
                {/* Project Cost Summary Card */}
                {blueprint && (
                    <Card className="mb-8 p-6 bg-gradient-to-r from-[#b22222]/10 to-accent/10 border-2 border-[#b22222]/20">
                        <div className="flex items-center gap-2 mb-4">
                            <Package className="h-5 w-5 text-[#b22222]" />
                            <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest">Project Cost Summary</h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-slate-500">Service Name</p>
                                <p className="text-sm font-bold text-slate-900">{blueprint.name}</p>
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-slate-500">Category</p>
                                <p className="text-sm font-bold text-slate-900">{blueprint.category}</p>
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-slate-500">Price</p>
                                <p className="text-2xl font-black text-[#b22222]">
                                    {blueprint.currency} {blueprint.price.toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-slate-500">Organization</p>
                                <p className="text-sm font-bold text-slate-900">{form.getValues().companyName}</p>
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-slate-500">Employees</p>
                                <p className="text-sm font-bold text-slate-900">{form.getValues().numEmployees}</p>
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-slate-500">Submitted On</p>
                                <p className="text-sm font-bold text-slate-900">{new Date().toLocaleDateString()}</p>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Questionnaire Details */}
                <div className="space-y-4 mb-8">
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest">Questionnaire Details</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="p-4 bg-white rounded-lg">
                            <p className="text-xs font-black uppercase tracking-widest text-slate-500">Customer Name</p>
                            <p className="text-sm font-bold text-slate-900">{form.getValues().customerName}</p>
                        </div>
                        <div className="p-4 bg-white rounded-lg">
                            <p className="text-xs font-black uppercase tracking-widest text-slate-500">Phone Number</p>
                            <p className="text-sm font-bold text-slate-900">{form.getValues().phoneNumber}</p>
                        </div>
                        <div className="p-4 bg-white rounded-lg">
                            <p className="text-xs font-black uppercase tracking-widest text-slate-500">Email</p>
                            <p className="text-sm font-bold text-slate-900">{form.getValues().email || 'N/A'}</p>
                        </div>
                        <div className="p-4 bg-white rounded-lg">
                            <p className="text-xs font-black uppercase tracking-widest text-slate-500">Branches</p>
                            <p className="text-sm font-bold text-slate-900">{form.getValues().numBranches}</p>
                        </div>
                        <div className="p-4 bg-white rounded-lg">
                            <p className="text-xs font-black uppercase tracking-widest text-slate-500">Cities/Locations</p>
                            <p className="text-sm font-bold text-slate-900">{form.getValues().cities}</p>
                        </div>
                        <div className="p-4 bg-white rounded-lg">
                            <p className="text-xs font-black uppercase tracking-widest text-slate-500">Interest</p>
                            <p className="text-sm font-bold text-slate-900">{form.getValues().interest}</p>
                        </div>
                        <div className="p-4 bg-white rounded-lg md:col-span-2">
                            <p className="text-xs font-black uppercase tracking-widest text-slate-500">Brief Need</p>
                            <p className="text-sm font-bold text-slate-900">{form.getValues().briefNeed}</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 justify-center">
                    <Button
                        className="rounded-full bg-[#b22222] text-white font-black uppercase tracking-widest hover:bg-[#8b1818] transition-colors"
                        onClick={() => {
                            setSubmitted(false)
                            form.reset()
                            setSelectedBlueprint(null)
                        }}
                    >
                        Request Another Proposal
                    </Button>
                    <Button
                        className="rounded-full"
                        variant="outline"
                        onClick={() => {
                            setSubmitted(false)
                            form.reset()
                            setSelectedBlueprint(null)
                        }}
                    >
                        Submit Request
                    </Button>
                </div>
            </Card>
        )
    }

    return (
        <div ref={ref} className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <Card className="mx-auto max-w-3xl overflow-hidden shadow-2xl border-border/50">
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-8 border-b border-border/50">
                    <div className="flex items-center gap-3 mb-4">
                        <ClipboardCheck className="h-6 w-6 text-primary" />
                        <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary">
                            Analysis Phase
                        </Badge>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Business Needs Assessment</h2>
                    <p className="mt-2 text-muted-foreground">
                        Please provide details about your organization and requirements to help us
                        prepare for our initial strategy session.
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 space-y-8">
                        {/* Blueprint Selection */}
                        <FormField
                            control={form.control}
                            name="blueprintId"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel className="text-base font-bold">Select Blueprint/Service *</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => {
                                                field.onChange(value)
                                                const blueprint = blueprints.find(bp => bp.id === value)
                                                setSelectedBlueprint(blueprint || null)
                                            }}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="h-12 rounded-xl">
                                                <SelectValue placeholder="Choose a blueprint service" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {blueprints.map((blueprint) => (
                                                    <SelectItem key={blueprint.id} value={blueprint.id}>
                                                        <div className="flex flex-col">
                                                            <span className="font-medium">{blueprint.name}</span>
                                                            <span className="text-xs text-slate-500">
                                                                {blueprint.category} • {blueprint.currency} {blueprint.price.toLocaleString()}
                                                            </span>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Selected Blueprint Price Display */}
                        {selectedBlueprint && (
                            <Card className="p-4 bg-gradient-to-r from-[#b22222]/10 to-accent/10 border-2 border-[#b22222]/20">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Package className="h-5 w-5 text-[#b22222]" />
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{selectedBlueprint.name}</p>
                                            <p className="text-xs text-slate-500">{selectedBlueprint.category}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-[#b22222]">
                                            {selectedBlueprint.currency} {selectedBlueprint.price.toLocaleString()}
                                        </p>
                                        <p className="text-xs text-slate-500">Estimated Price</p>
                                    </div>
                                </div>
                            </Card>
                        )}

                        <div className="grid gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="customerName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Customer Name *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your full name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="+252 XX XXXXXXX" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="john@company.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="companyName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company/Organization Name *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your business name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            <FormField
                                control={form.control}
                                name="numEmployees"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Employees *</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="50" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="numBranches"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Branches *</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="1" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cities"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cities/Locations *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Mogadishu, Nairobi" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="interest"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>What best describes your interest? *</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                            >
                                                {[
                                                    "ACCOUNTING, TAX & FINANCIAL MANAGEMENT",
                                                    "AUDIT AND ASSURENCE",
                                                    "TECHNOLOGY & DIGITAL SOLUTIONS",
                                                    "CONSULTING, ADVISORY & RESEARCH",
                                                    "TRAINING AND CAPACITY BUILDING",
                                                ].map((option) => (
                                                    <FormItem key={option} className="flex items-center space-x-3 space-y-0 rounded-md border p-4 bg-background transition-colors hover:bg-muted/50">
                                                        <FormControl>
                                                            <RadioGroupItem value={option} />
                                                        </FormControl>
                                                        <FormLabel className="font-normal cursor-pointer w-full">
                                                            {option}
                                                        </FormLabel>
                                                    </FormItem>
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="managementIndustry"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>If Management System, which industry?</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select industry" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="retail">BUSINESS & CORPORATE MANAGEMENT SYSTEM</SelectItem>
                                                <SelectItem value="manufacturing">HOSPITAL MANAGEMENT SYSTEM</SelectItem>
                                                <SelectItem value="healthcare">DENTAL MANAGEMENT SYSTEM</SelectItem>
                                                <SelectItem value="finance">OPHTHALMOLOGY & EYE CARE MANAGEMENT SYSTEM</SelectItem>
                                                <SelectItem value="logistics">GYNECOLOGY & MATERNITY MANAGEMENT SYSTEM</SelectItem>
                                                <SelectItem value="other">EDUCATION  MANAGEMENT SYSTEM </SelectItem>
                                                <SelectItem value="other">CONSTRUCTION, PROPERTY & REAL ESTATE MANAGEMENT SYSTEM</SelectItem>
                                                <SelectItem value="other">MICROFINANCE & COOPERATIVE MANAGEMENT SYSTEM</SelectItem>
                                                <SelectItem value="other">INSURANCE MANAGEMENT SYSTEM</SelectItem>
                                                <SelectItem value="other">PUBLIC FINANCE MANAGEMENT SYSTEM</SelectItem>
                                                <SelectItem value="other">NGO & DEVELOPMENT PROGRAMME MANAGEMENT </SelectItem>
                                                <SelectItem value="other">TRAVEL AGENCY MANAGEMENT SYSTEM</SelectItem>
                                                <SelectItem value="other">AIRLINE MANAGEMENT SYSTEM</SelectItem>
                                                <SelectItem value="other">TRANSPORTATION & FLEET MANAGEMENT SYSTEM</SelectItem>
                                                <SelectItem value="other">LOGISTICS & SUPPLY CHAIN MANAGEMENT </SelectItem>
                                                <SelectItem value="other">HOTEL MANAGEMENT SYSTEM</SelectItem>
                                                <SelectItem value="other">RESTAURANT MANAGEMENT SYSTEM</SelectItem>
                                                <SelectItem value="other">ENERGY & RENEWABLE ENERGY MANAGEMENT SYSTEM</SelectItem>
                                                <SelectItem value="other">FUEL  MANAGEMENT SYSTEM</SelectItem>
                                                <SelectItem value="other">UTILITY MANAGEMENT SYSTEM</SelectItem>
                                                <SelectItem value="other">HUMAN RESOURCES MANAGEMENT SYSTEM</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="currentSystem"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Are you currently using any management or accounting system? *</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="existing" />
                                                </FormControl>
                                                <FormLabel className="font-normal">Yes, we are using an existing system</FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="manual" />
                                                </FormControl>
                                                <FormLabel className="font-normal">No, we use manual methods</FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="planned" />
                                                </FormControl>
                                                <FormLabel className="font-normal">We plan to implement our first system</FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="briefNeed"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Briefly describe your need *</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Please tell us about your specific goals, challenges, or current pain points..."
                                            className="resize-none"
                                            rows={4}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" size="lg" className="w-full rounded-full group h-12" disabled={isSubmitting}>
                            {isSubmitting ? "Processing..." : "Submit Project Questionnaire"}
                            {!isSubmitting && <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
                        </Button>
                    </form>
                </Form>
            </Card>

            <p className="mt-6 text-center text-sm text-muted-foreground">
                Secure Submission: Your data is protected and will only be used for project assessment.
            </p>
        </div>
    )
}
