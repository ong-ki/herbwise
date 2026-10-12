import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useFavorites } from '../../hooks/useFavorites';
import { Home, Leaf, Grid, Bookmark, Info } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { t } = useLanguage();
  const { count: favoritesCount } = useFavorites();

  const navItems = [
    { to: '/', label: t('navHome'), icon: Home },
    { to: '/herbs', label: t('navHerbs'), icon: Leaf },
    { to: '/categories', label: t('navCategories'), icon: Grid },
    { to: '/favorites', label: t('navFavorites'), icon: Bookmark, badge: favoritesCount },
    { to: '/about', label: t('navAbout'), icon: Info },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-charcoal-100 shadow-soft-md pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-5 items-center h-16 px-1 max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center h-full min-h-[44px] transition-colors relative select-none ${
                  isActive
                    ? 'text-sage-700 font-semibold'
                    : 'text-charcoal-500 hover:text-charcoal-800'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <Icon
                      className={`w-5 h-5 transition-transform ${
                        isActive ? 'scale-110 stroke-[2.25]' : 'stroke-[1.75]'
                      }`}
                    />
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-sage-600 text-white text-[9px] font-bold flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] tracking-tight mt-0.5 truncate max-w-[68px] myanmar-text leading-tight">
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-sage-700 mt-0.5" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
