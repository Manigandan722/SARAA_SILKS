'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Trash2, MessageCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import { getStrapiMedia } from '@/lib/api';
import { WHATSAPP_NUMBER } from '@/data/products';
import styles from './Cart.module.css';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;

    const itemsText = items.map((item, index) => {
      return `${index + 1}. *${item.title}*\n   Qty: ${item.quantity} × ₹${item.price.toLocaleString('en-IN')} = ₹${(item.quantity * item.price).toLocaleString('en-IN')}`;
    }).join('\n\n');

    const msg = 
`🛍️ *NEW CART ORDER - SARAA SILKS & SAREES*
----------------------------------
📦 *Order Items (${items.length} items):*
${itemsText}
----------------------------------
💰 *Total Amount:* ₹${total.toLocaleString('en-IN')}
🚚 *Shipping:* FREE Delivery Across India
----------------------------------
Hi Saraa Silks! I would like to place this order from your website. Please confirm availability and share payment/delivery procedure! 🙏`;

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className={`container ${styles.emptyCart}`}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'rgba(200, 118, 58, 0.1)',
          color: 'var(--copper-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
        }}>
          <ShoppingBag size={40} />
        </div>
        <h1 className={styles.emptyTitle}>Your Cart is Empty</h1>
        <p className={styles.emptyText}>Looks like you haven't added any items to your cart yet.</p>
        <Link href="/shop" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className={`container ${styles.cartContainer}`}>
      <h1 className={styles.title}>Your Shopping Cart ({items.reduce((s, i) => s + i.quantity, 0)} items)</h1>

      <div className={styles.layoutWrapper}>
        <div className={styles.itemsColumn}>
          {items.map(item => (
            <div key={item.id} className={styles.cartItemCard}>
              <div className={styles.itemImageWrap}>
                {item.image ? (
                  <img src={getStrapiMedia(item.image) || ''} alt={item.title} className={styles.itemImage} />
                ) : (
                  <div className={styles.itemPlaceholder}></div>
                )}
              </div>
              <div className={styles.itemDetails}>
                <h4 className={styles.itemName}>{item.title}</h4>
                <div className={styles.itemPrice}>₹{item.price.toLocaleString('en-IN')}</div>
              </div>
              <div className={styles.quantityControls}>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className={styles.quantityBtn}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className={styles.quantityVal}>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className={styles.quantityBtn}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className={styles.deleteBtn}
                aria-label="Remove item"
                title="Remove item"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className={styles.summaryColumn}>
          <div className={styles.summaryCard}>
            <h3 className={styles.summaryTitle}>Order Summary</h3>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <strong>₹{total.toLocaleString('en-IN')}</strong>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span style={{ color: 'var(--copper-light)', fontWeight: 600 }}>FREE Delivery</span>
            </div>
            <div className={styles.summaryTotalRow}>
              <span>Total Payable</span>
              <span className={styles.totalPrice}>₹{total.toLocaleString('en-IN')}</span>
            </div>

            <Link href="/checkout" className={`btn btn-primary ${styles.checkoutBtn}`}>
              Proceed to Checkout <ArrowRight size={18} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
            </Link>

            <div className={styles.orDivider}>or quick order</div>

            <button
              onClick={handleWhatsAppOrder}
              type="button"
              className={styles.whatsappBtn}
            >
              <MessageCircle size={20} /> Order via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
