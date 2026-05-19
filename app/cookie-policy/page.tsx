import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Cookie Policy | Merit Advisory",
  description: "Read our Cookie Policy to understand how we use cookies and tracking mechanisms on our website.",
}

export default function CookiePolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight text-[#1f2933] sm:text-5xl">
              Cookie Policy
            </h1>
            <p className="mt-4 text-lg text-[#4b5563]">
              Last Updated: May 19, 2026
            </p>
          </div>

          <div className="prose prose-slate max-w-none space-y-8 text-base leading-relaxed text-[#4b5563]">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1f2933]">1. What Are Cookies</h2>
              <p>
                Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide reporting information.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1f2933]">2. How We Use Cookies</h2>
              <p>
                Merit Advisory uses cookies for several reasons, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Necessary to enable website features and navigation.</li>
                <li><strong>Performance and Analytics Cookies:</strong> To collect aggregate data on how visitors interact with the site, helping us optimize page performance and load times.</li>
                <li><strong>Preference Cookies:</strong> To remember your user settings, dashboard states, or calculation values on our calculators.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1f2933]">3. Controlling Cookies</h2>
              <p>
                You have the right to decide whether to accept or reject cookies. You can manage your cookie preferences through your web browser settings. Most browsers allow you to disable cookies completely, though some interactive elements on our website may not function perfectly as a result.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1f2933]">4. Third-Party Cookies</h2>
              <p>
                In some cases, we use cookies provided by trusted third parties, such as Google Analytics, to help us understand how you use our site and discover ways to improve your browsing experience.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#1f2933]">5. Policy Updates</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our tech stack, server environments, or statutory requirements. Please check back regularly to stay informed.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
