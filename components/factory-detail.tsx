"use client"

import { useState } from "react"
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
} from "lucide-react"

interface FactoryDetailProps {
  factory: Factory
  onBack: () => void
}

export function FactoryDetail({ factory, onBack }: FactoryDetailProps) {
  const [showPhone, setShowPhone] = useState(false)

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${factory.whatsapp}`, "_blank")
  }

  const handleEmail = () => {
    window.open(`mailto:${factory.email}?subject=Inquiry from Manufacturing.lk`, "_blank")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to results
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Header */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{factory.name}</h1>
                  <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{factory.location}, {factory.district}</span>
                  </div>
                </div>
                <Badge
                  variant={factory.isVerified ? "default" : "secondary"}
                  className={`text-sm py-1.5 px-3 ${
                    factory.isVerified
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {factory.isVerified ? (
                    <BadgeCheck className="mr-1.5 h-4 w-4" />
                  ) : (
                    <Users className="mr-1.5 h-4 w-4" />
                  )}
                  {factory.status}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>Est. {factory.established}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Gauge className="h-4 w-4" />
                  <span>Capacity: {factory.capacity}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {factory.certifications.map((cert) => (
                  <Badge key={cert} variant="outline" className="border-border text-foreground">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Claim Banner */}
            {!factory.isVerified && (
              <Card className="border-primary/30 bg-primary/5">
                <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Are you the owner?</p>
                      <p className="text-sm text-muted-foreground">
                        Claim this listing to update your MOQ and Machinery.
                      </p>
                    </div>
                  </div>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0">
                    Claim This Listing
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* About Section */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{factory.about}</p>
              </CardContent>
            </Card>

            {/* Products & MOQ Table */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Products & MOQs</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-muted-foreground">Product</TableHead>
                      <TableHead className="text-right text-muted-foreground">Minimum Order Quantity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {factory.products.map((product, index) => (
                      <TableRow key={index} className="border-border">
                        <TableCell className="font-medium text-card-foreground">{product.name}</TableCell>
                        <TableCell className="text-right text-card-foreground">
                          {product.moq.toLocaleString()} units
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Machinery & Capacity */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">Machinery & Capacity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {factory.machinery.map((machine, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-secondary rounded-lg"
                    >
                      <div className="h-2 w-2 bg-primary rounded-full" />
                      <span className="text-secondary-foreground">{machine}</span>
                    </div>
                  ))}
                </div>
                <Separator className="my-4 bg-border" />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Monthly Capacity</span>
                  <span className="font-semibold text-card-foreground">{factory.capacity}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Sidebar - Sticky */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Contact Supplier</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={handleWhatsApp}
                    className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chat on WhatsApp
                  </Button>

                  <Button
                    onClick={handleEmail}
                    variant="outline"
                    className="w-full border-border text-foreground hover:bg-secondary"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Email Inquiry
                  </Button>

                  <Button
                    onClick={() => setShowPhone(!showPhone)}
                    variant="outline"
                    className="w-full border-border text-foreground hover:bg-secondary"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    {showPhone ? factory.phone : "Reveal Phone Number"}
                  </Button>

                  <Separator className="my-4 bg-border" />

                  <div className="text-sm text-muted-foreground">
                    <p className="mb-2">Industry</p>
                    <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                      {factory.industry}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
