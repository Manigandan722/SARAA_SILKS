import Link from 'next/link';
import { fetchProducts, fetchCategories, getStrapiMedia } from '@/lib/api';
import styles from './Shop.module.css';

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
              All Products
            </Link>
          </li>
          {categories.map((cat: any) => (
            <li key={cat.documentId}>
              <Link href={`/shop/${cat.slug}`} className={styles.categoryLink}>
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>All Products</h1>
        <div className={styles.productGrid}>
          {products && products.length > 0 ? products.map((product: any) => (
            <Link href={`/product/${product.documentId}`} key={product.documentId} className={styles.productCard}>
              <div className={styles.productImgWrap}>
                {product.image?.url ? (
                  <img src={getStrapiMedia(product.image.url) || ''} alt={product.title} className={styles.productImg} />
                ) : (
                  <div className={styles.productPlaceholder}></div>
                )}
              </div>
              <div className={styles.productInfo}>
                <h4 className={styles.productName}>{product.title}</h4>
                <div className={styles.productPrice}>₹{product.price}</div>
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
