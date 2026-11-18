import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Phone, Mail, Instagram, Sparkles, User, ShieldCheck } from 'lucide-react';
import Button from '../common/Button';
import BrandLogo from '../common/BrandLogo';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Contact', path: '/contact' },
  { name: 'Get a Quote', path: '/quote' }
];

const Navbar = ({ onOpenQuoteModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu upon navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Top Notification / Portal Links Bar */}
      <div className="bg-[#0A192F] text-slate-300 text-xs py-2 px-4 border-b border-slate-800/80 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Direct Contact info */}
          <div className="flex items-center gap-6">
            <a
              href="mailto:smvisionpixel@gmail.com"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>smvisionpixel@gmail.com</span>
            </a>
            <a
              href="tel:+916386775945"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>+91 6386775945</span>
            </a>
          </div>

          {/* Socials & Portals */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/sm_vision_pixel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-pink-400 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span>@sm_vision_pixel</span>
            </a>

            <span className="text-slate-700">|</span>

            {/* Separate Client & Admin Portal Links */}
            <Link
              to="/client/login"
              className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <User className="w-3.5 h-3.5 text-sky-400" />
              <span>Client Portal</span>
            </Link>

            <span className="text-slate-700">|</span>

            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Admin Login</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3.5'
            : 'bg-white/95 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <BrandLogo to="/" />

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-blue-600 bg-blue-50/80 font-semibold'
                        : 'text-slate-600 hover:text-[#0A192F] hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Header Actions */}
            <div className="hidden md:flex items-center gap-2.5">
              <Link
                to="/client/login"
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <User className="w-3.5 h-3.5 text-blue-600" />
                <span>Client Portal</span>
              </Link>

              <Button
                to="/quote"
                variant="accent"
                size="sm"
                icon={Sparkles}
                iconPosition="right"
              >
                Get a Quote
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <Button
                to="/quote"
                variant="accent"
                size="sm"
                className="text-xs px-3 py-1.5"
              >
                Quote
              </Button>

              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle navigation"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-fadeIn">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-2.5 rounded-lg text-base font-medium transition-colors flex items-center justify-between ${
                      isActive
                        ? 'text-blue-600 bg-blue-50 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Link>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <Link
                to="/client/login"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
              >
                <User className="w-4 h-4 text-blue-600" />
                <span>Client Portal / Track Projects</span>
              </Link>

              <Link
                to="/admin/login"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-slate-500" />
                <span>Admin Login</span>
              </Link>

              <div className="text-center text-xs text-slate-500 pt-2">
                Call: <a href="tel:+916386775945" className="font-semibold text-blue-600">+91 6386775945</a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
