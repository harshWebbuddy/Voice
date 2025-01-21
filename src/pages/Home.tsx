import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import DemoSection from "../components/DemoSection";
import ProductSection from "../components/ProductSection";
import UseCases from "../components/UseCases";
import TestimonialsSection from "../components/TestimonialsSection";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

const Home = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash === "#use-cases") {
      const element = document.getElementById("use-cases");
      if (element) {
        // Smooth scroll to the use-cases section
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const HandleSignIn = () => {
    window.location.href = "/sign-up";
  };

  return (
    <div className="min-h-screen bg-white">
     
      <Navbar/>
      <Hero />
      <DemoSection />
      <div id="use-cases">
        <UseCases />
      </div>
      <ProductSection />
      <TestimonialsSection />
      <div id="faq">
        <FAQ />
      </div>
      <Footer />
    </div>
  );
};

export default Home;