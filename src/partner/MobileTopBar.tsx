import { Icon } from '@/components/primitives';

interface MobileTopBarProps {
  onOpenMenu: () => void;
  sectionLabel: string;
}

export function MobileTopBar({ onOpenMenu, sectionLabel }: MobileTopBarProps) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 16px',
        background: 'var(--paper)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Open navigation menu"
        className="sangat-focus-ring"
        style={{
          width: 36,
          height: 36,
          borderRadius: 999,
          border: '1px solid var(--border)',
          background: 'var(--bg)',
          color: 'var(--fg-1)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <HamburgerIcon />
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
        <img src="/assets/logo/sangat-mark.svg" width={28} height={28} alt="" />
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 16,
              fontWeight: 500,
              lineHeight: 1,
              color: 'var(--fg-1)',
            }}
          >
            sangat · partner
          </span>
          <span
            style={{
              fontSize: 11,
              color: 'var(--fg-2)',
              marginTop: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {sectionLabel}
          </span>
        </div>
      </div>
      <Icon name="bell" size={18} color="var(--fg-2)" />
    </header>
  );
}

function HamburgerIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round">
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}
