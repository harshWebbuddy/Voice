import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import DemoSection from '../components/DemoSection';
import ProductSection from '../components/ProductSection';
import UseCases from '../components/UseCases';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <DemoSection />
      <UseCases />
      <ProductSection />
      <TestimonialsSection />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home; 