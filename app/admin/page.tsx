"use client"

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase' 
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  // --- CORE FIELDS ---
  const [name, setName] = useState('')
  const [district, setDistrict] = useState('')
  const [location, setLocation] = useState('')
  const [industry, setIndustry] = useState('') 

  // --- NEW EXTRA DETAILS ---
  const [about, setAbout] = useState('')
  const [capacity, setCapacity] = useState('')
  const [established, setEstablished] = useState('')
  
  // --- NEW CONTACT INFO ---
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [whatsapp, setWhatsapp] = useState('')

  // --- NEW ARRAYS (Machinery & Certifications as comma-separated text) ---
  const [machinery, setMachinery] = useState('') 
  const [certifications, setCertifications] = useState('')

  // --- NEW DYNAMIC PRODUCTS ARRAY ---
  const [products, setProducts] = useState([{ name: '', moq: '' }])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [factories, setFactories] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('') 

  const fetchMyFactories = async () => {
    const { data, error } = await supabase
      .from('factories')
      .select('*')
      .order('id', { ascending: false })
    
    if (data) setFactories(data)
  }

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
      } else {
        setUser(session.user)
        fetchMyFactories()
      }
    }
    checkSession()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  // Handle dynamic product changes
  const updateProduct = (index: number, field: 'name' | 'moq', value: string) => {
    const newProducts = [...products]
    newProducts[index][field] = value
    setProducts(newProducts)
  }

  const handleAddFactory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Format the arrays properly for Supabase JSONB columns
    const formattedMachinery = machinery.split(',').map(item => item.trim()).filter(Boolean)
    const formattedCertifications = certifications.split(',').map(item => item.trim()).filter(Boolean)
    
    // Filter out empty product rows and format MOQ as a number
    const formattedProducts = products
      .filter(p => p.name.trim() !== '')
      .map(p => ({ name: p.name.trim(), moq: parseInt(p.moq) || 0 }))

    const { error } = await supabase
      .from('factories')
      .insert([{ 
        name, district, location, industry,
        about, capacity, established: established ? parseInt(established) : null,
        email, phone, whatsapp,
        machinery: formattedMachinery,
        certifications: formattedCertifications,
        products: formattedProducts
      }])

    setIsSubmitting(false)

    if (error) {
      alert(`Error: ${error.message}`)
    } else {
      alert('Success! Full Factory Profile added.')
      // Reset form
      setName(''); setDistrict(''); setLocation(''); setIndustry('');
      setAbout(''); setCapacity(''); setEstablished('');
      setEmail(''); setPhone(''); setWhatsapp('');
      setMachinery(''); setCertifications('');
      setProducts([{ name: '', moq: '' }]);
      fetchMyFactories() 
    }
  }

  const handleDelete = async (id: number, factoryName: string) => {
    if (!window.confirm(`Are you sure you want to delete ${factoryName}?`)) return
    const { error } = await supabase.from('factories').delete().eq('id', id)
    if (error) alert(`Error deleting: ${error.message}`)
    else fetchMyFactories() 
  }

  const filteredFactories = factories.filter((factory) => {
    const searchLower = searchQuery.toLowerCase()
    return (
      factory.name?.toLowerCase().includes(searchLower) ||
      factory.industry?.toLowerCase().includes(searchLower) ||
      factory.district?.toLowerCase().includes(searchLower)
    )
  })

  if (!user) return <div className="p-8 text-center text-gray-500">Verifying secure access...</div>

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen font-sans">
      <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Logged in as: <span className="font-semibold text-blue-600">{user.email}</span></p>
        </div>
        <button onClick={handleLogout} className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-md transition font-medium border border-red-200">
          Logout
        </button>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* LEFT COLUMN: The Expanded Add Form (Takes up 3/5 of the screen) */}
        <div className="lg:col-span-3 bg-white p-8 rounded-lg shadow-sm border border-gray-200 h-fit">
          <h2 className="text-xl font-semibold mb-6">Add a New Factory Profile</h2>
          
          <form onSubmit={handleAddFactory} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Factory Name *</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry *</label>
                <input type="text" value={industry} onChange={(e) => setIndustry(e.target.value)} className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500" required placeholder="e.g. Apparel" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">District *</label>
                <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500" required placeholder="e.g. Colombo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500" required placeholder="e.g. Katunayake FTZ" />
              </div>
            </div>

            {/* About & Stats */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
              <textarea value={about} onChange={(e) => setAbout(e.target.value)} className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500 h-20" placeholder="Brief description of the factory..." />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Capacity</label>
                <input type="text" value={capacity} onChange={(e) => setCapacity(e.target.value)} className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 50,000 pieces" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year Established</label>
                <input type="number" value={established} onChange={(e) => setEstablished(e.target.value)} className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 2010" />
              </div>
            </div>

            {/* Arrays (Comma separated) */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Machinery (Comma separated)</label>
                <input type="text" value={machinery} onChange={(e) => setMachinery(e.target.value)} className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Juki Sewing x10, CNC Machine x2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Certifications (Comma separated)</label>
                <input type="text" value={certifications} onChange={(e) => setCertifications(e.target.value)} className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. ISO 9001, WRAP" />
              </div>
            </div>

            {/* Products Array */}
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">Products & MOQs</label>
              {products.map((product, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input type="text" placeholder="Product Name (e.g. Denim Jeans)" value={product.name} onChange={(e) => updateProduct(index, 'name', e.target.value)} className="flex-1 p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  <input type="number" placeholder="MOQ (e.g. 500)" value={product.moq} onChange={(e) => updateProduct(index, 'moq', e.target.value)} className="w-32 p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
              ))}
              <button type="button" onClick={() => setProducts([...products, { name: '', moq: '' }])} className="text-sm text-blue-600 hover:text-blue-800 font-medium mt-1">
                + Add another product
              </button>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                <input type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500" placeholder="Include country code" />
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition disabled:bg-blue-300 font-bold text-lg mt-4">
              {isSubmitting ? 'Saving...' : 'Publish Full Factory Profile'}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: The Factory List (Takes up 2/5 of the screen) */}
        <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-6">Manage Existing Factories</h2>
          
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by name, industry, or district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-gray-50"
            />
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[800px] pr-2">
            {filteredFactories.length === 0 ? (
              <p className="text-gray-500 italic text-center py-4">
                {searchQuery ? `No factories found matching "${searchQuery}".` : "No factories added yet."}
              </p>
            ) : (
              filteredFactories.map((factory) => (
                <div key={factory.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-md bg-gray-50 hover:bg-gray-100 transition">
                  <div>
                    <h3 className="font-semibold text-gray-800">{factory.name}</h3>
                    <p className="text-xs text-gray-500">{factory.district} • {factory.industry}</p>
                  </div>
                  <button 
                    onClick={() => handleDelete(factory.id, factory.name)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 bg-white border border-red-200 rounded shadow-sm hover:bg-red-50 transition"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}