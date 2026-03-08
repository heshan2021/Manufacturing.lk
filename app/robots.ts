import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://manufacturing.lk' // Replace with actual domain

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/login'], // Keep Google OUT of your secure admin areas!
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}