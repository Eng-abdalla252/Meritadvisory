import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Terms of Service | Merit Advisory",
  description: "Read our terms of service for utilizing the Merit Advisory platform and advisory services.",
}

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight text-[#1f2933] sm:text-5xl">
              Terms of Service
            </h1>
            <p className="mt-4 text-lg text-[#4b5563]">
              Last Updated: May 19, 2026
            </p>
          </div>

          <div className="prose prose-slate max-w-none space-y-8 text-base leading-relaxed text-[#4b5563]">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1f2933]">1. Agreement to Terms</h2>
              <p>
                By accessing or using the Merit Advisory website (meritadvisory.so) or our specialized consultancy services, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not access or use our digital services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1f2933]">2. Scope of Services</h2>
              <p>
                Merit Advisory provides professional business services, including but not limited to Audit & Assurance, Tax Advisory, Financial Accounting, Corporate Advisory, ERP Implementation, and Custom Software Integration.
              </p>
              <p>
                The information provided on this website is for general informational purposes and does not constitute formal, legally-binding auditing or business consulting opinion until a bilateral Service Level Agreement (SLA) is signed between Merit Advisory and the client.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1f2933]">3. Use of Interactive Tools</h2>
              <p>
                Our site offers self-service estimation tools (e.g., the Implementation Estimator) and job application pathways:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Estimates calculated by our digital estimator are non-binding budgetary ranges. Final pricing is subject to physical scoping and project specifications.</li>
                <li>When applying for opportunities through our Careers Portal, you warrant that all information, credentials, and attachments uploaded are true, accurate, and completely belong to you.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1f2933]">4. Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, graphics code, page layouts, components, brand logos, and media files, are the exclusive intellectual property of Merit Advisory or licensed from our corporate partners, protected by Somalian and international copyright regulations. You may not copy, reuse, or redistribute any of these assets without written approval.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1f2933]">5. Liability Disclaimer</h2>
              <p>
                Merit Advisory, its partners, and employees shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this website, or any actions taken based on content published on this platform.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1f2933]">6. Governing Law</h2>
              <p>
                These Terms of Service shall be governed by, and construed in accordance with, the applicable laws of the Federal Republic of Somalia.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
