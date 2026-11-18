import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Hero from '../components/home/Hero';
import ServicesPreview from '../components/home/ServicesPreview';
import PortfolioPreview from '../components/home/PortfolioPreview';
import WhyChooseUs from '../components/home/WhyChooseUs';
import WorkProcess from '../components/home/WorkProcess';
import TeamPreview from '../components/home/TeamPreview';
import CtaBanner from '../components/home/CtaBanner';

const Home = () => {
  const { openQuoteModal } = useOutletContext();

  return (
    <div>
      {/* 1. Hero Section */}
      <Hero onOpenQuoteModal={() => openQuoteModal()} />

      {/* 2. Services Overview */}
      <ServicesPreview onOpenQuoteModal={openQuoteModal} />

      {/* 3. Selected Portfolio Preview */}
      <PortfolioPreview />

      {/* 4. Why Choose Us */}
      <WhyChooseUs />

      {/* 5. Working Process */}
      <WorkProcess />

      {/* 6. Team Introduction */}
      <TeamPreview />

      {/* 7. Client Inquiry CTA */}
      <CtaBanner onOpenQuoteModal={() => openQuoteModal()} />
    </div>
  );
};

export default Home;
