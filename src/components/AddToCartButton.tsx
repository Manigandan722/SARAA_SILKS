'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Check, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/data/products';

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addToCart({
        id: product.documentId,
        title: product.title,
        price: product.price,
        image: product.image?.url || '/images/saree.png',
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWhatsAppBuyNow = () => {
    const text = `Hi Saraa Silks! 👋%0A%0AI would like to place an order for:%0A🛍️ *Product:* ${encodeURIComponent(product.title)}%0A🔖 *SKU:* ${encodeURIComponent(product.sku || 'N/A')}%0A🔢 *Quantity:* ${qty}%0A💰 *Price:* ₹${(product.price * qty).toLocaleString('en-IN')}%0A%0APlease let me know the availability and delivery details!`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
      {/* Quantity & Add to Cart row */}
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

      {/* WhatsApp Instant Order button */}
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
  );
}
