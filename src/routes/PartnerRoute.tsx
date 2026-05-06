import { Link } from 'react-router-dom';
import { PartnerApp } from '@/partner/PartnerApp';
import { Icon } from '@/components/primitives';
import { useIsCompactPartner } from '@/hooks/useMediaQuery';

export function PartnerRoute() {
  const compact = useIsCompactPartner();

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg)' }}>
      <Link
        to="/"
        aria-label="Back to surface picker"
        className="sangat-link-reset sangat-focus-ring"
        style={{
          position: 'fixed',
          // On compact viewports the partner mobile top bar lives at the top,
          // so park the surface-picker pill in the corner that's free.
          top: compact ? 'auto' : 14,
          bottom: compact ? 'calc(env(safe-area-inset-bottom, 0px) + 14px)' : 'auto',
          right: 14,
          zIndex: 50,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 12,
          fontWeight: 600,
          color: 'var(--fg-2)',
          padding: '8px 14px',
          borderRadius: 999,
          background: 'var(--paper)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-2)',
        }}
      >
        <Icon name="back" size={12} />
        Surfaces
      </Link>
      <PartnerApp />
    </div>
  );
}
