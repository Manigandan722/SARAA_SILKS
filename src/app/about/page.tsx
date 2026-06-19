export default function AboutPage() {
  return (
    <div className="container" style={{ padding: '80px 20px', maxWidth: '800px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', color: 'var(--primary-color)' }}>About Saraa Silks and Sarees</h1>
      
      <div style={{ background: 'var(--surface-color)', padding: '40px', borderRadius: 'var(--border-radius)', boxShadow: 'var(--box-shadow)' }}>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '20px' }}>
          Saraa Silks and Sarees is a trusted fashion destination in Coimbatore offering a wide range of sarees, chudithars, men's wear, kids wear, baby dresses and nightwear collections.
        </p>
        
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '20px' }}>
          We are proud manufacturers of premium-quality women's nighties, delivering comfort, style and affordability to customers across India.
        </p>
        
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '0' }}>
          Our mission is to provide quality garments at competitive prices while ensuring customer satisfaction and timely delivery.
        </p>
      </div>
    </div>
  );
}
