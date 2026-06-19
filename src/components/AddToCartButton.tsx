'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({
      id: product.documentId,
      title: product.title,
      price: product.price,
      image: product.image?.url || null
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button onClick={handleAdd} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem' }}>
      <ShoppingCart /> {added ? 'Added to Cart!' : 'Add to Cart'}
    </button>
  );
}
