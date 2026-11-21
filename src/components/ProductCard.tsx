'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Check } from 'lucide-react';
import { getStrapiMedia, type Product } from '@/lib/api';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  delay?: number;
}

export default function ProductCard({ product, delay = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: product.documentId,
      title: product.title,
      price: product.price,
      image: product.image?.url || '/images/saree.png',
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className={styles.card} data-aos="fade-up" data-aos-delay={delay}>
      <Link href={`/product/${product.documentId}`} style={{ display: 'contents' }}>
        <div className={styles.imgWrap}>
          {product.tags && product.tags[0] && (
            <span className={styles.tagBadge}>{product.tags[0]}</span>
          )}
          <img
            src={getStrapiMedia(product.image?.url)}
            alt={product.title}
            className={styles.img}
            loading="lazy"
          />
        </div>

        <div className={styles.body}>
          <div>
            {product.category?.name && (
              <span className={styles.categoryTag}>{product.category.name}</span>
            )}
            <h4 className={styles.title}>{product.title}</h4>
          </div>

          <div className={styles.footer}>
            <div className={styles.priceBlock}>
              <span className={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className={styles.originalPrice}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
            </div>

            <button
              onClick={handleAdd}
              className={`${styles.addBtn} ${added ? styles.addedBtn : ''}`}
              title="Add to Cart"
              aria-label={`Add ${product.title} to cart`}
            >
              {added ? (
                <>
                  <Check size={14} /> Added
                </>
              ) : (
                <>
                  <ShoppingBag size={14} /> Add +
                </>
              )}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
