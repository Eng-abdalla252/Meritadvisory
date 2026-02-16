import { getServiceBySlug, getAllServiceSlugs, servicesDetail } from "@/lib/services-data"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ServiceDetailClient } from "./service-detail-client"

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return { title: "Service Not Found" }

  return {
    title: `${service.title} | Merit Advisory Services`,
    description: service.heroDescription,
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  // Find related services (exclude current)
  const related = servicesDetail
    .filter((s) => s.slug !== slug)
    .slice(0, 3)

  return <ServiceDetailClient service={service} related={related} />
}
