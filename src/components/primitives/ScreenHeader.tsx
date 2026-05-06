import type { ReactNode } from 'react';

interface ScreenHeaderProps {
  title: string;
  eyebrow?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
}

export function ScreenHeader({ title, eyebrow, leading, trailing }: ScreenHeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '14px 20px 12px',
        background: 'var(--bg)',
        position: 'sticky',
        top: 0,
        zIndex: 5,
      }}
    >
      {leading}
      <div style={{ flex: 1, minWidth: 0 }}>
        {eyebrow && <div className="eyebrow" style={{ fontSize: 11 }}>{eyebrow}</div>}
        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 22,
            letterSpacing: '-0.01em',
            color: 'var(--fg-1)',
            lineHeight: 1.1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </h1>
      </div>
      {trailing}
    </div>
  );
}
