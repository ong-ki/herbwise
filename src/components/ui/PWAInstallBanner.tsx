import React, { useState } from 'react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { useLanguage } from '../../context/LanguageContext';
import { Download, Share, PlusSquare, X, Smartphone, Check } from 'lucide-react';

export const PWAInstallBanner: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { t } = useLanguage();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (isInstalled || dismissed || (!isInstallable && !isIOS)) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSModal(true);
    } else {
      await install();
    }
  };

  return (
    <>
      <div
        role="region"
        aria-label="PWA Install Prompt"
        className="bg-gradient-to-r from-sage-800 to-sage-900 text-white px-4 py-2.5 shadow-soft-sm transition-all relative z-40 border-b border-sage-700/60"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-sage-700/80 border border-sage-600/60 flex items-center justify-center shrink-0 text-turmeric-300">
              <Smartphone className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white tracking-wide truncate">
                {t('appName')} — {t('pwaInstallBtn')}
              </p>
              <p className="text-[11px] text-sage-200 truncate hidden sm:block">
                {t('pwaInstallDesc')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleInstallClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-turmeric-500 hover:bg-turmeric-600 active:scale-95 text-charcoal-900 text-xs font-bold shadow-soft-xs transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isIOS ? t('pwaInstallIos') : t('pwaInstallBtn')}</span>
            </button>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss install banner"
              className="p-1.5 rounded-lg text-sage-300 hover:text-white hover:bg-sage-700/60 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* iOS Safari Step-by-Step Install Instructions Modal */}
      {showIOSModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="ios-modal-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-soft-lg border border-charcoal-100 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sage-100 text-sage-800 flex items-center justify-center font-bold">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 id="ios-modal-title" className="text-base font-bold text-charcoal-900">
                    {t('pwaInstallIos')}
                  </h3>
                  <p className="text-xs text-charcoal-600">{t('appName')}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowIOSModal(false)}
                aria-label="Close"
                className="p-1.5 text-charcoal-400 hover:text-charcoal-700 rounded-lg hover:bg-charcoal-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-charcoal-700 leading-relaxed">
              {t('iosShareInstruction')}
            </p>

            <div className="space-y-3 bg-sage-50/80 rounded-2xl p-4 border border-sage-200/70 text-xs text-charcoal-800">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-sage-700 text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                  1
                </span>
                <span className="flex items-center gap-1.5">
                  Tap <Share className="w-4 h-4 text-sage-700 inline" /> in Safari footer
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-sage-700 text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                  2
                </span>
                <span className="flex items-center gap-1.5">
                  Scroll down & select <PlusSquare className="w-4 h-4 text-sage-700 inline" /> Add to Home Screen
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-sage-700 text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                  3
                </span>
                <span className="flex items-center gap-1.5">
                  Tap <strong className="text-sage-800">Add</strong> at the top right
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2.5 px-4 rounded-xl bg-sage-800 hover:bg-sage-900 text-white text-xs font-semibold shadow-soft-xs transition-colors cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
