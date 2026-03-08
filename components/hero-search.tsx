"use client"

import { Search, Factory } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link" // Import Link for global navigation

interface HeroSearchProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onSearchSubmit: () => void
  resultsCount: number
  showResults: boolean
  onLogoClick?: () => void
}

export function HeroSearch({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  resultsCount,
  showResults,
  onLogoClick,
}: HeroSearchProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearchSubmit()
  }

  return (
    <div className={`bg-card border-b border-border transition-all duration-300 ${showResults ? 'py-6' : 'py-16 md:py-24'}`}>
      <div className="container mx-auto px-4">
        <div className={`max-w-4xl mx-auto text-center ${showResults ? 'space-y-4' : 'space-y-8'}`}>
          
          {/* LOGO SECTION: Wrapped in Link to ensure it works on every page */}
          <div className="flex items-center justify-center">
            <Link 
              href="/" 
              onClick={onLogoClick} // Still calls reset logic if on home page
              className="flex items-center justify-center gap-3 group"
            >
              <Factory className={`text-primary transition-transform group-hover:scale-110 ${showResults ? 'h-6 w-6' : 'h-10 w-10'}`} />
              <h1 className={`font-bold text-foreground tracking-tight transition-all ${showResults ? 'text-xl' : 'text-4xl md:text-5xl'}`}>
                Manufacturing.lk
              </h1>
            </Link>
          </div>

          {!showResults && (
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Sri Lanka&apos;s trusted B2B manufacturing directory. Find verified factories, compare MOQs, and connect with suppliers.
            </p>
          )}

          <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for a factory, product (e.g. T-shirt), or machinery..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className={`pl-12 pr-24 bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary ${showResults ? 'h-12 text-base' : 'h-14 text-lg'}`}
              />
              <Button
                type="submit"
                className={`absolute right-2 bg-primary text-primary-foreground hover:bg-primary/90 ${showResults ? 'h-8' : 'h-10'}`}
              >
                Search
              </Button>
            </div>
          </form>

          {showResults && (
            <p className="text-sm text-muted-foreground">
              Found <span className="font-semibold text-foreground">{resultsCount}</span> {resultsCount === 1 ? 'factory' : 'factories'}
            </p>
          )}

          {!showResults && (
            <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
              <span>Popular:</span>
              <button
                type="button"
                onClick={() => onSearchChange("T-Shirts")}
                className="text-primary hover:underline"
              >
                T-Shirts
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => onSearchChange("Rubber")}
                className="text-primary hover:underline"
              >
                Rubber Products
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => onSearchChange("Tea")}
                className="text-primary hover:underline"
              >
                Ceylon Tea
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}