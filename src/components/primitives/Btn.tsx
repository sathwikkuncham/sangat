import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

export type BtnVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type BtnSize = 'sm' | 'md' | 'lg';

interface BtnProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  variant?: BtnVariant;
  size?: BtnSize;
  full?: boolean;
  style?: CSSProperties;
  children: ReactNode;
}

const variants: Record<BtnVariant, CSSProperties> = {
  primary: {
    background: 'var(--rose-600)',
    color: 'var(--on-primary)',
    border: '1px solid transparent',
  },
  secondary: {
    background: 'var(--paper)',
    color: 'var(--fg-1)',
    border: '1px solid var(--border)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--plum-700)',
    border: '1px solid transparent',
  },
  danger: {
    background: 'var(--paper)',
    color: 'var(--danger-700)',
    border: '1px solid var(--danger-600)',
  },
};

const sizes: Record<BtnSize, CSSProperties> = {
  sm: { padding: '6px 14px', fontSize: 13 },
  md: { padding: '11px 20px', fontSize: 14 },
  lg: { padding: '14px 24px', fontSize: 15 },
};

export function Btn({
  variant = 'primary',
  size = 'md',
  full,
  disabled,
  style,
  children,
  ...rest
}: BtnProps) {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={`sakhi-focus-ring${rest.className ? ` ${rest.className}` : ''}`}
      style={{
        fontFamily: 'var(--font-text)',
        fontWeight: 600,
        borderRadius: 'var(--r-pill)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        width: full ? '100%' : 'auto',
        transition: 'all 180ms cubic-bezier(.2,.7,.2,1)',
        ...variants[variant],
        ...sizes[size],
        ...style,
      }}
    >
      {children}
    </button>
  );
}
