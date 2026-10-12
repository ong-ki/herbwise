import { Language } from '../types/herb';

export interface TranslationDictionary {
  appName: string;
  appTagline: string;
  navHome: string;
  navHerbs: string;
  navCategories: string;
  navFavorites: string;
  navAbout: string;
  navDesign: string;
  searchPlaceholder: string;
  allCategories: string;
  whatItIs: string;
  whereItGrows: string;
  whyUseIt: string;
  keyBenefits: string;
  howToApply: string;
  prepMethods: string;
  safetyWarnings: string;
  contraindications: string;
  harvestSeason: string;
  botanicalFamily: string;
  dosage: string;
  duration: string;
  instructions: string;
  close: string;
  backToHerbs: string;
  noResultsTitle: string;
  noResultsDesc: string;
  herbsCount: string;
  quickOverview: string;
  preparationTab: string;
  safetyTab: string;
  benefitsTab: string;
  overviewTab: string;
  disclaimer: string;
  educationNotice: string;
  educationNoticeTitle: string;
  languageLabel: string;
  bookmarkedOnly: string;
  bookmark: string;
  bookmarked: string;
  featuredHerbs: string;
  exploreCategories: string;
  viewAllHerbs: string;
  noFavoritesTitle: string;
  noFavoritesDesc: string;
  browseHerbsBtn: string;
  aboutTitle: string;
  aboutSubtitle: string;
  missionTitle: string;
  missionDesc: string;
  bilingualNoticeTitle: string;
  bilingualNoticeDesc: string;
  safetyNoticeTitle: string;
  safetyNoticeDesc: string;
  partsUsedLabel: string;
  relatedHerbsLabel: string;
  herbOfTheDay: string;
  herbOfTheDayDesc: string;
  popularHerbs: string;
  filterByBenefit: string;
  filterByMethod: string;
  allBenefits: string;
  allMethods: string;
  activeFilters: string;
  resetFilters: string;
  shareBtn: string;
  favoriteBtn: string;
  favoritedBtn: string;
  linkCopied: string;
  expandAll: string;
  collapseAll: string;
  sectionOverview: string;
  sectionWhyUseIt: string;
  sectionHowToUse: string;
  sectionHowToApply: string;
  sectionDosage: string;
  whyUsedInCooking: string;
  dishesGoesIn: string;
  regionalPrep: string;
  culinaryTab: string;
  sectionCulinary: string;
  sectionRegionalPrep: string;
  sectionWarnings: string;
  sectionRelated: string;
  pwaInstallBtn: string;
  pwaInstallIos: string;
  pwaInstalled: string;
  pwaInstallDesc: string;
  offlineStatus: string;
  offlineReadyDesc: string;
  iosShareInstruction: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    appName: 'HerbWise',
    appTagline: 'Discover natural herbs, benefits, preparation & safety',
    navHome: 'Home',
    navHerbs: 'Herbs',
    navCategories: 'Categories',
    navFavorites: 'Favorites',
    navAbout: 'About',
    navDesign: 'Design',
    searchPlaceholder: 'Search herbs by name, benefit, or ailment...',
    allCategories: 'All Categories',
    whatItIs: 'What It Is',
    whereItGrows: 'Where It Grows',
    whyUseIt: 'Why Use It',
    keyBenefits: 'Key Benefits',
    howToApply: 'How to Apply',
    prepMethods: 'Preparation Methods',
    safetyWarnings: 'Safety Warnings & Precautions',
    contraindications: 'Contraindications',
    harvestSeason: 'Harvest Period',
    botanicalFamily: 'Botanical Family',
    dosage: 'Dosage & Frequency',
    duration: 'Prep Time',
    instructions: 'Preparation Steps',
    close: 'Close',
    backToHerbs: 'Back to Herbs',
    noResultsTitle: 'No herbs matched your search',
    noResultsDesc: 'Try adjusting your search terms or clearing some active filters.',
    herbsCount: 'herbs cataloged',
    quickOverview: 'Quick Botanical Profile',
    preparationTab: 'Preparation',
    safetyTab: 'Safety & Caution',
    benefitsTab: 'Benefits',
    overviewTab: 'Overview',
    disclaimer: 'HerbWise is intended for educational purposes only. Always consult a qualified healthcare provider before using herbal remedies for medical conditions.',
    educationNotice: 'For education only. Not medical advice. Consult a doctor before use, especially if pregnant, nursing, or on medication.',
    educationNoticeTitle: 'Educational Use Notice',
    languageLabel: 'မြန်မာ',
    bookmarkedOnly: 'Saved',
    bookmark: 'Save herb',
    bookmarked: 'Saved',
    featuredHerbs: 'Featured Botanical Herbs',
    exploreCategories: 'Explore by Category',
    viewAllHerbs: 'View All Herbs',
    noFavoritesTitle: 'No saved herbs yet',
    noFavoritesDesc: 'Tap the bookmark icon on any herb card to save it here for quick reference.',
    browseHerbsBtn: 'Browse Herb Catalog',
    aboutTitle: 'About HerbWise',
    aboutSubtitle: 'A mobile botanical companion for learning and discovering traditional herbs.',
    missionTitle: 'Our Botanical Mission',
    missionDesc: 'HerbWise bridges traditional herbal wisdom and modern botanical insights. We provide accessible, evidence-informed knowledge on natural plants, preparation recipes, therapeutic applications, and essential clinical cautions.',
    bilingualNoticeTitle: 'Bilingual Knowledge (English & Myanmar)',
    bilingualNoticeDesc: 'Every botanical profile, preparation guide, and safety warning is fully available in English and Myanmar Unicode (မြန်မာစာ), supporting cultural preservation and community health literacy.',
    safetyNoticeTitle: 'Commitment to Safety',
    safetyNoticeDesc: 'Herbal remedies possess potent biological activity. HerbWise provides clear safety precautions, contraindications, and dosage warnings to promote safe and informed plant use.',
    partsUsedLabel: 'Parts Used',
    relatedHerbsLabel: 'Related Herbs',
    herbOfTheDay: 'Herb of the Day',
    herbOfTheDayDesc: 'Featured daily botanical remedy with proven wellness traditions.',
    popularHerbs: 'Popular Botanical Herbs',
    filterByBenefit: 'Benefit Focus',
    filterByMethod: 'Use Method',
    allBenefits: 'All Benefits',
    allMethods: 'All Methods',
    activeFilters: 'Active Filters',
    resetFilters: 'Reset Filters',
    shareBtn: 'Share',
    favoriteBtn: 'Favorite',
    favoritedBtn: 'Favorited',
    linkCopied: 'Link copied to clipboard!',
    expandAll: 'Expand All',
    collapseAll: 'Collapse All',
    sectionOverview: 'Overview',
    sectionWhyUseIt: 'Why Use It (Benefits)',
    sectionHowToUse: 'How to Use (Methods)',
    sectionHowToApply: 'How to Apply (Steps)',
    sectionDosage: 'Dosage & Frequency',
    whyUsedInCooking: 'Why It Is Used in Cooking',
    dishesGoesIn: 'Which Dishes It Goes In',
    regionalPrep: 'Regional Preparations Across Asia',
    culinaryTab: 'Culinary Guide',
    sectionCulinary: 'Why Used in Cooking & Dishes',
    sectionRegionalPrep: 'Regional Preparations Across Asia',
    sectionWarnings: 'Warnings & Safety',
    sectionRelated: 'Related Herbs',
    pwaInstallBtn: 'Install App',
    pwaInstallIos: 'Install on iOS',
    pwaInstalled: 'App Installed',
    pwaInstallDesc: 'Install HerbWise on your device for fast, full offline botanical reference anytime.',
    offlineStatus: 'Offline Mode Active',
    offlineReadyDesc: 'All 20 herbs, preparation steps, remedies, and safety warnings remain fully accessible without internet.',
    iosShareInstruction: 'Tap the Share icon in Safari and select "Add to Home Screen".',
  },
  my: {
    appName: 'HerbWise (ဆေးဖက်ဝင်အပင်များ)',
    appTagline: 'ဆေးဖက်ဝင်အပင်များ၊ အကျိုးကျေးဇူး၊ သုံးစွဲပုံနှင့် သတိပြုရန်များ',
    navHome: 'မူလ',
    navHerbs: 'အပင်များ',
    navCategories: 'ကဏ္ဍများ',
    navFavorites: 'သိမ်းဆည်းမှု',
    navAbout: 'အကြောင်း',
    navDesign: 'ဒီဇိုင်း',
    searchPlaceholder: 'အပင်အမည်၊ အကျိုးကျေးဇူး သို့မဟုတ် ရောဂါလက္ခဏာဖြင့် ရှာဖွေပါ...',
    allCategories: 'ကဏ္ဍ အားလုံး',
    whatItIs: 'အပင်၏ သဘာဝနှင့် သွင်ပြင်လက္ခဏာ',
    whereItGrows: 'ပေါက်ရောက်ရာ ဒေသနှင့် ရာသီဥတု',
    whyUseIt: 'ဘာကြောင့် အသုံးပြုသင့်သလဲ',
    keyBenefits: 'အဓိက ကျန်းမာရေး အကျိုးကျေးဇူးများ',
    howToApply: 'အသုံးပြုပုံနှင့် လိမ်းကျံနည်း',
    prepMethods: 'ဖျော်စပ်ပြင်ဆင်နည်းများ',
    safetyWarnings: 'ဘေးထွက်ဆိုးကျိုးနှင့် သတိပြုရန်အချက်များ',
    contraindications: 'ရှောင်ကြဉ်သင့်သူများ',
    harvestSeason: 'ခူးဆွတ်ရိတ်သိမ်းချိန်',
    botanicalFamily: 'ရုက္ခဗေဒမျိုးရင်း',
    dosage: 'သင့်တော်သော ပမာဏနှင့် အကြိမ်ရေ',
    duration: 'ကြာချိန်',
    instructions: 'ပြင်ဆင်ပုံ အဆင့်ဆင့်',
    close: 'ပိတ်ရန်',
    backToHerbs: 'အပင်များစာရင်းသို့ ပြန်သွားရန်',
    noResultsTitle: 'ရှာဖွေမှုနှင့် ကိုက်ညီသော ဆေးဖက်ဝင်အပင် မရှိပါ',
    noResultsDesc: 'အခြား စကားလုံး သို့မဟုတ် စစ်ထုတ်မှုများကို ရှင်းလင်းပြီး ထပ်မံရှာဖွေကြည့်ပါ။',
    herbsCount: 'မျိုးစိတ် မှတ်တမ်းတင်ထားသည်',
    quickOverview: 'အကျဉ်းချုပ် အချက်အလက်',
    preparationTab: 'ပြင်ဆင်နည်း',
    safetyTab: 'သတိပြုရန်',
    benefitsTab: 'အကျိုးကျေးဇူး',
    overviewTab: 'အထွေထွေ',
    disclaimer: 'HerbWise သည် ပညာပေး ဗဟုသုတအဖြစ်သာ ရည်ရွယ်ပါသည်။ ရောဂါကုသရန် ဆေးဖက်ဝင်အပင်များ သောက်သုံးခြင်းမပြုမီ ဆရာဝန် သို့မဟုတ် တိုင်းရင်းဆေးပညာရှင်နှင့် တိုင်ပင်ဆွေးနွေးပါ။',
    educationNotice: 'ပညာပေး ဗဟုသုတအဖြစ်သာ ရည်ရွယ်ပါသည်။ ဆေးဘက်ဆိုင်ရာ အကြံပြုချက် မဟုတ်ပါ။ အထူးသဖြင့် ကိုယ်ဝန်ဆောင်၊ နို့တိုက်မိခင် သို့မဟုတ် ဆေးဝါးသောက်သုံးနေသူများ အသုံးမပြုမီ ဆရာဝန်နှင့် တိုင်ပင်ဆွေးနွေးပါ။',
    educationNoticeTitle: 'ပညာပေး ဗဟုသုတဆိုင်ရာ သတိပေးချက်',
    languageLabel: 'English',
    bookmarkedOnly: 'သိမ်းထားသောစာရင်း',
    bookmark: 'မှတ်သားမည်',
    bookmarked: 'မှတ်သားပြီး',
    featuredHerbs: 'ထင်ရှားသော ဆေးဖက်ဝင်အပင်များ',
    exploreCategories: 'ကဏ္ဍအလိုက် ရှာဖွေလေ့လာရန်',
    viewAllHerbs: 'အပင်အားလုံး ကြည့်ရှုရန်',
    noFavoritesTitle: 'သိမ်းဆည်းထားသော အပင်မရှိသေးပါ',
    noFavoritesDesc: 'အပင်ကတ်ပြားပေါ်ရှိ မှတ်သားရန် အိုင်ကွန်ကို နှိပ်၍ ဤနေရာတွင် သိမ်းဆည်းထားနိုင်ပါသည်။',
    browseHerbsBtn: 'ဆေးဖက်ဝင်အပင်များ ကြည့်ရှုမည်',
    aboutTitle: 'HerbWise အကြောင်း',
    aboutSubtitle: 'သဘာဝဆေးဖက်ဝင်အပင်များကို အလွယ်တကူ လေ့လာနိုင်သော မိုဘိုင်းလက်စွဲအဘိဓာန်',
    missionTitle: 'ကျွန်ုပ်တို့၏ ရည်ရွယ်ချက်',
    missionDesc: 'HerbWise သည် ရိုးရာတိုင်းရင်းဆေးပညာနှင့် ခေတ်မီရုက္ခဗေဒဗဟုသုတများကို ပေါင်းစပ်ပေးထားပါသည်။ သဘာဝအပင်များ၏ အကျိုးကျေးဇူး၊ ဖျော်စပ်ပြင်ဆင်နည်းများနှင့် အရေးကြီးသော သတိပြုရန်အချက်များကို တိကျစွာ ဖော်ပြပေးပါသည်။',
    bilingualNoticeTitle: 'ဘာသာစကား ၂ မျိုးဖြင့် ဖော်ပြမှု (အင်္ဂလိပ်နှင့် မြန်မာ)',
    bilingualNoticeDesc: 'အပင်အချက်အလက်၊ ပြင်ဆင်နည်းနှင့် ဘေးထွက်ဆိုးကျိုး သတိပေးချက်အားလုံးကို အင်္ဂလိပ်နှင့် မြန်မာယူနီကုဒ်ဘာသာဖြင့် ပြည့်စုံစွာ လေ့လာဖတ်ရှုနိုင်ပါသည်။',
    safetyNoticeTitle: 'ကျန်းမာရေးနှင့် ဘေးကင်းလုံခြုံမှု',
    safetyNoticeDesc: 'ဆေးဖက်ဝင်အပင်များသည် ဇီဝဓာတုအာနိသင် ပြင်းထန်နိုင်သဖြင့် ကိုယ်ဝန်ဆောင်၊ ဓာတ်မတည့်သူများနှင့် ဆေးဝါးသောက်သုံးနေသူများအတွက် သတိပြုရန်အချက်များကို အထူးဂရုပြုဖော်ပြထားပါသည်။',
    partsUsedLabel: 'အသုံးပြုသော အစိတ်အပိုင်း',
    relatedHerbsLabel: 'ဆက်စပ် ဆေးဖက်ဝင်အပင်များ',
    herbOfTheDay: 'ယနေ့အတွက် အထူးဆေးဖက်ဝင်အပင်',
    herbOfTheDayDesc: 'နေ့စဉ်ကျန်းမာရေးအတွက် ရွေးချယ်ဖော်ပြထားသော ထူးခြားသည့် ဆေးဖက်ဝင်အပင်',
    popularHerbs: 'လူကြိုက်များသော ဆေးဖက်ဝင်အပင်များ',
    filterByBenefit: 'ကျန်းမာရေး အကျိုးကျေးဇူး',
    filterByMethod: 'အသုံးပြုနည်း ပုံစံ',
    allBenefits: 'အကျိုးကျေးဇူး အားလုံး',
    allMethods: 'နည်းလမ်း အားလုံး',
    activeFilters: 'ရွေးချယ်ထားသော စစ်ထုတ်မှုများ',
    resetFilters: 'စစ်ထုတ်မှု အားလုံးရှင်းမည်',
    shareBtn: 'မျှဝေမည်',
    favoriteBtn: 'အနှစ်သက်ဆုံး',
    favoritedBtn: 'သိမ်းဆည်းပြီး',
    linkCopied: 'လင့်ခ်ကို ကူးယူပြီးပါပြီ!',
    expandAll: 'အားလုံးဖွင့်မည်',
    collapseAll: 'အားလုံးပိတ်မည်',
    sectionOverview: 'အထွေထွေ အချက်အလက်',
    sectionWhyUseIt: 'ဘာကြောင့် သုံးသင့်သလဲ (အကျိုးကျေးဇူးများ)',
    sectionHowToUse: 'အသုံးပြုနည်း ပုံစံများ',
    sectionHowToApply: 'လိမ်းကျံ/သုံးစွဲနည်း အဆင့်ဆင့်',
    sectionDosage: 'သင့်တော်သော ပမာဏနှင့် အကြိမ်ရေ',
    whyUsedInCooking: 'ဟင်းချက်ရာတွင် သုံးစွဲရသည့် အကြောင်းရင်း',
    dishesGoesIn: 'ထည့်သွင်းချက်ပြုတ်သော ဟင်းလျာများ',
    regionalPrep: 'အာရှဒေသအလိုက် ပြင်ဆင်ချက်ပြုတ်ပုံများ',
    culinaryTab: 'ဟင်းချက်နည်း လမ်းညွှန်',
    sectionCulinary: 'ဟင်းချက်ရာတွင် သုံးစွဲပုံနှင့် ဟင်းလျာများ',
    sectionRegionalPrep: 'အာရှဒေသအလိုက် ပြင်ဆင်ချက်ပြုတ်ပုံ',
    sectionWarnings: 'သတိပြုရန်နှင့် ဘေးထွက်ဆိုးကျိုး',
    sectionRelated: 'ဆက်စပ် ဆေးဖက်ဝင်အပင်များ',
    pwaInstallBtn: 'အက်ပ် သွင်းယူမည်',
    pwaInstallIos: 'iOS တွင် သွင်းယူမည်',
    pwaInstalled: 'အက်ပ် ထည့်သွင်းပြီးပါပြီ',
    pwaInstallDesc: 'အင်တာနက်မလိုဘဲ အချိန်မရွေး ဖတ်ရှုနိုင်ရန် HerbWise အက်ပ်ကို သင့်ဖုန်းတွင် တင်ထားပါ။',
    offlineStatus: 'အော့ဖ်လိုင်းစနစ် အသုံးပြုနေပါသည်',
    offlineReadyDesc: 'ဆေးဖက်ဝင်အပင် ၂၀ မျိုးလုံး၏ အချက်အလက်များ၊ အသုံးပြုပုံနှင့် သတိပေးချက်များကို အင်တာနက်မရှိဘဲ ဆက်လက်ဖတ်ရှုနိုင်ပါသည်။',
    iosShareInstruction: 'Safari ရှိ "Share" ခလုတ်ကို နှိပ်ပြီး "Add to Home Screen" ကို ရွေးချယ်ပါ။',
  },
};

