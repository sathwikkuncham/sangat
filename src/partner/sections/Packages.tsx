import { Btn, Pill } from '@/components/primitives';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { packageItems } from '../data';

export function Packages() {
  const isMobile = useIsMobile();
  return (
    <div style={{ padding: isMobile ? '20px 16px 32px' : 32 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'flex-end',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div>
          <div className="eyebrow">MENUS</div>
          <h1 style={{ margin: '4px 0 0' }}>Packages</h1>
          <p className="p-small" style={{ marginTop: 6, maxWidth: 560 }}>
            What you offer to groups. Price holds for the off-peak window unless overridden.
          </p>
        </div>
        <Btn>Add package</Btn>
      </div>

      <div
        style={{
          marginTop: 20,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 16,
        }}
      >
        {packageItems.map((p) => (
          <div
            key={p.name}
            style={{
              background: 'var(--paper)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-md)',
              padding: 20,
              opacity: p.active ? 1 : 0.6,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 16, color: 'var(--fg-1)' }}>{p.name}</div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    fontSize: 28,
                    letterSpacing: '-0.01em',
                    color: 'var(--rose-700)',
                    marginTop: 2,
                  }}
                >
                  {p.price}
                </div>
              </div>
              <Pill tone={p.active ? 'success' : 'neutral'} withDot>
                {p.active ? 'live' : 'draft'}
              </Pill>
            </div>
            <p className="p-small" style={{ marginTop: 8 }}>
              {p.desc}
            </p>
            <div
              style={{
                marginTop: 14,
                paddingTop: 14,
                borderTop: '1px solid var(--ink-200)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: 12, color: 'var(--fg-2)' }}>
                <strong style={{ color: 'var(--fg-1)' }}>{p.uses}</strong> bookings · 30d
              </span>
              <Btn size="sm" variant="ghost">
                Edit
              </Btn>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
