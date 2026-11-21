import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryIcon from '../components/CategoryIcon';
import { PRODUCTS, CATEGORIES } from '../data/products';
import styles from './Shop.module.css';

export default function Shop() {
  return (
    <div className={`container ${styles.shopContainer}`}>
      <aside className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>Categories</h3>
        <ul className={styles.categoryList}>
          <li>
            <Link to="/shop" className={`${styles.categoryLink} ${styles.activeCategory}`}>
              <CategoryIcon slug="all" size={18} style={{ color: 'var(--copper-light)', flexShrink: 0 }} />
              <span>All Products ({PRODUCTS.length})</span>
            </Link>
          </li>
          {CATEGORIES.map((cat) => (
            <li key={cat.documentId}>
              <Link to={`/shop/${cat.slug}`} className={styles.categoryLink}>
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
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Showing {PRODUCTS.length} products</span>
        </div>

        <div className={styles.productGrid}>
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.documentId} product={product} delay={i * 40} />
          ))}
        </div>
      </main>
    </div>
  );
}
