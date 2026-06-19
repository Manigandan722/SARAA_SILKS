export default function WholesalePage() {
  return (
    <div className="container" style={{ padding: '80px 20px', maxWidth: '800px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: 'var(--primary-color)' }}>Wholesale Enquiry</h1>
      <p style={{ textAlign: 'center', marginBottom: '40px', fontSize: '1.1rem' }}>We are proud manufacturers of women's nighties. Contact us for bulk orders at factory prices.</p>
      
      <form style={{ background: 'var(--surface-color)', padding: '40px', borderRadius: 'var(--border-radius)', boxShadow: 'var(--box-shadow)', display: 'flex', flexDirection: 'column', gap: '20px' }} action="#">
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Business Name</label>
          <input type="text" style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)' }} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Contact Person</label>
          <input type="text" style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)' }} required />
        </div>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 200px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Mobile Number</label>
            <input type="tel" style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)' }} required />
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
            <input type="email" style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)' }} required />
          </div>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Interested Products</label>
          <select style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)' }}>
            <option>Women's Nighties</option>
            <option>Sarees</option>
            <option>Chudithar</option>
            <option>Men's Wear</option>
            <option>Kids Wear</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Message / Requirements</label>
          <textarea rows={4} style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)', resize: 'vertical' }}></textarea>
        </div>
        <button type="button" className="btn btn-primary" style={{ marginTop: '10px' }}>Submit Enquiry</button>
      </form>
    </div>
  );
}
