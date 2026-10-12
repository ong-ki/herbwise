import React from 'react';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { useLanguage } from '../../context/LanguageContext';
import { WifiOff, CheckCircle2 } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const { isOnline } = useNetworkStatus();
  const { t } = useLanguage();

  if (isOnline) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-amber-900 text-amber-50 px-4 py-2 border-b border-amber-800 flex items-center justify-center gap-2 text-xs transition-all animate-in slide-in-from-top"
    >
      <WifiOff className="w-4 h-4 text-amber-300 shrink-0" />
      <span className="font-semibold text-amber-200">{t('offlineStatus')}:</span>
      <span className="text-amber-100 truncate">{t('offlineReadyDesc')}</span>
      <span className="inline-flex items-center gap-1 text-[11px] bg-amber-800/80 px-2 py-0.5 rounded-full text-amber-200 shrink-0">
        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
        Offline Cached
      </span>
    </div>
  );
};
