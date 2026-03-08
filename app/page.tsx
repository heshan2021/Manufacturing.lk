"use client"

import { useState, useMemo, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase" // Direct Supabase access
import { HeroSearch } from "@/components/hero-search"
import { FactoryCard } from "@/components/factory-card"
import { FilterSidebar } from "@/components/filter-sidebar"
import { FactoryDetail } from "@/components/factory-detail"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SlidersHorizontal, Package } from "lucide-react"
import { toast } from "sonner"

interface Filters {
  industries: string[]
  districts: string[]
  moqRange: string | null
  certifications: string[]
}

// Internal component to handle search params and toasts safely
function HomeContent() {
  const searchParams = useSearchParams()
  const [factories, setFactories] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedFactory, setSelectedFactory] = useState<any | null>(null)
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
      const { data, error } = await supabase
        .from('factories')
        .select('*')
        // We only show Verified or Community Sourced listings to the public
        .in('status', ['Verified', 'Community Sourced'])
        .order('is_verified', { ascending: false }); // Show verified ones first

      if (data) setFactories(data);
      if (error) console.error("Error fetching factories:", error);
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
    setSelectedFactory(null)
    setFilters({
      industries: [],
      districts: [],
      moqRange: null,
      certifications: [],
    })
  }

  const filteredFactories = useMemo(() => {
    return factories.filter((factory) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          factory.name.toLowerCase().includes(query) ||
          factory.products?.some((p: any) => p.name.toLowerCase().includes(query)) ||
          factory.machinery?.some((m: string) => m.toLowerCase().includes(query)) ||
          factory.industry.toLowerCase().includes(query) ||
          factory.location.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }

      // Industry filter
      if (filters.industries.length > 0) {
        if (!filters.industries.includes(factory.industry)) return false
      }

      // District filter
      if (filters.districts.length > 0) {
        if (!filters.districts.includes(factory.district)) return false
      }

      // MOQ Range filter (Using products array from JSONB)
      if (filters.moqRange) {
        const minMoq = Math.min(...(factory.products?.map((p: any) => p.moq) || [0]))
        const [min, max] = filters.moqRange.split("-").map((v) => {
          if (v.includes("+")) return Infinity
          return parseInt(v)
        })
        if (minMoq < min || minMoq > max) return false
      }

      // Certifications filter (Using array from JSONB)
      if (filters.certifications.length > 0) {
        const hasAllCerts = filters.certifications.every((cert) =>
          factory.certifications?.includes(cert)
        )
        if (!hasAllCerts) return false
      }

      return true
    })
  }, [factories, searchQuery, filters])

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    if (query.length > 0) setHasSearched(true)
  }

  if (selectedFactory) {
    return (
      <FactoryDetail
        factory={selectedFactory}
        onBack={() => setSelectedFactory(null)}
      />
    )
  }

  const activeFilterCount =
    filters.industries.length +
    filters.districts.length +
    (filters.moqRange ? 1 : 0) +
    filters.certifications.length

  return (
    <div className="min-h-screen bg-background">
      <HeroSearch
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchSubmit={() => setHasSearched(true)}
        resultsCount={filteredFactories.length}
        showResults={hasSearched}
        onLogoClick={resetSearch}
      />

      {hasSearched && (
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
                    <FactoryCard
                      key={factory.id}
                      factory={factory}
                      onClick={() => setSelectedFactory(factory)}
                    />
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
      )}

      {!hasSearched && (
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Featured Manufacturers</h2>
            <p className="text-muted-foreground">Discover verified factories across Sri Lanka</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {factories.filter(f => f.is_verified).slice(0, 6).map((factory) => (
              <FactoryCard
                key={factory.id}
                factory={factory}
                onClick={() => {
                  setSelectedFactory(factory)
                  setHasSearched(true)
                }}
              />
            ))}
          </div>
        </div>
      )}

      <footer className="border-t border-border bg-card mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">Manufacturing.lk</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Manufacturing.lk. Sri Lanka&apos;s B2B Manufacturing Directory.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Wrapper to provide Suspense for searchParams
export default function Home() {
  return (
    <Suspense fallback={<div>Loading directory...</div>}>
      <HomeContent />
    </Suspense>
  )
}