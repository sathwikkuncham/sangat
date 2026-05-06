import { Link } from 'react-router-dom';
import { Btn, Icon } from '@/components/primitives';
import { useTheme } from '@/theme';

export function Landing() {
  const { theme, toggle } = useTheme();
  return (
    <div className="sakhi-stage" style={{ minHeight: '100vh', padding: '24px clamp(20px, 6vw, 64px)' }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/assets/logo/sakhi-mark.svg" width={36} height={36} alt="" />
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 24,
              fontWeight: 500,
              letterSpacing: '-0.02em',
              color: 'var(--fg-1)',
              lineHeight: 1,
            }}
          >
            sakhi
          </div>
        </div>
        <button
          type="button"
          onClick={toggle}
          aria-label="Toggle theme"
          className="sakhi-focus-ring"
          style={{
            width: 40,
            height: 40,
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
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
        </button>
      </header>

      <main
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          paddingTop: 'clamp(48px, 8vw, 96px)',
        }}
      >
        <div className="eyebrow" style={{ color: 'var(--plum-700)' }}>
          KITTY GROUPS · OFF-PEAK PARTIES
        </div>
        <h1
          style={{
            margin: '12px 0 0',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(2.25rem, 5vw, 4rem)',
            lineHeight: 1.04,
            letterSpacing: '-0.02em',
            color: 'var(--fg-1)',
            maxWidth: 14 + 'ch',
          }}
        >
          A monthly
          <em style={{ fontStyle: 'italic', color: 'var(--rose-700)' }}> sangat</em> for the women
          who keep the calendar.
        </h1>
        <p
          className="p-lead"
          style={{ marginTop: 16, maxWidth: 580, color: 'var(--fg-2)' }}
        >
          Sakhi runs your kitty in escrow, votes the venue with ranked-choice, and books the
          off-peak slot at the city's best restaurants — split cleanly when the bill arrives.
        </p>

        <div
          style={{
            marginTop: 36,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
            maxWidth: 880,
          }}
        >
          <SurfaceCard
            to="/app"
            badge="MOBILE · PWA"
            title="Open the consumer app"
            sub="Groups · vote · settle · wallet"
            primary
          />
          <SurfaceCard
            to="/partner"
            badge="DESKTOP"
            title="Sakhi Partner dashboard"
            sub="Off-peak yield · bookings · reports"
          />
        </div>
      </main>

      <footer
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          paddingTop: 64,
          paddingBottom: 24,
          color: 'var(--fg-3)',
          fontSize: 12,
        }}
      >
        Designed in HTML/CSS/JS · ported to React + Vite + TypeScript · ready as a PWA.
      </footer>
    </div>
  );
}

interface SurfaceCardProps {
  to: string;
  badge: string;
  title: string;
  sub: string;
  primary?: boolean;
}

function SurfaceCard({ to, badge, title, sub, primary }: SurfaceCardProps) {
  return (
    <Link
      to={to}
      className="sakhi-link-reset sakhi-focus-ring"
      style={{
        display: 'block',
        background: primary ? 'var(--rose-600)' : 'var(--paper)',
        color: primary ? 'var(--on-primary)' : 'var(--fg-1)',
        border: primary ? '1px solid transparent' : '1px solid var(--border)',
        borderRadius: 'var(--r-lg)',
        padding: 24,
        boxShadow: primary ? 'var(--shadow-3)' : 'var(--shadow-1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {primary && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: -30,
            right: -30,
            width: 180,
            height: 180,
            opacity: 0.15,
            backgroundImage: 'url(/assets/patterns/jaali.svg)',
            backgroundSize: 'cover',
          }}
        />
      )}
      <div style={{ position: 'relative' }}>
        <div
          className="eyebrow"
          style={{
            color: primary ? 'rgba(255,255,255,0.85)' : 'var(--plum-700)',
            fontSize: 11,
          }}
        >
          {badge}
        </div>
        <div
          style={{
            marginTop: 8,
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 6,
            fontSize: 13,
            color: primary ? 'rgba(255,255,255,0.85)' : 'var(--fg-2)',
          }}
        >
          {sub}
        </div>
        <div style={{ marginTop: 18 }}>
          <Btn variant={primary ? 'secondary' : 'primary'} size="sm" style={{ pointerEvents: 'none' }}>
            Open →
          </Btn>
        </div>
      </div>
    </Link>
  );
}
