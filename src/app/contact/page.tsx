import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container" style={{ padding: '80px 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', color: 'var(--primary-color)' }}>Contact Us</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
        <div>
          <h3 style={{ marginBottom: '20px' }}>Get in Touch</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              <MapPin className="text-primary" size={24} />
              <div>
                <strong>Store Address:</strong>
                <p>Saraa Silks and Sarees<br/>NO. 100, Sivanandha Mill Road,<br/>Vinayagapuram, Villankurichi,<br/>Coimbatore – 641035</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              <Phone className="text-primary" size={24} />
              <div>
                <strong>Contact Numbers:</strong>
                <p>+91 96552 12921<br/>+91 90472 12921</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              <Mail className="text-primary" size={24} />
              <div>
                <strong>Email:</strong>
                <p>sales@saraasilks.com</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              <MessageCircle className="text-primary" size={24} />
              <div>
                <strong>WhatsApp Support:</strong>
                <p><a href="https://wa.me/919655212921" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontWeight: 'bold' }}>Chat with us</a></p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '20px' }}>Store Location</h3>
          <div style={{ width: '100%', height: '400px', background: '#e0e0e0', borderRadius: 'var(--border-radius)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p>Google Map Integration Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
}
