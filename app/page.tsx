"use client"

import { useState, useMemo, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase" 
import { HeroSearch } from "@/components/hero-search"
import { FactoryCard } from "@/components/factory-card"
import { FilterSidebar } from "@/components/filter-sidebar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SlidersHorizontal, Package, Star } from "lucide-react" // Added Star icon
import { toast } from "sonner"

interface Filters {
  industries: string[]
  districts: string[]
  moqRange: string | null
  certifications: string[]
}

function HomeContent() {
  const searchParams = useSearchParams()
  const [factories, setFactories] = useState<any[]>([])
  const [loading, setLoading] = useState(true) // Added loading state
  const [searchQuery, setSearchQuery] = useState("")
  const [hasSearched, setHasSearched] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    industries: [],
    districts: [],
    moqRange: null,
    certifications: [],
  })
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // 1. Fetch live data from Supabase
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('factories')
        .select('*')
        .in('status', ['Verified', 'Community Sourced'])
        .order('is_verified', { ascending: false }); 

      if (data) setFactories(data);
      if (error) console.error("Error fetching factories:", error);
      setLoading(false)
    };

    loadData();
  }, []);

  // 2. Handle Success Toast from /submit
  useEffect(() => {
    if (searchParams.get("success") === "true") {
      toast.success("Submission received!", {
        description: "Thank you for listing your company. Our team will review it shortly.",
      });
    }
  }, [searchParams]);

  const resetSearch = () => {
    setSearchQuery("")
    setHasSearched(false)
    setFilters({
      industries: [],
      districts: [],
      moqRange: null,
      certifications: [],
    })
  }

  const filteredFactories = useMemo(() => {
    return factories.filter((factory) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          factory.name?.toLowerCase().includes(query) ||
          factory.products?.some((p: any) => p.name?.toLowerCase().includes(query)) ||
          factory.machinery?.some((m: string) => m.toLowerCase().includes(query)) ||
          factory.industry?.toLowerCase().includes(query) ||
          factory.location?.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }

      if (filters.industries.length > 0) {
        if (!filters.industries.includes(factory.industry)) return false
      }

      if (filters.districts.length > 0) {
        if (!filters.districts.includes(factory.district)) return false
      }

      if (filters.moqRange) {
        const minMoq = Math.min(...(factory.products?.map((p: any) => p.moq) || [0]))
        const [min, max] = filters.moqRange.split("-").map((v) => {
          if (v.includes("+")) return Infinity
          return parseInt(v)
        })
        if (minMoq < min || minMoq > max) return false
      }

      if (filters.certifications.length > 0) {
        const hasAllCerts = filters.certifications.every((cert) =>
          factory.certifications?.includes(cert)
        )
        if (!hasAllCerts) return false
      }

      return true
    })
  }, [factories, searchQuery, filters])

  // Get only verified factories for the "Featured" section on the home screen
  const featuredFactories = useMemo(() => {
    return factories
      .filter(f => f.is_verified)
      .slice(0, 6)
  }, [factories])

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    if (query.length > 0) setHasSearched(true)
  }

  const activeFilterCount =
    filters.industries.length +
    filters.districts.length +
    (filters.moqRange ? 1 : 0) +
    filters.certifications.length

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSearch
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchSubmit={() => setHasSearched(true)}
        resultsCount={filteredFactories.length}
        showResults={hasSearched}
        onLogoClick={resetSearch}
      />

      {hasSearched ? (
        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-6">
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-6 border border-border rounded-lg overflow-hidden">
                <FilterSidebar filters={filters} onFiltersChange={setFilters} />
              </div>
            </aside>

            <div className="flex-1">
              <div className="lg:hidden mb-4">
                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="gap-2 border-border text-foreground">
                      <SlidersHorizontal className="h-4 w-4" />
                      Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 p-0">
                    <FilterSidebar
                      filters={filters}
                      onFiltersChange={setFilters}
                      onClose={() => setMobileFiltersOpen(false)}
                      isMobile
                    />
                  </SheetContent>
                </Sheet>
              </div>

              {filteredFactories.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredFactories.map((factory) => (
                    <Link 
                      href={`/factory/${factory.slug || factory.id}`} 
                      key={factory.id} 
                      className="block transition-transform hover:-translate-y-1"
                    >
                      <FactoryCard factory={factory} onClick={() => {}} />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No factories found</h3>
                  <Button variant="outline" onClick={resetSearch}>Clear all filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <h2 className="text-2xl font-bold">Featured Manufacturers</h2>
            </div>
            <p className="text-muted-foreground">Discover top-rated verified factories across Sri Lanka</p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">Loading listings...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {featuredFactories.map((factory) => (
                <Link 
                  href={`/factory/${factory.slug || factory.id}`} 
                  key={factory.id} 
                  className="block transition-transform hover:-translate-y-1"
                >
                  <FactoryCard factory={factory} onClick={() => {}} />
                </Link>
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
             <Button variant="secondary" onClick={() => setHasSearched(true)}>
                View All Manufacturers
             </Button>
          </div>
        </div>
      )}

      <footer className="border-t border-border bg-card mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground text-lg">Manufacturing.lk</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Manufacturing.lk. Sri Lanka&apos;s leading B2B Directory.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading directory...</div>}>
      <HomeContent />
    </Suspense>
  )
}