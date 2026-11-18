import React from 'react';

const Card = ({
  children,
  className = '',
  hoverEffect = true,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200/90 shadow-sm transition-all duration-300 ${
        hoverEffect ? 'hover:shadow-md hover:border-blue-400/50 hover:-translate-y-1' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
