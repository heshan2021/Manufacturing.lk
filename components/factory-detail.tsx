"use client"

import { useState } from "react"
import Link from "next/link"
import { Factory } from "@/lib/factories-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Gauge,
  BadgeCheck,
  Users,
  MessageCircle,
  Mail,
  Phone,
  AlertCircle,
  Globe,
} from "lucide-react"

interface FactoryDetailProps {
  factory: any // Changed to any to handle Supabase data flexibly
}

export function FactoryDetail({ factory }: FactoryDetailProps) {
  const [showPhone, setShowPhone] = useState(false)

  const handleWhatsApp = () => {
    if (!factory?.whatsapp) {
      alert("This factory hasn't provided a WhatsApp number yet.")
      return
    }
    const cleanNumber = String(factory.whatsapp).replace(/\D/g, "")
    const message = encodeURIComponent(`Hello ${factory.name}, I found your listing on Manufacturing.lk...`)
    if (cleanNumber.length > 5) {
      window.open(`https://wa.me/${cleanNumber}?text=${message}`, "_blank", "noopener,noreferrer")
    } else {
      alert("Invalid WhatsApp number.")
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> 
            Back to directory
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            
            {/* Company Header */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">{factory?.name ?? "Unnamed Factory"}</h1>
                  <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{factory?.location ?? "No address"}, {factory?.district ?? ""}</span>
                  </div>
                </div>
                <Badge className={factory?.is_verified ? "bg-primary" : "bg-secondary text-secondary-foreground"}>
                  {factory?.is_verified ? <BadgeCheck className="mr-1.5 h-4 w-4" /> : <Users className="mr-1.5 h-4 w-4" />}
                  {factory?.status ?? "Community Sourced"}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>Est. {factory?.established ?? "Unknown"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Gauge className="h-4 w-4" />
                  <span>Capacity: {factory?.capacity ?? "Not specified"}</span>
                </div>
              </div>

              {/* Certifications Array Safety */}
              <div className="flex flex-wrap gap-2">
                {factory?.certifications?.length > 0 ? (
                  factory.certifications.map((cert: string) => (
                    <Badge key={cert} variant="outline">{cert}</Badge>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">No certifications listed</span>
                )}
              </div>
            </div>

            {/* About Section */}
            <Card>
              <CardHeader><CardTitle>About</CardTitle></CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {factory?.about ?? "No description provided for this factory."}
                </p>
              </CardContent>
            </Card>

            {/* Products & MOQ Table Safety */}
            <Card>
              <CardHeader><CardTitle>Products & MOQs</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Minimum Order Quantity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {factory?.products?.length > 0 ? (
                      factory.products.map((product: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{product.name ?? "Product"}</TableCell>
                          <TableCell className="text-right">
                            {/* FIX: The safety check for toLocaleString() */}
                            {(product.moq ?? 0).toLocaleString()} units
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={2} className="text-center text-muted-foreground py-4">No products listed</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Machinery Safety */}
            <Card>
              <CardHeader><CardTitle>Machinery & Capacity</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {factory?.machinery?.length > 0 ? (
                    factory.machinery.map((machine: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                        <div className="h-2 w-2 bg-primary rounded-full" />
                        <span>{machine}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-muted-foreground italic px-2">Information not provided</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <Card>
                <CardHeader><CardTitle>Contact Supplier</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <Button onClick={handleWhatsApp} className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white">
                    <MessageCircle className="mr-2 h-4 w-4" /> Chat on WhatsApp
                  </Button>
                  <Button onClick={() => window.open(`mailto:${factory?.email}`)} variant="outline" className="w-full">
                    <Mail className="mr-2 h-4 w-4" /> Email Inquiry
                  </Button>
                  <Button onClick={() => setShowPhone(!showPhone)} variant="outline" className="w-full">
                    <Phone className="mr-2 h-4 w-4" /> {showPhone ? (factory?.phone ?? "N/A") : "Reveal Phone Number"}
                  </Button>
                  {factory?.website && (
                    <Button onClick={() => window.open(factory.website, "_blank")} variant="secondary" className="w-full">
                      <Globe className="mr-2 h-4 w-4" /> Visit Website
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}