'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Trash2 } from 'lucide-react';
import { getStrapiMedia } from '@/lib/api';
import styles from './Cart.module.css';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className={`container ${styles.emptyCart}`}>
        <h1 className={styles.emptyTitle}>Your Cart is Empty</h1>
        <p className={styles.emptyText}>Looks like you haven't added any items to your cart yet.</p>
        <Link href="/shop" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className={`container ${styles.cartContainer}`}>
      <h1 className={styles.title}>Your Shopping Cart</h1>
      
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
                <div className={styles.itemPrice}>₹{item.price}</div>
              </div>
              <div className={styles.quantityControls}>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className={styles.quantityBtn}>-</button>
                <span className={styles.quantityVal}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className={styles.quantityBtn}>+</button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className={styles.deleteBtn} aria-label="Remove item">
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
              <strong>₹{total}</strong>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span style={{ color: 'var(--copper-light)' }}>Free</span>
            </div>
            <div className={styles.summaryTotalRow}>
              <span>Total</span>
              <span className={styles.totalPrice}>₹{total}</span>
            </div>
            
            <Link href="/checkout" className={`btn btn-primary ${styles.checkoutBtn}`}>
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
