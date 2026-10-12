import React, { useState } from 'react';
import { Herb } from '../types/herb';
import { useLanguage } from '../context/LanguageContext';
import { Bookmark, ChevronRight, Sparkles, Leaf } from 'lucide-react';

interface HerbCardProps {
  herb: Herb;
  onSelect: (herb: Herb) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
}

export const HerbCard: React.FC<HerbCardProps> = ({
  herb,
  onSelect,
  isBookmarked,
  onToggleBookmark,
}) => {
  const { language, getText, getBenefit } = useLanguage();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Selected language primary name
  const primaryName = getText(herb.name);
  const secondaryName = language === 'en' ? herb.name.my : herb.name.en;

  // 1-line benefit highlight
  const primaryBenefit = herb.benefits.length > 0 ? getBenefit(herb.benefits[0]) : '';

  return (
    <div
      onClick={() => onSelect(herb)}
      className="group relative bg-white rounded-2xl border border-charcoal-100 shadow-soft-xs hover:shadow-soft-md hover:border-sage-300 transition-all duration-200 overflow-hidden cursor-pointer flex flex-col active:scale-[0.99]"
    >
      {/* Top Image Container with Lazy Load & Skeleton Placeholder */}
      <div className="relative aspect-4/3 w-full bg-charcoal-100 overflow-hidden">
        {/* Skeleton Shimmer while loading */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-charcoal-200/50 animate-pulse flex items-center justify-center">
            <span className="text-xs text-charcoal-500 font-medium">Loading...</span>
          </div>
        )}

        {!imageError ? (
          <img
            src={herb.image}
            alt={`${primaryName} (${secondaryName}) - ${herb.category} botanical photograph`}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-sage-600 bg-sage-50/80 p-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-sage-200 flex items-center justify-center shadow-soft-xs mb-1.5">
              <Leaf className="w-6 h-6 text-sage-600" />
            </div>
            <span className="text-xs font-semibold text-charcoal-800">{primaryName}</span>
          </div>
        )}

        {/* Subtle Scrim for Botanical Name Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 pointer-events-none" />

        {/* Floating Bookmark Button */}
        <button
          type="button"
          onClick={(e) => onToggleBookmark(herb.id, e)}
          className={`absolute top-2.5 right-2.5 w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-soft-xs backdrop-blur-md active:scale-95 ${
            isBookmarked
              ? 'bg-sage-700 text-white shadow-soft-sm'
              : 'bg-white/95 text-charcoal-700 hover:bg-white hover:text-sage-800'
          }`}
          aria-label={isBookmarked ? `Remove ${primaryName} from saved herbs` : `Save ${primaryName}`}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>

        {/* Botanical Scientific Name Tag */}
        <div className="absolute bottom-2 left-3 right-3 text-white pointer-events-none">
          <p className="text-xs font-serif italic text-sage-100 truncate drop-shadow-xs">
            {herb.scientificName}
          </p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Unboxed Metadata (Zero-pill discipline) */}
          <div className="flex items-center gap-1.5 text-xs text-charcoal-600 mb-1">
            <span className="capitalize font-semibold text-sage-700">{herb.category}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{getText(herb.partsUsed)}</span>
          </div>

          {/* Herb Name in Selected Language */}
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-lg font-bold text-charcoal-900 group-hover:text-sage-800 transition-colors">
              {primaryName}
            </h3>
            <span className="text-xs text-charcoal-600 font-medium myanmar-text truncate max-w-[130px] shrink-0">
              {secondaryName}
            </span>
          </div>

          {/* 1-Line Key Benefit Highlight */}
          {primaryBenefit && (
            <div className="mt-3 text-xs text-charcoal-700 bg-sage-50/70 border border-sage-100/90 rounded-xl p-2.5 flex items-start gap-2">
              <Sparkles className="w-3.5 h-3.5 text-sage-600 shrink-0 mt-0.5" />
              <span className="line-clamp-1 font-medium leading-relaxed">
                {primaryBenefit}
              </span>
            </div>
          )}
        </div>

        {/* Card Footer Callout */}
        <div className="pt-2 border-t border-charcoal-100 flex items-center justify-between text-xs text-sage-700 font-semibold">
          <span>{language === 'my' ? 'အသေးစိတ် ဖတ်ရှုရန်' : 'View full details'}</span>
          <ChevronRight className="w-4 h-4 text-sage-600 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
};
