import { fetchProducts, getStrapiMedia } from '@/lib/api';
import { MessageCircle, Truck, ShieldCheck } from 'lucide-react';
import AddToCartButton from '@/components/AddToCartButton';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const productArray = await fetchProducts(`filters[documentId][$eq]=${resolvedParams.id}`);
  const product = productArray?.[0];

  if (!product) {
    return <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}><h1>Product Not Found</h1></div>;
  }

  return (
    <div className="container" style={{ padding: '60px 20px' }}>
      <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px' }}>
          <div style={{ width: '100%', height: '500px', background: 'var(--surface-color)', borderRadius: 'var(--border-radius)', overflow: 'hidden', border: '1px solid var(--border)' }}>
            {product.image?.url ? (
              <img src={getStrapiMedia(product.image.url) || ''} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', background: 'var(--accent-color)' }}></div>
            )}
          </div>
        </div>
        <div style={{ flex: '1 1 400px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: 'var(--primary-color)' }}>{product.title}</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', marginBottom: '20px' }}>SKU: {product.sku}</p>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '30px' }}>₹{product.price}</div>
          
          <p style={{ marginBottom: '30px', lineHeight: '1.8' }}>
            {product.description || 'Premium quality fabric woven with traditional elegance. Enjoy the rich textures and sophisticated designs perfect for every occasion. Manufactured by Saraa Silks and Sarees.'}
          </p>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', flexWrap: 'wrap' }}>
            <AddToCartButton product={product} />
            <a href={`https://wa.me/919655212921?text=Hi, I am interested in ${product.title} (SKU: ${product.sku})`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem' }}>
              <MessageCircle /> WhatsApp Enquiry
            </a>
          </div>

          <div style={{ padding: '20px', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              <ShieldCheck className="text-primary" />
              <h4 style={{ margin: 0 }}>Guaranteed Safe Checkout</h4>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '20px' }}>Secure transactions via UPI, Credit/Debit cards, and Net Banking.</p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Truck className="text-primary" />
              <h4 style={{ margin: 0 }}>Fast Delivery</h4>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>Reliable shipping across India directly from the manufacturer.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
