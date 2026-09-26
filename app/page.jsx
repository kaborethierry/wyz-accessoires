// app/page.jsx
import "./page.css";

import Hero from "@/components/sections/Hero";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import CategoriesSection from "@/components/sections/CategoriesSection";
import BrandStory from "@/components/sections/BrandStory";
import FounderStory from "@/components/sections/FounderStory";
import MaterialsSection from "@/components/sections/MaterialsSection";
import CompanyServices from "@/components/sections/CompanyServices";
import GalleryPreview from "@/components/sections/GalleryPreview";
import WhatsAppCTA from "@/components/sections/WhatsAppCTA";
import NewsletterSection from "@/components/sections/NewsletterSection";

export const metadata = {
  title: "Accueil",
  description:
    "WYZ Accessoires — L'utile autrement. Sacs, trousses, accessoires enfant et articles maison faits main en jute et wax. Prestations entreprises et formations sur demande.",
};

export default function HomePage() {
  return (
    <div className="home">
      <Hero />
      <FeaturedProducts />
      <CategoriesSection />
      <BrandStory />
      <FounderStory />
      <MaterialsSection />
      <CompanyServices />
      <GalleryPreview />
      <WhatsAppCTA />
      <NewsletterSection />
    </div>
  );
}