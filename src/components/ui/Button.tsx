import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-150 cursor-pointer select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 rounded-xl gap-1.5 min-h-[36px]',
    md: 'text-sm px-4 py-2 rounded-2xl gap-2 min-h-[44px]',
    lg: 'text-base px-6 py-3 rounded-2xl gap-2.5 min-h-[52px]',
  };

  const variantClasses = {
    primary:
      'bg-sage-600 text-white hover:bg-sage-700 shadow-soft-xs hover:shadow-soft-sm active:bg-sage-800',
    secondary:
      'bg-sage-100 text-sage-900 hover:bg-sage-200 active:bg-sage-300',
    accent:
      'bg-turmeric-500 text-white hover:bg-turmeric-600 shadow-soft-xs hover:shadow-soft-sm active:bg-turmeric-700',
    outline:
      'bg-white text-charcoal-800 border border-charcoal-200 hover:bg-charcoal-50 hover:border-charcoal-300 active:bg-charcoal-100',
    ghost:
      'bg-transparent text-charcoal-700 hover:bg-charcoal-100 active:bg-charcoal-200',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
