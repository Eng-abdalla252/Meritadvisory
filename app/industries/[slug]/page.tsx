import { getIndustryBySlug, getAllIndustrySlugs, industriesDetail } from "@/lib/industries-data"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { IndustryDetailClient } from "./industry-detail-client"

export async function generateStaticParams() {
  return getAllIndustrySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const industry = getIndustryBySlug(slug)
  if (!industry) return { title: "Industry Not Found" }

  return {
    title: `${industry.title} | Merit Advisory Services`,
    description: industry.heroDescription,
  }
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const industry = getIndustryBySlug(slug)
  if (!industry) notFound()

  // Find related industries (exclude current)
  const related = industriesDetail
    .filter((s) => s.slug !== slug)
    .slice(0, 3)

  return <IndustryDetailClient industry={industry} related={related} />
}
