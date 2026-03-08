import { supabase } from "@/lib/supabase"
import type { Factory, Product } from "@/lib/factories-data"

interface FactoryRow {
  id: number
  name: string
  is_verified: boolean
  products: Product[]
  location: string
  district: string
  whatsapp: string
  email: string
  phone: string
  machinery: string[]
  status: "Verified" | "Community Sourced"
  industry: string
  certifications: string[]
  about: string
  capacity: string
  established: number
}

function rowToFactory(row: FactoryRow): Factory {
  return {
    id: row.id,
    name: row.name,
    isVerified: row.is_verified,
    products: row.products ?? [],
    location: row.location,
    district: row.district,
    whatsapp: row.whatsapp ?? "",
    email: row.email ?? "",
    phone: row.phone ?? "",
    machinery: row.machinery ?? [],
    status: row.status ?? "Community Sourced",
    industry: row.industry,
    certifications: row.certifications ?? [],
    about: row.about ?? "",
    capacity: row.capacity ?? "",
    established: row.established ?? 0,
  }
}

export async function fetchFactories(): Promise<Factory[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return []
  }

  const { data, error } = await supabase
    .from("factories")
    .select("*")
    .order("id", { ascending: true })

  if (error) {
    console.error("Supabase fetch error:", error)
    return []
  }

  return (data ?? []).map(rowToFactory)
}
