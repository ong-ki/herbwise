import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, BilingualText, HowToApplySteps, HowToUseMethod, BilingualBenefit } from '../types/herb';
import { translations, TranslationDictionary } from '../data/i18n';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: keyof TranslationDictionary) => string;
  getText: (item?: BilingualText | null) => string;
  getBenefit: (item: BilingualBenefit) => string;
  getSteps: (item?: HowToApplySteps | null) => string[];
  getHowToUse: (item: HowToUseMethod) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'herbwise_language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'my') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'my' : 'en');
  };

  useEffect(() => {
    document.documentElement.lang = language === 'my' ? 'my' : 'en';
  }, [language]);

  const t = (key: keyof TranslationDictionary): string => {
    return translations[language][key] || translations.en[key] || String(key);
  };

  const getText = (item?: BilingualText | null): string => {
    if (!item) return '';
    return item[language] || item.en || '';
  };

  const getBenefit = (item: BilingualBenefit): string => {
    if (!item) return '';
    return item[language] || item.en || '';
  };

  const getSteps = (item?: HowToApplySteps | null): string[] => {
    if (!item) return [];
    return item[language] || item.en || [];
  };

  const getHowToUse = (item: HowToUseMethod): string => {
    if (!item) return '';
    return item[language] || item.en || '';
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
        setLanguage,
        t,
        getText,
        getBenefit,
        getSteps,
        getHowToUse,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
