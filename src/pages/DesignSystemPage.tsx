import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Tag } from '../components/ui/Tag';
import { SectionTitle } from '../components/ui/SectionTitle';
import { SearchBar } from '../components/ui/SearchBar';
import { EducationNotice } from '../components/ui/EducationNotice';
import { PWAInstallBanner } from '../components/ui/PWAInstallBanner';
import { OfflineBanner } from '../components/ui/OfflineBanner';
import {
  Download,
  WifiOff,
  Leaf,
  Sparkles,
  ArrowRight,
  Bookmark,
  Check,
  AlertCircle,
  Search,
  Globe,
  Sliders,
  Heart,
} from 'lucide-react';

export const DesignSystemPage: React.FC<{ onBackToApp?: () => void }> = ({ onBackToApp }) => {
  const navigate = useNavigate();
  const { language, toggleLanguage, setLanguage } = useLanguage();

  // Interactive component states for review
  const [clickCount, setClickCount] = useState(0);
  const [selectedTag, setSelectedTag] = useState<string>('medicinal');
  const [searchValue, setSearchValue] = useState('Turmeric / နနွင်း');
  const [activeFilterTags, setActiveFilterTags] = useState<string[]>(['tea', 'culinary']);

  const toggleFilterTag = (tag: string) => {
    setActiveFilterTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-offwhite text-charcoal-900 pb-20 selection:bg-sage-100 selection:text-sage-900">
      {/* Design System Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-charcoal-100 px-4 py-3 shadow-soft-xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sage-600 text-white flex items-center justify-center shadow-soft-xs">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-charcoal-900 text-base leading-tight">
                HerbWise Design System
              </h1>
              <p className="text-xs text-charcoal-500">
                Tailwind tokens, typography & reusable UI primitives
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-charcoal-200 text-sage-800 hover:bg-sage-50 transition-all cursor-pointer shadow-soft-xs"
            >
              <Globe className="w-3.5 h-3.5 text-sage-600" />
              <span>{language === 'en' ? 'Switch to မြန်မာစာ' : 'Switch to English'}</span>
            </button>

            <Button variant="outline" size="sm" onClick={() => (onBackToApp ? onBackToApp() : navigate('/'))}>
              Back to App
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Showcase */}
      <main className="max-w-5xl mx-auto px-4 pt-8 space-y-12">
        {/* Intro Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-charcoal-100 shadow-soft-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sage-50 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
          <div className="relative space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sage-700 bg-sage-50 px-2.5 py-1 rounded-lg inline-block">
              Design Guidelines
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 tracking-tight">
              HerbWise Botanical Design Language
            </h2>
            <p className="text-sm text-charcoal-600 max-w-2xl leading-relaxed">
              Tailored for mobile-first readability with soft sage green as the dominant brand tone,
              warm turmeric yellow as intentional accent, 8px spacing rhythm, rounded-2xl cards,
              and native bilingual typography (Inter + Noto Sans Myanmar).
            </p>
          </div>
        </div>

        {/* 1. COLOR PALETTE SPECIMEN */}
        <section className="space-y-4">
          <SectionTitle
            kicker="Color Tokens"
            title="1. Harmonized Botanical Color Palette"
            subtitle="Soft sage green primary, off-white background canvas, high-legibility charcoal text, and single warm turmeric yellow accent."
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Sage Primary */}
            <Card padding="sm" className="space-y-2">
              <div className="h-20 rounded-xl bg-sage-600 flex items-end p-2.5 text-white font-mono text-xs font-bold">
                #476D50
              </div>
              <div>
                <span className="text-xs font-bold text-charcoal-900 block">Sage Primary</span>
                <span className="text-[11px] text-charcoal-500">Brand, active tabs, buttons</span>
              </div>
            </Card>

            {/* Sage Light Background */}
            <Card padding="sm" className="space-y-2">
              <div className="h-20 rounded-xl bg-sage-100 flex items-end p-2.5 text-sage-900 font-mono text-xs font-bold border border-sage-200">
                #E3EDE6
              </div>
              <div>
                <span className="text-xs font-bold text-charcoal-900 block">Sage Subtle Tint</span>
                <span className="text-[11px] text-charcoal-500">Containers, tag badges</span>
              </div>
            </Card>

            {/* Off-White Canvas */}
            <Card padding="sm" className="space-y-2">
              <div className="h-20 rounded-xl bg-offwhite flex items-end p-2.5 text-charcoal-800 font-mono text-xs font-bold border border-charcoal-200">
                #FAF9F5
              </div>
              <div>
                <span className="text-xs font-bold text-charcoal-900 block">Off-White Canvas</span>
                <span className="text-[11px] text-charcoal-500">App background surface</span>
              </div>
            </Card>

            {/* Turmeric Warm Accent */}
            <Card padding="sm" className="space-y-2">
              <div className="h-20 rounded-xl bg-turmeric-500 flex items-end p-2.5 text-white font-mono text-xs font-bold">
                #E59325
              </div>
              <div>
                <span className="text-xs font-bold text-charcoal-900 block">Turmeric Accent</span>
                <span className="text-[11px] text-charcoal-500">Highlights, warnings, ratings</span>
              </div>
            </Card>
          </div>
        </section>

        {/* 2. TYPOGRAPHY SPECIMEN */}
        <section className="space-y-4">
          <SectionTitle
            kicker="Typography System"
            title="2. Bilingual Typography (Inter + Noto Sans Myanmar)"
            subtitle="Engineered with optical line-height expansion (1.85) to prevent Myanmar sub-consonant clipping and preserve readability."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* English Inter Specimen */}
            <Card padding="md" className="space-y-3">
              <div className="flex items-center justify-between border-b border-charcoal-100 pb-2">
                <span className="text-xs font-bold text-sage-700">English (Inter)</span>
                <span className="text-xs text-charcoal-400">font-sans</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-charcoal-900 tracking-tight">
                  Herbal Wellness & Botanical Care
                </h3>
                <p className="text-sm text-charcoal-700 leading-relaxed">
                  Discover natural herbs, therapeutic preparations, evidence-based benefits, and clinical
                  safety precautions curated by herbalists.
                </p>
                <div className="pt-2 text-xs text-charcoal-500 flex gap-4">
                  <span>Regular 400</span>
                  <span className="font-medium">Medium 500</span>
                  <span className="font-semibold">SemiBold 600</span>
                  <span className="font-bold">Bold 700</span>
                </div>
              </div>
            </Card>

            {/* Myanmar Noto Sans Myanmar Specimen */}
            <Card padding="md" className="space-y-3">
              <div className="flex items-center justify-between border-b border-charcoal-100 pb-2">
                <span className="text-xs font-bold text-sage-700">Myanmar (Noto Sans Myanmar)</span>
                <span className="text-xs text-charcoal-400">line-height: 1.85</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-charcoal-900 myanmar-text">
                  သဘာဝ ဆေးဖက်ဝင်အပင်များ အဘိဓာန်
                </h3>
                <p className="text-sm text-charcoal-700 myanmar-text">
                  ဆေးဖက်ဝင်အပင်များ၏ သဘာဝသွင်ပြင်၊ ကျန်းမာရေး အကျိုးကျေးဇူးများ၊ ဖျော်စပ်နည်းနှင့် ရှောင်ကြဉ်ရမည့်
                  ဘေးထွက်ဆိုးကျိုးများကို လေ့လာပါ။
                </p>
                <div className="pt-2 text-xs text-charcoal-500 flex gap-3 myanmar-text">
                  <span>နနွင်း</span>
                  <span>·</span>
                  <span>ဂျင်း</span>
                  <span>·</span>
                  <span>ပင်စိမ်းဖြူ</span>
                  <span>·</span>
                  <span>ရှားစောင်းလက်ပတ်</span>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* 3. REUSABLE BUTTON COMPONENT */}
        <section className="space-y-4">
          <SectionTitle
            kicker="Reusable Component"
            title="3. Button Primitive"
            subtitle="Variants for primary actions, subtle controls, turmeric accent highlights, and outlines."
            action={
              <span className="text-xs text-charcoal-500 bg-white px-2.5 py-1 rounded-lg border border-charcoal-200">
                Clicks: {clickCount}
              </span>
            }
          />

          <Card padding="md" className="space-y-6">
            {/* Variants */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-3">
                Variants
              </h4>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="primary"
                  icon={<Leaf className="w-4 h-4" />}
                  onClick={() => setClickCount((c) => c + 1)}
                >
                  Primary (Sage)
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => setClickCount((c) => c + 1)}
                >
                  Secondary (Sage Light)
                </Button>

                <Button
                  variant="accent"
                  icon={<Sparkles className="w-4 h-4" />}
                  onClick={() => setClickCount((c) => c + 1)}
                >
                  Accent (Turmeric)
                </Button>

                <Button
                  variant="outline"
                  icon={<Bookmark className="w-4 h-4" />}
                  onClick={() => setClickCount((c) => c + 1)}
                >
                  Outline
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => setClickCount((c) => c + 1)}
                >
                  Ghost
                </Button>

                <Button
                  variant="primary"
                  disabled
                >
                  Disabled State
                </Button>
              </div>
            </div>

            {/* Sizes */}
            <div className="pt-4 border-t border-charcoal-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-3">
                Sizes (Touch Hitbox Compliant $\ge 40$px)
              </h4>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm" variant="primary">
                  Small (36px)
                </Button>
                <Button size="md" variant="primary">
                  Medium (44px standard)
                </Button>
                <Button size="lg" variant="primary">
                  Large (52px hero)
                </Button>
              </div>
            </div>

            {/* Myanmar Button Text */}
            <div className="pt-4 border-t border-charcoal-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-3">
                Myanmar Script Rendering in Buttons
              </h4>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" icon={<Leaf className="w-4 h-4" />}>
                  အပင်များ ကြည့်ရှုမည်
                </Button>
                <Button variant="accent" icon={<Sparkles className="w-4 h-4" />}>
                  အကျိုးကျေးဇူး ဖတ်မည်
                </Button>
                <Button variant="outline">
                  သိမ်းဆည်းထားမည်
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* 4. REUSABLE CARD COMPONENT */}
        <section className="space-y-4">
          <SectionTitle
            kicker="Reusable Component"
            title="4. Card Primitive (Rounded-2xl & 8px Spacing Grid)"
            subtitle="Consistent surface containers with soft shadows and subtle borders."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card variant="default" padding="md" className="space-y-2">
              <span className="text-xs font-bold text-sage-700">Default Card</span>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Clean white background with hairline border and soft-xs shadow.
              </p>
            </Card>

            <Card variant="elevated" padding="md" className="space-y-2">
              <span className="text-xs font-bold text-sage-700">Elevated Card</span>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Enhanced soft-md shadow for modal popovers and focal items.
              </p>
            </Card>

            <Card variant="subtle" padding="md" className="space-y-2">
              <span className="text-xs font-bold text-sage-800">Subtle Tint Card</span>
              <p className="text-xs text-charcoal-700 leading-relaxed">
                Sage-50 surface for preparation tips, recipe notes, and dosages.
              </p>
            </Card>

            <Card variant="accent" padding="md" className="space-y-2">
              <span className="text-xs font-bold text-turmeric-900">Turmeric Accent Card</span>
              <p className="text-xs text-charcoal-800 leading-relaxed">
                Warm warning caution card for pregnancy, allergies, and interactions.
              </p>
            </Card>
          </div>

          {/* Interactive Hoverable Card Example */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <Card hoverable padding="md" className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sage-100 text-sage-700 flex items-center justify-center shrink-0">
                <Leaf className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-charcoal-900 text-sm">
                    Hoverable Interactive Card
                  </h4>
                  <Tag label="Hover me" size="sm" variant="sage" />
                </div>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  Notice the gentle elevation lift (-translate-y-0.5) and soft shadow on hover.
                </p>
              </div>
            </Card>

            <Card hoverable padding="md" className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-turmeric-100 text-turmeric-700 flex items-center justify-center shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-charcoal-900 text-sm myanmar-text">
                  နမူနာ ကတ်ပြားပုံစံ (Myanmar)
                </h4>
                <p className="text-xs text-charcoal-600 leading-relaxed myanmar-text">
                  မြန်မာစာလုံးပေါင်း သတ်ပုံများနှင့် စာကြောင်းအကွာအဝေး အဆင်ပြေစေရန် စီမံထားပါသည်။
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* 5. REUSABLE TAG / CHIP COMPONENT */}
        <section className="space-y-4">
          <SectionTitle
            kicker="Reusable Component"
            title="5. Tag & Chip Primitive"
            subtitle="Unboxed metadata and interactive filter buttons with click handlers."
          />

          <Card padding="md" className="space-y-6">
            {/* Informational Tags */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-3">
                Informational Tag Variants
              </h4>
              <div className="flex flex-wrap items-center gap-2">
                <Tag label="Sage Variant" variant="sage" />
                <Tag label="Turmeric Accent" variant="turmeric" />
                <Tag label="Neutral Charcoal" variant="neutral" />
                <Tag label="Outline Style" variant="outline" />
                <Tag label="With Icon" variant="sage" icon={<Leaf className="w-3 h-3 text-sage-600" />} />
                <Tag label="Small Tag" size="sm" variant="turmeric" />
              </div>
            </div>

            {/* Interactive Filter Chips */}
            <div className="pt-4 border-t border-charcoal-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-3">
                Interactive Filter Chips (Click to toggle)
              </h4>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'medicinal', label: 'Medicinal / ဆေးဖက်ဝင်' },
                  { id: 'culinary', label: 'Culinary / ဟင်းခတ်' },
                  { id: 'aromatic', label: 'Aromatic / ရနံ့မွှေး' },
                  { id: 'tea', label: 'Herbal Tea / လက်ဖက်ရည်' },
                  { id: 'skin-care', label: 'Skin Care / အသားအရေ' },
                ].map((chip) => {
                  const isSelected = activeFilterTags.includes(chip.id);
                  return (
                    <Tag
                      key={chip.id}
                      label={chip.label}
                      interactive
                      selected={isSelected}
                      icon={isSelected ? <Check className="w-3 h-3" /> : undefined}
                      onClick={() => toggleFilterTag(chip.id)}
                    />
                  );
                })}
              </div>
            </div>
          </Card>
        </section>

        {/* 6. REUSABLE SECTION TITLE COMPONENT */}
        <section className="space-y-4">
          <SectionTitle
            kicker="Reusable Component"
            title="6. SectionTitle Primitive"
            subtitle="Header element with kicker, title, description, and action button slot."
          />

          <Card padding="md" className="space-y-6">
            <div className="p-4 bg-offwhite rounded-2xl border border-charcoal-100">
              <SectionTitle
                kicker="Digestive Health"
                title="Herbs for Stomach & Gut Comfort"
                subtitle="Gentle herbal infusions that soothe nausea, indigestion, and gas."
                action={
                  <Button size="sm" variant="secondary" icon={<ArrowRight className="w-3.5 h-3.5" />} iconPosition="right">
                    View All
                  </Button>
                }
              />
            </div>

            <div className="p-4 bg-offwhite rounded-2xl border border-charcoal-100">
              <SectionTitle
                kicker="တိုင်းရင်းဆေးပညာ"
                title="အစာကြေလွယ်စေသော ဆေးဖက်ဝင်အပင်များ"
                subtitle="အစာအိမ်နှင့် အူလမ်းကြောင်း မအီမသာဖြစ်ခြင်းကို သက်သာစေသော အပင်များ"
                action={
                  <Button size="sm" variant="primary">
                    ဖတ်ရှုရန်
                  </Button>
                }
              />
            </div>
          </Card>
        </section>

        {/* 7. REUSABLE SEARCH BAR COMPONENT */}
        <section className="space-y-4">
          <SectionTitle
            kicker="Reusable Component"
            title="7. SearchBar Primitive"
            subtitle="Controlled input with instant clear affordance, search icon, and sage focus ring."
          />

          <Card padding="md" className="space-y-4">
            <div className="max-w-xl">
              <SearchBar
                value={searchValue}
                onChange={setSearchValue}
                placeholder="Search herbs by name, benefit, or ailment..."
                size="md"
              />
            </div>

            <div className="text-xs text-charcoal-600 bg-sage-50 rounded-xl p-3 border border-sage-100">
              <span className="font-bold text-sage-800">Current Search Query: </span>
              <span className="font-mono text-charcoal-900">{searchValue || '(empty)'}</span>
            </div>

            <div className="max-w-xl pt-2">
              <SearchBar
                value=""
                onChange={() => {}}
                placeholder="အပင်အမည် သို့မဟုတ် ကျန်းမာရေး အကျိုးကျေးဇူးဖြင့် ရှာဖွေပါ..."
                size="lg"
              />
            </div>
          </Card>
        </section>

        {/* 8. SAMPLE HERB CARD PREVIEW */}
        <section className="space-y-4">
          <SectionTitle
            kicker="Design Composition"
            title="8. Full Herb Card Built With Design Tokens"
            subtitle="Showing how Button, Tag, Card, and photo come together on the 8px grid."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
            {/* Turmeric Specimen */}
            <Card hoverable padding="none" className="flex flex-col">
              <div className="relative aspect-4/3 w-full bg-charcoal-100 overflow-hidden">
                <img
                  src="/src/assets/images/herb_turmeric_1791771800972.jpg"
                  alt="Turmeric"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-charcoal-700 shadow-soft-xs">
                    <Heart className="w-4 h-4 text-turmeric-600 fill-turmeric-600" />
                  </span>
                </div>
                <div className="absolute bottom-2 left-3 text-white text-xs font-serif italic">
                  Curcuma longa
                </div>
              </div>

              <div className="p-4 sm:p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Tag label="Medicinal" size="sm" variant="sage" />
                  <Tag label="Rhizome" size="sm" variant="neutral" />
                </div>

                <div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-bold text-charcoal-900">
                      Turmeric
                    </h3>
                    <span className="text-sm font-medium text-charcoal-500 myanmar-text">
                      နနွင်း
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-600 mt-1 line-clamp-2 leading-relaxed">
                    Golden-orange rhizome celebrated for curcumin's powerful anti-inflammatory and tissue-protecting benefits.
                  </p>
                </div>

                <div className="pt-2 border-t border-charcoal-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-sage-700">
                    4 preparation methods
                  </span>
                  <Button size="sm" variant="primary" icon={<ArrowRight className="w-3.5 h-3.5" />} iconPosition="right">
                    View Herb
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* 9. EDUCATION & MEDICAL DISCLAIMER NOTICES */}
        <section className="space-y-4">
          <SectionTitle
            kicker="Safety & Trust"
            title="9. Educational & Safety Notice Component"
            subtitle="Persistent, unobtrusive bilingual safety notices for herb warnings, pages, and layout shell."
          />

          <div className="space-y-4">
            <Card variant="default" padding="md" className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-400">
                1. Card Variant with Dual-Language toggle
              </span>
              <EducationNotice variant="card" showDualLanguage={true} />
            </Card>

            <Card variant="default" padding="md" className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-400">
                2. Warning Box Variant (Featured in Herb Warning Sections)
              </span>
              <EducationNotice variant="warning-box" showDualLanguage={false} />
            </Card>

            <Card variant="default" padding="md" className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-400">
                3. Banner Variant (Persistent across App Header)
              </span>
              <div className="rounded-xl overflow-hidden border border-charcoal-100">
                <EducationNotice variant="banner" />
              </div>
            </Card>

            <Card variant="default" padding="md" className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-400">
                4. Subtle Inline Variant
              </span>
              <EducationNotice variant="subtle" showDualLanguage={true} />
            </Card>
          </div>
        </section>

        {/* 10. PROGRESSIVE WEB APP & OFFLINE SYSTEM */}
        <section className="space-y-4">
          <SectionTitle
            kicker="Offline & Installability"
            title="10. PWA & Offline Network Indicators"
            subtitle="Install banner prompts, service worker cache control, and graceful offline status indicator."
          />

          <div className="space-y-4">
            <Card variant="default" padding="md" className="space-y-3">
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-turmeric-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-700">
                  PWA In-App Install Banner
                </span>
              </div>
              <p className="text-xs text-charcoal-600">
                Automatically activates on supported desktop and mobile Chromium browsers, and provides guided instructions on iOS Safari.
              </p>
              <div className="rounded-2xl overflow-hidden border border-charcoal-200">
                <PWAInstallBanner />
              </div>
            </Card>

            <Card variant="default" padding="md" className="space-y-3">
              <div className="flex items-center gap-2">
                <WifiOff className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-700">
                  Offline Mode Status Banner
                </span>
              </div>
              <p className="text-xs text-charcoal-600">
                Displayed whenever device loses internet connection, confirming that all 20 cataloged herbs and botanical instructions are 100% available offline via service worker.
              </p>
              <div className="rounded-2xl overflow-hidden border border-amber-800">
                <div className="bg-amber-900 text-amber-50 px-4 py-2 flex items-center justify-center gap-2 text-xs">
                  <WifiOff className="w-4 h-4 text-amber-300 shrink-0" />
                  <span className="font-semibold text-amber-200">Offline Mode Active:</span>
                  <span className="text-amber-100 truncate">All 20 herbs, preparation steps, remedies, and safety warnings remain fully accessible without internet.</span>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};
