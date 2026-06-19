const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';

export async function fetchProducts(filters = '') {
  try {
    // Strapi v5 uses flat response structures
    const res = await fetch(`${STRAPI_URL}/api/products?populate=*${filters ? '&' + filters : ''}`, {
      next: { revalidate: 60 } // Revalidate every minute
    });
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function fetchCategories() {
  try {
    const res = await fetch(`${STRAPI_URL}/api/categories?populate=*`, {
      next: { revalidate: 3600 } 
    });
    if (!res.ok) throw new Error('Failed to fetch categories');
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export function getStrapiMedia(url: string) {
  if (url == null) return null;
  if (url.startsWith('http') || url.startsWith('//')) return url;
  return `${STRAPI_URL}${url}`;
}
