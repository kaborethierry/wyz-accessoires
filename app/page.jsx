// app/page.jsx
import "./page.css";

import Hero from "@/components/sections/Hero";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import CategoriesSection from "@/components/sections/CategoriesSection";
import BrandStory from "@/components/sections/BrandStory";
import MaterialsSection from "@/components/sections/MaterialsSection";
import GalleryPreview from "@/components/sections/GalleryPreview";
import WhatsAppCTA from "@/components/sections/WhatsAppCTA";
import NewsletterSection from "@/components/sections/NewsletterSection";

export const metadata = {
  title: "Accueil",
  description:
    "WYZ Accessoires — Sacs, trousses, accessoires enfant et articles maison faits main en jute et wax. Commandes via WhatsApp.",
};

export default function HomePage() {
  return (
    <div className="home">
      <Hero />
      <FeaturedProducts />
      <CategoriesSection />
      <BrandStory />
      <MaterialsSection />
      <GalleryPreview />
      <WhatsAppCTA />
      <NewsletterSection />
    </div>
  );
}