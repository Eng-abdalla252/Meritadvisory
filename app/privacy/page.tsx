import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Privacy Policy | Merit Advisory",
  description: "Learn more about how Merit Advisory protects, processes, and manages your personal and business data.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight text-[#1f2933] sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg text-[#4b5563]">
              Last Updated: May 19, 2026
            </p>
          </div>

          <div className="prose prose-slate max-w-none space-y-8 text-base leading-relaxed text-[#4b5563]">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1f2933]">1. Introduction</h2>
              <p>
                Merit Advisory ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website (meritadvisory.so) or engage with our professional services including audit, accounting, advisory, and digital solutions.
              </p>
              <p>
                By using our website and services, you consent to the data practices described in this policy.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1f2933]">2. Information We Collect</h2>
              <p>
                We may collect personal identification information from you in a variety of ways, including, but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Contact Information:</strong> Name, email address, phone number, and physical office addresses when you request a consultation, submit booking requests, or use our project estimator.</li>
                <li><strong>Professional Credentials:</strong> Employment details, educational background, CVs, and qualifications when you apply for a job via our Recruitment Portal.</li>
                <li><strong>Usage Data:</strong> Information about your interaction with our site, including IP addresses, browser types, and access times collected via cookies.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1f2933]">3. How We Use Your Information</h2>
              <p>
                We use the information we collect to operate, maintain, and improve our services, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To deliver requested professional consulting, auditing, or bookkeeping advisory.</li>
                <li>To manage and process job applications submitted through our careers and recruitment forms.</li>
                <li>To customize your user experience and calculate implementation estimates for corporate systems.</li>
                <li>To send periodic newsletters, updates, or direct communications via WhatsApp or Email regarding active advisory services.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1f2933]">4. Security of Data</h2>
              <p>
                We prioritize securing your information. We implement robust physical, technical, and administrative security measures to protect your personal and commercial data against unauthorized access, loss, or manipulation.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1f2933]">5. Sharing and Disclosure</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share data with trusted third-party service providers (such as hosting partners or system integration API services) who assist us in operating our business and maintaining the site, provided they agree to maintain strict confidentiality.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1f2933]">6. Contact Us</h2>
              <p>
                If you have any questions or suggestions regarding our Privacy Policy, please feel free to reach out to us:
              </p>
              <ul className="list-none space-y-1">
                <li><strong>Email:</strong> info@meritadvisory.so</li>
                <li><strong>WhatsApp Support:</strong> +1 672-572-3750</li>
                <li><strong>Offices:</strong> Mogadishu, Hargeisa, Garowe & Bosaso, Somalia</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
