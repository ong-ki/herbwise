import React, { useState, useRef } from 'react';
import { Herb } from '../types/herb';
import { useLanguage } from '../context/LanguageContext';
import {
  X,
  Bookmark,
  Clock,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Sparkles,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Tag,
  Link2,
  Leaf,
} from 'lucide-react';
import { EducationNotice } from './ui/EducationNotice';

interface HerbDetailProps {
  herb: Herb;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onSelectRelated?: (herbId: string) => void;
}

type TabType = 'overview' | 'benefits' | 'howToUse' | 'warnings';

export const HerbDetail: React.FC<HerbDetailProps> = ({
  herb,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onSelectRelated,
}) => {
  const { language, t, getText, getBenefit, getSteps, getHowToUse } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [openSections, setOpenSections] = useState({
    overview: true,
    benefits: true,
    howToUse: true,
    warnings: true,
  });

  const overviewRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const howToUseRef = useRef<HTMLDivElement>(null);
  const warningsRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (tab: TabType) => {
    setActiveTab(tab);
    setOpenSections((prev) => ({ ...prev, [tab]: true }));
    const refMap = {
      overview: overviewRef,
      benefits: benefitsRef,
      howToUse: howToUseRef,
      warnings: warningsRef,
    };
    refMap[tab]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleSection = (section: TabType) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const primaryName = getText(herb.name);
  const secondaryName = language === 'en' ? herb.name.my : herb.name.en;
  const applySteps = getSteps(herb.howToApply);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex justify-center p-0 sm:p-4">
      {/* Container Drawer / Card */}
      <div className="relative w-full max-w-2xl bg-white sm:rounded-3xl shadow-2xl flex flex-col min-h-screen sm:min-h-0 sm:max-h-[92vh] overflow-hidden">
        {/* Top Floating App Bar */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-3 border-b border-stone-200/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 -ml-1 rounded-full flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label={t('close')}
            >
              <X className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <h2 className="text-base font-bold text-stone-900 truncate">
                {primaryName}
              </h2>
              <p className="text-xs font-serif italic text-stone-500 truncate">
                {herb.scientificName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => onToggleBookmark(herb.id, e)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
              <span>{isBookmarked ? t('bookmarked') : t('bookmark')}</span>
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto flex-1 pb-16">
          {/* Hero Photo Banner */}
          <div className="relative aspect-16/9 sm:aspect-2/1 w-full bg-stone-100 overflow-hidden">
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-stone-200/60 animate-pulse" />
            )}

            {!imageError && herb.image ? (
              <img
                src={herb.image}
                alt={`${primaryName} (${secondaryName}) - ${herb.category} botanical photograph`}
                referrerPolicy="no-referrer"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ) : (
              <div className="w-full h-full min-h-[220px] flex flex-col items-center justify-center bg-emerald-50/70 text-emerald-800 p-6">
                <div className="w-14 h-14 rounded-2xl bg-white border border-emerald-200 flex items-center justify-center shadow-soft-xs mb-2">
                  <Leaf className="w-7 h-7 text-emerald-700" />
                </div>
                <span className="text-sm font-semibold text-stone-800">{primaryName}</span>
                <span className="text-xs text-stone-500 font-serif italic">{herb.scientificName}</span>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <div className="flex items-center gap-2 text-xs text-emerald-200 mb-0.5">
                <span className="capitalize">{herb.category}</span>
                <span aria-hidden="true">·</span>
                <span>{getText(herb.partsUsed)}</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                {primaryName}
              </h1>
              <p className="text-xs text-stone-200 font-medium">
                {secondaryName}
              </p>
            </div>
          </div>

          {/* Small Photo Credit Text */}
          <div className="bg-stone-50 px-4 py-1.5 border-b border-stone-200/80 flex items-center justify-between text-[11px] text-stone-500">
            <span className="truncate pr-2">Photo: {herb.imageCredit}</span>
            <span className="capitalize font-medium text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded text-[10px] shrink-0">
              {herb.category}
            </span>
          </div>

          {/* Sticky Tab Jump Bar */}
          <div className="sticky top-15 z-20 bg-stone-50/95 backdrop-blur-md px-3 py-2 border-b border-stone-200/80 flex items-center gap-1 overflow-x-auto no-scrollbar text-xs">
            <button
              type="button"
              onClick={() => scrollToSection('overview')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-emerald-800 text-white'
                  : 'text-stone-600 hover:bg-stone-200/60'
              }`}
            >
              {t('overviewTab')}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('benefits')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors cursor-pointer ${
                activeTab === 'benefits'
                  ? 'bg-emerald-800 text-white'
                  : 'text-stone-600 hover:bg-stone-200/60'
              }`}
            >
              {t('benefitsTab')}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('howToUse')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors cursor-pointer ${
                activeTab === 'howToUse'
                  ? 'bg-emerald-800 text-white'
                  : 'text-stone-600 hover:bg-stone-200/60'
              }`}
            >
              {t('preparationTab')}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('warnings')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors cursor-pointer ${
                activeTab === 'warnings'
                  ? 'bg-emerald-800 text-white'
                  : 'text-stone-600 hover:bg-stone-200/60'
              }`}
            >
              {t('safetyTab')}
            </button>
          </div>

          {/* Main Sections */}
          <div className="p-4 sm:p-6 space-y-6">
            {/* SECTION 1: OVERVIEW */}
            <div ref={overviewRef} className="scroll-mt-32">
              <button
                type="button"
                onClick={() => toggleSection('overview')}
                className="w-full flex items-center justify-between pb-2 border-b border-stone-200 text-left cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                  <h3 className="text-base font-bold text-stone-900">
                    {t('whatItIs')}
                  </h3>
                </div>
                {openSections.overview ? (
                  <ChevronUp className="w-4 h-4 text-stone-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-stone-400" />
                )}
              </button>

              {openSections.overview && (
                <div className="pt-3 space-y-4">
                  {/* Botanical Description */}
                  <p className="text-sm text-stone-700 leading-relaxed">
                    {getText(herb.description)}
                  </p>

                  {/* Habitat & Parts Used */}
                  <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 space-y-2.5">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-semibold text-stone-900 block">
                          {t('whereItGrows')}
                        </span>
                        <p className="text-xs text-stone-600 leading-relaxed mt-0.5">
                          {getText(herb.whereItGrows)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 pt-2 border-t border-stone-200/60">
                      <Tag className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-semibold text-stone-900 block">
                          {language === 'my' ? 'အသုံးပြုသော အစိတ်အပိုင်း' : 'Parts Used'}
                        </span>
                        <p className="text-xs text-stone-600 leading-relaxed mt-0.5">
                          {getText(herb.partsUsed)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SECTION 2: BENEFITS */}
            <div ref={benefitsRef} className="scroll-mt-32">
              <button
                type="button"
                onClick={() => toggleSection('benefits')}
                className="w-full flex items-center justify-between pb-2 border-b border-stone-200 text-left cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <h3 className="text-base font-bold text-stone-900">
                    {t('keyBenefits')} ({t('whyUseIt')})
                  </h3>
                </div>
                {openSections.benefits ? (
                  <ChevronUp className="w-4 h-4 text-stone-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-stone-400" />
                )}
              </button>

              {openSections.benefits && (
                <div className="pt-3 space-y-2">
                  {herb.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-stone-50 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                        {getBenefit(benefit)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SECTION 3: HOW TO USE & HOW TO APPLY */}
            <div ref={howToUseRef} className="scroll-mt-32">
              <button
                type="button"
                onClick={() => toggleSection('howToUse')}
                className="w-full flex items-center justify-between pb-2 border-b border-stone-200 text-left cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-700" />
                  <h3 className="text-base font-bold text-stone-900">
                    {language === 'my' ? 'သုံးစွဲနည်းနှင့် လိမ်းကျံနည်း' : 'How to Use & Apply'}
                  </h3>
                </div>
                {openSections.howToUse ? (
                  <ChevronUp className="w-4 h-4 text-stone-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-stone-400" />
                )}
              </button>

              {openSections.howToUse && (
                <div className="pt-3 space-y-4">
                  {/* Dosage & Frequency */}
                  <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-4">
                    <span className="text-xs font-bold text-emerald-900 block mb-1">
                      {t('dosage')} (Dosage & Frequency)
                    </span>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                      {getText(herb.dosageAndFrequency)}
                    </p>
                  </div>

                  {/* Methods list (tea, poultice, cooking, oil) */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-semibold text-stone-600 block">
                      {language === 'my' ? 'အသုံးပြုနည်း ပုံစံများ' : 'Methods of Use'}
                    </span>
                    {herb.howToUse.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-stone-50 rounded-xl p-3 border border-stone-200/80 space-y-1"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-wide text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                            {item.method}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mt-1">
                          {getHowToUse(item)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Step-by-step How to Apply */}
                  {applySteps.length > 0 && (
                    <div className="bg-white rounded-2xl border border-stone-200 p-4 space-y-3 shadow-xs">
                      <span className="text-xs font-bold text-stone-900 block">
                        {t('howToApply')} ({language === 'my' ? 'အဆင့်ဆင့်' : 'Step-by-Step'})
                      </span>
                      <ol className="space-y-2">
                        {applySteps.map((step, sIdx) => (
                          <li
                            key={sIdx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700"
                          >
                            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                              {sIdx + 1}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* SECTION 4: WARNINGS */}
            <div ref={warningsRef} className="scroll-mt-32">
              <button
                type="button"
                onClick={() => toggleSection('warnings')}
                className="w-full flex items-center justify-between pb-2 border-b border-stone-200 text-left cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <h3 className="text-base font-bold text-stone-900">
                    {t('safetyWarnings')}
                  </h3>
                </div>
                {openSections.warnings ? (
                  <ChevronUp className="w-4 h-4 text-stone-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-stone-400" />
                )}
              </button>

              {openSections.warnings && (
                <div className="pt-3 space-y-4">
                  {/* Amber Safety Caution Card */}
                  <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center gap-2 text-amber-900 font-semibold text-xs">
                      <ShieldCheck className="w-4 h-4 text-amber-700" />
                      <span>{t('safetyWarnings')}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                      {getText(herb.warnings)}
                    </p>
                  </div>

                  {/* Educational Use Notice */}
                  <EducationNotice variant="warning-box" showDualLanguage={true} />
                </div>
              )}
            </div>

            {/* SECTION 5: RELATED HERBS */}
            {herb.relatedHerbs && herb.relatedHerbs.length > 0 && (
              <div className="pt-2 border-t border-stone-200/80">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
                  {language === 'my' ? 'ဆက်စပ် ဆေးဖက်ဝင်အပင်များ' : 'Related Herbs'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {herb.relatedHerbs.map((relId) => (
                    <button
                      key={relId}
                      type="button"
                      onClick={() => onSelectRelated && onSelectRelated(relId)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-xs text-stone-700 transition-colors cursor-pointer"
                    >
                      <Link2 className="w-3.5 h-3.5" />
                      <span className="capitalize">{relId}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Image Credit */}
            <div className="pt-2 text-center text-[11px] text-stone-600">
              <span className="font-medium">Photo: {herb.imageCredit}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
