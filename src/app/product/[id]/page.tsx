import { fetchProducts, getStrapiMedia } from '@/lib/api';
import { MessageCircle, Truck, ShieldCheck } from 'lucide-react';
import AddToCartButton from '@/components/AddToCartButton';
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
    title: `${product.title} | Saraa Silks`,
    description: product.description || `Buy ${product.title} at Saraa Silks. Premium ethnic wear direct from the manufacturer.`,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const productArray = await fetchProducts(`filters[documentId][$eq]=${resolvedParams.id}`);
  const product = productArray?.[0];

  if (!product) {
    return (
      <div className={`container ${styles.productContainer}`} style={{ textAlign: 'center' }}>
        <h1>Product Not Found</h1>
      </div>
    );
  }

  return (
    <div className={`container ${styles.productContainer}`}>
      <div className={styles.layoutWrapper}>
        <div className={styles.leftColumn}>
          <div className={styles.imageCard}>
            {product.image?.url ? (
              <img src={getStrapiMedia(product.image.url) || ''} alt={product.title} className={styles.productImg} />
            ) : (
              <div className={styles.placeholderImg}></div>
            )}
          </div>
        </div>
        
        <div className={styles.rightColumn}>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.sku}>SKU: {product.sku}</p>
          <div className={styles.price}>₹{product.price}</div>
          
          <p className={styles.description}>
            {product.description || 'Premium quality fabric woven with traditional elegance. Enjoy the rich textures and sophisticated designs perfect for every occasion. Manufactured by Saraa Silks and Sarees.'}
          </p>

          <div className={styles.actions}>
            <AddToCartButton product={product} />
            <a 
              href={`https://wa.me/919655212921?text=Hi, I am interested in ${product.title} (SKU: ${product.sku})`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.whatsappLink}
            >
              <MessageCircle size={20} /> WhatsApp Enquiry
            </a>
          </div>

          <div className={styles.featuresCard}>
            <div className={styles.featureItem}>
              <ShieldCheck className={styles.featureIcon} size={24} />
              <div className={styles.featureContent}>
                <h4>Guaranteed Safe Checkout</h4>
                <p>Secure transactions via UPI, Credit/Debit cards, and Net Banking.</p>
              </div>
            </div>
            
            <div className={styles.featureItem}>
              <Truck className={styles.featureIcon} size={24} />
              <div className={styles.featureContent}>
                <h4>Fast Delivery</h4>
                <p>Reliable shipping across India directly from the manufacturer.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
