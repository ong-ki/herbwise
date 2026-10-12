import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { HerbCard } from '../components/HerbCard';
import { HerbDetail } from '../components/HerbDetail';
import { useFavorites } from '../hooks/useFavorites';
import herbsDataRaw from '../data/herbs.json';
import { Herb } from '../types/herb';
import { Bookmark, Sparkles, ArrowRight } from 'lucide-react';

const herbsList: Herb[] = herbsDataRaw as Herb[];

export const FavoritesPage: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [selectedHerb, setSelectedHerb] = useState<Herb | null>(null);

  const savedHerbs = herbsList.filter((herb) => favorites.includes(herb.id));

  return (
    <div className="max-w-5xl mx-auto px-4 pt-6 space-y-6">
      <SectionTitle
        title={t('navFavorites')}
        subtitle={
          language === 'my'
            ? 'သင် အမြဲတမ်း ပြန်လည်ကြည့်ရှုလိုသော ဆေးဖက်ဝင်အပင်များကို မှတ်သားထားသော စာရင်း'
            : 'Your personal collection of saved botanical herbs for quick offline reference.'
        }
      />

      {savedHerbs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {savedHerbs.map((herb) => (
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
        /* Empty State */
        <Card padding="lg" className="text-center space-y-4 max-w-md mx-auto my-12">
          <div className="w-14 h-14 rounded-2xl bg-sage-50 text-sage-600 mx-auto flex items-center justify-center border border-sage-200/80">
            <Bookmark className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-charcoal-900">
              {t('noFavoritesTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed">
              {t('noFavoritesDesc')}
            </p>
          </div>
          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              onClick={() => navigate('/herbs')}
            >
              {t('browseHerbsBtn')}
            </Button>
          </div>
        </Card>
      )}

      {/* Detail Modal */}
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
