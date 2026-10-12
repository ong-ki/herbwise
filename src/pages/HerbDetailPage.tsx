import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../hooks/useFavorites';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Tag } from '../components/ui/Tag';
import herbsDataRaw from '../data/herbs.json';
import { Herb } from '../types/herb';
import { EducationNotice } from '../components/ui/EducationNotice';
import {
  ArrowLeft,
  Heart,
  Share2,
  CheckCircle2,
  MapPin,
  Tag as TagIcon,
  Sparkles,
  BookOpen,
  Clock,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  ImageOff,
  Flame,
  Droplets,
  Link2,
  Leaf,
  Utensils,
  Globe2,
} from 'lucide-react';

const herbsList: Herb[] = herbsDataRaw as Herb[];

export const HerbDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t, getText, getBenefit, getSteps, getHowToUse } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();

  // Find herb by id or slug
  const herb = herbsList.find((h) => h.id === id || h.slug === id);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Accordion open/close state for all 7 sections
  const [openSections, setOpenSections] = useState({
    overview: true,
    whyUseIt: true,
    culinary: true,
    regionalPrep: true,
    howToUse: true,
    howToApply: true,
    dosage: true,
    warnings: true,
    related: true,
  });

  // Section DOM refs for quick scrolling
  const sectionRefs = {
    overview: useRef<HTMLDivElement>(null),
    whyUseIt: useRef<HTMLDivElement>(null),
    culinary: useRef<HTMLDivElement>(null),
    regionalPrep: useRef<HTMLDivElement>(null),
    howToUse: useRef<HTMLDivElement>(null),
    howToApply: useRef<HTMLDivElement>(null),
    dosage: useRef<HTMLDivElement>(null),
    warnings: useRef<HTMLDivElement>(null),
    related: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    // Scroll to top on herb change
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setImageLoaded(false);
    setImageError(false);
  }, [id]);

  if (!herb) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-charcoal-900">Herb Not Found</h2>
        <p className="text-xs text-charcoal-500">
          The requested herb could not be found in the catalog.
        </p>
        <Button variant="primary" onClick={() => navigate('/herbs')}>
          Back to Catalog
        </Button>
      </div>
    );
  }

  const primaryName = getText(herb.name);
  const secondaryName = language === 'en' ? herb.name.my : herb.name.en;
  const applySteps = getSteps(herb.howToApply);
  const favorited = isFavorite(herb.id);

  // Related herbs data objects
  const relatedHerbsData = herb.relatedHerbs
    .map((relId) => herbsList.find((h) => h.id === relId || h.slug === relId))
    .filter(Boolean) as Herb[];

  const handleShare = async () => {
    const shareData = {
      title: `${primaryName} (${herb.scientificName}) - HerbWise`,
      text: getText(herb.description),
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch {
        // user dismissed
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedToast(true);
        setTimeout(() => setCopiedToast(false), 2400);
      } catch {
        // fallback
      }
    }
  };

  const scrollToSection = (key: keyof typeof sectionRefs) => {
    setActiveTab(key);
    setOpenSections((prev) => ({ ...prev, [key]: true }));
    sectionRefs[key]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleExpandAll = (expand: boolean) => {
    setOpenSections({
      overview: expand,
      whyUseIt: expand,
      culinary: expand,
      regionalPrep: expand,
      howToUse: expand,
      howToApply: expand,
      dosage: expand,
      warnings: expand,
      related: expand,
    });
  };

  const allExpanded = Object.values(openSections).every(Boolean);

  return (
    <div className="max-w-4xl mx-auto px-4 pt-4 pb-16 space-y-6">
      {/* Top Navigation Bar: Back, Title, Share, Favorite */}
      <div className="flex items-center justify-between gap-3 py-1">
        <button
          type="button"
          onClick={() => navigate('/herbs')}
          aria-label={t('backToHerbs')}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-charcoal-200 text-charcoal-700 hover:text-charcoal-900 hover:bg-charcoal-50 text-xs font-semibold shadow-soft-xs transition-colors cursor-pointer min-h-[40px]"
        >
          <ArrowLeft className="w-4 h-4 text-charcoal-500" />
          <span>{t('backToHerbs')}</span>
        </button>

        {/* Action Buttons: Favorite (Heart) and Share */}
        <div className="flex items-center gap-2">
          {/* Share Button */}
          <button
            type="button"
            onClick={handleShare}
            aria-label={t('shareBtn')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-charcoal-200 text-charcoal-700 hover:bg-charcoal-50 text-xs font-medium transition-all shadow-soft-xs cursor-pointer active:scale-95 min-h-[40px]"
            title={t('shareBtn')}
          >
            <Share2 className="w-4 h-4 text-charcoal-600" />
            <span className="hidden sm:inline">{t('shareBtn')}</span>
          </button>

          {/* Favorite (Heart) Button */}
          <button
            type="button"
            onClick={() => toggleFavorite(herb.id)}
            aria-label={favorited ? t('favoritedBtn') : t('favoriteBtn')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all shadow-soft-xs cursor-pointer active:scale-95 min-h-[40px] ${
              favorited
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : 'bg-white text-charcoal-700 border border-charcoal-200 hover:bg-charcoal-50'
            }`}
            title={favorited ? t('favoritedBtn') : t('favoriteBtn')}
          >
            <Heart
              className={`w-4 h-4 transition-transform ${
                favorited ? 'fill-rose-500 text-rose-500 scale-110' : 'text-charcoal-500'
              }`}
            />
            <span>{favorited ? t('favoritedBtn') : t('favoriteBtn')}</span>
          </button>
        </div>
      </div>

      {/* Copy Toast Alert */}
      {copiedToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-charcoal-900 text-white px-4 py-2 rounded-xl text-xs font-medium shadow-soft-md flex items-center gap-2 animate-bounce"
        >
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{t('linkCopied')}</span>
        </div>
      )}

      {/* Large Hero Photo Card at the Top */}
      <div className="relative rounded-3xl overflow-hidden bg-charcoal-100 border border-charcoal-100 shadow-soft-md">
        <div className="relative aspect-16/9 sm:aspect-2/1 w-full bg-charcoal-200">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-charcoal-200/70 animate-pulse" />
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
              className={`w-full h-full object-cover object-center transition-all duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            <div className="w-full h-full min-h-[240px] flex flex-col items-center justify-center bg-sage-50 text-sage-600 p-6">
              <div className="w-16 h-16 rounded-2xl bg-white border border-sage-200 flex items-center justify-center shadow-soft-xs mb-2">
                <Leaf className="w-8 h-8 text-sage-600" />
              </div>
              <span className="text-sm font-semibold text-charcoal-800">{primaryName}</span>
              <span className="text-xs text-charcoal-500 font-serif italic">{herb.scientificName}</span>
            </div>
          )}

          {/* Deep Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

          {/* Header Botanical Title Overlay */}
          <div className="absolute bottom-4 left-5 right-5 text-white space-y-1">
            <div className="flex items-center gap-2 text-xs text-sage-200 font-medium">
              <span className="capitalize">{herb.category}</span>
              <span aria-hidden="true">·</span>
              <span>{getText(herb.partsUsed)}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {primaryName}
              </h1>
              <span className="text-sm sm:text-base text-sage-100 font-medium myanmar-text">
                {secondaryName}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-serif italic text-sage-200">
              {herb.scientificName}
            </p>
          </div>
        </div>

        {/* Image Credit Strip */}
        <div className="bg-white/95 px-5 py-2.5 border-t border-charcoal-100 flex items-center justify-between text-[11px] text-charcoal-600">
          <span className="flex items-center gap-1.5 truncate pr-2">
            <span className="text-charcoal-600 font-medium">Photo credit:</span>
            <span className="font-semibold text-charcoal-700 truncate">{herb.imageCredit}</span>
          </span>
          <span className="capitalize font-semibold text-sage-800 bg-sage-100/90 px-2 py-0.5 rounded text-[10px] shrink-0">
            {herb.category}
          </span>
        </div>
      </div>

      {/* Sticky Tabbed Jump Bar & Accordion Controls */}
      <div className="sticky top-16 z-20 bg-offwhite/95 backdrop-blur-md py-2 -mx-4 px-4 border-b border-charcoal-100 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
          {[
            { id: 'overview', label: t('sectionOverview') },
            { id: 'whyUseIt', label: t('sectionWhyUseIt') },
            { id: 'culinary', label: t('culinaryTab') },
            { id: 'regionalPrep', label: t('regionalPrep') },
            { id: 'howToUse', label: t('sectionHowToUse') },
            { id: 'howToApply', label: t('sectionHowToApply') },
            { id: 'dosage', label: t('sectionDosage') },
            { id: 'warnings', label: t('sectionWarnings') },
            { id: 'related', label: t('sectionRelated') },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => scrollToSection(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-sage-600 text-white shadow-soft-xs'
                  : 'bg-white text-charcoal-600 border border-charcoal-200/80 hover:bg-sage-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Expand / Collapse All Toggle */}
        <button
          type="button"
          onClick={() => handleExpandAll(!allExpanded)}
          className="text-xs text-sage-700 hover:text-sage-900 font-medium whitespace-nowrap px-2 py-1 cursor-pointer shrink-0"
        >
          {allExpanded ? t('collapseAll') : t('expandAll')}
        </button>
      </div>

      {/* SECTIONS 1 TO 7 */}
      <div className="space-y-4">
        {/* SECTION 1: OVERVIEW (What it is, Where it grows) */}
        <div ref={sectionRefs.overview} className="scroll-mt-28">
          <Card variant="default" padding="none">
            <button
              type="button"
              onClick={() => toggleSection('overview')}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-sage-50/30 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-sage-50 text-sage-700 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-charcoal-900">
                    1. {t('sectionOverview')}
                  </h2>
                  <span className="text-xs text-charcoal-400">
                    {t('whatItIs')} &amp; {t('whereItGrows')}
                  </span>
                </div>
              </div>
              {openSections.overview ? (
                <ChevronUp className="w-4 h-4 text-charcoal-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-charcoal-400" />
              )}
            </button>

            {openSections.overview && (
              <div className="p-5 pt-0 space-y-4 border-t border-charcoal-100 mt-1">
                {/* What it is */}
                <div className="space-y-1.5 pt-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-sage-700 block">
                    {t('whatItIs')}
                  </span>
                  <p className="text-sm text-charcoal-700 leading-relaxed">
                    {getText(herb.description)}
                  </p>
                </div>

                {/* Where it grows & Parts used */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-sage-50/70 border border-sage-100 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-sage-900">
                      <MapPin className="w-3.5 h-3.5 text-sage-700" />
                      <span>{t('whereItGrows')}</span>
                    </div>
                    <p className="text-xs text-charcoal-700 leading-relaxed">
                      {getText(herb.whereItGrows)}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-sage-50/70 border border-sage-100 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-sage-900">
                      <TagIcon className="w-3.5 h-3.5 text-sage-700" />
                      <span>{t('partsUsedLabel')}</span>
                    </div>
                    <p className="text-xs text-charcoal-700 leading-relaxed">
                      {getText(herb.partsUsed)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* SECTION 2: WHY USE IT (BENEFITS) */}
        <div ref={sectionRefs.whyUseIt} className="scroll-mt-28">
          <Card variant="default" padding="none">
            <button
              type="button"
              onClick={() => toggleSection('whyUseIt')}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-sage-50/30 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-sage-50 text-sage-700 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-charcoal-900">
                    2. {t('sectionWhyUseIt')}
                  </h2>
                  <span className="text-xs text-charcoal-400">
                    {herb.benefits.length} evidence-informed health benefits
                  </span>
                </div>
              </div>
              {openSections.whyUseIt ? (
                <ChevronUp className="w-4 h-4 text-charcoal-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-charcoal-400" />
              )}
            </button>

            {openSections.whyUseIt && (
              <div className="p-5 pt-0 space-y-3 border-t border-charcoal-100 mt-1">
                <div className="pt-3 space-y-2.5">
                  {herb.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-offwhite border border-charcoal-100 hover:border-sage-300 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-charcoal-800 leading-relaxed">
                        {getBenefit(benefit)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* SECTION: WHY USED IN COOKING & DISHES */}
        <div ref={sectionRefs.culinary} className="scroll-mt-28">
          <Card variant="default" padding="none">
            <button
              type="button"
              onClick={() => toggleSection('culinary')}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-sage-50/30 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-sage-50 text-sage-700 flex items-center justify-center">
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-charcoal-900">
                    3. {t('dishesGoesIn')} ({language === 'my' ? 'ဟင်းချက်နည်းလမ်းညွှန်' : 'Culinary Guide'})
                  </h2>
                  <span className="text-xs text-charcoal-400">
                    Why used in cooking &amp; popular dishes across Asia
                  </span>
                </div>
              </div>
              {openSections.culinary ? (
                <ChevronUp className="w-4 h-4 text-charcoal-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-charcoal-400" />
              )}
            </button>

            {openSections.culinary && (
              <div className="p-5 pt-0 space-y-4 border-t border-charcoal-100 mt-1">
                {/* Why Used in Cooking */}
                {herb.whyUsedInCooking && (
                  <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-1.5 pt-3">
                    <span className="text-xs font-bold text-amber-900 uppercase tracking-wide block">
                      {t('whyUsedInCooking')}
                    </span>
                    <p className="text-xs sm:text-sm text-charcoal-800 leading-relaxed font-medium">
                      {getText(herb.whyUsedInCooking)}
                    </p>
                  </div>
                )}

                {/* Dishes List */}
                {herb.dishes && herb.dishes.length > 0 && (
                  <div className="space-y-3 pt-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-sage-800 block">
                      {t('dishesGoesIn')}
                    </span>
                    <div className="space-y-2.5">
                      {herb.dishes.map((dish, dIdx) => (
                        <div
                          key={dIdx}
                          className="p-3.5 rounded-2xl bg-offwhite border border-charcoal-200/80 space-y-1"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-xs sm:text-sm font-bold text-charcoal-900">
                              {getText(dish.dishName)}
                            </h4>
                            <span className="text-[10px] font-semibold text-sage-800 bg-sage-100 px-2.5 py-0.5 rounded-full shrink-0">
                              {getText(dish.region)}
                            </span>
                          </div>
                          <p className="text-xs text-charcoal-700 leading-relaxed">
                            {getText(dish.description)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>

        {/* SECTION: REGIONAL PREPARATIONS ACROSS ASIA */}
        <div ref={sectionRefs.regionalPrep} className="scroll-mt-28">
          <Card variant="default" padding="none">
            <button
              type="button"
              onClick={() => toggleSection('regionalPrep')}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-sage-50/30 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-sage-50 text-sage-700 flex items-center justify-center">
                  <Globe2 className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-charcoal-900">
                    4. {t('regionalPrep')}
                  </h2>
                  <span className="text-xs text-charcoal-400">
                    Regional preparation techniques across South, Southeast &amp; East Asia
                  </span>
                </div>
              </div>
              {openSections.regionalPrep ? (
                <ChevronUp className="w-4 h-4 text-charcoal-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-charcoal-400" />
              )}
            </button>

            {openSections.regionalPrep && (
              <div className="p-5 pt-0 border-t border-charcoal-100 mt-1">
                <div className="pt-3 space-y-3">
                  {herb.regionalPreparations && herb.regionalPreparations.length > 0 ? (
                    herb.regionalPreparations.map((prep, pIdx) => (
                      <div
                        key={pIdx}
                        className="p-3.5 rounded-2xl bg-white border border-charcoal-200/90 shadow-soft-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between gap-2 border-b border-charcoal-100 pb-1.5">
                          <span className="text-xs font-bold text-sage-900">
                            {getText(prep.region)}
                          </span>
                          <span className="text-[11px] font-semibold text-charcoal-700 bg-charcoal-100 px-2 py-0.5 rounded-lg">
                            {getText(prep.technique)}
                          </span>
                        </div>
                        <p className="text-xs text-charcoal-700 leading-relaxed pt-0.5">
                          {getText(prep.description)}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-charcoal-500">No regional preparations cataloged.</p>
                  )}
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* SECTION 3: HOW TO USE IT (METHODS) */}
        <div ref={sectionRefs.howToUse} className="scroll-mt-28">
          <Card variant="default" padding="none">
            <button
              type="button"
              onClick={() => toggleSection('howToUse')}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-sage-50/30 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-sage-50 text-sage-700 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-charcoal-900">
                    3. {t('sectionHowToUse')}
                  </h2>
                  <span className="text-xs text-charcoal-400">
                    Preparation forms: tea, poultice, cooking, essential oil
                  </span>
                </div>
              </div>
              {openSections.howToUse ? (
                <ChevronUp className="w-4 h-4 text-charcoal-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-charcoal-400" />
              )}
            </button>

            {openSections.howToUse && (
              <div className="p-5 pt-0 space-y-3 border-t border-charcoal-100 mt-1">
                <div className="pt-3 space-y-3">
                  {herb.howToUse.map((methodItem, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-white border border-charcoal-200/90 shadow-soft-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-sage-800 bg-sage-100 px-2.5 py-0.5 rounded-lg">
                          {methodItem.method}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                        {getHowToUse(methodItem)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* SECTION 4: HOW TO APPLY IT (NUMBERED STEPS) */}
        <div ref={sectionRefs.howToApply} className="scroll-mt-28">
          <Card variant="default" padding="none">
            <button
              type="button"
              onClick={() => toggleSection('howToApply')}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-sage-50/30 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-sage-50 text-sage-700 flex items-center justify-center">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-charcoal-900">
                    4. {t('sectionHowToApply')}
                  </h2>
                  <span className="text-xs text-charcoal-400">
                    Numbered step-by-step preparation and application guide
                  </span>
                </div>
              </div>
              {openSections.howToApply ? (
                <ChevronUp className="w-4 h-4 text-charcoal-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-charcoal-400" />
              )}
            </button>

            {openSections.howToApply && (
              <div className="p-5 pt-0 border-t border-charcoal-100 mt-1">
                <div className="pt-3 space-y-2.5">
                  <ol className="space-y-2.5">
                    {applySteps.map((step, sIdx) => (
                      <li
                        key={sIdx}
                        className="flex items-start gap-3 p-3 rounded-2xl bg-offwhite border border-charcoal-100"
                      >
                        <span className="w-6 h-6 rounded-full bg-sage-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-soft-xs">
                          {sIdx + 1}
                        </span>
                        <span className="text-xs sm:text-sm text-charcoal-800 leading-relaxed">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* SECTION 5: DOSAGE AND FREQUENCY */}
        <div ref={sectionRefs.dosage} className="scroll-mt-28">
          <Card variant="default" padding="none">
            <button
              type="button"
              onClick={() => toggleSection('dosage')}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-sage-50/30 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-sage-50 text-sage-700 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-charcoal-900">
                    5. {t('sectionDosage')}
                  </h2>
                  <span className="text-xs text-charcoal-400">
                    Recommended daily intake and frequency
                  </span>
                </div>
              </div>
              {openSections.dosage ? (
                <ChevronUp className="w-4 h-4 text-charcoal-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-charcoal-400" />
              )}
            </button>

            {openSections.dosage && (
              <div className="p-5 pt-0 border-t border-charcoal-100 mt-1">
                <div className="pt-3">
                  <div className="p-4 rounded-2xl bg-sage-50/80 border border-sage-200 space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-sage-800 block">
                      {t('sectionDosage')}
                    </span>
                    <p className="text-xs sm:text-sm text-charcoal-800 leading-relaxed font-medium">
                      {getText(herb.dosageAndFrequency)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* SECTION 6: WARNINGS AND SAFETY (HIGHLIGHTED BOX) */}
        <div ref={sectionRefs.warnings} className="scroll-mt-28">
          <Card variant="accent" padding="none" className="border-turmeric-300 shadow-soft-sm">
            <button
              type="button"
              onClick={() => toggleSection('warnings')}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-turmeric-100/40 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-turmeric-200 text-turmeric-900 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-turmeric-950">
                    6. {t('sectionWarnings')}
                  </h2>
                  <span className="text-xs text-turmeric-800">
                    Pregnancy, allergies, contraindications, and drug interactions
                  </span>
                </div>
              </div>
              {openSections.warnings ? (
                <ChevronUp className="w-4 h-4 text-turmeric-700" />
              ) : (
                <ChevronDown className="w-4 h-4 text-turmeric-700" />
              )}
            </button>

            {openSections.warnings && (
              <div className="p-5 pt-0 border-t border-turmeric-200 mt-1 space-y-3">
                <div className="pt-3 space-y-3">
                  <div className="p-4 rounded-2xl bg-white/90 border border-turmeric-200 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-turmeric-900">
                      <AlertTriangle className="w-4 h-4 text-turmeric-600" />
                      <span>{t('sectionWarnings')}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-charcoal-900 leading-relaxed">
                      {getText(herb.warnings)}
                    </p>
                  </div>

                  {/* Persistent Educational Notice */}
                  <EducationNotice variant="warning-box" showDualLanguage={true} />
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* SECTION 7: RELATED HERBS */}
        <div ref={sectionRefs.related} className="scroll-mt-28">
          <Card variant="default" padding="none">
            <button
              type="button"
              onClick={() => toggleSection('related')}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-sage-50/30 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-sage-50 text-sage-700 flex items-center justify-center">
                  <Link2 className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-charcoal-900">
                    7. {t('sectionRelated')}
                  </h2>
                  <span className="text-xs text-charcoal-400">
                    Explore companion botanical herbs
                  </span>
                </div>
              </div>
              {openSections.related ? (
                <ChevronUp className="w-4 h-4 text-charcoal-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-charcoal-400" />
              )}
            </button>

            {openSections.related && (
              <div className="p-5 pt-0 border-t border-charcoal-100 mt-1">
                <div className="pt-3">
                  {relatedHerbsData.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {relatedHerbsData.map((relHerb) => (
                        <Link
                          key={relHerb.id}
                          to={`/herbs/${relHerb.id}`}
                          className="group p-3 rounded-2xl bg-offwhite border border-charcoal-200/80 hover:border-sage-400 hover:bg-white transition-all flex items-center gap-3 shadow-soft-xs"
                        >
                          <img
                            src={relHerb.image}
                            alt={`${getText(relHerb.name)} (${relHerb.scientificName}) - ${relHerb.category} botanical photograph`}
                            className="w-12 h-12 rounded-xl object-cover shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-bold text-charcoal-900 group-hover:text-sage-800 truncate">
                              {getText(relHerb.name)}
                            </h4>
                            <span className="text-xs font-serif italic text-charcoal-600 truncate block">
                              {relHerb.scientificName}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-charcoal-500">No related herbs cataloged.</p>
                  )}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
