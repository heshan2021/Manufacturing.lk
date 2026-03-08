"use client"

import { useState } from 'react'
import { supabase } from '@/lib/supabase' 
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Plus } from "lucide-react"

export default function SubmitCompanyPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // --- MIRRORED STATE FROM ADMIN DASHBOARD ---
  const [name, setName] = useState('')
  const [district, setDistrict] = useState('')
  const [location, setLocation] = useState('')
  const [industry, setIndustry] = useState('') 
  const [about, setAbout] = useState('')
  const [capacity, setCapacity] = useState('')
  const [established, setEstablished] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [website, setWebsite] = useState('')
  const [machinery, setMachinery] = useState('') 
  const [certifications, setCertifications] = useState('')
  const [products, setProducts] = useState([{ name: '', moq: '' }])

  const updateProduct = (index: number, field: 'name' | 'moq', value: string) => {
    const newProducts = [...products]
    newProducts[index][field] = value
    setProducts(newProducts)
  }

  const handlePublicSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // --- SEO SLUG GENERATOR ---
    // Converts "Lanka Textiles (Pvt) Ltd!" into "lanka-textiles-pvt-ltd"
    const generatedSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-') // Replace spaces and special chars with hyphens
      .replace(/(^-|-$)+/g, '')    // Remove leading/trailing hyphens

    // --- MIRRORED FORMATTING LOGIC ---
    const formattedMachinery = machinery.split(',').map(item => item.trim()).filter(Boolean)
    const formattedCertifications = certifications.split(',').map(item => item.trim()).filter(Boolean)
    const formattedProducts = products
      .filter(p => p.name.trim() !== '')
      .map(p => ({ name: p.name.trim(), moq: parseInt(p.moq) || 0 }))

    const { error } = await supabase
      .from('factories')
      .insert([{ 
        name,
        slug: generatedSlug, // <--- ADDING THE SLUG TO THE DATABASE INSERT
        district, location, industry,
        about, capacity, established: established ? parseInt(established) : null,
        email, phone, whatsapp, website, 
        machinery: formattedMachinery,
        certifications: formattedCertifications,
        products: formattedProducts,
        status: 'Community Sourced', 
        is_verified: false          
      }])

    setIsSubmitting(false)

    if (error) {
      toast.error(`Submission failed: ${error.message}`)
    } else {
      router.push('/?success=true')
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto min-h-screen font-sans">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">List Your Company</h1>
        <p className="text-gray-500 mt-3 text-lg">
          Join the directory. Fill out your factory profile for review.
        </p>
      </div>

      <form onSubmit={handlePublicSubmit} className="space-y-10">
        
        {/* SECTION 1: Identity */}
        <Card className="shadow-sm border-gray-200">
          <CardHeader><CardTitle className="text-xl">1. Company Identity</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Factory Name *</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Official Registered Name" />
            </div>
            <div className="space-y-2">
              <Label>Industry *</Label>
              <Input value={industry} onChange={(e) => setIndustry(e.target.value)} required placeholder="e.g., Apparel, Rubber" />
            </div>
            <div className="space-y-2">
              <Label>District *</Label>
              <Input value={district} onChange={(e) => setDistrict(e.target.value)} required placeholder="e.g., Gampaha" />
            </div>
            <div className="space-y-2">
              <Label>Full Address / Location *</Label>
              <Input value={location} onChange={(e) => setLocation(e.target.value)} required placeholder="Factory street address" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label>About</Label>
              <Textarea value={about} onChange={(e) => setAbout(e.target.value)} placeholder="Describe your factory's history and specialties..." className="h-24" />
            </div>
          </CardContent>
        </Card>

        {/* SECTION 2: Capabilities */}
        <Card className="shadow-sm border-gray-200">
          <CardHeader><CardTitle className="text-xl">2. Production Capabilities</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Machinery (Comma separated)</Label>
                <Input value={machinery} onChange={(e) => setMachinery(e.target.value)} placeholder="CNC x2, Juki Sewing x20" />
              </div>
              <div className="space-y-2">
                <Label>Certifications (Comma separated)</Label>
                <Input value={certifications} onChange={(e) => setCertifications(e.target.value)} placeholder="ISO 9001, SLS" />
              </div>
              <div className="space-y-2">
                <Label>Monthly Capacity</Label>
                <Input value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="e.g., 10,000 units" />
              </div>
              <div className="space-y-2">
                <Label>Year Established</Label>
                <Input type="number" value={established} onChange={(e) => setEstablished(e.target.value)} placeholder="YYYY" />
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <Label className="text-base font-semibold mb-4 block">Products & MOQs</Label>
              {products.map((product, index) => (
                <div key={index} className="flex gap-3 mb-3">
                  <Input placeholder="Product Name" value={product.name} onChange={(e) => updateProduct(index, 'name', e.target.value)} className="flex-1 bg-white" />
                  <Input type="number" placeholder="MOQ" value={product.moq} onChange={(e) => updateProduct(index, 'moq', e.target.value)} className="w-32 bg-white" />
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => setProducts([...products, { name: '', moq: '' }])} className="mt-2">
                <Plus className="h-4 w-4 mr-1" /> Add product
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* SECTION 3: Contact */}
        <Card className="shadow-sm border-gray-200">
          <CardHeader><CardTitle className="text-xl">3. Contact Information</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2"><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            <div className="space-y-2"><Label>Phone</Label><Input value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
            <div className="space-y-2"><Label>WhatsApp</Label><Input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} /></div>
            <div className="space-y-2"><Label>Website</Label><Input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://..." /></div>
          </CardContent>
        </Card>

        <Button type="submit" disabled={isSubmitting} className="w-full h-14 text-xl font-bold shadow-lg">
          {isSubmitting ? 'Processing Submission...' : 'Submit Application'}
        </Button>
      </form>
    </div>
  )
}