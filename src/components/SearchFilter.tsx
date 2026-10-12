import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Search, X } from 'lucide-react';

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  totalFiltered: number;
  availableCategories: string[];
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  totalFiltered,
  availableCategories,
}) => {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-3">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-all shadow-xs"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600 cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        <button
          type="button"
          onClick={() => onSelectCategory('all')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-white text-stone-600 border border-stone-200/80 hover:bg-stone-50 hover:text-stone-900'
          }`}
        >
          {t('allCategories')}
        </button>
        {availableCategories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium capitalize transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-stone-600 border border-stone-200/80 hover:bg-stone-50 hover:text-stone-900'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Result Count and Status */}
      <div className="flex items-center justify-between text-xs text-stone-500 px-0.5">
        <span>
          {language === 'my'
            ? `${totalFiltered} မျိုး တွေ့ရှိပါသည်`
            : `${totalFiltered} herbs found`}
        </span>
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="text-emerald-700 hover:underline cursor-pointer"
          >
            {language === 'my' ? 'ရှာဖွေမှု ဖျက်မည်' : 'Clear search'}
          </button>
        )}
      </div>
    </div>
  );
};
