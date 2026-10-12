# HerbWise — Herb Discovery & Learning Web App

HerbWise is a mobile-first, bilingual (English and Myanmar Unicode) educational web app designed to help users discover, search, and learn about herbs — their botanical identity, natural habitats, health benefits, applications, preparation techniques, and safety warnings.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and UX choices have been aligned based on your preferences:

- **Confirmed Dataset Focus**: Popular global culinary and wellness herbs (such as Ginger, Peppermint, Turmeric, Chamomile, Holy Basil/Tulsi, Rosemary, Lemongrass, Echinacea) with authentic botanical, cultural, and preparation details.
- **Confirmed Browsing Experience**: Instant bilingual search bar paired with interactive category filters (e.g. Digestive, Immunity, Calming, Culinary, Skin) and benefit badges.
- **Confirmed Detail View Pattern**: Structured collapsible sections with quick-jump sticky tab bars for seamless one-handed mobile reading.
- **Bilingual System**: English and Myanmar (Burmese Unicode `မြန်မာစာ`) toggle switch with instant reactive string switching and font fallbacks (`Padauk`, `Noto Sans Myanmar`, sans-serif).
- **Step-by-Step Delivery Mode**: Work in isolated, testable milestones. After each step, instructions to test and verify will be provided, waiting for your `"next"` command before continuing.

---

## 1. Overview & Core Concept

- **What It Does**: Provides an intuitive mobile pocket guide to herbs. Users can browse card grids, search by common names or benefits, inspect high-resolution photography, read detailed preparation steps (teas, infusions, poultices, tinctures), and review critical dosage & contraindication warnings.
- **Target Audience**: Wellness enthusiasts, home herbalists, culinary experimenters, and bilingual English/Myanmar speakers seeking practical, reliable plant knowledge.
- **Key Value**: A fast, distraction-free reference guide with dual-language clarity and zero clutter.

---

## 2. User Experience & Visual Design

### Visual Identity & Theme
- **Aesthetic Direction**: Botanical editorial minimalism. Clean, soothing, airy, with ample white space and tactile mobile cards.
- **Color Palette**:
  - *Dominant Canvas (60%)*: Crisp warm white `#FAFAF9` (`stone-50`) and soft off-white cards `#FFFFFF`.
  - *Structural Surfaces (30%)*: Sage green subtle tints `#F0FDF4` (`emerald-50/green-50`), soft forest borders `#E2E8F0` / `#DCFCE7`, and dark slate typography `#0F172A`.
  - *Accent Budget (10%)*: Deep botanical herbal green `#15803D` (`green-700` / `emerald-700`) for primary active tabs, search highlights, and CTAs; soft amber `#D97706` for cautions and warnings.
- **Typography & Font Pairing**:
  - Display & Headings: `Plus Jakarta Sans` / `Outfit` with crisp tracking.
  - Body: Modern readable sans paired with `Noto Sans Myanmar` / `Padauk` for clear Burmese typography at standard 15–16px sizing.
  - Tabular & Measurements: `tabular-nums` for preparation times and dosage ratios.
- **Zero-Pill Restraint**: Static metadata (habitat, harvest season, botanical family) renders as clean unboxed text with `·` bullet separators. Interactive filters use segmented toggle buttons with subtle tactile states.

### Mobile Ergonomics & Navigation
- **Top Bar Contract**: Minimalist header ($54\text{px}$) with the HerbWise brand wordmark, quick language switcher (`EN | မြန်မာ`), and saved favorites counter.
- **Thumb Zone Design**: Search and category tabs positioned within easy reach; bottom-anchored modal sheet / full-screen drawer for detailed herb inspection with a quick-jump sticky anchor strip (`Overview`, `Benefits`, `Preparation`, `Safety`).

---

## 3. Key Product Decisions & Trade-Offs

- **Client-Side JSON Storage vs. Backend API**:
  - *Decision*: Store data in modular local JSON files inside `src/data/herbs.json` and `src/data/translations.json`.
  - *Rationale*: Zero latency, full offline compatibility, immediate prototyping speed, and no backend maintenance. Schema supports easy future migration to Cloud SQL or Firestore.
- **Bilingual Structure (Inline vs Key-Value)**:
  - *Decision*: Herb records contain dual-language nested objects for every text field (`{ en: "...", my: "..." }`), while UI chrome labels use a central dictionary.
  - *Rationale*: Guarantees synchronized content between languages without mismatched herb IDs or partial translations.
