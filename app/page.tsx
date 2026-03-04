"use client";

import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ImpactText from "@/components/ImpactText";
import AboutSection from "@/components/AboutSection";
import WorksSection from "@/components/WorksSection";
import PrinciplesSection from "@/components/PrinciplesSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoaded(true)} />
      <Navigation />
      <main>
        <HeroSection isLoaded={isLoaded} />
        <ImpactText />
        <AboutSection />
        <WorksSection />
        <PrinciplesSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
