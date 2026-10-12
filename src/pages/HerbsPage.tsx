import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SearchBar } from '../components/ui/SearchBar';
import { Tag } from '../components/ui/Tag';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SectionTitle } from '../components/ui/SectionTitle';
import { HerbCard } from '../components/HerbCard';
import { HerbDetail } from '../components/HerbDetail';
import { HerbCardSkeleton } from '../components/ui/HerbCardSkeleton';
import { useFavorites } from '../hooks/useFavorites';
import herbsDataRaw from '../data/herbs.json';
import { Herb } from '../types/herb';
import {
  Sparkles,
  SlidersHorizontal,
  X,
  Filter,
  Check,
  Coffee,
  Heart,
  Droplets,
  Flame,
  ShieldAlert,
} from 'lucide-react';

const herbsList: Herb[] = herbsDataRaw as Herb[];

export const HerbsPage: React.FC = () => {
  const navigate = useNavigate();
  const { language, t, getText, getBenefit } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toggleFavorite, isFavorite } = useFavorites();

  const urlQuery = searchParams.get('q') || '';
  const urlCategory = searchParams.get('category') || 'all';
  const urlBenefit = searchParams.get('benefit') || 'all';
  const urlMethod = searchParams.get('method') || 'all';

  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory);
  const [selectedBenefit, setSelectedBenefit] = useState<string>(urlBenefit);
  const [selectedMethod, setSelectedMethod] = useState<string>(urlMethod);
  const [selectedHerb, setSelectedHerb] = useState<Herb | null>(null);
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync state if URL search params change
  useEffect(() => {
    setSearchQuery(urlQuery);
    setSelectedCategory(urlCategory);
    setSelectedBenefit(urlBenefit);
    setSelectedMethod(urlMethod);
  }, [urlQuery, urlCategory, urlBenefit, urlMethod]);

  const updateFilters = (q: string, cat: string, benefit: string, method: string) => {
    setSearchQuery(q);
    setSelectedCategory(cat);
    setSelectedBenefit(benefit);
    setSelectedMethod(method);

    const params: Record<string, string> = {};
    if (q) params.q = q;
    if (cat && cat !== 'all') params.category = cat;
    if (benefit && benefit !== 'all') params.benefit = benefit;
    if (method && method !== 'all') params.method = method;

    setSearchParams(params, { replace: true });
  };

  const handleResetFilters = () => {
    updateFilters('', 'all', 'all', 'all');
  };

  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedBenefit !== 'all' ? 1 : 0) +
    (selectedMethod !== 'all' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    herbsList.forEach((h) => set.add(h.category));
    return ['all', ...Array.from(set)];
  }, []);

  // Benefit focus definitions
  const benefitFilters = [
    { id: 'all', label: { en: 'All Benefits', my: 'အကျိုးကျေးဇူး အားလုံး' }, keyword: '' },
    {
      id: 'digestion',
      label: { en: 'Digestion & Nausea', my: 'အစာခြေနှင့် ပျို့အန်သက်သာ' },
      keyword: ['digestion', 'nausea', 'gas', 'indigestion', 'အစာခြေ', 'ပျို့အန်', 'အစာအိမ်', 'ဗိုက်ကယ်'],
    },
    {
      id: 'inflammation',
      label: { en: 'Inflammation & Joints', my: 'ရောင်ရမ်းမှုနှင့် အဆစ်အမြစ်' },
      keyword: ['inflammatory', 'joint', 'arthritis', 'muscle', 'ရောင်ရမ်း', 'အဆစ်', 'ကိုက်ခဲ', 'ကြွက်သား'],
    },
    {
      id: 'stress',
      label: { en: 'Stress & Mental Calm', my: 'စိတ်ဖိစီးမှုနှင့် တည်ငြိမ်မှု' },
      keyword: ['cortisol', 'stress', 'anxiety', 'fatigue', 'ဖိစီးမှု', 'ပင်ပန်း', 'စိတ်'],
    },
    {
      id: 'skin',
      label: { en: 'Skin & Sunburns', my: 'အသားအရေနှင့် နေလောင်ဒဏ်' },
      keyword: ['skin', 'sunburn', 'burn', 'hydration', 'collagen', 'အသားအရေ', 'နေလောင်', 'ဒဏ်ရာ'],
    },
    {
      id: 'fever',
      label: { en: 'Fever & Respiratory', my: 'အဖျားနှင့် အသက်ရှူလမ်းကြောင်း' },
      keyword: ['fever', 'respiratory', 'cough', 'colds', 'diaphoretic', 'အဖျား', 'ချောင်းဆိုး', 'အသက်ရှူ'],
    },
  ];

  // Use methods definitions
  const methodFilters = [
    { id: 'all', label: { en: 'All Methods', my: 'နည်းလမ်း အားလုံး' } },
    { id: 'tea', label: { en: 'Tea / Infusion', my: 'ရေနွေးကြမ်း / လက်ဖက်ရည်' } },
    { id: 'poultice', label: { en: 'Poultice / Topical', my: 'ကပ်ဆေး / လိမ်းကျံနည်း' } },
    { id: 'cooking', label: { en: 'Cooking & Broths', my: 'ဟင်းချက်ပြုတ်နည်း' } },
    { id: 'oil', label: { en: 'Essential Oil / Diffuser', my: 'မရှိမဖြစ်ဆီ / ရှူဆေး' } },
  ];

  // Filter herbs by all active criteria
  const filteredHerbs = useMemo(() => {
    return herbsList.filter((herb) => {
      // 1. Category Filter
      if (selectedCategory !== 'all' && herb.category !== selectedCategory) {
        return false;
      }

      // 2. Use Method Filter
      if (selectedMethod !== 'all') {
        const hasMethod = herb.howToUse.some(
          (m) => m.method.toLowerCase() === selectedMethod.toLowerCase()
        );
        if (!hasMethod) return false;
      }

      // 3. Benefit Keyword Filter
      if (selectedBenefit !== 'all') {
        const benefitDef = benefitFilters.find((b) => b.id === selectedBenefit);
        if (benefitDef && Array.isArray(benefitDef.keyword)) {
          const herbBenefitText = herb.benefits
            .map((b) => `${b.en} ${b.my}`)
            .join(' ')
            .toLowerCase();
          const matchesBenefit = benefitDef.keyword.some((k) =>
            herbBenefitText.includes(k.toLowerCase())
          );
          if (!matchesBenefit) return false;
        }
      }

      // 4. Free text search query
      if (!searchQuery.trim()) {
        return true;
      }

      const q = searchQuery.toLowerCase().trim();
      const matchEnName = herb.name.en.toLowerCase().includes(q);
      const matchMyName = herb.name.my.includes(q);
      const matchBotanical = herb.scientificName.toLowerCase().includes(q);
      const matchCategory = herb.category.toLowerCase().includes(q);
      const matchBenefits = herb.benefits.some(
        (b) => b.en.toLowerCase().includes(q) || b.my.includes(q)
      );
      const matchDesc =
        herb.description.en.toLowerCase().includes(q) || herb.description.my.includes(q);

      return (
        matchEnName ||
        matchMyName ||
        matchBotanical ||
        matchCategory ||
        matchBenefits ||
        matchDesc
      );
    });
  }, [searchQuery, selectedCategory, selectedBenefit, selectedMethod]);

  return (
    <div className="max-w-5xl mx-auto px-4 pt-6 space-y-6">
      {/* Page Title & Overview */}
      <SectionTitle
        title={t('navHerbs')}
        subtitle={
          language === 'my'
            ? `ဆေးဖက်ဝင်အပင် ${herbsList.length} မျိုး၏ ရုက္ခဗေဒသွင်ပြင်၊ အကျိုးကျေးဇူး၊ ပြင်ဆင်နည်းနှင့် သတိပြုရန်များ`
            : `Explore ${herbsList.length} botanical profiles, indications, traditional preparations, and safety warnings.`
        }
      />

      {/* Primary Search Bar with Filter Drawer Trigger */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={(val) =>
                updateFilters(val, selectedCategory, selectedBenefit, selectedMethod)
              }
              placeholder={t('searchPlaceholder')}
              size="md"
            />
          </div>

          {/* Filter Toggle Button */}
          <Button
            variant={activeFilterCount > 0 ? 'primary' : 'outline'}
            size="md"
            icon={<SlidersHorizontal className="w-4 h-4" />}
            onClick={() => setShowFiltersDrawer(!showFiltersDrawer)}
            className="shrink-0"
          >
            <span className="hidden sm:inline">Filters</span>
            {activeFilterCount > 0 && (
              <span className="ml-1 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </div>

        {/* Category Horizontal Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {categories.map((cat) => {
            const isAll = cat === 'all';
            const label = isAll ? (
              t('allCategories')
            ) : (
              <span>
                {cat === 'myanmar-traditional'
                  ? language === 'my' ? 'မြန်မာ့ရိုးရာ' : 'Myanmar Traditional'
                  : cat === 'skin-and-hair'
                  ? language === 'my' ? 'အသားအရေနှင့် ဆံကေသာ' : 'Skin & Hair'
                  : cat === 'medicinal'
                  ? language === 'my' ? 'ဆေးဖက်ဝင်' : 'Medicinal'
                  : cat === 'culinary'
                  ? language === 'my' ? 'ဟင်းခတ်' : 'Culinary'
                  : cat === 'aromatic'
                  ? language === 'my' ? 'ရနံ့မွှေး' : 'Aromatic'
                  : cat === 'tea'
                  ? language === 'my' ? 'လက်ဖက်ရည်' : 'Tea'
                  : cat}
              </span>
            );
            const isSelected = selectedCategory === cat;

            return (
              <Tag
                key={cat}
                label={label}
                interactive
                selected={isSelected}
                onClick={() =>
                  updateFilters(searchQuery, cat, selectedBenefit, selectedMethod)
                }
              />
            );
          })}
        </div>

        {/* Expanded Multi-Filter Bar (Category, Benefit, Method) */}
        {showFiltersDrawer && (
          <Card
            variant="default"
            padding="md"
            className="bg-white border border-charcoal-200/90 shadow-soft-sm space-y-4"
          >
            <div className="flex items-center justify-between border-b border-charcoal-100 pb-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-charcoal-600">
                <Filter className="w-3.5 h-3.5 text-sage-600" />
                <span>Multi-Criteria Herb Filter</span>
              </div>
              <button
                type="button"
                onClick={() => setShowFiltersDrawer(false)}
                className="text-charcoal-400 hover:text-charcoal-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Filter by Health Benefit */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-charcoal-700 block">
                {t('filterByBenefit')} (Why use it):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {benefitFilters.map((bf) => {
                  const isSelected = selectedBenefit === bf.id;
                  return (
                    <Tag
                      key={bf.id}
                      label={getText(bf.label)}
                      interactive
                      size="sm"
                      selected={isSelected}
                      variant="sage"
                      onClick={() =>
                        updateFilters(searchQuery, selectedCategory, bf.id, selectedMethod)
                      }
                    />
                  );
                })}
              </div>
            </div>

            {/* Filter by Preparation & Use Method */}
            <div className="space-y-2 pt-2 border-t border-charcoal-100">
              <span className="text-xs font-semibold text-charcoal-700 block">
                {t('filterByMethod')} (How to use):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {methodFilters.map((mf) => {
                  const isSelected = selectedMethod === mf.id;
                  return (
                    <Tag
                      key={mf.id}
                      label={getText(mf.label)}
                      interactive
                      size="sm"
                      selected={isSelected}
                      variant="turmeric"
                      onClick={() =>
                        updateFilters(searchQuery, selectedCategory, selectedBenefit, mf.id)
                      }
                    />
                  );
                })}
              </div>
            </div>

            {/* Active Filters Summary & Reset */}
            {activeFilterCount > 0 && (
              <div className="pt-2 border-t border-charcoal-100 flex items-center justify-between text-xs">
                <span className="text-charcoal-500">
                  {activeFilterCount} active criteria applied
                </span>
                <Button variant="ghost" size="sm" onClick={handleResetFilters}>
                  {t('resetFilters')}
                </Button>
              </div>
            )}
          </Card>
        )}

        {/* Results Counter & Active Criteria Badges */}
        <div className="flex items-center justify-between text-xs text-charcoal-500 px-0.5 pt-1">
          <span>
            {language === 'my'
              ? `${filteredHerbs.length} မျိုး တွေ့ရှိပါသည်`
              : `${filteredHerbs.length} herbs matched`}
          </span>

          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-sage-700 hover:underline cursor-pointer font-medium"
            >
              {language === 'my' ? 'စစ်ထုတ်မှု အားလုံးရှင်းမည်' : 'Clear all filters'}
            </button>
          )}
        </div>
      </div>

      {/* Herbs Grid with Lazy-Loaded Photo Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-1">
          <HerbCardSkeleton />
          <HerbCardSkeleton />
          <HerbCardSkeleton />
        </div>
      ) : filteredHerbs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-1">
          {filteredHerbs.map((herb) => (
            <HerbCard
              key={herb.id}
              herb={herb}
              onSelect={(h) => navigate(`/herbs/${h.id}`)}
              isBookmarked={isFavorite(herb.id)}
              onToggleBookmark={(id, e) => {
                e.stopPropagation();
                toggleFavorite(id);
              }}
            />
          ))}
        </div>
      ) : (
        /* Empty Filter State */
        <Card padding="lg" className="text-center space-y-3 my-6">
          <div className="w-12 h-12 rounded-2xl bg-sage-50 text-sage-700 mx-auto flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-charcoal-900">
            {t('noResultsTitle')}
          </h3>
          <p className="text-xs text-charcoal-500 max-w-sm mx-auto leading-relaxed">
            {t('noResultsDesc')}
          </p>
          <div className="pt-2">
            <Button variant="primary" size="sm" onClick={handleResetFilters}>
              {t('resetFilters')}
            </Button>
          </div>
        </Card>
      )}

      {/* Detail Modal Drawer */}
      {selectedHerb && (
        <HerbDetail
          herb={selectedHerb}
          onClose={() => setSelectedHerb(null)}
          isBookmarked={isFavorite(selectedHerb.id)}
          onToggleBookmark={(id, e) => {
            e.stopPropagation();
            toggleFavorite(id);
          }}
          onSelectRelated={(relatedId) => {
            const found = herbsList.find((h) => h.id === relatedId || h.slug === relatedId);
            if (found) setSelectedHerb(found);
          }}
        />
      )}
    </div>
  );
};
