'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Trash2 } from 'lucide-react';
import { getStrapiMedia } from '@/lib/api';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '20px' }}>Your Cart is Empty</h1>
        <p style={{ marginBottom: '30px' }}>Looks like you haven't added any items to your cart yet.</p>
        <Link href="/shop" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '60px 20px' }}>
      <h1 style={{ marginBottom: '40px', color: 'var(--primary-color)' }}>Your Shopping Cart</h1>
      
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        <div style={{ flex: '2 1 500px' }}>
          {items.map(item => (
            <div key={item.id} style={{ display: 'flex', gap: '20px', alignItems: 'center', padding: '20px', background: 'var(--surface-color)', borderRadius: 'var(--border-radius)', marginBottom: '20px', boxShadow: 'var(--box-shadow)' }}>
              <div style={{ width: '100px', height: '100px', background: 'var(--surface-color)', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--border)' }}>
                {item.image ? (
                  <img src={getStrapiMedia(item.image) || ''} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'var(--accent-color)' }}></div>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ marginBottom: '5px' }}>{item.title}</h4>
                <div style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>₹{item.price}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '5px 10px', cursor: 'pointer' }}>-</button>
                <span style={{ minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '5px 10px', cursor: 'pointer' }}>+</button>
              </div>
              <button onClick={() => removeFromCart(item.id)} style={{ padding: '10px', color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
        
        <div style={{ flex: '1 1 300px' }}>
          <div style={{ background: 'var(--surface-color)', padding: '30px', borderRadius: 'var(--border-radius)', boxShadow: 'var(--box-shadow)', position: 'sticky', top: '100px' }}>
            <h3 style={{ marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Order Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span>Subtotal</span>
              <strong>₹{total}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span>Shipping</span>
              <span style={{ color: 'green' }}>Free</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border-color)', fontSize: '1.2rem', fontWeight: 'bold' }}>
              <span>Total</span>
              <span style={{ color: 'var(--primary-color)' }}>₹{total}</span>
            </div>
            
            <Link href="/checkout" className="btn btn-primary" style={{ display: 'block', width: '100%', textAlign: 'center', marginTop: '30px', padding: '15px' }}>
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
