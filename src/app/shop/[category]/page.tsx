import Link from 'next/link';
import { fetchProducts, fetchCategories } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import CategoryIcon from '@/components/CategoryIcon';
import styles from '../Shop.module.css';
import type { Metadata } from 'next';

function normalizeSlug(s: string) {
  const slug = s.toLowerCase().trim();
  if (slug === 'nighties' || slug === 'women-s-nighties') return 'women-s-nighties';
  if (slug === 'newborn-baby-dress' || slug === 'born-baby-dress') return 'born-baby-dress';
  return slug;
}

export async function generateMetadata(
  { params }: { params: Promise<{ category: string }> }
): Promise<Metadata> {
  const resolvedParams = await params;
  const categories = await fetchCategories();
  const currentCategory = categories.find((c) => normalizeSlug(c.slug) === normalizeSlug(resolvedParams.category));

  if (!currentCategory) {
    return {
      title: 'Category Not Found | Saraa Silks',
    };
  }

  return {
    title: `${currentCategory.name} | Saraa Silks`,
    description: `Shop our premium ${currentCategory.name} collection at Saraa Silks. Direct manufacturer prices in Coimbatore.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const categories = await fetchCategories();
  
  const targetSlug = normalizeSlug(resolvedParams.category);
  const products = await fetchProducts(`filters[category][slug][$eq]=${targetSlug}`);
  const currentCategory = categories.find((c) => normalizeSlug(c.slug) === targetSlug);

  return (
    <div className={`container ${styles.shopContainer}`}>
      <aside className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>Categories</h3>
        <ul className={styles.categoryList}>
          <li>
            <Link href="/shop" className={styles.categoryLink}>
              <CategoryIcon slug="all" size={18} style={{ color: 'var(--copper-light)', flexShrink: 0 }} />
              <span>All Products</span>
            </Link>
          </li>
          {categories.map((cat) => {
            const isCurrent = normalizeSlug(cat.slug) === targetSlug;
            return (
              <li key={cat.documentId}>
                <Link 
                  href={`/shop/${cat.slug}`} 
                  className={`${styles.categoryLink} ${isCurrent ? styles.activeCategory : ''}`}
                >
                  <CategoryIcon slug={cat.slug} size={18} style={{ color: 'var(--copper-light)', flexShrink: 0 }} />
                  <span>{cat.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>

      <main className={styles.mainContent}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 className={styles.pageTitle} style={{ marginBottom: '6px' }}>
              {currentCategory ? currentCategory.name : 'Category Collection'}
            </h1>
            {currentCategory?.description && (
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{currentCategory.description}</p>
            )}
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Showing {products.length} products</span>
        </div>

        <div className={styles.productGrid}>
          {products && products.length > 0 ? (
            products.map((product, i) => (
              <ProductCard key={product.documentId} product={product} delay={i * 50} />
            ))
          ) : (
            <div style={{ padding: '60px 0', textAlign: 'center', gridColumn: '1 / -1' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '16px' }}>No products found in this category.</p>
              <Link href="/shop" className="btn btn-primary">View All Products</Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
