'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './HeroSlider.module.css';

const SLIDES = [
  {
    image: '/hero1.png',
    tag: 'Festive Special',
    title: 'Elegance for Every Occasion',
    subtitle: 'Discover premium Sarees, Chudithars, Nighties, Men\'s Wear, Kids Wear and more at affordable prices.',
    btnPrimary: 'Shop Now',
    btnPrimaryLink: '/shop',
    btnSecondary: 'View Collections',
    btnSecondaryLink: '/shop',
  },
  {
    image: '/hero2.png',
    tag: 'Family Collection',
    title: 'Fashion for the Whole Family',
    subtitle: 'High-quality Indian ethnic wear, casual tracks, born baby dresses and premium men\'s dhotis at factory-direct pricing.',
    btnPrimary: 'Shop Family',
    btnPrimaryLink: '/shop',
    btnSecondary: 'View Collections',
    btnSecondaryLink: '/shop',
  },
  {
    image: '/hero3.png',
    tag: 'Own Manufacturing',
    title: 'Own Manufactured Women\'s Nighties',
    subtitle: 'Premium quality nighties crafted with comfort, durability and elegant designs. Wholesale rates available for bulk orders.',
    btnPrimary: 'Shop Nighties Now',
    btnPrimaryLink: '/shop/women-s-nighties',
    btnSecondary: 'Wholesale Pricing',
    btnSecondaryLink: '/wholesale',
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <div className={styles.sliderContainer}>
      {SLIDES.map((slide, idx) => (
        <div
          key={idx}
          className={`${styles.slide} ${idx === current ? styles.active : ''}`}
          style={{ backgroundImage: `linear-gradient(to right, rgba(14, 12, 10, 0.9) 30%, rgba(14, 12, 10, 0.4) 60%, rgba(14, 12, 10, 0.8) 100%), url(${slide.image})` }}
        >
          <div className={`container ${styles.contentWrap}`}>
            <div className={styles.tag}>{slide.tag}</div>
            <h1 className={styles.title}>{slide.title}</h1>
            <p className={styles.subtitle}>{slide.subtitle}</p>
            <div className={styles.actions}>
              <Link href={slide.btnPrimaryLink} className="btn btn-primary">
                {slide.btnPrimary} <ArrowRight size={16} />
              </Link>
              <Link href={slide.btnSecondaryLink} className="btn btn-ghost">
                {slide.btnSecondary}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button className={`${styles.navBtn} ${styles.prev}`} onClick={prevSlide} aria-label="Previous slide">
        <ChevronLeft size={24} />
      </button>
      <button className={`${styles.navBtn} ${styles.next}`} onClick={nextSlide} aria-label="Next slide">
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className={styles.dots}>
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            className={`${styles.dot} ${idx === current ? styles.activeDot : ''}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
