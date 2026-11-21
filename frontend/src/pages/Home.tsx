import { Link } from 'react-router-dom';
import { Star, Truck, ShieldCheck, CreditCard, Factory, ArrowRight, Sparkles } from 'lucide-react';
import styles from './Home.module.css';
import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';
import CategoryIcon from '../components/CategoryIcon';
import { PRODUCTS, CATEGORIES } from '../data/products';

const FEATURES = [
  { icon: Factory, title: 'Own Manufacturing Unit', desc: "High-quality women's nighties directly from the manufacturer in Coimbatore." },
  { icon: CreditCard, title: 'Affordable Pricing', desc: 'Direct factory pricing with no middleman markup.' },
  { icon: ShieldCheck, title: 'Easy WhatsApp Ordering', desc: 'Order with 1-click on WhatsApp with live personalized support.' },
  { icon: Truck, title: 'Fast Delivery', desc: 'Reliable doorstep shipping across India.' },
  { icon: Sparkles, title: 'Quality Assurance', desc: 'Every product checked thoroughly before dispatch.' },
];

const REVIEWS = [
  { name: 'Meena R.', loc: 'Coimbatore', text: 'Excellent quality sarees and fast delivery. Wore the Kanchipuram silk saree for my cousin\'s wedding and received so many compliments!', stars: 5 },
  { name: 'Priya S.', loc: 'Chennai', text: 'Nighties are very comfortable, soft combed cotton, and completely worth the price. Ordering on WhatsApp was so seamless!', stars: 5 },
  { name: 'Kavitha M.', loc: 'Madurai', text: 'Great collection and affordable pricing. The baby rompers and kidswear are super gentle on baby skin.', stars: 5 },
];

