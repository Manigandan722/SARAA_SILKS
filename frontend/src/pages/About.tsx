export default function About() {
  return (
    <div className="container" style={{ padding: '80px 20px', maxWidth: '800px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', color: 'var(--copper-light)', fontFamily: 'var(--font-display)', fontWeight: 800 }}>About Saraa Silks and Sarees</h1>
      
      <div style={{ background: 'var(--surface-1)', padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-card)' }}>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '20px', color: 'var(--text)' }}>
          Saraa Silks and Sarees is a trusted fashion destination in Coimbatore offering a wide range of sarees, chudithars, men's wear, kids wear, baby dresses and nightwear collections.
        </p>
        
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '20px', color: 'var(--text-secondary)' }}>
          We are proud manufacturers of premium-quality women's nighties, delivering comfort, style and affordability to customers across India directly from our Coimbatore manufacturing unit.
        </p>
        
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '0', color: 'var(--text-secondary)' }}>
          Our mission is to provide quality garments at competitive prices while ensuring customer satisfaction, easy WhatsApp order support, and fast delivery across India.
        </p>
      </div>
    </div>
  );
}
