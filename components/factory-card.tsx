"use client"

import { Factory } from "@/lib/factories-data"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Package, BadgeCheck, Users } from "lucide-react"

interface FactoryCardProps {
  factory: Factory
  onClick: () => void
}

export function FactoryCard({ factory, onClick }: FactoryCardProps) {
  const minMoq = Math.min(...factory.products.map((p) => p.moq))

  return (
    <Card
      className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-primary/30 bg-card"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg leading-tight text-card-foreground">
            {factory.name}
          </h3>
          <Badge
            variant={factory.isVerified ? "default" : "secondary"}
            className={`shrink-0 ${
              factory.isVerified
                ? "bg-accent text-accent-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {factory.isVerified ? (
              <BadgeCheck className="mr-1 h-3 w-3" />
            ) : (
              <Users className="mr-1 h-3 w-3" />
            )}
            {factory.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="text-sm">{factory.location}, {factory.district}</span>
        </div>

        <div className="flex items-start gap-2 text-muted-foreground">
          <Package className="h-4 w-4 shrink-0 mt-0.5" />
          <span className="text-sm">
            {factory.products.map((p) => p.name).join(", ")}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-xs text-muted-foreground uppercase tracking-wide">
            Est. MOQ
          </span>
          <span className="font-semibold text-primary">
            {minMoq.toLocaleString()} units
          </span>
        </div>

        {factory.certifications.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {factory.certifications.slice(0, 3).map((cert) => (
              <Badge
                key={cert}
                variant="outline"
                className="text-xs border-border text-muted-foreground"
              >
                {cert}
              </Badge>
            ))}
            {factory.certifications.length > 3 && (
              <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                +{factory.certifications.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
