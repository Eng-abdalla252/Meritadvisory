import { getSolutionBySlug, getAllSolutionSlugs, solutionsDetail } from "@/lib/solutions-data"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { SolutionDetailClient } from "./solution-detail-client"

export async function generateStaticParams() {
  return getAllSolutionSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const solution = getSolutionBySlug(slug)
  if (!solution) return { title: "Solution Not Found" }

  return {
    title: `${solution.title} | Merit Advisory Services`,
    description: solution.heroDescription,
  }
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const solution = getSolutionBySlug(slug)
  if (!solution) notFound()

  // Find related solutions (exclude current)
  const related = solutionsDetail
    .filter((s) => s.slug !== slug)
    .slice(0, 3)

  return <SolutionDetailClient solution={solution} related={related} />
}
