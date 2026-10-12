import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Tag } from '../components/ui/Tag';
import { SectionTitle } from '../components/ui/SectionTitle';
import herbsDataRaw from '../data/herbs.json';
import { Herb } from '../types/herb';
import { ArrowRight, Sparkles, Coffee, Flame, HeartHandshake, ShieldPlus, Leaf } from 'lucide-react';

const herbsList: Herb[] = herbsDataRaw as Herb[];

export const CategoriesPage: React.FC = () => {
  const { language, t, getText } = useLanguage();
  const navigate = useNavigate();

  const categoryDefinitions = [
    {
      id: 'myanmar-traditional',
      name: { en: 'Myanmar Traditional Herbs', my: 'မြန်မာ့ရိုးရာ တိုင်းရင်းဆေးပင်များ' },
      icon: Sparkles,
      description: {
        en: 'Centuries of time-honored traditional remedies from Myanmar including Thanakha, Pennywort, Moringa, and Galangal.',
        my: 'သနပ်ခါး၊ မြင်းခွာရွက်၊ ဒန့်ဒလွန်နှင့် ပဒဲကော အစရှိသော ရာစုနှစ်ချီ သက်တမ်းရှိ မြန်မာ့ရိုးရာ တိုင်းရင်းဆေးပင်များ။',
      },
    },
    {
      id: 'medicinal',
      name: { en: 'Medicinal Herbs', my: 'ဆေးဖက်ဝင် အပင်များ' },
      icon: ShieldPlus,
      description: {
        en: 'Potent therapeutic botanicals that support internal organ health, systemic anti-inflammatory actions, and disease defense.',
        my: 'ကိုယ်တွင်းအင်္ဂါ ကျန်းမာရေး၊ ရောင်ရမ်းမှုကျဆင်းစေရေးနှင့် ရောဂါကာကွယ်ရေးအတွက် အစွမ်းထက်သော ဆေးဖက်ဝင်အပင်များ။',
      },
    },
    {
      id: 'culinary',
      name: { en: 'Culinary & Digestive', my: 'ဟင်းခတ်နှင့် အစာကြေဆေးပင်များ' },
      icon: Flame,
      description: {
        en: 'Aromatic herbs that enhance everyday cooking flavor while stimulating stomach digestive secretions and soothing nausea.',
        my: 'ဟင်းလျာများတွင် အရသာနှင့် ရနံ့ကောင်းမွန်စေပြီး အစာအိမ်အစာကြေလွယ်စေကာ မူးဝေပျို့အန်သက်သာစေသော အပင်များ။',
      },
    },
    {
      id: 'aromatic',
      name: { en: 'Aromatic & Adaptogenic', my: 'ရနံ့မွှေးနှင့် စိတ်ဖိစီးမှုလျှော့ပင်များ' },
      icon: Leaf,
      description: {
        en: 'Fragrant balancing herbs rich in volatile essential oils that nourish the nervous system and adapt to stress.',
        my: 'သင်းပျံ့သော မရှိမဖြစ်ဆီများ ကြွယ်ဝပြီး အာရုံကြောစနစ်ကို တည်ငြိမ်စေကာ စိတ်ဖိစီးမှုဒဏ်ကို လျှော့ချပေးသော အပင်များ။',
      },
    },
    {
      id: 'tea',
      name: { en: 'Herbal Teas & Infusions', my: 'ဆေးဖက်ဝင် လက်ဖက်ရည်ကြမ်းများ' },
      icon: Coffee,
      description: {
        en: 'Soothing daily botanical tisanes that gently cleanse the kidneys, reduce fever, and refresh hydration.',
        my: 'နေ့စဉ် သောက်သုံးနိုင်ပြီး ကျောက်ကပ်မှ အဆိပ်အတောက်စွန့်ထုတ်ပေးကာ ကိုယ်ပူအဖျား သက်သာစေသော ဆေးဖက်ဝင် ရေနွေးကြမ်းများ။',
      },
    },
    {
      id: 'skin-and-hair',
      name: { en: 'Skin & Hair Care', my: 'အသားအရေနှင့် ဆံကေသာထိန်းသိမ်းမှု' },
      icon: HeartHandshake,
      description: {
        en: 'Cooling botanicals and dermatological tonics for scalp nourishment, glowing skin, and hair vitality.',
        my: 'ဦးရေပြားနှင့် ဆံပင်သား သန်စွမ်းစေရန်၊ အသားအရေ စိုပြေစေရန်နှင့် သဘာဝနေလောင်ဒဏ် ကာကွယ်ရန် အပင်များ။',
      },
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 pt-6 space-y-6">
      <SectionTitle
        title={t('navCategories')}
        subtitle={
          language === 'my'
            ? 'ဆေးဖက်ဝင်အပင်များကို သုံးစွဲပုံကဏ္ဍအလိုက် ခွဲခြားလေ့လာပါ'
            : 'Explore herbs grouped by their primary therapeutic and culinary functions.'
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {categoryDefinitions.map((cat) => {
          const matchingHerbs = herbsList.filter((h) => h.category === cat.id);
          const Icon = cat.icon;

          return (
            <Card
              key={cat.id}
              variant="default"
              padding="md"
              hoverable
              onClick={() => navigate(`/herbs?category=${cat.id}`)}
              className="flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-sage-50 text-sage-700 flex items-center justify-center shrink-0 border border-sage-200/80">
                    <Icon className="w-5 h-5" />
                  </div>
                  <Tag
                    label={`${matchingHerbs.length} ${language === 'my' ? 'မျိုး' : 'herbs'}`}
                    size="sm"
                    variant="sage"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-charcoal-900">
                    {getText(cat.name)}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-600 mt-1 leading-relaxed">
                    {getText(cat.description)}
                  </p>
                </div>

                {/* Sample Herbs in Category */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {matchingHerbs.map((herb) => (
                    <span
                      key={herb.id}
                      className="text-xs px-2.5 py-1 rounded-lg bg-offwhite border border-charcoal-200/80 text-charcoal-700 font-medium"
                    >
                      {getText(herb.name)} ({herb.scientificName})
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-charcoal-100 flex items-center justify-between text-xs font-semibold text-sage-700">
                <span>{language === 'my' ? 'ဤကဏ္ဍမှ အပင်များကြည့်ရန်' : 'Explore Category'}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
