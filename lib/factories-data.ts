export interface Product {
  name: string
  moq: number
}

export interface Factory {
  id: number
  name: string
  isVerified: boolean
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

export const factories: Factory[] = [
  {
    id: 1,
    name: "Colombo Stitchworks",
    isVerified: false,
    products: [
      { name: "T-Shirts", moq: 100 },
      { name: "Hoodies", moq: 250 },
      { name: "Polo Shirts", moq: 150 },
    ],
    location: "Biyagama Export Zone",
    district: "Gampaha",
    whatsapp: "94771234567",
    email: "sales@colombostitchworks.lk",
    phone: "+94 11 234 5678",
    machinery: ["Single Needle x20", "Overlock x5", "Flatlock x3"],
    status: "Community Sourced",
    industry: "Apparel",
    certifications: ["ISO 9001"],
    about: "Colombo Stitchworks is a mid-sized garment manufacturer specializing in casual wear and sportswear. We have been serving local and international brands since 2008.",
    capacity: "15,000 pieces/month",
    established: 2008,
  },
  {
    id: 2,
    name: "Lanka Garments International",
    isVerified: true,
    products: [
      { name: "Denim Jeans", moq: 500 },
      { name: "Shorts", moq: 300 },
      { name: "Jackets", moq: 400 },
    ],
    location: "Katunayake FTZ",
    district: "Gampaha",
    whatsapp: "94772345678",
    email: "info@lankagarments.com",
    phone: "+94 11 345 6789",
    machinery: ["Denim Washing x2", "Heavy Duty Sewing x15", "Button Attach x8"],
    status: "Verified",
    industry: "Apparel",
    certifications: ["ISO 9001", "ISO 14001", "Fair Trade"],
    about: "Lanka Garments International is a leading denim manufacturer with state-of-the-art washing facilities. We export to major European and American brands.",
    capacity: "50,000 pieces/month",
    established: 1995,
  },
  {
    id: 3,
    name: "Ceylon Rubber Products",
    isVerified: true,
    products: [
      { name: "Rubber Gloves", moq: 10000 },
      { name: "Industrial Seals", moq: 5000 },
      { name: "Rubber Mats", moq: 1000 },
    ],
    location: "Horana Industrial Zone",
    district: "Kalutara",
    whatsapp: "94773456789",
    email: "export@ceylonrubber.lk",
    phone: "+94 34 226 7890",
    machinery: ["Vulcanizing Press x4", "Mixing Mill x2", "Injection Moulding x6"],
    status: "Verified",
    industry: "Rubber",
    certifications: ["ISO 9001", "SLS"],
    about: "Ceylon Rubber Products has been manufacturing high-quality rubber products for over 40 years. Our products are exported to 25+ countries worldwide.",
    capacity: "100,000 units/month",
    established: 1982,
  },
  {
    id: 4,
    name: "Kandy Tea Exports",
    isVerified: true,
    products: [
      { name: "Black Tea (Bulk)", moq: 1000 },
      { name: "Green Tea Bags", moq: 5000 },
      { name: "Specialty Tea", moq: 500 },
    ],
    location: "Kandy Industrial Estate",
    district: "Kandy",
    whatsapp: "94774567890",
    email: "orders@kandytea.com",
    phone: "+94 81 234 5678",
    machinery: ["Tea Rolling x8", "Drying Chamber x4", "Packaging Line x2"],
    status: "Verified",
    industry: "Tea",
    certifications: ["ISO 22000", "Fair Trade", "Rainforest Alliance"],
    about: "Kandy Tea Exports sources premium Ceylon tea from the highlands. We offer private labeling and custom blending services for international markets.",
    capacity: "20,000 kg/month",
    established: 1975,
  },
  {
    id: 5,
    name: "Southern Textiles Mills",
    isVerified: false,
    products: [
      { name: "Cotton Fabric", moq: 2000 },
      { name: "Polyester Blend", moq: 3000 },
      { name: "Jersey Knit", moq: 1500 },
    ],
    location: "Koggala FTZ",
    district: "Galle",
    whatsapp: "94775678901",
    email: "sales@southerntextiles.lk",
    phone: "+94 91 345 6789",
    machinery: ["Circular Knitting x12", "Dyeing Vats x6", "Finishing Line x2"],
    status: "Community Sourced",
    industry: "Textiles",
    certifications: ["ISO 9001"],
    about: "Southern Textiles Mills is a vertical textile manufacturer producing high-quality fabrics for the apparel industry. We specialize in knitted fabrics.",
    capacity: "80,000 meters/month",
    established: 2001,
  },
  {
    id: 6,
    name: "Negombo Fashion Factory",
    isVerified: false,
    products: [
      { name: "Swimwear", moq: 200 },
      { name: "Activewear", moq: 150 },
      { name: "Lingerie", moq: 300 },
    ],
    location: "Negombo Industrial Area",
    district: "Gampaha",
    whatsapp: "94776789012",
    email: "info@negombofashion.com",
    phone: "+94 31 456 7890",
    machinery: ["Specialized Sewing x25", "Bonding Machine x4", "Heat Press x6"],
    status: "Community Sourced",
    industry: "Apparel",
    certifications: ["OEKO-TEX"],
    about: "Negombo Fashion Factory specializes in intimate apparel and swimwear manufacturing with expertise in delicate fabrics and specialized construction techniques.",
    capacity: "25,000 pieces/month",
    established: 2010,
  },
  {
    id: 7,
    name: "Ratnapura Gem Polishing",
    isVerified: true,
    products: [
      { name: "Blue Sapphires", moq: 10 },
      { name: "Rubies", moq: 5 },
      { name: "Semi-precious Stones", moq: 50 },
    ],
    location: "Ratnapura Town",
    district: "Ratnapura",
    whatsapp: "94777890123",
    email: "gems@ratnapuragems.lk",
    phone: "+94 45 222 3456",
    machinery: ["Gem Cutting x10", "Polishing Wheel x15", "Grading Equipment x3"],
    status: "Verified",
    industry: "Gems",
    certifications: ["SLS", "GIA Certified"],
    about: "Ratnapura Gem Polishing is a family-owned business with three generations of expertise in cutting and polishing Ceylon gems to international standards.",
    capacity: "500 carats/month",
    established: 1965,
  },
  {
    id: 8,
    name: "Jaffna Coir Industries",
    isVerified: false,
    products: [
      { name: "Coir Mats", moq: 500 },
      { name: "Coir Rope", moq: 1000 },
      { name: "Coir Fiber", moq: 2000 },
    ],
    location: "Jaffna Industrial Estate",
    district: "Jaffna",
    whatsapp: "94778901234",
    email: "export@jaffnacoir.com",
    phone: "+94 21 234 5678",
    machinery: ["Fiber Extraction x4", "Spinning Machine x8", "Weaving Loom x6"],
    status: "Community Sourced",
    industry: "Coir",
    certifications: ["ISO 9001"],
    about: "Jaffna Coir Industries produces eco-friendly coir products using traditional methods combined with modern quality control standards.",
    capacity: "30,000 kg/month",
    established: 1998,
  },
  {
    id: 9,
    name: "Kurunegala Ceramics",
    isVerified: true,
    products: [
      { name: "Tableware Sets", moq: 100 },
      { name: "Decorative Items", moq: 50 },
      { name: "Tiles", moq: 500 },
    ],
    location: "Kurunegala Industrial Zone",
    district: "Kurunegala",
    whatsapp: "94779012345",
    email: "sales@kurceramics.lk",
    phone: "+94 37 222 3456",
    machinery: ["Kiln x3", "Pottery Wheel x20", "Glazing Station x8"],
    status: "Verified",
    industry: "Ceramics",
    certifications: ["ISO 9001", "SLS"],
    about: "Kurunegala Ceramics combines traditional Sri Lankan pottery techniques with modern design to create unique ceramic products for export markets.",
    capacity: "10,000 pieces/month",
    established: 1988,
  },
  {
    id: 10,
    name: "Trinco Seafood Processing",
    isVerified: false,
    products: [
      { name: "Frozen Prawns", moq: 500 },
      { name: "Dried Fish", moq: 1000 },
      { name: "Canned Tuna", moq: 2000 },
    ],
    location: "Trincomalee Harbor Area",
    district: "Trincomalee",
    whatsapp: "94770123456",
    email: "orders@trincoseafood.com",
    phone: "+94 26 234 5678",
    machinery: ["Flash Freezer x2", "Processing Line x4", "Canning Machine x2"],
    status: "Community Sourced",
    industry: "Food Processing",
    certifications: ["ISO 22000", "HACCP"],
    about: "Trinco Seafood Processing sources fresh catch from local fishermen and processes them to international food safety standards for export.",
    capacity: "50,000 kg/month",
    established: 2005,
  },
]

export const industries = [
  "Apparel",
  "Rubber",
  "Tea",
  "Textiles",
  "Gems",
  "Coir",
  "Ceramics",
  "Food Processing",
]

export const districts = [
  "Gampaha",
  "Kalutara",
  "Kandy",
  "Galle",
  "Ratnapura",
  "Jaffna",
  "Kurunegala",
  "Trincomalee",
]

export const moqRanges = [
  { label: "Less than 100", value: "0-100" },
  { label: "100 - 500", value: "100-500" },
  { label: "500 - 1,000", value: "500-1000" },
  { label: "1,000+", value: "1000+" },
]

export const certifications = ["ISO 9001", "ISO 14001", "ISO 22000", "Fair Trade", "SLS", "OEKO-TEX", "HACCP", "Rainforest Alliance", "GIA Certified"]
