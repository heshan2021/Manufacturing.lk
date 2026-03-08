"use client"

import { industries, districts, moqRanges, certifications } from "@/lib/factories-data"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { X } from "lucide-react"

interface Filters {
  industries: string[]
  districts: string[]
  moqRange: string | null
  certifications: string[]
}

interface FilterSidebarProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
  onClose?: () => void
  isMobile?: boolean
}

export function FilterSidebar({
  filters,
  onFiltersChange,
  onClose,
  isMobile,
}: FilterSidebarProps) {
  const handleIndustryChange = (industry: string, checked: boolean) => {
    const newIndustries = checked
      ? [...filters.industries, industry]
      : filters.industries.filter((i) => i !== industry)
    onFiltersChange({ ...filters, industries: newIndustries })
  }

  const handleDistrictChange = (district: string, checked: boolean) => {
    const newDistricts = checked
      ? [...filters.districts, district]
      : filters.districts.filter((d) => d !== district)
    onFiltersChange({ ...filters, districts: newDistricts })
  }

  const handleMoqChange = (value: string) => {
    onFiltersChange({
      ...filters,
      moqRange: filters.moqRange === value ? null : value,
    })
  }

  const handleCertificationChange = (cert: string, checked: boolean) => {
    const newCertifications = checked
      ? [...filters.certifications, cert]
      : filters.certifications.filter((c) => c !== cert)
    onFiltersChange({ ...filters, certifications: newCertifications })
  }

  const clearFilters = () => {
    onFiltersChange({
      industries: [],
      districts: [],
      moqRange: null,
      certifications: [],
    })
  }

  const hasActiveFilters =
    filters.industries.length > 0 ||
    filters.districts.length > 0 ||
    filters.moqRange !== null ||
    filters.certifications.length > 0

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="font-semibold text-lg text-card-foreground">Filters</h2>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear all
            </Button>
          )}
          {isMobile && onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {/* Industry Filter */}
          <div>
            <h3 className="font-medium mb-3 text-card-foreground">Industry</h3>
            <div className="space-y-2">
              {industries.map((industry) => (
                <div key={industry} className="flex items-center space-x-2">
                  <Checkbox
                    id={`industry-${industry}`}
                    checked={filters.industries.includes(industry)}
                    onCheckedChange={(checked) =>
                      handleIndustryChange(industry, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`industry-${industry}`}
                    className="text-sm cursor-pointer text-card-foreground"
                  >
                    {industry}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Location Filter */}
          <div>
            <h3 className="font-medium mb-3 text-card-foreground">Location (District)</h3>
            <div className="space-y-2">
              {districts.map((district) => (
                <div key={district} className="flex items-center space-x-2">
                  <Checkbox
                    id={`district-${district}`}
                    checked={filters.districts.includes(district)}
                    onCheckedChange={(checked) =>
                      handleDistrictChange(district, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`district-${district}`}
                    className="text-sm cursor-pointer text-card-foreground"
                  >
                    {district}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* MOQ Range Filter */}
          <div>
            <h3 className="font-medium mb-3 text-card-foreground">MOQ Range</h3>
            <div className="space-y-2">
              {moqRanges.map((range) => (
                <div key={range.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`moq-${range.value}`}
                    checked={filters.moqRange === range.value}
                    onCheckedChange={() => handleMoqChange(range.value)}
                  />
                  <Label
                    htmlFor={`moq-${range.value}`}
                    className="text-sm cursor-pointer text-card-foreground"
                  >
                    {range.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Certifications Filter */}
          <div>
            <h3 className="font-medium mb-3 text-card-foreground">Certifications</h3>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cert-${cert}`}
                    checked={filters.certifications.includes(cert)}
                    onCheckedChange={(checked) =>
                      handleCertificationChange(cert, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`cert-${cert}`}
                    className="text-sm cursor-pointer text-card-foreground"
                  >
                    {cert}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
