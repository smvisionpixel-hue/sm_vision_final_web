import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/common/ScrollToTop';

// Public Agency Pages (100% accessible to visitors without login)
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import QuotePage from './pages/QuotePage';
import NotFound from './pages/NotFound';

// Client Portal (Separate, Optional project tracking)
import ClientLogin from './pages/ClientLogin';
import ClientPortal from './pages/ClientPortal';

// Admin Portal (Separate, Protected management)
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Main Public Website Layout - Open to all visitors */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="contact" element={<Contact />} />
          <Route path="quote" element={<QuotePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Separate Client Portal */}
        <Route path="/client/login" element={<ClientLogin />} />
        <Route path="/client/portal" element={<ClientPortal />} />

        {/* Separate Protected Admin Portal */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
