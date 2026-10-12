import React from 'react';

export type TagVariant = 'sage' | 'turmeric' | 'neutral' | 'outline';
export type TagSize = 'sm' | 'md';

export interface TagProps {
  label: React.ReactNode;
  variant?: TagVariant;
  size?: TagSize;
  icon?: React.ReactNode;
  selected?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  label,
  variant = 'sage',
  size = 'md',
  icon,
  selected = false,
  interactive = false,
  onClick,
  className = '',
}) => {
  const isClickable = interactive || !!onClick;

  const baseClasses =
    'inline-flex items-center font-medium rounded-xl border transition-all duration-150 select-none';

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1 gap-1 min-h-[28px]',
    md: 'text-xs px-3 py-1.5 gap-1.5 min-h-[32px]',
  };

  const getVariantClasses = () => {
    if (selected) {
      return 'bg-sage-600 text-white border-sage-600 shadow-soft-xs';
    }

    switch (variant) {
      case 'sage':
        return 'bg-sage-50 text-sage-800 border-sage-200/80 hover:bg-sage-100 hover:border-sage-300';
      case 'turmeric':
        return 'bg-turmeric-50 text-turmeric-900 border-turmeric-200 hover:bg-turmeric-100 hover:border-turmeric-300';
      case 'neutral':
        return 'bg-charcoal-50 text-charcoal-700 border-charcoal-200 hover:bg-charcoal-100 hover:border-charcoal-300';
      case 'outline':
        return 'bg-white text-charcoal-700 border-charcoal-200 hover:bg-charcoal-50 hover:border-charcoal-300';
    }
  };

  const interactiveClasses = isClickable
    ? 'cursor-pointer active:scale-[0.97]'
    : '';

  if (isClickable) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${baseClasses} ${sizeClasses[size]} ${getVariantClasses()} ${interactiveClasses} ${className}`}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{label}</span>
      </button>
    );
  }

  return (
    <span
      className={`${baseClasses} ${sizeClasses[size]} ${getVariantClasses()} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{label}</span>
    </span>
  );
};
