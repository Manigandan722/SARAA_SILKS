import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, ShoppingCart, MessageCircle, Menu, X } from 'lucide-react';
import styles from './Header.module.css';
import { useCart } from '../../context/CartContext';
import CategoryIcon from '../CategoryIcon';
import { CATEGORIES, WHATSAPP_NUMBER } from '../../data/products';

export default function Header() {
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Marquee Top Bar */}
      <div className={styles.marqueeBar}>
        <div className={styles.marqueeTrack}>
          {[...Array(6)].map((_, i) => (
            <span key={i} className={styles.marqueeItem}>
              ✦ Free Shipping Above ₹999 &nbsp;&nbsp; ✦ GST: 33AFSPC9455L2ZV &nbsp;&nbsp; ✦ Call: +91 96552 12921 &nbsp;&nbsp; ✦ Own Manufactured Nighties &nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <img src="/logo.jpeg" alt="Saraa Silks" width={72} height={90} className={styles.logoImg} />
            <span className={styles.logoText}>
              <span className={styles.logoMain}>SARAA</span>
              <span className={styles.logoSub}>SILKS &amp; SAREES</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.nav}>
            <Link to="/" className={styles.navLink}>Home</Link>
            <div className={styles.navDropdown}>
              <Link to="/shop" className={styles.navLink}>Shop ▾</Link>
              <div className={styles.dropdown}>
                {CATEGORIES.map(c => (
                  <Link key={c.documentId} to={`/shop/${c.slug}`} className={styles.dropdownItem}>
                    <CategoryIcon slug={c.slug} size={15} style={{ marginRight: '10px', color: 'var(--copper-light)', flexShrink: 0 }} />
                    <span>{c.name}</span>
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/shop?sort=newest" className={styles.navLink}>New Arrivals</Link>
            <Link to="/shop/women-s-nighties" className={styles.navLink}>Nighties</Link>
            <Link to="/shop/men-s-wear" className={styles.navLink}>Men</Link>
            <Link to="/shop/women-s-wear" className={styles.navLink}>Women</Link>
            <Link to="/shop/kids-wear" className={styles.navLink}>Kids</Link>
            <Link to="/wholesale" className={styles.navLink}>Wholesale</Link>
            <Link to="/contact" className={styles.navLink}>Contact</Link>
          </nav>

          {/* Icons */}
          <div className={styles.actions}>
            <Link to="/shop" className={styles.iconBtn} aria-label="Search"><Search size={20} /></Link>
            <Link to="/shop" className={styles.iconBtn} aria-label="Wishlist"><Heart size={20} /></Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.iconBtn} ${styles.whatsapp}`}
              aria-label="WhatsApp"
            >
              <MessageCircle size={20} />
            </a>
            <Link to="/cart" className={styles.cartBtn} aria-label="Cart">
              <ShoppingCart size={20} />
              {count > 0 && <span className={styles.badge}>{count}</span>}
            </Link>
            <button className={styles.menuBtn} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className={styles.mobileMenu}>
            <Link to="/" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Home</Link>
            
            {/* Collapsible Shop Link */}
            <div>
              <button className={styles.mobileLinkCollapsible} onClick={() => setMobileShopOpen(!mobileShopOpen)}>
                Shop {mobileShopOpen ? '▲' : '▼'}
              </button>
              {mobileShopOpen && (
                <div className={styles.mobileSubMenu}>
                  <Link to="/shop" className={styles.mobileSubLink} onClick={() => setMobileOpen(false)}>All Products</Link>
                  {CATEGORIES.map(c => (
                    <Link key={c.documentId} to={`/shop/${c.slug}`} className={styles.mobileSubLink} onClick={() => setMobileOpen(false)}>
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/shop?sort=newest" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>New Arrivals</Link>
            <Link to="/shop/women-s-nighties" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Nighties (Own Manufacturing)</Link>
            <Link to="/shop/men-s-wear" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Men's Wear</Link>
            <Link to="/shop/women-s-wear" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Women's Wear</Link>
            <Link to="/shop/kids-wear" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Kids Wear</Link>
            <Link to="/wholesale" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Wholesale Orders</Link>
            <Link to="/contact" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Contact Us</Link>
          </div>
        )}
      </header>
    </>
  );
}
