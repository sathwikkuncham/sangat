import { useEffect } from 'react';
import { Icon, type IconName } from '@/components/primitives';
import { useTheme } from '@/theme';

export type PartnerSection =
  | 'overview'
  | 'inventory'
  | 'bookings'
  | 'packages'
  | 'reports'
  | 'settings';

interface SidebarItem {
  id: PartnerSection;
  label: string;
  icon: IconName;
}

const items: SidebarItem[] = [
  { id: 'overview', label: 'Overview', icon: 'home' },
  { id: 'inventory', label: 'Off-peak inventory', icon: 'cal' },
  { id: 'bookings', label: 'Bookings', icon: 'users' },
  { id: 'packages', label: 'Packages & menus', icon: 'food' },
  { id: 'reports', label: 'Reports', icon: 'chart' },
  { id: 'settings', label: 'Settings', icon: 'gear' },
];

interface SidebarProps {
  active: PartnerSection;
  onChange: (next: PartnerSection) => void;
  /** When true, render as an off-canvas drawer rather than the persistent rail. */
  asDrawer?: boolean;
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ active, onChange, asDrawer = false, open = false, onClose }: SidebarProps) {
  const { theme, toggle } = useTheme();

  useEffect(() => {
    if (!asDrawer || !open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [asDrawer, open, onClose]);

  const drawerStyles = asDrawer
    ? ({
        position: 'fixed',
        inset: '0 auto 0 0',
        zIndex: 70,
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 240ms cubic-bezier(.2,.7,.2,1)',
        boxShadow: open ? 'var(--shadow-3)' : 'none',
      } as const)
    : ({
        position: 'sticky',
        top: 0,
        height: '100vh',
      } as const);

  const sidebar = (
    <aside
      aria-label="Partner navigation"
      style={{
        width: 240,
        background: 'var(--paper)',
        borderRight: '1px solid var(--border)',
        padding: '20px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        flexShrink: 0,
        ...drawerStyles,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '4px 10px 18px',
          borderBottom: '1px solid var(--ink-200)',
          marginBottom: 12,
        }}
      >
        <img src="/assets/logo/sakhi-mark.svg" width={32} height={32} alt="Sakhi" />
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 20,
              fontWeight: 500,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              color: 'var(--fg-1)',
            }}
          >
            sakhi
          </div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.12em',
              color: 'var(--plum-700)',
            }}
          >
            PARTNER
          </div>
        </div>
        {asDrawer && (
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="sakhi-focus-ring"
            style={{
              width: 32,
              height: 32,
              borderRadius: 999,
              border: '1px solid var(--border)',
              background: 'var(--bg-elev-2)',
              color: 'var(--fg-1)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Icon name="back" size={14} />
          </button>
        )}
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {items.map((i) => {
          const isActive = active === i.id;
          return (
            <button
              key={i.id}
              onClick={() => {
                onChange(i.id);
                if (asDrawer) onClose?.();
              }}
              aria-current={isActive ? 'page' : undefined}
              className="sakhi-focus-ring"
              style={{
                textAlign: 'left',
                padding: '10px 12px',
                fontFamily: 'var(--font-text)',
                fontSize: 14,
                fontWeight: isActive ? 600 : 500,
                background: isActive ? 'var(--rose-50)' : 'transparent',
                color: isActive ? 'var(--rose-700)' : 'var(--fg-2)',
                border: 'none',
                borderRadius: 'var(--r-sm)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Icon name={i.icon} size={16} />
              {i.label}
            </button>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={toggle}
        className="sakhi-focus-ring"
        style={{
          marginTop: 12,
          padding: '8px 12px',
          fontFamily: 'var(--font-text)',
          fontSize: 12,
          fontWeight: 500,
          background: 'transparent',
          color: 'var(--fg-2)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r-sm)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={14} />
        {theme === 'dark' ? 'Light mode' : 'Dark mode'}
      </button>

      <div
        style={{
          marginTop: 'auto',
          padding: 14,
          background: 'var(--bg-elev-2)',
          borderRadius: 'var(--r-md)',
        }}
      >
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: 'var(--rose-100)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--rose-700)',
              fontWeight: 700,
              fontFamily: 'var(--font-display)',
            }}
          >
            ST
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--fg-1)' }}>
              Saffron Trail
            </div>
            <div style={{ fontSize: 11, color: 'var(--fg-2)', marginTop: 1 }}>
              Indiranagar · 64 covers
            </div>
          </div>
        </div>
      </div>
    </aside>
  );

  if (!asDrawer) return sidebar;

  return (
    <>
      <div
        aria-hidden
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--scrim)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 200ms cubic-bezier(.2,.7,.2,1)',
          zIndex: 60,
        }}
      />
      {sidebar}
    </>
  );
}
