import { useState } from 'react';
import { MessageCircle, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/products';
import styles from './Wholesale.module.css';

export default function Wholesale() {
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    mobile: '',
    email: '',
    product: "Women's Nighties (Own Manufacturing)",
    quantity: '50-100 pcs',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text = 
`🏢 *WHOLESALE / BULK ENQUIRY - SARAA SILKS*
----------------------------------
🏪 *Business Name:* ${formData.businessName}
👤 *Contact Person:* ${formData.contactPerson}
📱 *Mobile Number:* ${formData.mobile}
${formData.email ? `📧 *Email:* ${formData.email}\n` : ''}📦 *Interested Category:* ${formData.product}
🔢 *Estimated Quantity:* ${formData.quantity}
${formData.message ? `💬 *Requirements:* ${formData.message}\n` : ''}----------------------------------
Please provide wholesale catalog, price list, and minimum order requirements.`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className={`container ${styles.wholesaleContainer}`}>
      <h1 className={styles.title}>Wholesale &amp; Bulk Orders</h1>
      <p className={styles.subtitle}>
        We are proud manufacturers of premium women&apos;s nighties based in Coimbatore. Contact us directly for bulk orders at direct factory wholesale prices.
      </p>

      {submitted ? (
        <div style={{
          background: 'var(--surface-1)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '48px 24px',
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto',
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #25D366, #128C7E)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <CheckCircle2 size={36} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '12px' }}>Enquiry Sent via WhatsApp!</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6' }}>
            Thank you for reaching out. Our wholesale representative will review your requirement and share the catalog and pricing on WhatsApp.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="btn btn-secondary"
          >
            Submit Another Enquiry
          </button>
        </div>
      ) : (
        <form className={styles.wholesaleForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Business / Shop Name *</label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className={styles.inputField}
              placeholder="e.g. Sri Lakshmi Textiles"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Contact Person Name *</label>
            <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              className={styles.inputField}
              placeholder="e.g. Rajesh Kumar"
              required
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>WhatsApp / Mobile Number *</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className={styles.inputField}
                placeholder="10-digit phone number"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.inputField}
                placeholder="shop@example.com"
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Primary Product of Interest *</label>
              <select
                name="product"
                value={formData.product}
                onChange={handleChange}
                className={styles.selectField}
              >
                <option value="Women's Nighties (Own Manufacturing)">Women&apos;s Nighties (Own Manufacturing)</option>
                <option value="Sarees (Silk &amp; Cotton)">Sarees (Silk &amp; Cotton)</option>
                <option value="Chudithar &amp; Salwar Suits">Chudithar &amp; Salwar Suits</option>
                <option value="Men's Wear &amp; Dhotis">Men&apos;s Wear &amp; Dhotis</option>
                <option value="Kids &amp; Baby Wear">Kids &amp; Baby Wear</option>
                <option value="Complete Store Stock">Complete Store Stock</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Expected Quantity</label>
              <select
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className={styles.selectField}
              >
                <option value="50-100 pcs">50 - 100 pcs</option>
                <option value="100-500 pcs">100 - 500 pcs</option>
                <option value="500-1000 pcs">500 - 1,000 pcs</option>
                <option value="1000+ pcs">1,000+ pcs (Factory Direct)</option>
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Specific Requirements / Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about your business, delivery city, preferred fabrics or designs..."
              className={styles.textareaField}
            />
          </div>

          <button
            type="submit"
            className="btn"
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '1.1rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #25D366, #128C7E)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              boxShadow: '0 4px 18px rgba(37, 211, 102, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              cursor: 'pointer',
            }}
          >
            <MessageCircle size={22} /> Send Wholesale Enquiry on WhatsApp
          </button>
        </form>
      )}
    </div>
  );
}
