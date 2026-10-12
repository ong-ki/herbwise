import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import {
  Leaf,
  Globe,
  ShieldAlert,
  BookOpen,
  Heart,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import { EducationNotice } from '../components/ui/EducationNotice';

export const AboutPage: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 pt-6 space-y-8">
      {/* Title */}
      <SectionTitle
        title={t('aboutTitle')}
        subtitle={t('aboutSubtitle')}
      />

      {/* Mission Card */}
      <Card variant="default" padding="lg" className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sage-50 text-sage-700 flex items-center justify-center border border-sage-200/80">
            <Leaf className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-charcoal-900">
            {t('missionTitle')}
          </h3>
        </div>
        <p className="text-sm text-charcoal-700 leading-relaxed">
          {t('missionDesc')}
        </p>
      </Card>

      {/* Bilingual Knowledge Card */}
      <Card variant="default" padding="lg" className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sage-50 text-sage-700 flex items-center justify-center border border-sage-200/80">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-charcoal-900">
            {t('bilingualNoticeTitle')}
          </h3>
        </div>
        <p className="text-sm text-charcoal-700 leading-relaxed">
          {t('bilingualNoticeDesc')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-offwhite border border-charcoal-100 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0" />
            <span className="text-xs font-semibold text-charcoal-800">
              Inter typography for English
            </span>
          </div>
          <div className="p-3 rounded-xl bg-offwhite border border-charcoal-100 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0" />
            <span className="text-xs font-semibold text-charcoal-800 myanmar-text">
              Noto Sans Myanmar ယူနီကုဒ်စာလုံးစနစ်
            </span>
          </div>
        </div>
      </Card>

      {/* Safety Notice Card */}
      <Card variant="accent" padding="lg" className="space-y-4 border-turmeric-200/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-turmeric-100 text-turmeric-800 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-charcoal-900">
            {t('safetyNoticeTitle')}
          </h3>
        </div>
        <p className="text-sm text-charcoal-800 leading-relaxed">
          {t('safetyNoticeDesc')}
        </p>

        {/* Persistent and unobtrusive education notice */}
        <EducationNotice variant="warning-box" showDualLanguage={true} />
      </Card>

      {/* Design System Link */}
      <Card variant="subtle" padding="md" className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Sliders className="w-5 h-5 text-sage-700" />
          <div>
            <h4 className="text-sm font-bold text-charcoal-900">
              {language === 'my' ? 'ဒီဇိုင်းစနစ် လေ့လာရန်' : 'HerbWise Design System'}
            </h4>
            <p className="text-xs text-charcoal-500">
              {language === 'my'
                ? 'အရောင်၊ ဖောင့်နှင့် အစိတ်အပိုင်းများကို /design တွင် ကြည့်ရှုနိုင်ပါသည်'
                : 'Review color tokens, typography scales, and UI component primitives'}
            </p>
          </div>
        </div>
        <NavLink to="/design">
          <Button variant="outline" size="sm">
            View /design
          </Button>
        </NavLink>
      </Card>
    </div>
  );
};
