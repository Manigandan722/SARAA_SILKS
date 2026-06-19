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
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
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
            <Image src="/logo.jpeg" alt="Saraa Silks" width={72} height={90} className={styles.logoImg} priority />
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
                {['Sarees', 'Chudithar', "Women's Nighties", "Women's Wear", "Men's Wear", 'Dhoti Collection', 'Kids Wear', 'Newborn Baby Dress'].map(c => (
                  <Link key={c} href={`/shop/${c.toLowerCase().replace(/['"\s]+/g, '-')}`} className={styles.dropdownItem}>{c}</Link>
                ))}
              </div>
            </div>
            <Link href="/shop?sort=newest" className={styles.navLink}>New Arrivals</Link>
            <Link href="/shop/women-s-nighties" className={styles.navLink}>Nighties</Link>
            <Link href="/shop/men-s-wear" className={styles.navLink}>Men</Link>
            <Link href="/shop/women-s-wear" className={styles.navLink}>Women</Link>
            <Link href="/shop/kids-wear" className={styles.navLink}>Kids</Link>
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
            <Link href="/" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Home</Link>
            
            {/* Collapsible Shop Link */}
            <div>
              <button className={styles.mobileLinkCollapsible} onClick={() => setMobileShopOpen(!mobileShopOpen)}>
                Shop {mobileShopOpen ? '▲' : '▼'}
              </button>
              {mobileShopOpen && (
                <div className={styles.mobileSubMenu}>
                  <Link href="/shop" className={styles.mobileSubLink} onClick={() => setMobileOpen(false)}>All Products</Link>
                  {['Sarees', 'Chudithar', "Women's Nighties", "Women's Wear", "Men's Wear", 'Dhoti Collection', 'Kids Wear', 'Newborn Baby Dress'].map(c => (
                    <Link key={c} href={`/shop/${c.toLowerCase().replace(/['"\s]+/g, '-')}`} className={styles.mobileSubLink} onClick={() => setMobileOpen(false)}>
                      {c}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/shop?sort=newest" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>New Arrivals</Link>
            <Link href="/shop/women-s-nighties" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Nighties</Link>
            <Link href="/shop/men-s-wear" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Men</Link>
            <Link href="/shop/women-s-wear" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Women</Link>
            <Link href="/shop/kids-wear" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Kids</Link>
            <Link href="/about" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>About</Link>
            <Link href="/wholesale" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Wholesale</Link>
            <Link href="/contact" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Contact</Link>
            
            {/* Mobile Search inside drawer */}
            <div className={styles.mobileSearchBox}>
              <input type="text" placeholder="Search products..." className={styles.mobileSearchInput} />
              <Search size={18} className={styles.mobileSearchIcon} />
            </div>

            {/* Quick Contact buttons in mobile menu */}
            <div className={styles.mobileMenuFooter}>
              <a href="tel:+919655212921" className={styles.mobileFooterBtn}>Call Support</a>
              <a href="https://wa.me/919655212921" target="_blank" rel="noopener noreferrer" className={`${styles.mobileFooterBtn} ${styles.mobileWhatsappBtn}`}>WhatsApp Chat</a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
