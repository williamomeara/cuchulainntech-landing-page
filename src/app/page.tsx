import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/hero";
import { ProductsSection } from "@/components/products-section";
import { OssStrip } from "@/components/oss-strip";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="relative z-10">
        <Hero />
        <ProductsSection />
        <OssStrip />

        <section id="services" aria-label="Services placeholder" className="px-6 py-32" />
        <section id="about" aria-label="About placeholder" className="px-6 py-32" />
        <section id="contact" aria-label="Contact placeholder" className="px-6 py-32" />
      </main>
      <SiteFooter />
    </>
  );
}
