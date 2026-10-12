import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldAlert, AlertCircle, Info } from 'lucide-react';

interface EducationNoticeProps {
  variant?: 'banner' | 'card' | 'warning-box' | 'subtle';
  className?: string;
  showDualLanguage?: boolean;
}

export const EducationNotice: React.FC<EducationNoticeProps> = ({
  variant = 'card',
  className = '',
  showDualLanguage = false,
}) => {
  const { language, t } = useLanguage();

  const textEn =
    'For education only. Not medical advice. Consult a doctor before use, especially if pregnant, nursing, or on medication.';
  const textMy =
    'ပညာပေး ဗဟုသုတအဖြစ်သာ ရည်ရွယ်ပါသည်။ ဆေးဘက်ဆိုင်ရာ အကြံပြုချက် မဟုတ်ပါ။ အထူးသဖြင့် ကိုယ်ဝန်ဆောင်၊ နို့တိုက်မိခင် သို့မဟုတ် ဆေးဝါးသောက်သုံးနေသူများ အသုံးမပြုမီ ဆရာဝန်နှင့် တိုင်ပင်ဆွေးနွေးပါ။';

  if (variant === 'banner') {
    return (
      <aside
        aria-label="Educational Notice"
        className={`w-full bg-amber-50/90 border-b border-amber-200/70 text-amber-900 px-4 py-2 text-xs transition-colors ${className}`}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" aria-hidden="true" />
            <p className="leading-snug text-[11px] sm:text-xs">
              <span className="font-semibold text-amber-950">
                {language === 'my' ? 'ပညာပေးဗဟုသုတသာ' : 'Educational Notice'}:
              </span>{' '}
              <span className={language === 'my' ? 'myanmar-text' : ''}>
                {language === 'my' ? textMy : textEn}
              </span>
            </p>
          </div>
        </div>
      </aside>
    );
  }

  if (variant === 'warning-box') {
    return (
      <div
        role="alert"
        className={`rounded-2xl bg-amber-50/90 border border-amber-200 p-4 space-y-2 shadow-soft-xs ${className}`}
      >
        <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
          <span>{t('educationNoticeTitle')}</span>
        </div>
        <p className="text-xs sm:text-sm text-charcoal-800 leading-relaxed font-medium">
          {language === 'my' ? textMy : textEn}
        </p>
        {showDualLanguage && (
          <p className="text-xs text-charcoal-500 pt-1 border-t border-amber-200/60 leading-relaxed font-normal">
            {language === 'my' ? textEn : textMy}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'subtle') {
    return (
      <div
        className={`flex items-start gap-2.5 p-3 rounded-xl bg-charcoal-50/70 border border-charcoal-100 text-charcoal-600 text-xs ${className}`}
      >
        <Info className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="leading-relaxed">
            {language === 'my' ? textMy : textEn}
          </p>
          {showDualLanguage && (
            <p className="text-[11px] text-charcoal-500 leading-relaxed">
              {language === 'my' ? textEn : textMy}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Default 'card' variant
  return (
    <div
      role="note"
      className={`rounded-2xl bg-amber-50/80 border border-amber-200/90 p-4 space-y-2.5 ${className}`}
    >
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
          <ShieldAlert className="w-4 h-4" />
        </div>
        <span className="text-xs font-bold text-amber-950 uppercase tracking-wide">
          {t('educationNoticeTitle')}
        </span>
      </div>
      <p className="text-xs sm:text-sm text-charcoal-900 leading-relaxed font-medium">
        {language === 'my' ? textMy : textEn}
      </p>
      {showDualLanguage && (
        <div className="pt-2 border-t border-amber-200/70 text-xs text-charcoal-600 leading-relaxed">
          <span className="text-[10px] font-bold text-amber-900 uppercase block mb-0.5">
            {language === 'my' ? 'English' : 'မြန်မာ'}
          </span>
          {language === 'my' ? textEn : textMy}
        </div>
      )}
    </div>
  );
};
