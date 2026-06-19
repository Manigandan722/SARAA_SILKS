'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Heart, ShoppingCart, MessageCircle, Menu, X } from 'lucide-react';
import styles from './Header.module.css';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { items } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

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
          <Link href="/" className={styles.logo}>
            <Image src="/logo.jpeg" alt="Saraa Silks" width={72} height={90} style={{ objectFit: 'contain' }} priority />
            <span className={styles.logoText}>
              <span className={styles.logoMain}>SARAA</span>
              <span className={styles.logoSub}>SILKS &amp; SAREES</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.nav}>
            <Link href="/" className={styles.navLink}>Home</Link>
            <div className={styles.navDropdown}>
              <Link href="/shop" className={styles.navLink}>Shop ▾</Link>
              <div className={styles.dropdown}>
                {['Sarees', 'Chudithar', 'Nighties', "Women's Wear", "Men's Wear", 'Dhoti Collection', 'Kids Wear', 'Newborn Baby Dress'].map(c => (
                  <Link key={c} href={`/shop/${c.toLowerCase().replace(/['"\s]+/g, '-')}`} className={styles.dropdownItem}>{c}</Link>
                ))}
              </div>
            </div>
            <Link href="/about" className={styles.navLink}>About</Link>
            <Link href="/wholesale" className={styles.navLink}>Wholesale</Link>
            <Link href="/contact" className={styles.navLink}>Contact</Link>
          </nav>

          {/* Icons */}
          <div className={styles.actions}>
            <button className={styles.iconBtn} aria-label="Search"><Search size={20} /></button>
            <button className={styles.iconBtn} aria-label="Wishlist"><Heart size={20} /></button>
            <Link href="https://wa.me/919655212921" target="_blank" rel="noopener noreferrer" className={`${styles.iconBtn} ${styles.whatsapp}`} aria-label="WhatsApp">
              <MessageCircle size={20} />
            </Link>
            <Link href="/cart" className={styles.cartBtn} aria-label="Cart">
              <ShoppingCart size={20} />
              {cartItemCount > 0 && <span className={styles.badge}>{cartItemCount}</span>}
            </Link>
            <button className={styles.menuBtn} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className={styles.mobileMenu}>
            {['Home', 'Shop', 'About', 'Wholesale', 'Contact'].map(item => (
              <Link key={item} href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
                {item}
              </Link>
            ))}
          </div>
        )}
      </header>
    </>
  );
}
