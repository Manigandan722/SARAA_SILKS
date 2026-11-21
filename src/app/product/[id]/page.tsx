import Link from 'next/link';
import { fetchProducts, getStrapiMedia } from '@/lib/api';
import { Truck, ShieldCheck, ArrowLeft, Sparkles, Check } from 'lucide-react';
import AddToCartButton from '@/components/AddToCartButton';
import ProductCard from '@/components/ProductCard';
import styles from '../Product.module.css';
import type { Metadata } from 'next';

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const resolvedParams = await params;
  const productArray = await fetchProducts(`filters[documentId][$eq]=${resolvedParams.id}`);
  const product = productArray?.[0];

  if (!product) {
    return {
      title: 'Product Not Found | Saraa Silks',
    };
  }

  return {
    title: `${product.title} | Saraa Silks and Sarees`,
    description: product.description || `Buy ${product.title} at Saraa Silks. Premium ethnic wear direct from manufacturer in Coimbatore.`,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const productArray = await fetchProducts(`filters[documentId][$eq]=${resolvedParams.id}`);
  const product = productArray?.[0];

  if (!product) {
    return (
      <div className={`container ${styles.productContainer}`} style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', marginBottom: '16px' }}>Product Not Found</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>The item you are looking for might have been moved or is currently unavailable.</p>
        <Link href="/shop" className="btn btn-primary">Browse All Products</Link>
      </div>
    );
  }

  // Get related products from same category
  const allCategoryProducts = await fetchProducts(`filters[category][slug][$eq]=${product.category.slug}`);
  const relatedProducts = allCategoryProducts.filter(p => p.documentId !== product.documentId).slice(0, 4);

  return (
    <div className={`container ${styles.productContainer}`}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', fontSize: '0.88rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
        <Link href="/" style={{ color: 'var(--text-secondary)' }}>Home</Link>
        <span>/</span>
        <Link href="/shop" style={{ color: 'var(--text-secondary)' }}>Shop</Link>
        <span>/</span>
        <Link href={`/shop/${product.category.slug}`} style={{ color: 'var(--text-secondary)' }}>{product.category.name}</Link>
        <span>/</span>
        <span style={{ color: 'var(--copper-light)' }}>{product.title}</span>
      </div>

      <div className={styles.layoutWrapper}>
        <div className={styles.leftColumn}>
          <div className={styles.imageCard}>
            <img
              src={getStrapiMedia(product.image?.url)}
              alt={product.title}
              className={styles.productImg}
            />
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--copper)',
              background: 'rgba(200, 118, 58, 0.1)',
              padding: '4px 10px',
              borderRadius: '100px',
              border: '1px solid var(--border)',
            }}>
              {product.category.name}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#4caf50' }}>
              <Check size={14} /> In Stock (Direct Manufacturer)
            </span>
          </div>

          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.sku}>SKU: {product.sku}</p>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '24px' }}>
            <span className={styles.price} style={{ marginBottom: 0 }}>₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span style={{ fontSize: '0.85rem', color: '#4caf50', fontWeight: 700 }}>
                  Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF)
                </span>
              </>
            )}
          </div>

          <p className={styles.description}>
            {product.description || 'Premium quality fabric woven with traditional craftsmanship and contemporary elegance. Perfect for weddings, celebrations, and daily sophistication. Direct from Coimbatore manufacturer.'}
          </p>

          <div className={styles.actions}>
            <AddToCartButton product={product} />
          </div>

          <div className={styles.featuresCard}>
            <div className={styles.featureItem}>
              <ShieldCheck className={styles.featureIcon} size={24} />
              <div className={styles.featureContent}>
                <h4>Direct Manufacturer Quality</h4>
                <p>Authentic quality guarantee, pre-checked before dispatch.</p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <Truck className={styles.featureIcon} size={24} />
              <div className={styles.featureContent}>
                <h4>Free Shipping Across India</h4>
                <p>Reliable doorstep delivery directly from our Coimbatore facility.</p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <Sparkles className={styles.featureIcon} size={24} />
              <div className={styles.featureContent}>
                <h4>Instant WhatsApp Confirmation</h4>
                <p>Chat directly with our team for customization, live photos, and updates.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section style={{ marginTop: '80px', borderTop: '1px solid var(--border-light)', paddingTop: '60px' }}>
          <div style={{ marginBottom: '32px' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--copper)' }}>More from this category</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--text)', marginTop: '4px' }}>
              You May Also Like
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' }}>
            {relatedProducts.map((relProduct, i) => (
              <ProductCard key={relProduct.documentId} product={relProduct} delay={i * 75} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
