import HeroSection from "@/sections/HeroSection";
import WhyChooseUs from "@/sections/WhyChooseUs";
import FeaturedDestination from "@/sections/FeaturedDestination";
import DestinationsGrid from "@/sections/DestinationsGrid";
import ExperienceScroll from "@/sections/ExperienceScroll";
import TourPackages from "@/sections/TourPackages";
import Services from "@/sections/Services";
import Testimonials from "@/sections/Testimonials";
import FinalCTA from "@/sections/FinalCTA";
import ContactSection from "@/sections/ContactSection";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="flex flex-col w-full bg-black relative selection:bg-[var(--color-accent)] selection:text-black">
      <Navbar />
      <HeroSection />
      <WhyChooseUs />
      <FeaturedDestination />
      <DestinationsGrid />
      <ExperienceScroll />
      <TourPackages />
      <Services />
      <Testimonials />
      <FinalCTA />
      <ContactSection />
    </main>
  );
}
