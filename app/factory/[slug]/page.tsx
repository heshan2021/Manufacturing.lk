import { supabase } from '@/lib/supabase'
import { FactoryDetail } from '@/components/factory-detail'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

// 1. Automatically generate Google SEO Tags based on the factory data
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Await params in Next.js 15+ (if you are using the latest version)
  const resolvedParams = await params;
  
  const { data: factory } = await supabase
    .from('factories')
    .select('name, industry, location, district')
    .eq('slug', resolvedParams.slug)
    .single()

  if (!factory) return { title: 'Factory Not Found | Manufacturing.lk' }

  return {
    title: `${factory.name} - ${factory.industry} Manufacturer in Sri Lanka`,
    description: `Contact ${factory.name} located in ${factory.location}, ${factory.district}. View their production capacity, machinery, and MOQs on Manufacturing.lk.`,
  }
}

// 2. The Server Component that renders the page
export default async function FactoryProfilePage({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;

  const { data: factory } = await supabase
    .from('factories')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single()

  if (!factory) {
    notFound() // Shows a 404 page if someone types a bad URL
  }

  // Render the full page view without passing any functions!
  return (
    <div className="bg-background min-h-screen">
      <FactoryDetail factory={factory} />
    </div>
  )
}