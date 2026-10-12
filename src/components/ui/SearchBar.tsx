import React from 'react';
import { Search, X } from 'lucide-react';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  size?: 'md' | 'lg';
  className?: string;
  autoFocus?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search...',
  size = 'md',
  className = '',
  autoFocus = false,
}) => {
  const sizeClasses = {
    md: 'py-2.5 pl-10 pr-9 text-sm rounded-2xl',
    lg: 'py-3.5 pl-12 pr-10 text-base rounded-2xl',
  };

  const iconSizes = {
    md: 'w-4 h-4 left-3.5',
    lg: 'w-5 h-5 left-4',
  };

  const handleClear = () => {
    onChange('');
    if (onClear) onClear();
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className={`absolute inset-y-0 flex items-center pointer-events-none text-charcoal-400 ${iconSizes[size]}`}
      >
        <Search className="w-full h-full" />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={`w-full bg-white border border-charcoal-200 text-charcoal-900 placeholder-charcoal-400 shadow-soft-xs focus:outline-none focus:ring-2 focus:ring-sage-500/30 focus:border-sage-600 transition-all ${sizeClasses[size]}`}
      />

      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-charcoal-400 hover:text-charcoal-600 transition-colors cursor-pointer"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
