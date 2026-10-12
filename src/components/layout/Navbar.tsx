import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useFavorites } from '../../hooks/useFavorites';
import { Leaf, Home, Sparkles, Grid, Bookmark, Info, Globe, Sliders } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { count: favoritesCount } = useFavorites();

  const navItems = [
    { to: '/', label: t('navHome'), icon: Home },
    { to: '/herbs', label: t('navHerbs'), icon: Leaf },
    { to: '/categories', label: t('navCategories'), icon: Grid },
    { to: '/favorites', label: t('navFavorites'), icon: Bookmark, badge: favoritesCount },
    { to: '/about', label: t('navAbout'), icon: Info },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-charcoal-100 shadow-soft-xs transition-colors">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <NavLink
          to="/"
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-2xl bg-sage-600 text-white flex items-center justify-center shadow-soft-xs group-hover:bg-sage-700 transition-colors">
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
        </NavLink>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
                    isActive
                      ? 'bg-sage-50 text-sage-900 font-semibold shadow-soft-xs'
                      : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-charcoal-50'
                  }`
                }
              >
                <Icon className="w-4 h-4 text-sage-600" />
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-sage-600 text-white">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}

          <NavLink
            to="/design"
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-medium text-charcoal-600 hover:text-charcoal-900 hover:bg-charcoal-50 transition-colors ${
                isActive ? 'text-sage-800 font-bold bg-sage-50' : ''
              }`
            }
            title="Design System / UI Tokens"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>/design</span>
          </NavLink>
        </nav>

        {/* Top-Right Controls: Language Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={`Switch Language, current language: ${language === 'en' ? 'English' : 'မြန်မာစာ'}`}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-charcoal-200 text-sage-900 hover:bg-sage-50 hover:border-sage-300 transition-all cursor-pointer shadow-soft-xs active:scale-[0.98] min-h-[40px]"
            title="Switch Language / ဘာသာစကား ပြောင်းလဲရန်"
          >
            <Globe className="w-3.5 h-3.5 text-sage-600 shrink-0" />
            <span className="text-[11px] uppercase tracking-wider text-charcoal-600 font-medium">
              {language === 'en' ? 'MY' : 'EN'}
            </span>
            <span className="text-charcoal-400">|</span>
            <span className="font-bold text-sage-800">
              {language === 'en' ? 'မြန်မာစာ' : 'English'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
