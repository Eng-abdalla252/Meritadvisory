export const solutionsDetail = [
  {
    slug: "enterprise-erp-platforms",
    iconName: "Database",
    title: "Enterprise ERP Platforms",
    subtitle: "Unified operations across your entire organization",
    heroDescription:
      "We implement and customize leading ERP platforms like SAP, Oracle, Odoo, and Microsoft Dynamics. Our end-to-end approach ensures your core business processes are integrated into a single source of truth.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    keyBenefits: [
      "Streamlined financial management and reporting",
      "Optimized supply chain and inventory tracking",
      "Enhanced CRM and sales pipeline visibility",
      "Automated HR and payroll workflows",
    ],
    approach: [
      { step: "Discovery & Audit", detail: "Mapping your current workflows to identify ERP gaps." },
      { step: "Configuration", detail: "Tailoring the ERP module to your specific business logic." },
      { step: "Migration & Go-Live", detail: "Secure data migration followed by team training." },
    ],
    technologies: ["Odoo", "SAP", "Oracle", "Microsoft Dynamics"],
    stats: [
      { value: "40%", label: "Process Speedup" },
      { value: "100%", label: "Data Centralization" },
      { value: "30%", label: "Cost Reduction" },
    ],
  },
  {
    slug: "intelligent-automation",
    iconName: "Bot",
    title: "Intelligent Automation",
    subtitle: "Eliminate manual effort and accelerate operations",
    heroDescription:
      "We design and deploy RPA (Robotic Process Automation) and AI-powered workflows to handle repetitive tasks, freeing your team to focus on strategic, high-value initiatives.",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
    keyBenefits: [
      "Significant reduction in manual data entry errors",
      "Accelerated processing times for invoices and claims",
      "24/7 operational capability for background tasks",
      "Improved employee satisfaction by removing mundane work",
    ],
    approach: [
      { step: "Task Mining", detail: "Identifying high-volume, repetitive tasks suitable for automation." },
      { step: "Bot Development", detail: "Creating custom RPA scripts and AI models." },
      { step: "Deployment", detail: "Integrating bots into your existing software stack." },
    ],
    technologies: ["UiPath", "Automation Anywhere", "Python AI", "OpenAI"],
    stats: [
      { value: "70%", label: "Time Saved" },
      { value: "0%", label: "Error Rate" },
      { value: "24/7", label: "Availability" },
    ],
  },
  {
    slug: "advanced-analytics",
    iconName: "BarChart3",
    title: "Advanced Analytics",
    subtitle: "Turn raw data into actionable strategic insights",
    heroDescription:
      "Our business intelligence experts build dynamic dashboards, predictive models, and data lakes that allow executives to make fast, confident, data-driven decisions.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    keyBenefits: [
      "Real-time visibility into KPI performance",
      "Predictive modeling for forecasting and risk",
      "Centralized data warehouses eliminating silos",
      "Self-service BI tools for department heads",
    ],
    approach: [
      { step: "Data Aggregation", detail: "Connecting disparate data sources into a unified lake." },
      { step: "Model Building", detail: "Designing custom algorithms for predictive forecasting." },
      { step: "Visualization", detail: "Creating intuitive, real-time dashboards for executives." },
    ],
    technologies: ["Tableau", "Power BI", "Snowflake", "Python Data Science"],
    stats: [
      { value: "50%", label: "Faster Insights" },
      { value: "90%", label: "Forecast Accuracy" },
      { value: "10x", label: "ROI Potential" },
    ],
  },
  {
    slug: "system-integrations",
    iconName: "Link2",
    title: "System Integrations",
    subtitle: "Seamlessly connecting your technology ecosystem",
    heroDescription:
      "We build secure, robust API integrations and middleware solutions that ensure your CRM, ERP, HRIS, and operational software communicate flawlessly in real-time.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
    keyBenefits: [
      "Elimination of duplicate data entry across systems",
      "Real-time data syncing between departments",
      "Scalable microservices architecture",
      "Secure API gateways and robust error handling",
    ],
    approach: [
      { step: "API Audit", detail: "Reviewing existing system endpoints and data structures." },
      { step: "Middleware Design", detail: "Building the custom bridge for data flow." },
      { step: "Testing & Monitoring", detail: "Ensuring zero-latency and high security." },
    ],
    technologies: ["REST/SOAP", "Zapier", "MuleSoft", "AWS Lambda"],
    stats: [
      { value: "Real-time", label: "Data Sync" },
      { value: "0", label: "Data Silos" },
      { value: "High", label: "Security" },
    ],
  },
  {
    slug: "cloud-migration",
    iconName: "Cloud",
    title: "Cloud Migration",
    subtitle: "Secure and efficient transition to the cloud",
    heroDescription:
      "We orchestrate the secure migration of your legacy on-premise systems to modern cloud platforms (AWS, Azure, Google Cloud) with minimal downtime and zero data loss.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    keyBenefits: [
      "Infinite scalability to support business growth",
      "Reduced on-premise hardware and maintenance costs",
      "Enhanced disaster recovery and business continuity",
      "Access to cloud-native AI and analytics tools",
    ],
    approach: [
      { step: "Readiness Assessment", detail: "Analyzing legacy architecture for cloud compatibility." },
      { step: "Secure Migration", detail: "Executing the data move with encrypted pipelines." },
      { step: "Cloud Optimization", detail: "Refining the new environment for cost and speed." },
    ],
    technologies: ["AWS", "Azure", "GCP", "Docker & K8s"],
    stats: [
      { value: "99.9%", label: "Uptime" },
      { value: "30%", label: "Lower TCO" },
      { value: "Global", label: "Scalability" },
    ],
  },
  {
    slug: "security-compliance",
    iconName: "Lock",
    title: "Security & Compliance",
    subtitle: "Enterprise-grade protection and regulatory adherence",
    heroDescription:
      "We implement comprehensive security frameworks, data governance policies, and compliance solutions to protect your critical assets against evolving cyber threats.",
    imageUrl: "https://images.unsplash.com/photo-1510511459012-9d4f61461c3b?q=80&w=2065&auto=format&fit=crop",
    keyBenefits: [
      "Zero-trust network architecture implementation",
      "Compliance with GDPR, HIPAA, ISO 27001, and local regulations",
      "Automated threat detection and incident response",
      "Regular vulnerability assessments and penetration testing",
    ],
    approach: [
      { step: "Risk Assessment", detail: "Identifying vulnerabilities and potential threat vectors." },
      { step: "Framework Setup", detail: "Deploying ISO or HIPAA compliant protocols." },
      { step: "Active Monitoring", detail: "24/7 security operations and threat hunting." },
    ],
    technologies: ["Firewalls", "SIEM Tools", "Encryption", "Auth0"],
    stats: [
      { value: "100%", label: "Compliance" },
      { value: "Zero", label: "Breaches" },
      { value: "24/7", label: "Monitoring" },
    ],
  },
]

export function getSolutionBySlug(slug: string) {
  return solutionsDetail.find((s) => s.slug === slug)
}

export function getAllSolutionSlugs() {
  return solutionsDetail.map((s) => s.slug)
}
