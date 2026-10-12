import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { BottomNav } from './BottomNav';
import { EducationNotice } from '../ui/EducationNotice';
import { OfflineBanner } from '../ui/OfflineBanner';
import { PWAInstallBanner } from '../ui/PWAInstallBanner';
import { useLanguage } from '../../context/LanguageContext';

export const AppLayout: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-offwhite text-charcoal-900 flex flex-col font-sans selection:bg-sage-100 selection:text-sage-900">
      {/* Network Offline Status Banner */}
      <OfflineBanner />

      {/* PWA In-App Install Prompt Banner */}
      <PWAInstallBanner />

      {/* Top Navbar */}
      <Navbar />

      {/* Persistent but unobtrusive educational notice banner */}
      <EducationNotice variant="banner" />

      {/* Main Page Body (with bottom padding for mobile tab bar) */}
      <main className="flex-1 pb-24 md:pb-12">
        <Outlet />
      </main>

      {/* Educational Footer */}
      <footer className="hidden md:block py-6 border-t border-charcoal-100 bg-white/60 text-center text-xs text-charcoal-500">
        <div className="max-w-4xl mx-auto px-4">
          <p>{t('educationNotice')}</p>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav />
    </div>
  );
};
