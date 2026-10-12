import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Tag } from '../components/ui/Tag';
import { SearchBar } from '../components/ui/SearchBar';
import { SectionTitle } from '../components/ui/SectionTitle';
import { HerbCard } from '../components/HerbCard';
import { HerbDetail } from '../components/HerbDetail';
import { HerbOfTheDayCard } from '../components/HerbOfTheDayCard';
import { HerbCardSkeleton } from '../components/ui/HerbCardSkeleton';
import { useFavorites } from '../hooks/useFavorites';
import herbsDataRaw from '../data/herbs.json';
import { Herb } from '../types/herb';
import { Leaf, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

const herbsList: Herb[] = herbsDataRaw as Herb[];

export const HomePage: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHerb, setSelectedHerb] = useState<Herb | null>(null);

  // Herb of the day selection (deterministic rotation based on day of month)
  const herbOfTheDay = useMemo(() => {
    const today = new Date().getDate();
    return herbsList[today % herbsList.length] || herbsList[0];
  }, []);

  // Popular herbs (excluding or prioritizing top selections)
  const popularHerbs = useMemo(() => {
    return herbsList;
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/herbs?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/herbs');
    }
  };

  const categories = [
    { id: 'all', label: t('allCategories') },
    { id: 'myanmar-traditional', label: language === 'my' ? 'မြန်မာ့ရိုးရာဆေးပင်' : 'Myanmar Traditional' },
    { id: 'medicinal', label: language === 'my' ? 'ဆေးဖက်ဝင်' : 'Medicinal' },
    { id: 'culinary', label: language === 'my' ? 'ဟင်းခတ်' : 'Culinary' },
    { id: 'aromatic', label: language === 'my' ? 'ရနံ့မွှေး' : 'Aromatic' },
    { id: 'tea', label: language === 'my' ? 'လက်ဖက်ရည်' : 'Herbal Tea' },
    { id: 'skin-and-hair', label: language === 'my' ? 'အသားအရေနှင့် ဆံကေသာ' : 'Skin & Hair' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 pt-6 space-y-10">
      {/* 1. Hero Section with Prominent Search Bar */}
      <Card
        variant="default"
        padding="lg"
        className="relative overflow-hidden bg-gradient-to-br from-white via-white to-sage-50/50 border border-charcoal-100/90 shadow-soft-sm"
      >
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-sage-100/50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-sage-800 bg-sage-50 border border-sage-200/80 px-3 py-1 rounded-xl">
            <Leaf className="w-3.5 h-3.5 text-sage-600" />
            <span>
              {language === 'my'
                ? 'သဘာဝ ဆေးဖက်ဝင်အပင် လမ်းညွှန်'
                : 'Natural Botanical Compendium'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 tracking-tight leading-tight">
            {language === 'my'
              ? 'သဘာဝဆေးဖက်ဝင်အပင်များ၏ အစွမ်းသတ္တိကို ရှာဖွေပါ'
              : 'Discover Nature’s Healing Herbs & Botanicals'}
          </h1>

          <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
            {t('appTagline')}
          </p>

          {/* Search Bar Form */}
          <form onSubmit={handleSearchSubmit} className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <div className="flex-1">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={t('searchPlaceholder')}
                size="md"
              />
            </div>
            <Button type="submit" variant="primary" size="md">
              {language === 'my' ? 'ရှာဖွေမည်' : 'Search Herbs'}
            </Button>
          </form>
        </div>
      </Card>

      {/* 2. Herb of the Day */}
      <section className="space-y-3">
        <SectionTitle
          kicker={t('herbOfTheDay')}
          title={
            language === 'my'
              ? 'ယနေ့အတွက် ရွေးချယ်ထားသော ဆေးဖက်ဝင်အပင်'
              : 'Featured Daily Botanical'
          }
          subtitle={t('herbOfTheDayDesc')}
        />

        <HerbOfTheDayCard
          herb={herbOfTheDay}
          onSelect={(h) => navigate(`/herbs/${h.id}`)}
          isBookmarked={isFavorite(herbOfTheDay.id)}
          onToggleBookmark={(id, e) => {
            e.stopPropagation();
            toggleFavorite(id);
          }}
        />
      </section>

      {/* 3. Category Chips */}
      <section className="space-y-3">
        <SectionTitle
          title={t('exploreCategories')}
          action={
            <Button
              variant="ghost"
              size="sm"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              iconPosition="right"
              onClick={() => navigate('/categories')}
            >
              {language === 'my' ? 'ကဏ္ဍအားလုံး' : 'All Categories'}
            </Button>
          }
        />

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() =>
                navigate(cat.id === 'all' ? '/herbs' : `/herbs?category=${cat.id}`)
              }
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-charcoal-200/80 hover:border-sage-400 hover:bg-sage-50/60 shadow-soft-xs text-xs font-semibold text-charcoal-800 transition-all whitespace-nowrap cursor-pointer active:scale-[0.98]"
            >
              <span className="w-2 h-2 rounded-full bg-sage-500" />
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 4. Grid of Popular Herbs */}
      <section className="space-y-4">
        <SectionTitle
          title={t('popularHerbs')}
          subtitle={
            language === 'my'
              ? 'အသုံးအများဆုံးနှင့် အကျိုးကျေးဇူး ထင်ရှားသော ဆေးဖက်ဝင်အပင်များ'
              : 'Most referenced botanical herbs with verified therapeutic benefits and safety profiles.'
          }
          action={
            <Button
              variant="outline"
              size="sm"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              iconPosition="right"
              onClick={() => navigate('/herbs')}
            >
              {t('viewAllHerbs')}
            </Button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {popularHerbs.map((herb) => (
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
      </section>

      {/* 5. Safety Commitment Notice */}
      <Card variant="subtle" padding="lg" className="border border-sage-200/90">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sage-600 text-white flex items-center justify-center shrink-0 shadow-soft-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base font-bold text-charcoal-900">
              {language === 'my'
                ? 'လုံခြုံစိတ်ချစွာ သုံးစွဲနိုင်ရန် သတိပြုချက်များ'
                : 'Evidence-Informed Botanical Safety'}
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
              {language === 'my'
                ? 'ဆေးဖက်ဝင်အပင်တိုင်းတွင် သင့်တော်သော ပမာဏ၊ ဓာတ်မတည့်မှုနှင့် ကိုယ်ဝန်ဆောင်ချိန် ရှောင်ကြဉ်ရန် အချက်များရှိပါသည်။ အပင်တိုင်း၏ စာမျက်နှာတွင် သတိပေးချက်များကို ထင်ရှားစွာ ဖော်ပြထားပါသည်။'
                : 'Every herb in HerbWise features explicit dosage guidelines, preparation steps, and clinical warnings regarding pregnancy, allergies, and drug interactions.'}
            </p>
          </div>
        </div>
      </Card>

      {/* Herb Detail Modal Drawer */}
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