- **Collapsible Section Details**:
  - *Decision*: Group in-depth details into accordion-style panels with "Expand All / Collapse All" and quick category jump.
  - *Rationale*: Prevents endless scrolling on small mobile screens while keeping high-priority safety warnings prominent.

---

## 4. Technical Architecture & Data Strategy

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                       HerbWise Web App                      │
└──────────────────────────────┬──────────────────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
   ┌─────────────────┐                   ┌─────────────────┐
   │ LanguageContext │                   │ Favorites Store │
   │ (EN / Myanmar)  │                   │ (Local Storage) │
   └────────┬────────┘                   └────────┬────────┘
            │                                     │
            └──────────────────┬──────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
┌───────────────────────┐             ┌───────────────────────┐
│     HerbListView      │             │    HerbDetailModal    │
│  - Hero / Search Bar  │ ──(Select)─▶│  - Botanical Photo    │
│  - Category Filter    │             │  - Sticky Nav Tabs    │
│  - Herb Card Grid     │             │  - Prep & Dosage Guide│
│  - Benefit Tags       │             │  - Safety & Warnings  │
└───────────────────────┘             └───────────────────────┘
            │                                     │
            └──────────────────┬──────────────────┘
                               ▼
            ┌─────────────────────────────────────┐
            │        Local Data Repository        │
            │   - src/data/herbs.json             │
            │   - src/data/i18n.ts                │
            │   - src/types/herb.ts               │
            └─────────────────────────────────────┘
```

### Proposed Folder Structure

```
herbwise/
├── public/
│   └── images/
│       └── herbs/             # Herb photos (Ginger, Turmeric, Peppermint, etc.)
├── src/
│   ├── components/
│   │   ├── Header.tsx         # Brand logo, language toggle (EN/MY), bookmarks
│   │   ├── SearchFilter.tsx   # Search input, category pills, benefit filter
│   │   ├── HerbCard.tsx       # Herb preview card with photo, name, quick tags
│   │   ├── HerbDetail.tsx     # Full detail view with collapsible sections & tabs
│   │   ├── SafetyBadge.tsx    # Caution/warning visual indicator
│   │   └── PreparationCard.tsx# Step-by-step infusion, decoction, poultice guides
│   ├── context/
│   │   └── LanguageContext.tsx# Bilingual state provider (English <-> Myanmar)
│   ├── data/
│   │   ├── herbs.json         # Complete herb dataset with English and Myanmar content
│   │   └── i18n.ts            # UI interface labels & strings in EN and MY
│   ├── hooks/
│   │   └── useFavorites.ts    # Bookmark/favorite herbs locally
│   ├── types/
│   │   └── herb.ts            # TypeScript interfaces for Herb, PrepMethod, Translation
│   ├── App.tsx                # App root & main layout
│   ├── index.css              # Tailwind CSS styles & typography setup
│   └── main.tsx               # React root entry
├── metadata.json
├── package.json
└── tsconfig.json
```

### Step-by-Step Implementation Roadmap

1. **Step 1 — Foundation & Data Layer**:
   - Establish TypeScript interfaces (`herb.ts`).
   - Create comprehensive bilingual dataset (`herbs.json`) covering 8 core herbs with full English & Myanmar translations (botanical name, habitat, benefits, preparation, applications, safety warnings).
   - Set up `LanguageContext` and `i18n.ts` for instant language switching.
2. **Step 2 — Mobile Header & Herb Card Grid**:
   - Build clean mobile header with wordmark and seamless `EN | မြန်မာ` toggle.
   - Implement responsive `HerbCard` with high-resolution imagery, subtle elevation, and quick benefit indicators.
   - Implement `SearchFilter` with real-time text query and category selectors.
3. **Step 3 — Interactive Herb Detail View**:
   - Build the structured modal/drawer with hero photo and botanical header.
   - Add sticky quick-jump tabs: Overview, Benefits, Preparation Methods, and Safety Warnings.
   - Add interactive preparation recipe cards and distinct caution alerts.
4. **Step 4 — Polish, Favorites & Offline Resilience**:
   - Add local favorites/bookmarking feature.
   - Refine transitions, mobile touch states, and verify all Myanmar Unicode rendering.
