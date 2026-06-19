import Link from 'next/link';
import { fetchProducts, fetchCategories, getStrapiMedia } from '@/lib/api';
import styles from '../Shop.module.css';
import type { Metadata } from 'next';

export async function generateMetadata(
  { params }: { params: Promise<{ category: string }> }
): Promise<Metadata> {
  const resolvedParams = await params;
  const categories = await fetchCategories();
  const currentCategory = categories.find((c: any) => c.slug === resolvedParams.category);

  if (!currentCategory) {
    return {
      title: 'Category Not Found | Saraa Silks',
    };
  }

  return {
    title: `${currentCategory.name} | Saraa Silks`,
    description: `Shop our premium ${currentCategory.name} collection at Saraa Silks. Direct manufacturer prices.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const categories = await fetchCategories();
  
  // Filter products by category slug using Strapi's filter syntax
  const products = await fetchProducts(`filters[category][slug][$eq]=${resolvedParams.category}`);
  const currentCategory = categories.find((c: any) => c.slug === resolvedParams.category);

  return (
    <div className={`container ${styles.shopContainer}`}>
      <aside className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>Categories</h3>
        <ul className={styles.categoryList}>
          <li>
            <Link href="/shop" className={styles.categoryLink}>
              All Products
            </Link>
          </li>
          {categories.map((cat: any) => (
            <li key={cat.documentId}>
              <Link 
                href={`/shop/${cat.slug}`} 
                className={`${styles.categoryLink} ${cat.slug === resolvedParams.category ? styles.activeCategory : ''}`}
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>{currentCategory ? currentCategory.name : 'Category Not Found'}</h1>
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
            <p>No products found in this category.</p>
          )}
        </div>
      </main>
    </div>
  );
}
