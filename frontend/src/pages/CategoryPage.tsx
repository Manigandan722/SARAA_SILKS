import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryIcon from '../components/CategoryIcon';
import { PRODUCTS, CATEGORIES, normalizeSlug } from '../data/products';
import styles from './Shop.module.css';

export default function CategoryPage() {
  const { category = '' } = useParams<{ category: string }>();
  const currentSlug = normalizeSlug(category);

  const currentCategory = CATEGORIES.find((c) => normalizeSlug(c.slug) === currentSlug);
  const filteredProducts = PRODUCTS.filter((p) => normalizeSlug(p.category.slug) === currentSlug);

  return (
    <div className={`container ${styles.shopContainer}`}>
      <aside className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>Categories</h3>
        <ul className={styles.categoryList}>
          <li>
            <Link to="/shop" className={styles.categoryLink}>
              <CategoryIcon slug="all" size={18} style={{ color: 'var(--copper-light)', flexShrink: 0 }} />
              <span>All Products ({PRODUCTS.length})</span>
            </Link>
          </li>
          {CATEGORIES.map((cat) => {
            const isActive = normalizeSlug(cat.slug) === currentSlug;
            return (
              <li key={cat.documentId}>
                <Link
                  to={`/shop/${cat.slug}`}
                  className={`${styles.categoryLink} ${isActive ? styles.activeCategory : ''}`}
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
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                {currentCategory.description}
              </p>
            )}
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Showing {filteredProducts.length} products
          </span>
        </div>

        <div className={styles.productGrid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, i) => (
              <ProductCard key={product.documentId} product={product} delay={i * 50} />
            ))
          ) : (
            <div style={{ padding: '60px 0', textAlign: 'center', gridColumn: '1 / -1' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '16px' }}>
                No products found in this category.
              </p>
              <Link to="/shop" className="btn btn-primary">
                View All Products
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
