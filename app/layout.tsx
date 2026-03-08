import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import Link from 'next/link'
import { Toaster } from 'sonner'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Manufacturing.lk - Sri Lanka\'s B2B Manufacturing Directory',
  description: 'Find verified factories, manufacturers, and suppliers across Sri Lanka. Search by industry, location, MOQ, and certifications.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased min-h-screen flex flex-col bg-background text-foreground">
        
        {/* --- GLOBAL NAVIGATION BAR --- */}
        {/* Using bg-background and border-border to perfectly match your theme */}
        <header className="bg-background border-b border-border sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            
            {/* Logo / Home Link */}
            <Link href="/" className="text-2xl font-extrabold tracking-tight text-primary">
              Manufacturing<span className="text-foreground">.lk</span>
            </Link>

            {/* The CTA Button */}
            {/* Using bg-primary and text-primary-foreground matches your site's main button color */}
            <Link 
              href="/submit" 
              className="bg-primary text-primary-foreground px-5 py-2.5 rounded-md font-semibold text-sm hover:bg-primary/90 transition shadow-sm"
            >
              List Your Company
            </Link>
          </div>
        </header>

        {/* --- MAIN PAGE CONTENT --- */}
        <main className="flex-grow">
          {children}
        </main>

        {/* --- GLOBAL PROVIDERS --- */}
        <Toaster richColors position="top-center" />
        <Analytics />
        
      </body>
    </html>
  )
}