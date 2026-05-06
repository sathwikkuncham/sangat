import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';

export type CardVariant = 'default' | 'money' | 'flat';

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const variants: Record<CardVariant, CSSProperties> = {
  default: { background: 'var(--paper)', boxShadow: 'var(--shadow-1)' },
  money: { background: 'var(--cream-100)', boxShadow: 'var(--shadow-2)' },
  flat: { background: 'var(--paper)', boxShadow: 'none' },
};

export function Card({ children, variant = 'default', style, onClick }: CardProps) {
  const interactive = Boolean(onClick);
  return (
    <div
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={
        interactive
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                (event.currentTarget as HTMLDivElement).click();
              }
            }
          : undefined
      }
      className={interactive ? 'sangat-focus-ring' : undefined}
      style={{
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-md)',
        padding: 20,
        cursor: interactive ? 'pointer' : 'default',
        ...variants[variant],
        ...style,
      }}
    >
      {children}
    </div>
  );
}
