import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import QuoteModal from '../forms/QuoteModal';

const Layout = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');

  const openQuoteModal = (serviceName = '') => {
    setPreselectedService(serviceName);
    setIsQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setPreselectedService('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFC]">
      <Navbar onOpenQuoteModal={() => openQuoteModal()} />
      <main className="flex-grow">
        <Outlet context={{ openQuoteModal }} />
      </main>
      <Footer onOpenQuoteModal={() => openQuoteModal()} />

      {/* Global Interactive Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={closeQuoteModal}
        preselectedService={preselectedService}
      />
    </div>
  );
};

export default Layout;