export default function Home() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────── */}
      <HeroSlider />

      {/* ── CATEGORIES ───────────────────────────────── */}
      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHead} data-aos="fade-up">
          <span className={styles.sectionTag}>Collections</span>
          <h2 className={styles.sectionTitle}>Shop by Category</h2>
        </div>
        <div className={styles.categoryGrid}>
          {CATEGORIES.map((cat, i) => (
            <Link
              to={`/shop/${cat.slug}`}
              key={cat.documentId}
              className={styles.categoryCard}
              data-aos="fade-up"
              data-aos-delay={i * 50}
            >
              <div
                className={styles.categoryBg}
                style={{
                  background: `radial-gradient(ellipse at 60% 40%, hsl(${i * 45}, 55%, 35%), #0E0C0A)`
                }}
              />
              <div className={styles.categoryIconWrap}>
                <CategoryIcon slug={cat.slug} size={24} />
              </div>
              <span className={styles.categoryName}>{cat.name}</span>
              <span className={styles.categoryArrow}><ArrowRight size={16} /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED COLLECTIONS ────────────────────── */}
      <section className={`container ${styles.section}`} style={{ paddingTop: '0px' }}>
        <div className={styles.sectionHead} data-aos="fade-up">
          <span className={styles.sectionTag}>Curated for You</span>
          <h2 className={styles.sectionTitle}>Featured Collections</h2>
        </div>
        <div className={styles.featuredGrid}>
          {[
            { title: 'Trending Sarees', desc: 'Premium silk, cotton and designer sarees.', image: '/hero1.png', link: '/shop/sarees' },
            { title: 'Wholesale Nighties', desc: 'Manufactured by Saraa Silks and Sarees.', image: '/hero3.png', link: '/wholesale' },
            { title: "Men's Essentials", desc: 'Dhoti, Kurtas and Casual Wear.', image: '/hero2.png', link: '/shop/men-s-wear' },
            { title: 'Kids Fashion', desc: 'Comfortable and stylish wear for children.', image: '/hero2.png', link: '/shop/kids-wear' },
          ].map((col, idx) => (
            <Link
              to={col.link}
              key={idx}
              className={styles.featuredCard}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className={styles.featuredCardBg} style={{ backgroundImage: `url(${col.image})` }} />
              <div className={styles.featuredCardOverlay} />
              <div className={styles.featuredCardContent}>
                <h3 className={styles.featuredCardTitle}>{col.title}</h3>
                <p className={styles.featuredCardDesc}>{col.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── SPECIAL BANNER WITH CTA ───────────────────── */}
      <section className={styles.nightieBanner} data-aos="fade-up">
        <div className={`container ${styles.nightieContent}`} data-aos="fade-right" data-aos-delay="200">
          <div className={styles.nightieBadge}>Own Manufacturing Unit</div>
          <h2 className={styles.nightieTitle}>Own Manufactured<br /><em>Women's Nighties</em></h2>
          <p className={styles.nightieSub}>Premium quality nighties crafted with comfort, durability and elegant designs directly from Coimbatore.</p>
          <div className={styles.nightieActions}>
            <Link to="/shop/women-s-nighties" className="btn btn-primary">Shop Nighties Now</Link>
            <Link to="/wholesale" className="btn btn-secondary">Wholesale Enquiry</Link>
          </div>
        </div>
        <div className={styles.nightieOrbs}>
          <div className={styles.nightieOrb} />
          <div className={styles.nightieOrb2} />
        </div>
      </section>

      {/* ── NEW ARRIVALS ──────────────────────────────── */}
      <section id="new-arrivals" className={`container ${styles.section}`}>
        <div className={styles.sectionHead} data-aos="fade-up">
          <span className={styles.sectionTag}>Just In</span>
          <h2 className={styles.sectionTitle}>New Arrivals</h2>
        </div>
        <div className={styles.productGrid}>
          {PRODUCTS.slice(0, 8).map((product, i) => (
            <ProductCard key={product.documentId} product={product} delay={i * 75} />
          ))}
        </div>
        <div className={styles.viewAll} data-aos="fade-up">
          <Link to="/shop" className="btn btn-secondary">View All Products <ArrowRight size={16} /></Link>
        </div>
      </section>

      {/* ── WHY CHOOSE US ─────────────────────────────── */}
      <section className={styles.featuresSection}>
        <div className="container">
          <div className={styles.sectionHead} data-aos="fade-up">
            <span className={styles.sectionTag}>Why Saraa</span>
            <h2 className={styles.sectionTitle}>Why Choose Us</h2>
          </div>
          <div className={styles.featuresGrid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className={styles.featureCard}
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className={styles.featureIconWrap}>
                  <f.icon size={28} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ───────────────────────────────────── */}
      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHead} data-aos="fade-up">
          <span className={styles.sectionTag}>Testimonials</span>
          <h2 className={styles.sectionTitle}>Customer Reviews</h2>
        </div>
        <div className={styles.reviewsGrid}>
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className={styles.reviewCard}
              data-aos="fade-up"
              data-aos-delay={i * 150}
            >
              <div className={styles.stars}>
                {Array.from({ length: r.stars }).map((_, s) => <Star key={s} size={14} fill="currentColor" />)}
              </div>
              <p className={styles.reviewText}>&ldquo;{r.text}&rdquo;</p>
              <div className={styles.reviewer}>
                <span className={styles.reviewerName}>{r.name}</span>
                <span className={styles.reviewerLoc}>{r.loc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER ────────────────────────────────── */}
      <section className={styles.newsletter} data-aos="fade-up">
        <div className={`container ${styles.newsletterContent}`}>
          <div className={styles.newsletterOrb} />
          <span className={styles.sectionTag} style={{ justifyContent: 'center', display: 'flex' }}>Stay Connected</span>
          <h2 className={styles.newsletterTitle}>Stay Updated</h2>
          <p>Subscribe to receive updates on:</p>
          <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'center', gap: '24px', margin: '-10px auto 30px', padding: 0, flexWrap: 'wrap', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
            <li data-aos="fade-up" data-aos-delay="100">✦ New Arrivals</li>
            <li data-aos="fade-up" data-aos-delay="200">✦ Festival Offers</li>
            <li data-aos="fade-up" data-aos-delay="300">✦ Exclusive Discounts</li>
          </ul>
          <form className={styles.newsletterForm} onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to Saraa Silks!'); }}>
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}
