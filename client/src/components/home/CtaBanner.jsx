import React from 'react';
import { Sparkles, ArrowRight, Mail, Phone } from 'lucide-react';
import Button from '../common/Button';

const CtaBanner = ({ onOpenQuoteModal }) => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-[#0A192F] via-[#102A43] to-[#0A192F] text-white relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Start Your Next Campaign</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight mb-6 leading-tight">
            Ready to Build a Stronger, More Memorable Brand?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 mb-10 leading-relaxed font-sans max-w-2xl mx-auto">
            From single poster graphics and short video edits to complete brand identities and custom web applications — SM Vision Pixel is your trusted creative growth studio.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button
              variant="accent"
              size="lg"
              onClick={onOpenQuoteModal}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500"
              icon={Sparkles}
              iconPosition="left"
            >
              Get a Free Quote
            </Button>
            <Button
              to="/contact"
              variant="white"
              size="lg"
              className="w-full sm:w-auto"
              icon={ArrowRight}
              iconPosition="right"
            >
              Contact Our Studio
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-slate-400 pt-6 border-t border-slate-700/60">
            <a
              href="mailto:smvisionpixel@gmail.com"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 text-blue-400" />
              <span>smvisionpixel@gmail.com</span>
            </a>
            <span className="hidden sm:inline text-slate-600">&bull;</span>
            <a
              href="tel:+916386775945"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span>+91 6386775945</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
