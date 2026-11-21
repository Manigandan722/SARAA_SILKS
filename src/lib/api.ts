/**
 * PURE FRONTEND - 100% FIXED STATIC CONTENT
 * NO BACKEND SERVER, NO DATABASE, AND NO EXTERNAL API REQUIRED.
 * All product and category data is loaded locally and statically from src/data/products.ts.
 */
import { PRODUCTS, CATEGORIES, type Product, type Category, type ProductImage, WHATSAPP_NUMBER } from '@/data/products';

export type StrapiImage = ProductImage;
export type { Product, Category, ProductImage };
export { PRODUCTS, CATEGORIES, WHATSAPP_NUMBER };

function normalizeSlug(slug: string): string {
  const s = slug.toLowerCase().trim();
  if (s === 'nighties' || s === 'women-s-nighties') return 'women-s-nighties';
  if (s === 'newborn-baby-dress' || s === 'born-baby-dress') return 'born-baby-dress';
  return s;
}

export async function fetchProducts(filters = ''): Promise<Product[]> {
  // If no filters passed, return all products
  if (!filters) {
    return PRODUCTS;
  }

  // Check if filtering by documentId
  const docIdMatch = filters.match(/filters\[documentId\]\[\$eq\]=([^&]+)/);
  if (docIdMatch) {
    const id = docIdMatch[1];
    const match = PRODUCTS.filter(p => p.documentId.toLowerCase() === id.toLowerCase() || p.sku.toLowerCase() === id.toLowerCase());
    return match;
  }

  // Check if filtering by category slug
  const catMatch = filters.match(/filters\[category\]\[slug\]\[\$eq\]=([^&]+)/);
  if (catMatch) {
    const slug = normalizeSlug(catMatch[1]);
    return PRODUCTS.filter(p => normalizeSlug(p.category.slug) === slug);
  }

  // Fallback direct string match (e.g. if category slug is passed directly)
  const normFilter = normalizeSlug(filters);
  const matched = PRODUCTS.filter(p => normalizeSlug(p.category.slug) === normFilter);
  if (matched.length > 0) {
    return matched;
  }

  return PRODUCTS;
}

export async function fetchCategories(): Promise<Category[]> {
  return CATEGORIES;
}

export function getStrapiMedia(url?: string | null): string {
  if (!url) return '/images/saree.png';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//') || url.startsWith('/')) {
    return url;
  }
  return `/${url}`;
}
