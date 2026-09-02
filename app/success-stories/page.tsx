"use client"

import * as React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { InternalPageHero } from "@/components/internal-page-hero"
import { Card } from "@/components/ui/card"
import {
  Star,
  BookOpen,
  FileText,
  TrendingUp,
} from "lucide-react"
import { motion } from "framer-motion"

interface SuccessStory {
  id: string
  name: string
  subtitle: string
  description: string
  category?: string
}

// Fallback stories in case fetch fails
const DEFAULT_STORIES: SuccessStory[] = [
  {
    id: "faysal-ahmed",
    name: "Faysal Ahmed Said",
    subtitle: "Scaling Livestock Trading in Garowe",
    description: "Faysal Ahmed Said is a livestock trader from Garowe who dreamed of expanding his business beyond the local market. Merit Advisory provided Faysal with a livestock financing facility, which enabled him to purchase larger herds and tap into regional markets. Within months, his trading volume tripled. He now employs two assistants and has become a respected figure in the regional livestock trade.",
  },
  {
    id: "mama-mahado",
    name: "Mama Mahado",
    subtitle: "Improved Harvest Through Micro-Agricultural Loans",
    description: "Mama Mahado is a small-scale farmer who had been struggling with low yield harvests for years. Through Merit's agribusiness financing program, she received a micro-agricultural loan that she used to purchase improved seeds, basic irrigation equipment, and storage solutions. The results were transformative — her harvest yields improved significantly, and she was able to sell surplus produce in the market. She can now sell to others and save for the future.",
  },
  {
    id: "mama-murayad",
    name: "Mama Murayad",
    subtitle: "Strengthening Livelihoods Through Bakery Expansion",
    description: "Mama Murayad, a small bakery owner, struggled for years with limited equipment and inconsistent supplies. With support from Merit Advisory, she accessed an initial loan which she used to purchase bakery machines and secure essential inputs. After successfully repaying her first loan, she secured a second financing to expand her operations, including opening a second shop. This growth not only increased her income but also created employment opportunities for family members. Today, Mama Murayad operates two bakery outlets with improved productivity and stable income.",
  },
  {
    id: "muhuba-mohamed",
    name: "Muhuba Mohamed Hassan",
    subtitle: "Expanding Market Presence",
    description: "Muhuba Mohamed Hassan, a vegetable trader in Garowe, faced persistent financial constraints that limited her ability to grow her business. With support from Merit Advisory, Muhuba accessed her first business loan, enabling her to buy vegetables in larger volumes directly from farmers. Building on this progress, Muhuba secured a second loan to expand her operations. She transitioned from retail trading into vegetable wholesaling, supplying produce to other vendors and strengthening her market presence. Now she can support her family, save money, and plan for the future with confidence.",
  },
  {
    id: "amina-osman",
    name: "Amina Osman",
    subtitle: "Scaling to Global Wholesale",
    description: "Amina Osman, an entrepreneur from Garowe, started with a small retail shop but struggled to grow due to limited capital and lack of collateral. Her breakthrough came through Merit Advisory, which provided her with a first loan to expand her inventory and increase sales. After successfully repaying the loan, Amina secured a second one, allowing her to source clothing from Mogadishu and Dubai. She transitioned into wholesale, supplying other traders and expanding her market reach. Today, Amina runs a thriving wholesale and retail business, improving her family's livelihood and inspiring others.",
  },
  {
    id: "khalif-ibrahim",
    name: "Khalif Abdulle Ibrahim",
    subtitle: "From Small Shop to Thriving Enterprise",
    description: "Everyday, Khalif Abdulle Ibrahim opened his small shop near Garowe's Ex-Control checkpoint with determination but also with a clear sense that he wanted more. After years of working as an employee, he was driven by a simple goal: to become self-employed and build something of his own. While the location brought steady customer traffic, the business struggled to move beyond survival. His turning point came when he accessed microfinance support from Merit Advisory. He invested the financing directly into his shop, focusing on fast-moving products that customers demanded most. Reflecting on the experience, Khalif describes the process as 'supportive and flexible,' allowing him to take a meaningful step forward without overwhelming pressure. As his stock became consistent and cash flow improved, the business began to grow. With increased sales and better planning, Khalif expanded his shop and introduced a cafeteria alongside it. This diversification brought in new customers and created additional income streams. For the first time, he was able to hire employees—transforming his business from a one-person effort into a source of employment for others.",
  },
]

export default function SuccessStoriesPage() {
  const [stories, setStories] = React.useState<SuccessStory[]>(DEFAULT_STORIES)

  React.useEffect(() => {
    fetch("/api/admin/data-api?type=success-stories")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // Transform data to match new format if needed
          const transformed = data.map((item: any) => ({
            id: item.id,
            name: item.author || item.client || item.name,
            subtitle: item.title || item.subtitle,
            description: item.quote || item.description,
            category: item.category,
          }))
          setStories(transformed.length > 0 ? transformed : DEFAULT_STORIES)
        }
      })
      .catch(() => {})
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        <InternalPageHero
          badge="Insights & Knowledge"
          title="Insights That Inspire and Inform"
          description="Discover how Merit Advisory partners with individuals and businesses to deliver transformative financial solutions and strategic advisory."
          primaryCTA={{
            label: "Explore Insights",
            href: "#stories"
          }}
          visual={
            <div className="relative bg-white rounded-3xl shadow-2xl shadow-blue-900/10 border border-slate-200 p-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl p-4 hover:bg-primary/5 transition-colors">
                  <BookOpen className="h-8 w-8 text-primary mb-2" />
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Articles</p>
                  <p className="text-sm text-foreground mt-1">Industry Analysis</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 hover:bg-primary/5 transition-colors">
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Reports</p>
                  <p className="text-sm text-foreground mt-1">Research Papers</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 hover:bg-primary/5 transition-colors">
                  <TrendingUp className="h-8 w-8 text-primary mb-2" />
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Case Studies</p>
                  <p className="text-sm text-foreground mt-1">Success Stories</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 hover:bg-primary/5 transition-colors">
                  <Star className="h-8 w-8 text-primary mb-2" />
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">News</p>
                  <p className="text-sm text-foreground mt-1">Latest Updates</p>
                </div>
              </div>
            </div>
          }
          variant="split-image"
        />

        <div className="mx-auto max-w-7xl px-6 py-16">
          {/* Success Stories List */}
          <div className="space-y-12">
            {stories.map((story, i) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="border-b border-slate-100 pb-12 last:border-0"
              >
                <div className="space-y-4">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                    {story.name}
                  </h2>
                  <h3 className="text-xl font-bold text-[#b22222]">
                    {story.subtitle}
                  </h3>
                  <p className="text-slate-600 font-medium leading-relaxed text-lg">
                    {story.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
