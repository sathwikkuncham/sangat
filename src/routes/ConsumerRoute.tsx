import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { MobileApp } from '@/consumer/MobileApp';
import { Icon } from '@/components/primitives';
import { useTheme } from '@/theme';
import { usePwaInstall } from '@/pwa';
import { breakpoints, useIsDesktop, useIsMobile } from '@/hooks/useMediaQuery';

const PHONE_WIDTH = 390;
const PHONE_HEIGHT = 844;
const FULLSCREEN_MAX_WIDTH = 520;

type Layout = 'framed' | 'fullscreen';

export function ConsumerRoute() {
  const { theme, toggle } = useTheme();
  const { canInstall, promptInstall } = usePwaInstall();
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();
  const [layout, setLayout] = useState<Layout>('framed');

  // On true mobile we always render full-bleed — no toggle, no chrome.
  if (isMobile) {
    return (
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: 'var(--bg)' }}>
        <MobileApp />
      </div>
    );
  }

  return (
    <div className="sakhi-stage" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ConsumerHeader
        canInstall={canInstall}
        onInstall={promptInstall}
        theme={theme}
        onToggleTheme={toggle}
        layout={layout}
        onLayoutChange={setLayout}
      />

      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns:
            isDesktop && layout === 'framed' ? `minmax(0, 1fr) ${PHONE_WIDTH + 60}px minmax(0, 1fr)` : '1fr',
          alignItems: 'center',
          justifyItems: 'center',
          padding: 'clamp(16px, 4vw, 48px)',
          gap: 32,
        }}
      >
        {isDesktop && layout === 'framed' && <SidePanel slot="left" />}

        {layout === 'framed' ? (
          <PhoneFrame>
            <MobileApp />
          </PhoneFrame>
        ) : (
          <FullscreenStage>
            <MobileApp />
          </FullscreenStage>
        )}

        {isDesktop && layout === 'framed' && <SidePanel slot="right" />}
      </div>
    </div>
  );
}

interface ConsumerHeaderProps {
  canInstall: boolean;
  onInstall: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  layout: Layout;
  onLayoutChange: (next: Layout) => void;
}

function ConsumerHeader({
  canInstall,
  onInstall,
  theme,
  onToggleTheme,
  layout,
  onLayoutChange,
}: ConsumerHeaderProps) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px clamp(16px, 4vw, 48px)',
        gap: 12,
        flexWrap: 'wrap',
      }}
    >
      <Link
        to="/"
        className="sakhi-link-reset sakhi-focus-ring"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 13,
          color: 'var(--fg-2)',
          padding: '6px 10px',
          borderRadius: 999,
          border: '1px solid var(--border)',
          background: 'var(--paper)',
        }}
      >
        <Icon name="back" size={14} />
        Surfaces
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <LayoutSwitcher value={layout} onChange={onLayoutChange} />
        {canInstall && (
          <button
            type="button"
            onClick={onInstall}
            className="sakhi-focus-ring"
            style={{
              padding: '6px 14px',
              fontSize: 12,
              fontWeight: 600,
              background: 'var(--rose-600)',
              color: 'var(--on-primary)',
              border: 'none',
              borderRadius: 999,
              cursor: 'pointer',
            }}
          >
            Install Sakhi
          </button>
        )}
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          className="sakhi-focus-ring"
          style={{
            width: 36,
            height: 36,
            borderRadius: 999,
            border: '1px solid var(--border)',
            background: 'var(--paper)',
            color: 'var(--fg-1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={16} />
        </button>
      </div>
    </header>
  );
}

