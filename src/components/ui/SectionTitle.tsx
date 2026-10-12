import React from 'react';

export interface SectionTitleProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  kicker?: React.ReactNode;
  action?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  kicker,
  action,
  align = 'left',
  className = '',
}) => {
  const alignClasses = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-3 ${className}`}>
      <div className={`flex flex-col ${alignClasses} space-y-1`}>
        {kicker && (
          <div className="text-xs font-semibold uppercase tracking-wider text-sage-600 mb-0.5">
            {kicker}
          </div>
        )}
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-charcoal-900 leading-snug">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-charcoal-500 leading-relaxed max-w-xl">
            {subtitle}
          </p>
        )}
      </div>

      {action && <div className="shrink-0 pt-1 sm:pt-0">{action}</div>}
    </div>
  );
};
