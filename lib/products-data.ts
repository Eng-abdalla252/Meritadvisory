
export interface Product {
    id: string;
    title: string;
    description: string;
    benefits: string[];
    image: string;
    category: string;
}

export const productsData: Product[] = [
    {
        id: "bms",
        title: "Business Management System",
        description: "A comprehensive core platform to unify all business operations, from finance to sales and inventory.",
        benefits: ["Unified data view", "Real-time reporting", "Automated workflows"],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        category: "General Services"
    },
    {
        id: "ems",
        title: "Education Management System",
        description: "End-to-end administration for schools and universities, covering student lifecycles, grading, and scheduling.",
        benefits: ["Student portal", "Automated grading", "Parent-teacher communication"],
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800",
        category: "Public Sector"
    },
    {
        id: "const",
        title: "Construction Management System",
        description: "Track project timelines, material procurement, labor costs, and site progress in one place.",
        benefits: ["Project tracking", "Cost control", "Resource allocation"],
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800",
        category: "Industry Specific"
    },
    {
        id: "jet",
        title: "Jet Management System",
        description: "Specialized aviation ERP for flight scheduling, maintenance tracking, and fuel management for private and commercial fleets.",
        benefits: ["Fleet maintenance", "Flight logging", "Fuel optimization"],
        image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=800",
        category: "Specialized"
    },
    {
        id: "garage",
        title: "Garage Management System",
        description: "Streamline automotive workshops with job card management, spare parts inventory, and service reminders.",
        benefits: ["Service history", "Inventory control", "Customer reminders"],
        image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=800",
        category: "Retail & Service"
    },
    {
        id: "hrm",
        title: "Human Resource Management (HRM)",
        description: "Modern HR platform for payroll, attendance, performance reviews, and employee self-service.",
        benefits: ["Automated payroll", "Performance tracking", "Self-service portal"],
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800",
        category: "General Services"
    },
    {
        id: "pms",
        title: "Project Management System",
        description: "Collaborative platform for task assignment, Gantt charts, and team productivity tracking.",
        benefits: ["Visual timelines", "Team collaboration", "Milestone tracking"],
        image: "https://images.unsplash.com/photo-1454165833965-ad297239dd31?auto=format&fit=crop&q=80&w=800",
        category: "General Services"
    },
    {
        id: "mms",
        title: "Manufacturing Management System",
        description: "Optimize production lines with Bill of Materials (BOM), work orders, and quality control checks.",
        benefits: ["BOM management", "Production planning", "Quality assurance"],
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
        category: "Industry Specific"
    },
    {
        id: "fms",
        title: "Fuel Management System",
        description: "Integrated solution for fuel stations and logistics fleets to track consumption and prevent leakages.",
        benefits: ["Leakage detection", "Consumption tracking", "Station automation"],
        image: "https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&q=80&w=800",
        category: "Specialized"
    },
    {
        id: "hosp",
        title: "Hospital Management System",
        description: "Complete clinical and administrative solution for large hospitals, including bed management and surgery scheduling.",
        benefits: ["Electronic Health Records", "Bed management", "Billing integration"],
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
        category: "Healthcare"
    },
    {
        id: "clinic",
        title: "Clinic Management System",
        description: "Simplified patient management, appointment booking, and prescription tracking for smaller clinics.",
        benefits: ["Appointment booking", "Patient history", "Digital prescriptions"],
        image: "https://images.unsplash.com/photo-1505751172107-573225a917bb?auto=format&fit=crop&q=80&w=800",
        category: "Healthcare"
    },
    {
        id: "pharm",
        title: "Pharmacy Management System",
        description: "Inventory-focused solution for drug tracking, expiry alerts, and integrated POS for pharmacies.",
        benefits: ["Expiry alerts", "Inventory tracking", "Sales integration"],
        image: "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?auto=format&fit=crop&q=80&w=800",
        category: "Healthcare"
    },
    {
        id: "dms",
        title: "Document Management System",
        description: "Secure, centralized digital archive for all corporate documents with version control and access permissions.",
        benefits: ["Version control", "Searchable archive", "Secure access"],
        image: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=800",
        category: "General Services"
    },
    {
        id: "hotel",
        title: "Hotel Management System",
        description: "Front-desk operations, room booking, housekeeping, and guest services integrated into one platform.",
        benefits: ["Room booking", "Guest management", "Housekeeping tracking"],
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
        category: "Hospitality"
    },
    {
        id: "rest",
        title: "Restaurant & Cafe Management",
        description: "Point of Sale (POS) with table management, kitchen display systems, and inventory tracking.",
        benefits: ["Table management", "Kitchen display", "Integrated POS"],
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
        category: "Hospitality"
    },
    {
        id: "air",
        title: "Airline Management System",
        description: "Enterprise solution for flight ticketing, crew management, and aircraft maintenance scheduling.",
        benefits: ["Ticketing system", "Crew management", "Maintenance logs"],
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&q=80&w=800",
        category: "Specialized"
    },
    {
        id: "prop",
        title: "Property Management System",
        description: "Track leases, tenants, maintenance requests, and rental payments for real estate portfolios.",
        benefits: ["Lease tracking", "Payment automation", "Maintenance management"],
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
        category: "Retail & Service"
    },
    {
        id: "util",
        title: "Utility Management System",
        description: "Billing and consumption tracking for water, electricity, and other municipal services.",
        benefits: ["Meter tracking", "Automated billing", "Customer portal"],
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800",
        category: "Public Sector"
    },
    {
        id: "recruit",
        title: "Recruitment Service Platform",
        description: "Applicant Tracking System (ATS) to manage job postings, interviews, and onboarding.",
        benefits: ["Applicant tracking", "Interview scheduling", "Onboarding flow"],
        image: "https://images.unsplash.com/photo-1565728741225-24a0b0ca735d?auto=format&fit=crop&q=80&w=800",
        category: "General Services"
    },
    {
        id: "trans",
        title: "Transport Management System",
        description: "Fleet logistics, route optimization, and delivery tracking for transport companies.",
        benefits: ["Route optimization", "Delivery tracking", "Fleet monitoring"],
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
        category: "Retail & Service"
    }
];
