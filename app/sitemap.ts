import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://manufacturing.lk' 

  // 1. Fetch all VERIFIED factories
  const { data: factories } = await supabase
    .from('factories')
    .select('slug, created_at')
    .eq('is_verified', true)

  // 2. Filter out the old 'null' ones, then map them
  const factoryUrls = (factories || [])
    .filter((factory) => factory.slug !== null && factory.slug !== '') // <-- THIS IS THE FIX
    .map((factory) => ({
      url: `${baseUrl}/factory/${factory.slug}`,
      lastModified: new Date(factory.created_at || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.8, 
    }))

  // 3. Define static pages
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0, 
    },
    {
      url: `${baseUrl}/submit`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  return [...staticUrls, ...factoryUrls]
}