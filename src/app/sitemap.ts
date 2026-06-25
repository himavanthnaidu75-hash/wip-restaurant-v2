import type { MetadataRoute } from 'next';

const SITE_URL = 'https://wiprestaurant.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${SITE_URL}/menu`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${SITE_URL}/reservations`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${SITE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  return routes;
}
