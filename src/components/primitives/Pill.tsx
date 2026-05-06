import type { ReactNode } from 'react';

export type PillTone =
  | 'rose'
  | 'plum'
  | 'success'
  | 'warning'
  | 'danger'
  | 'neutral'
  // legacy aliases kept for content authored against the original token names
  | 'saffron'
  | 'henna'
  | 'peacock';

const tones: Record<PillTone, { bg: string; fg: string; dot: string }> = {
  rose: { bg: 'var(--rose-100)', fg: 'var(--rose-700)', dot: 'var(--rose-600)' },
  plum: { bg: 'var(--plum-50)', fg: 'var(--plum-700)', dot: 'var(--plum-500)' },
  saffron: { bg: 'var(--saffron-100)', fg: 'var(--saffron-700)', dot: 'var(--saffron-600)' },
  henna: { bg: 'var(--henna-50)', fg: 'var(--henna-700)', dot: 'var(--henna-500)' },
  peacock: { bg: 'var(--peacock-50)', fg: 'var(--peacock-700)', dot: 'var(--peacock-500)' },
  success: { bg: 'var(--success-50)', fg: 'var(--success-700)', dot: 'var(--success-600)' },
  warning: { bg: 'var(--warning-50)', fg: 'var(--warning-700)', dot: 'var(--warning-600)' },
  danger: { bg: 'var(--danger-50)', fg: 'var(--danger-700)', dot: 'var(--danger-600)' },
  neutral: { bg: 'var(--ink-100)', fg: 'var(--ink-700)', dot: 'var(--ink-500)' },
};

interface PillProps {
  children: ReactNode;
  tone?: PillTone;
  /** Render a leading status dot. Useful when pills sit in scannable lists. */
  withDot?: boolean;
}

export function Pill({ children, tone = 'neutral', withDot = false }: PillProps) {
  const { bg, fg, dot } = tones[tone];
  return (
    <span
      style={{
        // Self-contained sizing — never inherit cross-axis stretch from a flex parent.
        display: 'inline-flex',
        alignItems: 'center',
        alignSelf: 'center',
        flexShrink: 0,
        gap: 6,
        fontFamily: 'var(--font-text)',
        fontWeight: 600,
        fontSize: 11,
        lineHeight: 1.2,
        height: 22,
        padding: '0 10px',
        borderRadius: 999,
        background: bg,
        color: fg,
        whiteSpace: 'nowrap',
        letterSpacing: '0.01em',
      }}
    >
      {withDot && (
        <span
          aria-hidden
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            background: dot,
            display: 'inline-block',
            flexShrink: 0,
          }}
        />
      )}
      {children}
    </span>
  );
}
