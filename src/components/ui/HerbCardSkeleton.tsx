import React from 'react';

export const HerbCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-charcoal-100 shadow-soft-xs overflow-hidden flex flex-col animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-4/3 w-full bg-charcoal-100/70" />

      {/* Card Content Skeleton */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Metadata pill skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-3 w-16 bg-charcoal-100 rounded-md" />
            <div className="h-3 w-3 rounded-full bg-charcoal-100" />
            <div className="h-3 w-20 bg-charcoal-100 rounded-md" />
          </div>

          {/* Title and Myanmar name skeleton */}
          <div className="flex items-baseline justify-between gap-4">
            <div className="h-5 w-28 bg-charcoal-200/80 rounded-lg" />
            <div className="h-4 w-14 bg-charcoal-100 rounded-lg" />
          </div>

          {/* Scientific name skeleton */}
          <div className="h-3.5 w-36 bg-charcoal-100 rounded-md" />

          {/* Benefit box skeleton */}
          <div className="h-12 w-full bg-sage-50/80 rounded-xl border border-sage-100/60 p-2" />
        </div>

        {/* Footer Skeleton */}
        <div className="pt-2 border-t border-charcoal-100/60 flex items-center justify-between">
          <div className="h-3 w-24 bg-charcoal-100 rounded-md" />
          <div className="h-4 w-4 rounded-full bg-charcoal-100" />
        </div>
      </div>
    </div>
  );
};
