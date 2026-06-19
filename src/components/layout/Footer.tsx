import Link from 'next/link';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--surface-1)',
      borderTop: '1px solid var(--border)',
      paddingTop: '80px',
    }}>
      <div className="container">
        {/* Brand Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '48px', paddingBottom: '56px', borderBottom: '1px solid var(--border-light)' }}>
          {/* Brand */}
          <div style={{ flex: '1 1 260px', maxWidth: '300px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: '900', color: 'var(--copper-light)', letterSpacing: '0.1em', marginBottom: '4px' }}>SARAA</div>
            <div style={{ fontSize: '0.65rem', fontWeight: '600', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '20px' }}>Silks &amp; Sarees</div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
              Premium Indian ethnic wear — handpicked for quality, crafted for tradition. Own manufacturer of Women's Nighties.
            </p>
            <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
              <a href="#" aria-label="Instagram" className={styles.socialIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="#" aria-label="Facebook" className={styles.socialIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://wa.me/919655212921" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={styles.socialIconWhatsApp}>
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Nav Columns */}
          {[
            { title: 'Quick Links', links: [['Home','/'],['Shop','/shop'],['About Us','/about'],['Wholesale','/wholesale'],['Contact','/contact']] },
            { title: 'Collections', links: [['Sarees','/shop/sarees'],['Chudithar','/shop/chudithar'],['Nighties','/shop/nighties'],["Men's Wear",'/shop/men-s-wear'],['Kids Wear','/shop/kids-wear']] },
            { title: 'Customer Care', links: [['Shipping Policy','#'],['Return Policy','#'],['Privacy Policy','#'],['Terms & Conditions','#']] },
          ].map(col => (
            <div key={col.title} style={{ flex: '1 1 160px' }}>
              <h4 style={{ fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--copper)', marginBottom: '20px' }}>{col.title}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className={styles.navLink}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div style={{ flex: '1 1 220px', maxWidth: '260px' }}>
            <h4 style={{ fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--copper)', marginBottom: '20px' }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { Icon: Phone, text: '+91 96552 12921 | +91 90472 12921' },
                { Icon: MapPin, text: 'No.100, Sivanandha Mill Road, Villankurichi, Coimbatore – 641035' },
                { Icon: Mail, text: 'sales@saraasilks.com' },
              ].map(({ Icon, text }) => (
                <div key={text} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <Icon size={16} style={{ color: 'var(--copper)', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.65' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            © 2026 Saraa Silks and Sarees. GST: 33AFSPC9455L2ZV
          </span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            UPI · Credit Card · Debit Card · Net Banking
          </span>
        </div>
      </div>
    </footer>
  );
}
