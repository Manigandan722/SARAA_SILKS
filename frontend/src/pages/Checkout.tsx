import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, CheckCircle2, ShieldCheck, Truck, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { WHATSAPP_NUMBER, STORE_NAME } from '../data/products';
import styles from './Checkout.module.css';

interface OrderSummaryData {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  items: Array<{ title: string; quantity: number; price: number }>;
  total: number;
  paymentMethod: string;
  date: string;
  waUrl: string;
}

export default function Checkout() {
  const { items, total, count, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [lastOrder, setLastOrder] = useState<OrderSummaryData | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    address2: '',
    city: '',
    state: 'Tamil Nadu',
    pincode: '',
    paymentMethod: 'Cash on Delivery (COD)',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const generatedOrderId = `SARAA-${Date.now().toString().slice(-6)}`;
    const orderDate = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();
    const fullAddress = [
      formData.address.trim(),
      formData.address2.trim(),
      `${formData.city.trim()}, ${formData.state.trim()} - ${formData.pincode.trim()}`
    ].filter(Boolean).join(', ');

    const itemsListText = items
      .map((item, index) => {
        return `${index + 1}. *${item.title}*%0A   Qty: ${item.quantity} × ₹${item.price.toLocaleString('en-IN')} = ₹${(item.quantity * item.price).toLocaleString('en-IN')}`;
      })
      .join('%0A%0A');

    const message = 
      `🛍️ *NEW ORDER - ${STORE_NAME.toUpperCase()}*%0A` +
      `----------------------------------%0A` +
      `🔖 *Order ID:* #${generatedOrderId}%0A` +
      `📅 *Date:* ${encodeURIComponent(orderDate)}%0A%0A` +
      `👤 *Customer Information:*%0A` +
      `• Name: ${encodeURIComponent(fullName)}%0A` +
      `• Phone: ${encodeURIComponent(formData.phone)}%0A` +
      (formData.email ? `• Email: ${encodeURIComponent(formData.email)}%0A` : '') +
      `• Payment Mode: ${encodeURIComponent(formData.paymentMethod)}%0A%0A` +
      `📍 *Delivery Address:*%0A` +
      `${encodeURIComponent(fullAddress)}%0A%0A` +
      `----------------------------------%0A` +
      `📦 *Items Ordered:*%0A` +
      `${itemsListText}%0A` +
      `----------------------------------%0A` +
      `💰 *Subtotal:* ₹${total.toLocaleString('en-IN')}%0A` +
      `🚚 *Shipping:* FREE Delivery Across India%0A` +
      `🏷️ *TOTAL PAYABLE:* ₹${total.toLocaleString('en-IN')}%0A` +
      `----------------------------------%0A` +
      (formData.notes ? `📝 *Note:* ${encodeURIComponent(formData.notes)}%0A%0A` : '%0A') +
      `Please confirm my order and share dispatch tracking details. Thank you! 🙏`;

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    const orderData: OrderSummaryData = {
      orderId: generatedOrderId,
      customerName: fullName,
      phone: formData.phone,
      address: fullAddress,
      items: [...items],
      total,
      paymentMethod: formData.paymentMethod,
      date: orderDate,
      waUrl,
    };

    setLastOrder(orderData);

    // Open WhatsApp in new tab / window
    window.open(waUrl, '_blank');

    // Clear cart and show confirmation screen
    clearCart();
    setSuccess(true);
    setLoading(false);
  };

  if (success && lastOrder) {
    return (
      <div className={`container ${styles.successContainer}`}>
        <div style={{
          width: '84px',
          height: '84px',
          background: 'linear-gradient(135deg, #25D366, #128C7E)',
          color: '#ffffff',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          boxShadow: '0 8px 30px rgba(37, 211, 102, 0.35)',
        }}>
          <CheckCircle2 size={46} />
        </div>

        <h1 className={styles.successTitle} style={{ color: 'var(--text)' }}>Order Sent via WhatsApp!</h1>
        <p className={styles.successSub}>
          Thank you, <strong>{lastOrder.customerName}</strong>! Your order request has been directed to our WhatsApp sales team.
        </p>

        <div className={styles.trackingCard}>
          <h4 className={styles.trackingTitle}>Order Summary Details</h4>

          <div className={styles.trackingDetail}>
            <span className={styles.trackingLabel}>Order ID</span>
            <strong className={styles.trackingVal} style={{ color: 'var(--copper-light)', fontSize: '1.2rem' }}>
              #{lastOrder.orderId}
            </strong>
          </div>

          <div className={styles.trackingDetail}>
            <span className={styles.trackingLabel}>Customer Phone</span>
            <span className={styles.trackingVal}>{lastOrder.phone}</span>
          </div>

          <div className={styles.trackingDetail}>
            <span className={styles.trackingLabel}>Shipping Address</span>
            <span className={styles.trackingVal}>{lastOrder.address}</span>
          </div>

          <div className={styles.trackingDetail}>
            <span className={styles.trackingLabel}>Payment Mode</span>
            <span className={styles.trackingVal}>{lastOrder.paymentMethod}</span>
          </div>

          <div className={styles.trackingDetail} style={{ borderTop: '1px solid var(--border-light)', paddingTop: '12px', marginTop: '12px' }}>
            <span className={styles.trackingLabel}>Items Ordered</span>
            <div style={{ marginTop: '8px' }}>
              {lastOrder.items.map((it, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', marginBottom: '6px', color: 'var(--text-secondary)' }}>
                  <span>{it.title} × {it.quantity}</span>
                  <span style={{ color: 'var(--text)', fontWeight: 600 }}>₹{(it.price * it.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.trackingDetail} style={{ borderTop: '1px solid var(--border-light)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className={styles.trackingLabel} style={{ marginBottom: 0, fontSize: '1rem', color: 'var(--text)' }}>Total Amount</span>
            <strong style={{ color: 'var(--copper-light)', fontSize: '1.3rem' }}>₹{lastOrder.total.toLocaleString('en-IN')}</strong>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
          <a
            href={lastOrder.waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{
              background: 'linear-gradient(135deg, #25D366, #128C7E)',
              color: '#ffffff',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontWeight: 700,
              padding: '14px 28px',
            }}
          >
            <MessageCircle size={20} /> Open WhatsApp Message Again
          </a>

          <Link to="/shop" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            Continue Shopping
          </Link>
        </div>

        <p className={styles.adminNote}>
          Our team at Saraa Silks will review your order on WhatsApp and confirm dispatch, tracking, and payment details shortly.
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: '100px 16px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', marginBottom: '16px' }}>Checkout Unavailable</h1>
        <p style={{ margin: '16px 0 24px', color: 'var(--text-secondary)' }}>Your shopping cart is currently empty.</p>
        <Link to="/shop" className="btn btn-primary">Go to Shop Collection</Link>
      </div>
    );
  }

  return (
    <div className={`container ${styles.checkoutContainer}`}>
      <div style={{ marginBottom: '24px' }}>
        <Link to="/cart" style={{ color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
          <ArrowLeft size={16} /> Back to Cart
        </Link>
      </div>

      <h1 className={styles.title}>Place Order via WhatsApp</h1>

      <div className={styles.layoutWrapper}>
        <div className={styles.formColumn}>
          <form onSubmit={handleCheckout} className={styles.checkoutForm}>
            <h3 className={styles.formSectionTitle}>1. Customer &amp; Delivery Details</h3>

            <div className={styles.formGridTwo}>
              <div>
                <label className={styles.formGroupLabel}>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Priya"
                  className={styles.inputField}
                />
              </div>
              <div>
                <label className={styles.formGroupLabel}>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Sharma"
                  className={styles.inputField}
                />
              </div>
            </div>

            <div className={styles.formGridTwo}>
              <div className={styles.formGroup}>
                <label>WhatsApp / Mobile Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10,12}"
                  placeholder="10-digit mobile number"
                  className={styles.inputField}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email Address (Optional)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className={styles.inputField}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Delivery Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className={`${styles.inputField} ${styles.addressInput}`}
                placeholder="House / Flat No., Building Name, Street"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Landmark / Area (Optional)</label>
              <input
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
                className={styles.inputField}
                placeholder="Near Temple / Opposite Metro station"
              />
            </div>

            <div className={styles.formGridThree}>
              <div>
                <label>City / Town *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="Coimbatore"
                  className={styles.inputField}
                />
              </div>
              <div>
                <label>State *</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={styles.inputField}
                >
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Other State">Other State</option>
                </select>
              </div>
              <div>
                <label>Pincode *</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{6}"
                  maxLength={6}
                  placeholder="641035"
                  className={styles.inputField}
                />
              </div>
            </div>

            <h3 className={styles.formSectionTitle} style={{ marginTop: '24px' }}>2. Payment Preference</h3>
            
            <div className={styles.formGroup}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                {[
                  { label: 'Cash on Delivery (COD)', desc: 'Pay when package arrives at your doorstep' },
                  { label: 'UPI / GPay / PhonePe', desc: 'Scan QR code / UPI via WhatsApp' },
                  { label: 'Direct Bank Transfer', desc: 'NEFT / IMPS account details will be shared' },
                ].map((opt) => (
                  <label
                    key={opt.label}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      padding: '14px 16px',
                      borderRadius: 'var(--radius-sm)',
                      border: formData.paymentMethod === opt.label ? '1px solid var(--copper)' : '1px solid var(--border-light)',
                      background: formData.paymentMethod === opt.label ? 'rgba(200, 118, 58, 0.12)' : 'var(--surface-2)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text)', fontWeight: 600 }}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={opt.label}
                        checked={formData.paymentMethod === opt.label}
                        onChange={handleChange}
                        style={{ accentColor: 'var(--copper)' }}
                      />
                      <span>{opt.label}</span>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '22px' }}>{opt.desc}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.formGroup} style={{ marginTop: '20px' }}>
              <label>Special Instructions / Notes (Optional)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={2}
                placeholder="Any special size, color or delivery instructions..."
                className={styles.inputField}
                style={{ resize: 'vertical' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn"
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '1.15rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                color: '#ffffff',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                boxShadow: '0 6px 24px rgba(37, 211, 102, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                cursor: 'pointer',
                marginTop: '16px',
              }}
            >
              <MessageCircle size={24} /> Place Order on WhatsApp
            </button>

            <p className={styles.termsText}>
              Clicking &ldquo;Place Order on WhatsApp&rdquo; will format your order details and directly open a chat with Saraa Silks to confirm and process your order immediately.
            </p>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className={styles.summaryColumn}>
          <div className={styles.summaryCard}>
            <h3 className={styles.summaryTitle}>Your Order ({count} Items)</h3>

            <div className={styles.summaryItemsList}>
              {items.map((item) => (
                <div key={item.id} className={styles.summaryItemRow}>
                  <div>
                    <strong style={{ color: 'var(--text)', display: 'block' }}>{item.title}</strong>
                    <span style={{ fontSize: '0.85rem' }}>Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}</span>
                  </div>
                  <strong style={{ color: 'var(--copper-light)' }}>
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </strong>
                </div>
              ))}
            </div>

            <div className={styles.summaryItemRow} style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
              <span>Subtotal</span>
              <strong>₹{total.toLocaleString('en-IN')}</strong>
            </div>

            <div className={styles.summaryItemRow}>
              <span>Shipping</span>
              <span style={{ color: 'var(--copper-light)', fontWeight: 600 }}>FREE Delivery</span>
            </div>

            <div className={styles.summaryTotalRow}>
              <span>Total Payable</span>
              <span className={styles.totalPrice}>₹{total.toLocaleString('en-IN')}</span>
            </div>

            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <ShieldCheck size={18} style={{ color: 'var(--copper-light)' }} />
                <span>100% Genuine Quality Guaranteed</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <Truck size={18} style={{ color: 'var(--copper-light)' }} />
                <span>Direct Manufacturer Dispatch from Coimbatore</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
