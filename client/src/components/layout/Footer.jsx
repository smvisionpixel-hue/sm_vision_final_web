import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, ShieldCheck, User, Sparkles } from 'lucide-react';
import BrandLogo from '../common/BrandLogo';

const Footer = ({ onOpenQuoteModal }) => {
  return (
    <footer className="bg-[#0A192F] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <BrandLogo light={true} to="/" />
            </div>

            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
              <strong className="text-white">Creative Ideas. Stronger Brands.</strong> Empowering ambitious businesses through high-impact social media designs, video editing, custom websites, and distinct brand identities.
            </p>

            <div className="flex flex-col gap-2.5 text-sm text-slate-300">
              <a
                href="mailto:smvisionpixel@gmail.com"
                className="flex items-center gap-2.5 hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-blue-400 group-hover:text-white" />
                </div>
                <span>smvisionpixel@gmail.com</span>
              </a>

              <a
                href="tel:+916386775945"
                className="flex items-center gap-2.5 hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-blue-400 group-hover:text-white" />
                </div>
                <span>+91 6386775945</span>
              </a>

              <a
                href="https://instagram.com/sm_vision_pixel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-pink-600 transition-colors">
                  <Instagram className="w-3.5 h-3.5 text-pink-400 group-hover:text-white" />
                </div>
                <span>@sm_vision_pixel</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Us &amp; Team
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-slate-400 hover:text-white transition-colors">
                  Portfolio Gallery
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-slate-400 hover:text-white transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/quote" className="text-blue-400 hover:text-white transition-colors font-medium">
                  Get a Free Quote &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Key Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/services" className="text-slate-400 hover:text-white transition-colors">
                  Poster Designing (₹299)
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-white transition-colors">
                  Short Video Editing (₹599)
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-white transition-colors">
                  AI Voiceover Videos (₹699)
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-white transition-colors">
                  Website Dev (₹6,000+)
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-white transition-colors">
                  Visiting Cards (₹399)
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-white transition-colors">
                  Animation Videos (₹5,000+)
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals & Direct Actions */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Portals &amp; Inquiries
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Access project tracking or request an instant creative estimate.
            </p>

            <Link
              to="/quote"
              className="block w-full text-center py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold tracking-wide transition-colors mb-3"
            >
              Request Free Estimate
            </Link>

            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <Link
                to="/client/login"
                className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
              >
                <User className="w-3.5 h-3.5 text-sky-400" />
                <span>Client Portal / Project Status</span>
              </Link>
              <Link
                to="/admin/login"
                className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Management</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} SM Vision Pixel. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>Domain: <strong className="text-slate-400">smvisionpixel.com</strong></span>
            <span>Creative Media &amp; Branding Studio</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
