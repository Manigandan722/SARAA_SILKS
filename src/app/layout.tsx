import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import AosInitializer from "@/components/AosInitializer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Saraa Silks and Sarees | Premium Indian Ethnic Wear",
  description:
    "Discover premium Sarees, Chudithars, Women's Nighties, Men's Wear, Kids Wear and more. Own manufacturing unit in Coimbatore. Shop online with free shipping above ₹999.",
  keywords:
    "sarees, silk sarees, chudithar, nighties, men's dhoti, kids wear, ethnic wear, Coimbatore",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <AosInitializer />
        <CartProvider>
          <Header />
          <main className="main-content">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
