import { AvatarStack, Card, Icon, IconBtn, Pill } from '@/components/primitives';
import { kittyGroups, type KittyGroup } from '../data';

interface HomeScreenProps {
  onOpen: (group: KittyGroup) => void;
  onNew: () => void;
}

export function HomeScreen({ onOpen, onNew }: HomeScreenProps) {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100%', paddingBottom: 140 }}>
      <div
        style={{
          padding: '14px 20px 6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div className="eyebrow" style={{ fontSize: 11, color: 'var(--plum-700)' }}>
            NAMASTE, RIYA
          </div>
          <h1
            style={{
              margin: '2px 0 0',
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 28,
              letterSpacing: '-0.018em',
              color: 'var(--fg-1)',
            }}
          >
            Your kitties
          </h1>
        </div>
        <IconBtn icon="bell" label="Notifications" />
      </div>

      <div style={{ padding: '12px 20px 4px' }}>
        <div
          style={{
            background: 'var(--rose-600)',
            color: 'var(--on-primary)',
            borderRadius: 'var(--r-md)',
            padding: '16px 18px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: -20,
              right: -20,
              width: 140,
              height: 140,
              opacity: 0.18,
              backgroundImage: 'url(/assets/patterns/jaali.svg)',
              backgroundSize: 'cover',
            }}
          />
          <div className="eyebrow" style={{ fontSize: 10, color: 'var(--on-primary)', opacity: 0.85 }}>
            THIS MONTH
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginTop: 4 }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 32,
                letterSpacing: '-0.02em',
                fontFeatureSettings: '"tnum"',
              }}
            >
              ₹52,000
            </div>
            <div style={{ fontSize: 12, opacity: 0.85 }}>contributed across 3 groups</div>
          </div>
          <div
            style={{
              display: 'flex',
              gap: 6,
              marginTop: 12,
              alignItems: 'center',
              fontSize: 11,
              opacity: 0.92,
            }}
          >
            <span>Next draw</span>
            <span style={{ fontWeight: 600 }}>Sat, 14 Mar</span>
            <span
              aria-hidden
              style={{
                width: 3,
                height: 3,
                borderRadius: 999,
                background: 'currentColor',
                opacity: 0.5,
                margin: '0 4px',
              }}
            />
            <span>1 vote pending</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '14px 20px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {kittyGroups.map((g) => (
          <Card key={g.id} onClick={() => onOpen(g)} style={{ padding: 18 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 12,
              }}
            >
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-display)',
                    fontSize: 19,
                    fontWeight: 500,
                    letterSpacing: '-0.01em',
                    color: 'var(--fg-1)',
                  }}
                >
                  {g.name}
                </h3>
                <div
                  style={{
                    marginTop: 2,
                    fontSize: 12,
                    color: 'var(--fg-2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <Icon name="pin" size={12} /> {g.city} · {g.members} members
                </div>
              </div>
              <Pill tone={g.tone}>{g.status}</Pill>
            </div>
            <div
              style={{
                marginTop: 14,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    fontSize: 26,
                    letterSpacing: '-0.01em',
                    fontFeatureSettings: '"tnum"',
                    color: 'var(--fg-1)',
                  }}
                >
                  {g.due}
                </div>
                <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 2 }}>{g.when}</div>
              </div>
              <AvatarStack people={g.membersArr} size={28} />
            </div>
          </Card>
        ))}
        <button
          onClick={onNew}
          className="sangat-focus-ring"
          style={{
            padding: 18,
            border: '1.5px dashed var(--border)',
            borderRadius: 'var(--r-md)',
            background: 'transparent',
            color: 'var(--rose-700)',
            fontFamily: 'var(--font-text)',
            fontWeight: 600,
            fontSize: 14,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <Icon name="plus" size={18} color="var(--rose-600)" /> Start a new kitty
        </button>
      </div>
    </div>
  );
}
