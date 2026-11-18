import React from 'react';
import { ArrowRight, Sparkles, CheckCircle, Play, Shield, Zap, TrendingUp } from 'lucide-react';
import Button from '../common/Button';

const Hero = ({ onOpenQuoteModal }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 bg-gradient-to-b from-white via-[#FAFAFC] to-[#F1F5F9]/50">
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-50/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-24 right-10 w-72 h-72 bg-blue-100/30 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Official Agency Positioning Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Creative Media &amp; Branding Studio</span>
          </div>

          {/* Tagline & Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0A192F] tracking-tight leading-[1.15] mb-6 font-heading">
            Creative Ideas. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-[#0A192F]">
              Stronger Brands.
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10 font-sans">
            At <strong className="text-[#0A192F] font-semibold">SM Vision Pixel</strong>, we blend imaginative design, high-converting video production, and modern web development to make your brand unmistakably memorable.
          </p>

          {/* Clear CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Button
              to="/portfolio"
              variant="outlineNavy"
              size="lg"
              className="w-full sm:w-auto"
              icon={ArrowRight}
              iconPosition="right"
            >
              Explore Our Work
            </Button>
            <Button
              variant="accent"
              size="lg"
              onClick={onOpenQuoteModal}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
              icon={Sparkles}
              iconPosition="left"
            >
              Get a Free Quote
            </Button>
          </div>

          {/* Agency Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 border-t border-slate-200/80 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-900">Custom Designs</div>
                <div className="text-[11px] text-slate-500">From ₹299/design</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-900">Quick Turnaround</div>
                <div className="text-[11px] text-slate-500">Punctual Delivery</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-900">Transparent Rates</div>
                <div className="text-[11px] text-slate-500">No Hidden Fees</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-900">Client-First Focus</div>
                <div className="text-[11px] text-slate-500">Direct Collaboration</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