function LayoutSwitcher({ value, onChange }: { value: Layout; onChange: (next: Layout) => void }) {
  const options: Array<{ id: Layout; label: string }> = [
    { id: 'framed', label: 'Phone' },
    { id: 'fullscreen', label: 'Fullscreen' },
  ];
  return (
    <div
      role="radiogroup"
      aria-label="Layout preview mode"
      style={{
        display: 'inline-flex',
        padding: 3,
        background: 'var(--bg-elev-2)',
        borderRadius: 999,
        border: '1px solid var(--border)',
      }}
    >
      {options.map((o) => {
        const active = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.id)}
            className="sakhi-focus-ring"
            style={{
              padding: '5px 12px',
              fontSize: 12,
              fontWeight: 600,
              borderRadius: 999,
              border: 'none',
              background: active ? 'var(--paper)' : 'transparent',
              color: active ? 'var(--fg-1)' : 'var(--fg-2)',
              cursor: 'pointer',
              boxShadow: active ? 'var(--shadow-1)' : 'none',
              transition: 'all 180ms cubic-bezier(.2,.7,.2,1)',
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div
      role="presentation"
      style={{
        width: PHONE_WIDTH,
        height: PHONE_HEIGHT,
        maxWidth: '100%',
        maxHeight: 'calc(100vh - 140px)',
        position: 'relative',
        background: 'var(--ink-900)',
        borderRadius: 56,
        padding: 12,
        boxShadow:
          '0 40px 80px -20px rgba(28, 26, 23, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.06) inset',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          background: 'var(--bg)',
          borderRadius: 44,
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 110,
            height: 28,
            background: '#000',
            borderRadius: 999,
            zIndex: 20,
          }}
        />
        {children}
      </div>
    </div>
  );
}

function FullscreenStage({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: FULLSCREEN_MAX_WIDTH,
        height: 'min(calc(100vh - 120px), 920px)',
        position: 'relative',
        background: 'var(--bg)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-2)',
      }}
    >
      {children}
    </div>
  );
}

function SidePanel({ slot }: { slot: 'left' | 'right' }) {
  if (slot === 'left') return <BrandPanel />;
  return <FeaturePanel />;
}

function BrandPanel() {
  return (
    <aside
      aria-label="About Sakhi"
      style={{
        maxWidth: 360,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        textAlign: 'left',
        alignSelf: 'center',
      }}
    >
      <div className="eyebrow" style={{ color: 'var(--plum-700)' }}>
        SAKHI · CONSUMER · PWA
      </div>
      <h2
        style={{
          margin: 0,
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 'clamp(1.75rem, 2.4vw, 2.5rem)',
          letterSpacing: '-0.02em',
          lineHeight: 1.05,
          color: 'var(--fg-1)',
        }}
      >
        Run a kitty in escrow.
        <br />
        Vote the venue with ranked-choice.
        <br />
        Settle when the bill arrives.
      </h2>
      <p className="p-small" style={{ marginTop: 0 }}>
        The consumer surface is built mobile-first as a Progressive Web App. Drop it on a phone
        home screen, scan the install QR, or interact with it right here in the preview.
      </p>
      <ul
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <Bullet>Bottom-tab navigation: Groups · Parties · Wallet · You</Bullet>
        <Bullet>FAB launches the 3-step new-kitty wizard</Bullet>
        <Bullet>Light + dark themes via the rose &amp; plum tokens</Bullet>
      </ul>
    </aside>
  );
}

function FeaturePanel() {
  const flow: Array<{ title: string; sub: string }> = [
    { title: 'Tuesday Lunch Club', sub: 'Open the kitty card, then "Vote on venue".' },
    { title: 'Rank your picks', sub: 'Reorder restaurants — ranked-choice settles the tie.' },
    { title: 'Saffron Trail wins', sub: 'Confirm to lock the off-peak slot.' },
    { title: 'Settle up', sub: 'Bill splits cleanly with auto-nudge for stragglers.' },
  ];
  return (
    <aside
      aria-label="Try this flow"
      style={{
        maxWidth: 320,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        alignSelf: 'center',
        padding: 20,
        background: 'var(--paper)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)',
        boxShadow: 'var(--shadow-1)',
      }}
    >
      <div className="eyebrow">TRY THIS FLOW</div>
      <ol style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {flow.map((step, i) => (
          <li key={step.title} style={{ display: 'flex', gap: 10 }}>
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: 999,
                background: 'var(--rose-50)',
                color: 'var(--rose-700)',
                fontSize: 11,
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {i + 1}
            </span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--fg-1)' }}>{step.title}</div>
              <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 2 }}>{step.sub}</div>
            </div>
          </li>
        ))}
      </ol>
      <div
        style={{
          marginTop: 8,
          paddingTop: 12,
          borderTop: '1px solid var(--ink-200)',
          fontSize: 11,
          color: 'var(--fg-3)',
        }}
      >
        Below {breakpoints.mobile}px the side panels disappear and the app fills the viewport.
      </div>
    </aside>
  );
}

function Bullet({ children }: { children: ReactNode }) {
  return (
    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
      <span
        aria-hidden
        style={{
          width: 18,
          height: 18,
          borderRadius: 999,
          background: 'var(--rose-50)',
          color: 'var(--rose-700)',
          flexShrink: 0,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 2,
        }}
      >
        <Icon name="check" size={10} strokeWidth={2.5} />
      </span>
      <span style={{ fontSize: 13, color: 'var(--fg-1)', lineHeight: 1.5 }}>{children}</span>
    </li>
  );
}
