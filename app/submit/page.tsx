import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function SubmitCompanyPage() {
  async function submitCompany(formData: FormData) {
    "use server";

    // 1. Gather text fields
    const name = formData.get("name") as string;
    const industry = formData.get("industry") as string;
    const location = formData.get("location") as string;
    const district = formData.get("district") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const website = formData.get("website") as string; // <-- NEW!
    const about = formData.get("about") as string;
    const capacity = formData.get("capacity") as string;
    
    // 2. Handle Numbers
    const establishedStr = formData.get("established") as string;
    const established = establishedStr ? parseInt(establishedStr, 10) : null;

    // 3. Handle JSONB fields
    const productsStr = formData.get("products") as string;
    const products = productsStr ? productsStr.split(',').map(item => item.trim()).filter(Boolean) : [];

    const certsStr = formData.get("certifications") as string;
    const certifications = certsStr ? certsStr.split(',').map(item => item.trim()).filter(Boolean) : [];

    // 4. Send to Supabase
    const { error } = await supabase.from("factories").insert([
      {
        name,
        industry,
        location,
        district,
        email,
        phone,
        whatsapp,
        website,           // <-- NEW!
        about,
        capacity,
        established,
        products,          
        certifications,    
        status: "Community Sourced", 
        is_verified: false
      },
    ]);

    if (error) {
      console.error("Submission error:", error);
      throw new Error(`Failed to submit: ${error.message}`);
    }

    // Redirect home
    redirect("/?success=true");
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 mb-20">
      <div className="mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold">List Your Manufacturing Company</h1>
        <p className="text-gray-500 mt-2">
          Join Sri Lanka's leading manufacturing directory. Fill out your complete profile below for review.
        </p>
      </div>

      <form action={submitCompany} className="space-y-8">
        {/* SECTION 1: Basic Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">1. Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Company Name *</Label>
              <Input id="name" name="name" required placeholder="e.g. Ceylon Tea Exports Ltd." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry *</Label>
              <Input id="industry" name="industry" required placeholder="e.g. Apparel, Tea, Rubber" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="about">About the Company</Label>
            <Textarea 
              id="about" 
              name="about" 
              placeholder="Tell us about your manufacturing history, capabilities, etc..."
              rows={4}
            />
          </div>
        </div>

        {/* SECTION 2: Contact & Location */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">2. Contact & Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Contact Email</Label>
              <Input id="email" name="email" type="email" placeholder="hello@company.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" placeholder="+94 77 123 4567" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp Number</Label>
              <Input id="whatsapp" name="whatsapp" placeholder="+94 77 123 4567" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" name="website" type="url" placeholder="https://www.company.lk" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="district">District *</Label>
              <select 
                id="district" 
                name="district" 
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select a District...</option>
                <option value="Colombo">Colombo</option>
                <option value="Gampaha">Gampaha</option>
                <option value="Kalutara">Kalutara</option>
                <option value="Kandy">Kandy</option>
                <option value="Galle">Galle</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Full Address / Location *</Label>
            <Input id="location" name="location" required placeholder="123 Industrial Estate, Kelaniya" />
          </div>
        </div>

        {/* SECTION 3: Manufacturing Details */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">3. Manufacturing Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="established">Year Established</Label>
              <Input id="established" name="established" type="number" placeholder="e.g. 1995" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity">Production Capacity</Label>
              <Input id="capacity" name="capacity" placeholder="e.g. 50,000 pieces/month" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="products">Products (Comma separated)</Label>
              <Input id="products" name="products" placeholder="Denim, Activewear, Shirts" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="certifications">Certifications (Comma separated)</Label>
              <Input id="certifications" name="certifications" placeholder="ISO 9001, SLS" />
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full text-lg h-12">
          Submit Company
        </Button>
      </form>
    </div>
  );
}