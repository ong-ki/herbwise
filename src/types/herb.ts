export type Language = 'en' | 'my';

export interface BilingualText {
  en: string;
  my: string;
}

export interface BilingualBenefit {
  en: string;
  my: string;
}

export interface HowToUseMethod {
  method: string;
  en: string;
  my: string;
}

export interface HowToApplySteps {
  en: string[];
  my: string[];
}

export interface DishItem {
  dishName: BilingualText;
  region: BilingualText;
  description: BilingualText;
}

export interface RegionalPrepItem {
  region: BilingualText;
  technique: BilingualText;
  description: BilingualText;
}

export interface Herb {
  id: string;
  slug: string;
  name: BilingualText;
  scientificName: string;
  category: string;
  image: string;
  imageCredit: string;
  description: BilingualText;
  whereItGrows: BilingualText;
  partsUsed: BilingualText;
  benefits: BilingualBenefit[];
  howToUse: HowToUseMethod[];
  howToApply: HowToApplySteps;
  dosageAndFrequency: BilingualText;
  warnings: BilingualText;
  relatedHerbs: string[];
  whyUsedInCooking?: BilingualText;
  dishes?: DishItem[];
  regionalPreparations?: RegionalPrepItem[];
}
