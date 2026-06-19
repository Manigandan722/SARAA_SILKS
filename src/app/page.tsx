import Link from 'next/link';
import { Star, Truck, ShieldCheck, CreditCard, Factory, ArrowRight, Sparkles } from 'lucide-react';
import styles from './page.module.css';
import { fetchProducts, getStrapiMedia } from '@/lib/api';
import HeroSlider from '@/components/HeroSlider';

const CATEGORIES = [
  { name: 'Sarees', emoji: '🥻', color: 'hsl(10,60%,40%)' },
  { name: 'Chudithar', emoji: '👗', color: 'hsl(270,45%,40%)' },
  { name: "Women's Nighties", emoji: '🌙', color: 'hsl(220,50%,35%)' },
  { name: "Men's Wear", emoji: '👔', color: 'hsl(190,50%,35%)' },
  { name: 'Dhoti Collection', emoji: '🎋', color: 'hsl(140,40%,30%)' },
  { name: 'Kids Wear', emoji: '🧸', color: 'hsl(40,65%,45%)' },
  { name: 'Born Baby Dress', emoji: '🍼', color: 'hsl(300,40%,40%)' },
  { name: "Women's Wear", emoji: '✨', color: 'hsl(340,50%,40%)' },
];

const FEATURES = [
  { icon: Factory, title: 'Own Manufacturing Unit', desc: "High-quality women's nighties directly from the manufacturer." },
  { icon: CreditCard, title: 'Affordable Pricing', desc: 'Factory-direct prices.' },
  { icon: ShieldCheck, title: 'Secure Payments', desc: 'UPI, Cards and Net Banking.' },
  { icon: Truck, title: 'Fast Delivery', desc: 'Reliable shipping across India.' },
  { icon: Sparkles, title: 'Quality Assurance', desc: 'Every product checked before dispatch.' },
];

const REVIEWS = [
  { name: 'Meena R.', loc: 'Coimbatore', text: 'Excellent quality sarees and fast delivery.', stars: 5 },
  { name: 'Priya S.', loc: 'Chennai', text: 'Nighties are very comfortable and worth the price.', stars: 5 },
  { name: 'Kavitha M.', loc: 'Madurai', text: 'Great collection and affordable pricing.', stars: 5 },
];

export default async function Home() {
  const products = await fetchProducts();

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
              href={`/shop/${cat.name.toLowerCase().replace(/['"\s]+/g, '-')}`}
              key={i}
              className={styles.categoryCard}
              data-aos="fade-up"
              data-aos-delay={i * 50}
            >
              <div className={styles.categoryBg} style={{ background: `radial-gradient(ellipse at 60% 40%, ${cat.color}, #0E0C0A)` }} />
              <span className={styles.categoryEmoji}>{cat.emoji}</span>
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
            { title: "Men's Essentials", desc: 'Dhoti, Tracks and Casual Wear.', image: '/hero2.png', link: '/shop/men-s-wear' },
            { title: 'Kids Fashion', desc: 'Comfortable and stylish wear for children.', image: '/hero2.png', link: '/shop/kids-wear' },
          ].map((col, idx) => (
            <Link
              href={col.link}
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
          <p className={styles.nightieSub}>Premium quality nighties crafted with comfort, durability and elegant designs.</p>
          <div className={styles.nightieActions}>
            <Link href="/shop/women-s-nighties" className="btn btn-primary">Shop Nighties Now</Link>
            <Link href="/wholesale" className="btn btn-secondary">Wholesale Enquiry</Link>
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
          {products && products.length > 0 ? products.slice(0, 4).map((product: any, i: number) => (
            <Link
              href={`/product/${product.documentId}`}
              key={product.documentId}
              className={styles.productCard}
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className={styles.productImg}>
                {product.image?.url ? (
                  <img src={getStrapiMedia(product.image.url) || ''} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div className={styles.productImgPlaceholder} />
                )}
                <div className={styles.productImgOverlay} />
              </div>
              <div className={styles.productBody}>
                <h4 className={styles.productName}>{product.title}</h4>
                <div className={styles.productFooter}>
                  <span className={styles.productPrice}>₹{product.price}</span>
                  <span className={styles.productAdd}>Add +</span>
                </div>
              </div>
            </Link>
          )) : (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={`${styles.productCard} ${styles.skeleton}`}>
                <div className={styles.productImg}><div className={styles.skeletonImg} /></div>
                <div className={styles.productBody}>
                  <div className={styles.skeletonLine} />
                  <div className={styles.skeletonLineShort} />
                </div>
              </div>
            ))
          )}
        </div>
        <div className={styles.viewAll} data-aos="fade-up">
          <Link href="/shop" className="btn btn-secondary">View All Products <ArrowRight size={16} /></Link>
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
              <p className={styles.reviewText}>"{r.text}"</p>
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
          <form className={styles.newsletterForm} action="#">
            <input type="email" placeholder="Enter your email address" required />
            <button type="button" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}
