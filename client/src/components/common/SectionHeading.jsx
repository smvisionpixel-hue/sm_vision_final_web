import React from 'react';

const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
  light = false
}) => {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-3xl mb-12 sm:mb-16 ${alignClass} ${className}`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3.5 bg-blue-50 text-blue-700 border border-blue-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
          {eyebrow}
        </div>
      )}
      {title && (
        <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 ${light ? 'text-white' : 'text-[#0A192F]'}`}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p className={`text-base sm:text-lg leading-relaxed ${light ? 'text-slate-300' : 'text-slate-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
