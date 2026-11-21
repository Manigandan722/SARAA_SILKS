import Link from 'next/link';
import { fetchProducts, fetchCategories } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import CategoryIcon from '@/components/CategoryIcon';
import styles from './Shop.module.css';

export const metadata = {
  title: 'Shop All Collections | Saraa Silks and Sarees',
  description: 'Explore our complete collection of Sarees, Chudithars, Nighties, Men\'s Wear, Dhoti and Kids Wear. Direct manufacturer prices.',
};

export default async function ShopPage() {
  const products = await fetchProducts();
  const categories = await fetchCategories();

  return (
    <div className={`container ${styles.shopContainer}`}>
      <aside className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>Categories</h3>
        <ul className={styles.categoryList}>
          <li>
            <Link href="/shop" className={`${styles.categoryLink} ${styles.activeCategory}`}>
              <CategoryIcon slug="all" size={18} style={{ color: 'var(--copper-light)', flexShrink: 0 }} />
              <span>All Products ({products.length})</span>
            </Link>
          </li>
          {categories.map((cat) => (
            <li key={cat.documentId}>
              <Link href={`/shop/${cat.slug}`} className={styles.categoryLink}>
                <CategoryIcon slug={cat.slug} size={18} style={{ color: 'var(--copper-light)', flexShrink: 0 }} />
                <span>{cat.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      <main className={styles.mainContent}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <h1 className={styles.pageTitle} style={{ marginBottom: 0 }}>All Products</h1>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Showing {products.length} products</span>
        </div>

        <div className={styles.productGrid}>
          {products && products.length > 0 ? (
            products.map((product, i) => (
              <ProductCard key={product.documentId} product={product} delay={i * 50} />
            ))
          ) : (
            <p style={{ color: 'var(--text-secondary)' }}>No products found.</p>
          )}
        </div>
      </main>
    </div>
  );
}
