import React from 'react';
import { Link } from 'react-router-dom';

const BrandLogo = ({
  variant = 'full',
  light = false,
  className = '',
  to = '/',
  showTagline = true
}) => {
  const content = (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
      {/* Precision Vector Monogram */}
      <div className={`relative shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm ${
        light ? 'bg-blue-600 group-hover:bg-blue-500 text-white' : 'bg-[#0A192F] group-hover:bg-blue-600 text-white'
      }`}>
        {/* Abstract SM & Pixel Aperture */}
        <img
          src="/logo.jpeg"
          alt="SM Vision Pixel Logo"
          className="w-full h-full object-cover"
        />
      </div>

      {variant === 'full' && (
        <div className="flex flex-col text-left">
          <span className={`font-heading font-extrabold text-lg sm:text-xl tracking-tight leading-none transition-colors duration-200 ${
            light ? 'text-white group-hover:text-blue-300' : 'text-[#0A192F] group-hover:text-blue-600'
          }`}>
            SM Vision Pixel
          </span>
          {showTagline && (
            <span className={`text-[10px] font-semibold tracking-wider uppercase mt-1 transition-colors ${
              light ? 'text-blue-400' : 'text-slate-500'
            }`}>
              Creative Media &amp; Branding Studio
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block" aria-label="SM Vision Pixel Homepage">
        {content}
      </Link>
    );
  }

  return content;
};

export default BrandLogo;
