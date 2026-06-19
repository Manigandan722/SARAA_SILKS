import { MapPin, Phone, Mail, MessageCircle, Headphones, HeartHandshake } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container" style={{ padding: '80px 20px', minHeight: '80vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '16px', color: 'var(--copper-light)', fontFamily: 'var(--font-display)', fontWeight: 800 }}>Contact Us</h1>
      <p style={{ textAlign: 'center', marginBottom: '56px', color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 56px' }}>
        We are here to help. Reach out to us for retail queries, order support, or bulk wholesale enquiries.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px' }}>
        {/* Contact Info Card */}
        <div style={{ background: 'var(--surface-1)', padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text)', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px', marginBottom: '8px' }}>Get in Touch</h2>
          
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{ padding: '10px', background: 'rgba(200, 118, 58, 0.1)', borderRadius: 'var(--radius-md)', color: 'var(--copper-light)', marginTop: '4px' }}>
              <MapPin size={22} />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--copper)', marginBottom: '6px' }}>Store Address</strong>
              <span style={{ color: 'var(--text)', fontSize: '0.98rem', lineHeight: '1.7', fontWeight: 500 }}>
                Saraa Silks and Sarees<br/>
                No. 100, Sivanandha Mill Road,<br/>
                Vinayagapuram, Villankurichi,<br/>
                Coimbatore – 641035
              </span>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{ padding: '10px', background: 'rgba(200, 118, 58, 0.1)', borderRadius: 'var(--radius-md)', color: 'var(--copper-light)', marginTop: '4px' }}>
              <Phone size={22} />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--copper)', marginBottom: '6px' }}>Contact Numbers</strong>
              <span style={{ color: 'var(--text)', fontSize: '1.05rem', fontWeight: 600, letterSpacing: '0.02em' }}>
                +91 96552 12921<br/>
                +91 90472 12921
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{ padding: '10px', background: 'rgba(200, 118, 58, 0.1)', borderRadius: 'var(--radius-md)', color: 'var(--copper-light)', marginTop: '4px' }}>
              <Mail size={22} />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--copper)', marginBottom: '6px' }}>Email Support</strong>
              <a href="mailto:sales@saraasilks.com" style={{ color: 'var(--copper-light)', fontSize: '0.98rem', textDecoration: 'none', fontWeight: 500, borderBottom: '1px dotted var(--copper-light)' }}>
                sales@saraasilks.com
              </a>
            </div>
          </div>

          {/* Support Options Section */}
          <div style={{ marginTop: '16px', background: 'var(--surface-2)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Headphones size={18} style={{ color: 'var(--copper)' }} /> Support Options
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--copper-light)' }}>✦</span> WhatsApp Support
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--copper-light)' }}>✦</span> Live Chat Support
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--copper-light)' }}>✦</span> Email Support
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--copper-light)' }}>✦</span> Phone Support
              </li>
            </ul>
          </div>
        </div>

        {/* Map and Message Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: 'var(--surface-1)', padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text)', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px', marginBottom: '24px' }}>
              Store Location
            </h2>
            <div style={{ width: '100%', height: '320px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.148184852927!2d77.0141673!3d11.0279678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859d0af10cd99%3A0x63351b8c8d8ec3c0!2sSivanandha%20Mill%20Rd%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            
            <div style={{ marginTop: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a
                href="https://wa.me/919655212921"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#25D366', borderColor: '#25D366', color: '#FFFFFF', flex: 1, justifyContent: 'center' }}
              >
                <MessageCircle size={18} /> WhatsApp Enquiry
              </a>
              <a
                href="tel:+919655212921"
                className="btn btn-secondary"
                style={{ flex: 1, display: 'flex', justifyContent: 'center' }}
              >
                Call Customer Care
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
