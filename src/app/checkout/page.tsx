'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          address: formData.address2 ? `${formData.address}, ${formData.address2}` : formData.address,
          items,
          total,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setOrderId(data.orderId);
        setShiprocketOrderId(data.shiprocketOrderId);
        setAwbCode(data.awbCode);
        setSuccess(true);
        clearCart();
      } else {
        alert('Checkout failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      console.error(err);
      alert('Network error during checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container" style={{ padding: '100px 20px', textAlign: 'center', maxWidth: '600px' }}>
        <div style={{ width: '80px', height: '80px', background: 'var(--primary-color)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px', fontSize: '2rem', boxShadow: 'var(--glow-copper)' }}>✓</div>
        <h1 style={{ marginBottom: '20px', color: 'var(--primary-color)' }}>Order Confirmed!</h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '30px', color: 'var(--text-secondary)' }}>Thank you for shopping with Saraa Silks.</p>
        
        <div style={{ background: 'var(--surface-color)', padding: '24px', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', marginBottom: '30px', textAlign: 'left' }}>
          <h4 style={{ color: 'var(--primary-color)', marginBottom: '15px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Order Tracking Details</h4>
          
          <div style={{ marginBottom: '10px' }}>
            <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Internal Order ID:</span><br />
            <strong>{orderId}</strong>
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Shiprocket Order Reference:</span><br />
            <strong>{shiprocketOrderId}</strong>
          </div>

          <div>
            <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Shiprocket AWB Tracking Code:</span><br />
            <span style={{ fontFamily: 'monospace', fontSize: '1.1rem', color: 'var(--accent-color)' }}>{awbCode}</span>
          </div>
        </div>

        <p style={{ marginBottom: '40px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
          To check this order, the administrator can log into the <strong>Strapi Admin Panel</strong> (`http://localhost:1337/admin`) under <strong>Content Manager &gt; Order</strong> where this order is logged.
        </p>
        <Link href="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1>Checkout Unavailable</h1>
        <p>Your cart is empty.</p>
        <Link href="/shop" className="btn btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>Go to Shop</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '60px 20px' }}>
      <h1 style={{ marginBottom: '40px', color: 'var(--primary-color)' }}>Secure Checkout</h1>
      
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap-reverse' }}>
        <div style={{ flex: '2 1 500px' }}>
          <form onSubmit={handleCheckout} style={{ background: 'var(--surface-color)', padding: '40px', borderRadius: 'var(--border-radius)', boxShadow: 'var(--box-shadow)' }}>
            <h3 style={{ marginBottom: '30px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Shipping Address</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>First Name *</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'var(--bg)', color: 'var(--text)' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>Last Name *</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'var(--bg)', color: 'var(--text)' }} />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'var(--bg)', color: 'var(--text)' }} />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Phone *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'var(--bg)', color: 'var(--text)' }} />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Address *</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '4px', marginBottom: '10px', background: 'var(--bg)', color: 'var(--text)' }} placeholder="House number and street name" />
              <input type="text" name="address2" value={formData.address2} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'var(--bg)', color: 'var(--text)' }} placeholder="Apartment, suite, unit, etc. (optional)" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '30px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>City *</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'var(--bg)', color: 'var(--text)' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>State *</label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'var(--bg)', color: 'var(--text)' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>Pincode *</label>
                <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'var(--bg)', color: 'var(--text)' }} />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '15px', fontSize: '1.2rem', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Processing...' : `Pay ₹${total}`}
            </button>
            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-light)', marginTop: '15px' }}>By placing your order, you agree to our Terms & Conditions.</p>
          </form>
        </div>

        <div style={{ flex: '1 1 300px' }}>
          <div style={{ background: 'var(--surface-color)', padding: '30px', borderRadius: 'var(--border-radius)', boxShadow: 'var(--box-shadow)', position: 'sticky', top: '100px' }}>
            <h3 style={{ marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Order Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                  <span>{item.title} x {item.quantity}</span>
                  <strong>₹{item.price * item.quantity}</strong>
                </div>
              ))}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border-color)', fontSize: '1.2rem', fontWeight: 'bold' }}>
              <span>Total</span>
              <span style={{ color: 'var(--primary-color)' }}>₹{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
