'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import styles from './Checkout.module.css';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [orderId, setOrderId] = useState('');
  const [shiprocketOrderId, setShiprocketOrderId] = useState('');
  const [awbCode, setAwbCode] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'COD',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          items,
          total,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setOrderId(data.orderId);
        setShiprocketOrderId(data.shiprocketOrderId);
        setAwbCode(data.awbCode);
        setSuccess(true);
        clearCart();
      } else {
        setError(data.error || 'Checkout failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Network error during checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={`container ${styles.successContainer}`}>
        <div className={styles.successIcon}>OK</div>
        <h1 className={styles.successTitle}>Order Confirmed!</h1>
        <p className={styles.successSub}>Thank you for shopping with Saraa Silks.</p>

        <div className={styles.trackingCard}>
          <h4 className={styles.trackingTitle}>Order Tracking Details</h4>

          <div className={styles.trackingDetail}>
            <span className={styles.trackingLabel}>Internal Order ID:</span><br />
            <strong className={styles.trackingVal}>{orderId}</strong>
          </div>

          <div className={styles.trackingDetail}>
            <span className={styles.trackingLabel}>Shiprocket Order Reference:</span><br />
            <strong className={styles.trackingVal}>{shiprocketOrderId}</strong>
          </div>

          <div className={styles.trackingDetail}>
            <span className={styles.trackingLabel}>Shiprocket AWB Tracking Code:</span><br />
            <span className={`${styles.trackingVal} ${styles.trackingValCode}`}>
              {awbCode || 'Will be assigned after shipment processing'}
            </span>
          </div>
        </div>

        <p className={styles.adminNote}>
          To check this order, the administrator can log into the <strong>Strapi Admin Panel</strong> at <strong>http://localhost:1337/admin</strong> under <strong>Content Manager &gt; Order</strong>.
        </p>
        <Link href="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: '100px 16px', textAlign: 'center' }}>
        <h1>Checkout Unavailable</h1>
        <p style={{ margin: '16px 0 24px' }}>Your cart is empty.</p>
        <Link href="/shop" className="btn btn-primary">Go to Shop</Link>
      </div>
    );
  }

  return (
    <div className={`container ${styles.checkoutContainer}`}>
      <h1 className={styles.title}>Secure Checkout</h1>

      <div className={styles.layoutWrapper}>
        <div className={styles.formColumn}>
          <form onSubmit={handleCheckout} className={styles.checkoutForm}>
            <h3 className={styles.formSectionTitle}>Shipping Address</h3>

            <div className={styles.formGridTwo}>
              <div>
                <label className={styles.formGroupLabel}>First Name *</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className={styles.inputField} />
              </div>
              <div>
                <label className={styles.formGroupLabel}>Last Name *</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className={styles.inputField} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className={styles.inputField} />
            </div>

            <div className={styles.formGroup}>
              <label>Phone *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className={styles.inputField} />
            </div>

            <div className={styles.formGroup}>
              <label>Address *</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} required className={`${styles.inputField} ${styles.addressInput}`} placeholder="House number and street name" />
              <input type="text" name="address2" value={formData.address2} onChange={handleChange} className={styles.inputField} placeholder="Apartment, suite, unit, etc. (optional)" />
            </div>

            <div className={styles.formGridThree}>
              <div>
                <label>City *</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} required className={styles.inputField} />
              </div>
              <div>
                <label>State *</label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} required className={styles.inputField} />
              </div>
              <div>
                <label>Pincode *</label>
                <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required className={styles.inputField} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Payment Method *</label>
              <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required className={styles.inputField}>
                <option value="COD">Cash on Delivery</option>
                <option value="Prepaid">Prepaid</option>
              </select>
            </div>

            {error && <p className={styles.errorText}>{error}</p>}

            <button type="submit" disabled={loading} className={`btn btn-primary ${styles.submitBtn}`} style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Processing...' : `Place order - Rs. ${total}`}
            </button>
            <p className={styles.termsText}>By placing your order, you agree to our Terms & Conditions.</p>
          </form>
        </div>

        <div className={styles.summaryColumn}>
          <div className={styles.summaryCard}>
            <h3 className={styles.summaryTitle}>Order Summary</h3>
            <div className={styles.summaryItemsList}>
              {items.map((item) => (
                <div key={item.id} className={styles.summaryItemRow}>
                  <span>{item.title} x {item.quantity}</span>
                  <strong>Rs. {item.price * item.quantity}</strong>
                </div>
              ))}
            </div>

            <div className={styles.summaryTotalRow}>
              <span>Total</span>
              <span className={styles.totalPrice}>Rs. {total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
