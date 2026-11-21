import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Truck, ShieldCheck, Sparkles, Check, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, WHATSAPP_NUMBER } from '../data/products';
import styles from './Product.module.css';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const product = PRODUCTS.find(
    (p) => p.documentId.toLowerCase() === id?.toLowerCase() || p.sku.toLowerCase() === id?.toLowerCase()
  );

  if (!product) {
    return (
      <div className={`container ${styles.productContainer}`} style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', marginBottom: '16px' }}>Product Not Found</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          The item you are looking for might have been moved or is currently unavailable.
        </p>
        <Link to="/shop" className="btn btn-primary">Browse All Products</Link>
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category.slug === product.category.slug && p.documentId !== product.documentId
  ).slice(0, 4);

  const handleAdd = () => {
    addToCart(
      {
        id: product.documentId,
        title: product.title,
        price: product.price,
        image: product.image?.url || '/images/saree.png',
        sku: product.sku,
      },
      qty
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWhatsAppBuyNow = () => {
    const text = 
`Hi Saraa Silks! 👋

I would like to place an order for:
🛍️ *Product:* ${product.title}
🔖 *SKU:* ${product.sku || 'N/A'}
🔢 *Quantity:* ${qty}
💰 *Total Price:* ₹${(product.price * qty).toLocaleString('en-IN')}

Please let me know the availability and delivery details! Thank you!`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className={`container ${styles.productContainer}`}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', fontSize: '0.88rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
        <Link to="/" style={{ color: 'var(--text-secondary)' }}>Home</Link>
        <span>/</span>
        <Link to="/shop" style={{ color: 'var(--text-secondary)' }}>Shop</Link>
        <span>/</span>
        <Link to={`/shop/${product.category.slug}`} style={{ color: 'var(--text-secondary)' }}>{product.category.name}</Link>
        <span>/</span>
        <span style={{ color: 'var(--copper-light)' }}>{product.title}</span>
      </div>

      <div className={styles.layoutWrapper}>
        <div className={styles.leftColumn}>
          <div className={styles.imageCard}>
            <img
              src={product.image?.url || '/images/saree.png'}
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

          {/* Quantity and Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                height: '48px',
              }}>
                <button
                  type="button"
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  style={{
                    padding: '0 16px',
                    color: 'var(--text)',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span style={{
                  padding: '0 16px',
                  color: 'var(--copper-light)',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  minWidth: '40px',
                  textAlign: 'center',
                }}>
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty(q => q + 1)}
                  style={{
                    padding: '0 16px',
                    color: 'var(--text)',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="btn btn-primary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '1.05rem',
                  padding: '14px 28px',
                  height: '48px',
                  background: added ? '#2e7d32' : undefined,
                  borderColor: added ? '#4caf50' : undefined,
                  transition: 'all 0.3s ease',
                }}
              >
                {added ? (
                  <>
                    <Check size={20} /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={20} /> Add to Cart
                  </>
                )}
              </button>
            </div>

            <button
              onClick={handleWhatsAppBuyNow}
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '1.05rem',
                padding: '14px 24px',
                borderRadius: 'var(--radius-sm)',
                boxShadow: '0 4px 18px rgba(37, 211, 102, 0.3)',
                transition: 'all 0.3s ease',
                border: 'none',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              <MessageCircle size={22} /> Buy Now on WhatsApp
            </button>
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
