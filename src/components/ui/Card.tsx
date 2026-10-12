import React from 'react';

export type CardVariant = 'default' | 'elevated' | 'subtle' | 'accent';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hoverable = false,
  padding = 'md',
  className = '',
  ...props
}) => {
  const baseClasses = 'rounded-2xl transition-all duration-200 overflow-hidden';

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  const variantClasses = {
    default: 'bg-white border border-charcoal-100 shadow-soft-xs text-charcoal-900',
    elevated: 'bg-white border border-charcoal-100/60 shadow-soft-md text-charcoal-900',
    subtle: 'bg-sage-50/70 border border-sage-100 text-charcoal-900',
    accent: 'bg-turmeric-50/80 border border-turmeric-200 text-charcoal-900',
  };

  const hoverClasses = hoverable
    ? 'hover:shadow-soft-md hover:border-sage-300 hover:-translate-y-0.5 cursor-pointer active:scale-[0.99]'
    : '';

  return (
    <div
      className={`${baseClasses} ${paddingClasses[padding]} ${variantClasses[variant]} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
