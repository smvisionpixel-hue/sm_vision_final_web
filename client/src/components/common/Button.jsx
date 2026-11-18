import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  to,
  href,
  onClick,
  type = 'button',
  icon: Icon,
  iconPosition = 'right',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variants = {
    primary: 'bg-[#0A192F] hover:bg-[#102A43] text-white focus:ring-[#0A192F] shadow-sm hover:shadow',
    accent: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-600 shadow-sm hover:shadow-md hover:shadow-blue-500/20',
    outline: 'border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 focus:ring-slate-300',
    outlineNavy: 'border-2 border-[#0A192F] text-[#0A192F] hover:bg-[#0A192F] hover:text-white focus:ring-[#0A192F]',
    ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:ring-slate-200',
    white: 'bg-white text-[#0A192F] hover:bg-slate-50 shadow-sm hover:shadow focus:ring-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold'
  };

  const classes = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  const content = (
    <>
      {loading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
      {!loading && Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
