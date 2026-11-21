# Saraa Silks & Sarees — Standalone React Frontend (MERN Frontend)

A complete, production-ready, standalone React frontend for **Saraa Silks and Sarees**, built with **React 19**, **Vite**, **TypeScript**, and **React Router DOM v7**.

This project contains **zero backend dependencies** — all product data, categories, images, and shopping cart persistence are handled client-side, with full checkout and orders directed straight to WhatsApp (**+91 96552 12921**).

---

## 🚀 Quick Start

1. **Enter the frontend folder:**
   ```bash
   cd frontend
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open the browser at `http://localhost:5173`.

3. **Build for Production:**
   ```bash
   npm run build
   ```
   Generates optimized static HTML, CSS, and JS in `dist/`.

---

## 🎨 Features & Design

- **Identical Brand Design System**:
  - Dark luxury theme with Copper (`#C8763A`), Gold (`#D4AF6A`), and Ink surfaces.
  - Serif typography with **Playfair Display** & **Cormorant Garamond**, and **Inter** for body.
  - Smooth AOS scroll animations and responsive CSS modules.
- **Full Shopping Cart**:
  - Add to cart with 1-click from product cards on Home and Shop pages.
  - Quantity picker (`+` / `-`) on product detail page.
  - Persistent cart state saved across reloads in `localStorage`.
  - Dynamic cart badge count in the header.
- **WhatsApp Order Placement**:
  - **Checkout Page (`/checkout`)**: Customers fill in their Name, WhatsApp Number, and Delivery Address, and click **"Place Order on WhatsApp"**.
  - Generates an Order ID (e.g. `#SARAA-123456`) and formats a clean, itemized WhatsApp message with products, quantities, prices, address, and total payable, opening WhatsApp chat with **+91 96552 12921**.
  - **Cart Page (`/cart`)**: Quick *"Order via WhatsApp"* button for instant 1-click cart orders.
  - **Product Page (`/product/:id`)**: *"Buy Now on WhatsApp"* button.
  - **Wholesale Page (`/wholesale`)**: Direct WhatsApp submission for factory bulk nighty orders.

---

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets (logos, hero banners, product images)
│   ├── images/             # Product photography (saree.png, chudithar.png, etc.)
│   └── hero1.png, hero2.png...
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx  # Luxury header with marquee, navigation & cart counter
│   │   │   └── Footer.tsx  # Luxury footer with store contact & location
│   │   ├── HeroSlider.tsx  # Responsive hero banner carousel
│   │   ├── ProductCard.tsx # Product card with interactive "Add to Cart"
│   │   └── ScrollToTop.tsx # Scrolls to top on route change
│   ├── context/
│   │   └── CartContext.tsx # Context API & localStorage cart management
│   ├── data/
│   │   └── products.ts     # Rich product catalog with all 8 collections
│   ├── pages/
│   │   ├── Home.tsx        # Landing page with hero, categories, new arrivals
│   │   ├── Shop.tsx        # All collections with category sidebar
│   │   ├── CategoryPage.tsx# Category filtered products
│   │   ├── ProductDetails.tsx# Product view, gallery, specs, Add to Cart
│   │   ├── Cart.tsx        # Shopping cart view with quantity editor
│   │   ├── Checkout.tsx    # Shipping details form & Place Order on WhatsApp
│   │   ├── Wholesale.tsx   # Bulk nighties enquiry form to WhatsApp
│   │   ├── Contact.tsx     # Coimbatore store address, map & contacts
│   │   └── About.tsx       # Brand & manufacturing unit history
│   ├── App.tsx             # Route definitions & AOS initialization
│   ├── main.tsx            # React application entry point
│   └── index.css           # Global design tokens, fonts & resets
├── package.json
└── vite.config.ts
```

---

## 📱 WhatsApp Order Message Preview

```text
🛍️ NEW ORDER - SARAA SILKS & SAREES
----------------------------------
🔖 Order ID: #SARAA-581932
📅 Date: 21 Nov 2026

👤 Customer Information:
• Name: Priya Sharma
• Phone: 9876543210
• Payment Mode: Cash on Delivery (COD)

📍 Delivery Address:
123 Sivanandha Mill Road, Coimbatore, Tamil Nadu - 641035

----------------------------------
📦 Items Ordered:
1. Kanchipuram Silk Saree (Pure Zari)
   Qty: 1 × ₹5,499 = ₹5,499
2. Comfort Fit Floral Cotton Nighty
   Qty: 2 × ₹499 = ₹998

----------------------------------
💰 Subtotal: ₹6,497
🚚 Shipping: FREE Delivery Across India
🏷️ TOTAL PAYABLE: ₹6,497
----------------------------------
Please confirm my order and share dispatch tracking details. Thank you! 🙏
```
