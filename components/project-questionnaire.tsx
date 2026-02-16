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
import { CheckCircle2, Send, ClipboardCheck } from "lucide-react"

import { toast } from "sonner"

const formSchema = z.object({
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

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
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

    async function onSubmit(values: FormValues) {
        setIsSubmitting(true)
        try {
            const response = await fetch("/api/questionnaire", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })

            if (response.ok) {
                setSubmitted(true)
                toast.success("Questionnaire synced to Odoo CRM")
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
        return (
            <Card className="mx-auto max-w-2xl p-12 text-center shadow-lg border-primary/20 bg-primary/5">
                <div className="flex justify-center mb-6">
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle2 className="h-10 w-10 text-primary animate-in zoom-in duration-300" />
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-foreground">Questionnaire Submitted!</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Thank you for providing your project requirements. Our team will review your
                    information and get back to you within 24 business hours.
                </p>
                <Button
                    className="mt-8 rounded-full"
                    onClick={() => {
                        setSubmitted(false)
                        form.reset()
                    }}
                >
                    Submit Another Request
                </Button>
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
                                                    "Digital Accounting",
                                                    "Management System (Product)",
                                                    "Audit & Assurance",
                                                    "Training",
                                                    "NGO",
                                                    "General Trade",
                                                    "Hospitality",
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
                                                <SelectItem value="retail">Retail</SelectItem>
                                                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                                                <SelectItem value="healthcare">Healthcare</SelectItem>
                                                <SelectItem value="finance">Financial Services</SelectItem>
                                                <SelectItem value="logistics">Logistics</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
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
