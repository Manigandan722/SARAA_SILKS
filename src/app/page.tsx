import Link from 'next/link';
import { Star, Truck, ShieldCheck, CreditCard, Factory, ArrowRight, Sparkles } from 'lucide-react';
import styles from './page.module.css';
import { fetchProducts, getStrapiMedia } from '@/lib/api';

const CATEGORIES = [
  { name: 'Sarees', emoji: '🥻', color: 'hsl(10,60%,40%)' },
  { name: 'Chudithar', emoji: '👗', color: 'hsl(270,45%,40%)' },
  { name: "Women's Nighties", emoji: '🌙', color: 'hsl(220,50%,35%)' },
  { name: "Women's Wear", emoji: '✨', color: 'hsl(340,50%,40%)' },
  { name: "Men's Wear", emoji: '👔', color: 'hsl(190,50%,35%)' },
  { name: 'Dhoti Collection', emoji: '🎋', color: 'hsl(140,40%,30%)' },
  { name: 'Kids Wear', emoji: '🧸', color: 'hsl(40,65%,45%)' },
  { name: 'Newborn Baby Dress', emoji: '🍼', color: 'hsl(300,40%,40%)' },
];

const FEATURES = [
  { icon: Factory, title: 'Own Manufacturing', desc: 'Premium nighties crafted in-house with strict quality control.' },
  { icon: CreditCard, title: 'Factory Prices', desc: 'Buy direct from the manufacturer. No middlemen, pure savings.' },
  { icon: ShieldCheck, title: 'Quality Assured', desc: 'Every product inspected before it leaves our facility.' },
  { icon: Truck, title: 'Pan-India Delivery', desc: 'Fast & reliable shipping powered by Shiprocket.' },
];

const REVIEWS = [
  { name: 'Meena R.', loc: 'Coimbatore', text: 'Absolutely love the silk sarees! The quality is premium and the colours are vibrant.', stars: 5 },
  { name: 'Priya S.', loc: 'Chennai', text: 'The nighties are so comfortable. My whole family orders from Saraa every season.', stars: 5 },
  { name: 'Kavitha M.', loc: 'Madurai', text: 'Great collection and excellent customer service. Highly recommended!', stars: 5 },
];

export default async function Home() {
  const products = await fetchProducts();

  return (
    <>
      {/* ── HERO ──────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroOrb1} />
        <div className={styles.heroOrb2} />

        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroBadge}>
            <Sparkles size={14} />
            Premium Indian Ethnic Wear
          </div>
          <h1 className={styles.heroTitle}>
            Elegance<br />
            <em>Woven into</em><br />
            Every Thread
          </h1>
          <p className={styles.heroSub}>
            Discover handpicked Sarees, Chudithars, Nighties and more — crafted for tradition, worn for life.
          </p>
          <div className={styles.heroActions}>
            <Link href="/shop" className="btn btn-primary">
              Explore Collection <ArrowRight size={16} />
            </Link>
            <Link href="/wholesale" className="btn btn-ghost">
              Wholesale Enquiry
            </Link>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.heroCard}>
            <div className={styles.heroCardGradient} />
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>5000+</span>
                <span className={styles.statLabel}>Happy Customers</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNum}>500+</span>
                <span className={styles.statLabel}>Designs</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNum}>8</span>
                <span className={styles.statLabel}>Categories</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────── */}
      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionTag}>Collections</span>
          <h2 className={styles.sectionTitle}>Shop by Category</h2>
        </div>
        <div className={styles.categoryGrid}>
          {CATEGORIES.map((cat, i) => (
            <Link
              href={`/shop/${cat.name.toLowerCase().replace(/['"\s]+/g, '-')}`}
              key={i}
              className={styles.categoryCard}
            >
              <div className={styles.categoryBg} style={{ background: `radial-gradient(ellipse at 60% 40%, ${cat.color}, #0E0C0A)` }} />
              <span className={styles.categoryEmoji}>{cat.emoji}</span>
              <span className={styles.categoryName}>{cat.name}</span>
              <span className={styles.categoryArrow}><ArrowRight size={16} /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED BANNER ──────────────────────────── */}
      <section className={styles.nightieBanner}>
        <div className={`container ${styles.nightieContent}`}>
          <div className={styles.nightieBadge}>Own Manufacturing</div>
          <h2 className={styles.nightieTitle}>Exclusively Crafted<br /><em>Women's Nighties</em></h2>
          <p className={styles.nightieSub}>Premium comfort nightwear manufactured right here in Coimbatore. Wholesale rates available for bulk orders.</p>
          <div className={styles.nightieActions}>
            <Link href="/shop/nighties" className="btn btn-primary">Shop Nighties</Link>
            <Link href="/wholesale" className="btn btn-secondary">Wholesale Enquiry</Link>
          </div>
        </div>
        <div className={styles.nightieOrbs}>
          <div className={styles.nightieOrb} />
          <div className={styles.nightieOrb2} />
        </div>
      </section>

      {/* ── NEW ARRIVALS ──────────────────────────────── */}
      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionTag}>Just In</span>
          <h2 className={styles.sectionTitle}>New Arrivals</h2>
        </div>
        <div className={styles.productGrid}>
          {products && products.length > 0 ? products.slice(0, 4).map((product: any) => (
            <Link href={`/product/${product.documentId}`} key={product.documentId} className={styles.productCard}>
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
        <div className={styles.viewAll}>
          <Link href="/shop" className="btn btn-secondary">View All Products <ArrowRight size={16} /></Link>
        </div>
      </section>

      {/* ── WHY CHOOSE US ─────────────────────────────── */}
      <section className={styles.featuresSection}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className={styles.sectionTag}>Why Saraa</span>
            <h2 className={styles.sectionTitle}>The Saraa Difference</h2>
          </div>
          <div className={styles.featuresGrid}>
            {FEATURES.map((f, i) => (
              <div key={i} className={styles.featureCard}>
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
        <div className={styles.sectionHead}>
          <span className={styles.sectionTag}>Testimonials</span>
          <h2 className={styles.sectionTitle}>What Customers Say</h2>
        </div>
        <div className={styles.reviewsGrid}>
          {REVIEWS.map((r, i) => (
            <div key={i} className={styles.reviewCard}>
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
      <section className={styles.newsletter}>
        <div className={`container ${styles.newsletterContent}`}>
          <div className={styles.newsletterOrb} />
          <span className={styles.sectionTag} style={{ justifyContent: 'center', display: 'flex' }}>Stay Connected</span>
          <h2 className={styles.newsletterTitle}>Get Exclusive Offers &amp; New Arrivals</h2>
          <p>Join thousands of happy customers. Festival deals, new collections &amp; wholesale alerts — right in your inbox.</p>
          <form className={styles.newsletterForm} action="#">
            <input type="email" placeholder="Enter your email address" required />
            <button type="button" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}
