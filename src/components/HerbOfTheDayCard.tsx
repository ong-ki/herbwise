import React, { useState } from 'react';
import { Herb } from '../types/herb';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/Button';
import { Tag } from './ui/Tag';
import { Sparkles, Calendar, ArrowRight, Bookmark, Clock, Leaf } from 'lucide-react';

interface HerbOfTheDayCardProps {
  herb: Herb;
  onSelect: (herb: Herb) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
}

export const HerbOfTheDayCard: React.FC<HerbOfTheDayCardProps> = ({
  herb,
  onSelect,
  isBookmarked,
  onToggleBookmark,
}) => {
  const { language, t, getText, getBenefit, getHowToUse } = useLanguage();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const primaryName = getText(herb.name);
  const secondaryName = language === 'en' ? herb.name.my : herb.name.en;
  const primaryBenefit = herb.benefits.length > 0 ? getBenefit(herb.benefits[0]) : '';
  const firstUseMethod = herb.howToUse.length > 0 ? herb.howToUse[0] : null;

  return (
    <div
      onClick={() => onSelect(herb)}
      className="group relative bg-white rounded-3xl border border-charcoal-100/90 shadow-soft-sm hover:shadow-soft-md transition-all duration-300 overflow-hidden cursor-pointer"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
        {/* Left / Top Media Side */}
        <div className="relative md:col-span-5 aspect-16/10 md:aspect-auto min-h-[220px] bg-charcoal-100 overflow-hidden">
          {/* Skeleton Shimmer */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-charcoal-200/60 animate-pulse" />
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
              className={`w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            <div className="w-full h-full min-h-[200px] flex flex-col items-center justify-center text-sage-600 bg-sage-50/90 p-6">
              <div className="w-14 h-14 rounded-2xl bg-white border border-sage-200 flex items-center justify-center shadow-soft-xs mb-2">
                <Leaf className="w-7 h-7 text-sage-600" />
              </div>
              <span className="text-sm font-semibold text-charcoal-800">{primaryName}</span>
              <span className="text-xs text-charcoal-500 font-serif italic">{herb.scientificName}</span>
            </div>
          )}

          {/* Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent md:hidden" />

          {/* Floating Bookmark Button on Image */}
          <button
            type="button"
            onClick={(e) => onToggleBookmark(herb.id, e)}
            className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-soft-sm backdrop-blur-md active:scale-95 ${
              isBookmarked
                ? 'bg-sage-700 text-white'
                : 'bg-white/95 text-charcoal-700 hover:bg-white'
            }`}
            aria-label={isBookmarked ? `Remove ${primaryName} from saved herbs` : `Save ${primaryName}`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          {/* Mobile Overlay Name */}
          <div className="absolute bottom-3 left-4 right-4 text-white md:hidden">
            <span className="text-xs font-serif italic text-sage-200">
              {herb.scientificName}
            </span>
            <h3 className="text-xl font-bold text-white">
              {primaryName}
            </h3>
          </div>
        </div>

        {/* Right / Bottom Content Side */}
        <div className="md:col-span-7 p-5 sm:p-7 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            {/* Herb of the Day Badge */}
            <div className="flex items-center justify-between gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold text-turmeric-900 bg-turmeric-100/80 border border-turmeric-200">
                <Sparkles className="w-3.5 h-3.5 text-turmeric-600" />
                <span>{t('herbOfTheDay')}</span>
              </div>
              <span className="text-xs text-charcoal-600 capitalize hidden sm:inline font-medium">
                {herb.category} · {getText(herb.partsUsed)}
              </span>
            </div>

            {/* Names (Desktop) */}
            <div className="hidden md:block">
              <div className="flex items-baseline gap-2.5">
                <h3 className="text-2xl font-bold text-charcoal-900 group-hover:text-sage-800 transition-colors">
                  {primaryName}
                </h3>
                <span className="text-sm text-charcoal-600 font-medium myanmar-text">
                  {secondaryName}
                </span>
              </div>
              <p className="text-xs font-serif italic text-sage-700 mt-0.5">
                {herb.scientificName}
              </p>
            </div>

            {/* Botanical Description Snippet */}
            <p className="text-xs sm:text-sm text-charcoal-600 line-clamp-2 leading-relaxed">
              {getText(herb.description)}
            </p>

            {/* Featured Benefit Highlight */}
            {primaryBenefit && (
              <div className="bg-sage-50/80 border border-sage-100 rounded-2xl p-3 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-sage-700 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-charcoal-800 leading-relaxed font-medium">
                  {primaryBenefit}
                </div>
              </div>
            )}

            {/* Quick Prep Teaser */}
            {firstUseMethod && (
              <div className="flex items-center gap-2 text-xs text-charcoal-500">
                <Clock className="w-3.5 h-3.5 text-sage-600 shrink-0" />
                <span className="font-semibold text-charcoal-700 uppercase tracking-wide text-[11px] bg-charcoal-100/80 px-2 py-0.5 rounded">
                  {firstUseMethod.method}
                </span>
                <span className="truncate">{getHowToUse(firstUseMethod)}</span>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-charcoal-100 flex items-center justify-between">
            <span className="text-xs text-sage-700 font-medium">
              {herb.howToUse.length} {language === 'my' ? 'ပြင်ဆင်နည်းများ' : 'preparation methods'}
            </span>
            <Button
              variant="primary"
              size="sm"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              iconPosition="right"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(herb);
              }}
            >
              {language === 'my' ? 'အပြည့်အစုံ လေ့လာရန်' : 'Explore Profile'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
