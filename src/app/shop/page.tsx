import Link from 'next/link';
import { fetchProducts, fetchCategories, getStrapiMedia } from '@/lib/api';

export default async function ShopPage() {
  const products = await fetchProducts();
  const categories = await fetchCategories();

  return (
    <div className="container" style={{ padding: '60px 20px', display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
      <aside style={{ flex: '1 1 250px', maxWidth: '300px' }}>
        <h3 style={{ marginBottom: '20px', color: 'var(--primary-color)' }}>Categories</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}><Link href="/shop" style={{ fontWeight: 'bold' }}>All Products</Link></li>
          {categories.map((cat: any) => (
            <li key={cat.documentId} style={{ marginBottom: '10px' }}>
              <Link href={`/shop/${cat.slug}`}>{cat.name}</Link>
            </li>
          ))}
        </ul>
      </aside>
      <main style={{ flex: '3 1 600px' }}>
        <h1 style={{ marginBottom: '30px' }}>All Products</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '30px' }}>
          {products && products.length > 0 ? products.map((product: any) => (
            <Link href={`/product/${product.documentId}`} key={product.documentId} style={{ background: 'var(--surface-color)', borderRadius: 'var(--border-radius)', overflow: 'hidden', boxShadow: 'var(--box-shadow)', display: 'block' }}>
              <div style={{ height: '250px', background: 'var(--surface-color)', position: 'relative', overflow: 'hidden' }}>
                {product.image?.url ? (
                  <img src={getStrapiMedia(product.image.url) || ''} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'var(--accent-color)' }}></div>
                )}
              </div>
              <div style={{ padding: '20px' }}>
                <h4 style={{ marginBottom: '10px' }}>{product.title}</h4>
                <div style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>₹{product.price}</div>
              </div>
            </Link>
          )) : (
            <p>No products found.</p>
          )}
        </div>
      </main>
    </div>
  );
}
