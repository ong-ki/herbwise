import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Leaf, Bookmark, Sliders } from 'lucide-react';

interface HeaderProps {
  favoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
  favoritesCount: number;
  currentView: 'app' | 'design';
  onNavigate: (view: 'app' | 'design') => void;
}

export const Header: React.FC<HeaderProps> = ({
  favoritesOnly,
  onToggleFavoritesOnly,
  favoritesCount,
  currentView,
  onNavigate,
}) => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-charcoal-100 shadow-soft-xs transition-colors">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div
          onClick={() => onNavigate('app')}
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          <div className="w-9 h-9 rounded-2xl bg-sage-600 text-white flex items-center justify-center shadow-soft-xs">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-charcoal-900 tracking-tight text-lg leading-tight">
              HerbWise
            </span>
            <span className="text-[11px] text-charcoal-500 font-normal hidden sm:inline">
              {language === 'my' ? 'ဆေးဖက်ဝင်အပင်များ လမ်းညွှန်' : 'Botanical Herb Guide'}
            </span>
          </div>
        </div>

        {/* View Switcher & Action Controls */}
        <div className="flex items-center gap-2">
          {/* Design System / App View Switcher */}
          <div className="bg-sage-50 p-1 rounded-xl flex items-center border border-sage-200/80 text-xs font-semibold">
            <button
              type="button"
              onClick={() => onNavigate('app')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                currentView === 'app'
                  ? 'bg-white text-sage-900 shadow-soft-xs'
                  : 'text-charcoal-600 hover:text-charcoal-900'
              }`}
            >
              Herbs
            </button>
            <button
              type="button"
              onClick={() => onNavigate('design')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                currentView === 'design'
                  ? 'bg-white text-sage-900 shadow-soft-xs'
                  : 'text-charcoal-600 hover:text-charcoal-900'
              }`}
            >
              <Sliders className="w-3 h-3 text-sage-600" />
              <span>/design</span>
            </button>
          </div>

          {currentView === 'app' && (
            /* Favorites Filter Button */
            <button
              type="button"
              onClick={onToggleFavoritesOnly}
              aria-label={t('bookmarkedOnly')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                favoritesOnly
                  ? 'bg-sage-700 text-white shadow-soft-xs'
                  : 'bg-white text-charcoal-700 border border-charcoal-200 hover:bg-charcoal-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${favoritesOnly ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{t('bookmarkedOnly')}</span>
              {favoritesCount > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    favoritesOnly
                      ? 'bg-sage-800 text-white'
                      : 'bg-charcoal-200 text-charcoal-800'
                  }`}
                >
                  {favoritesCount}
                </span>
              )}
            </button>
          )}

          {/* Language Switcher Button */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-charcoal-200 text-sage-800 hover:bg-sage-50 hover:border-sage-300 transition-all cursor-pointer shadow-soft-xs"
            title="Switch Language"
          >
            <span className="text-[11px] uppercase tracking-wider text-charcoal-400">
              {language === 'en' ? 'MY' : 'EN'}
            </span>
            <span className="text-charcoal-300">|</span>
            <span className="font-bold text-sage-700">
              {language === 'en' ? 'မြန်မာစာ' : 'English'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
