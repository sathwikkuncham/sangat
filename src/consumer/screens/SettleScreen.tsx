import { Avatar, Btn, Card, IconBtn, Pill, ScreenHeader } from '@/components/primitives';
import { settleSplits } from '../data';

interface SettleScreenProps {
  onBack: () => void;
}

export function SettleScreen({ onBack }: SettleScreenProps) {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100%', paddingBottom: 140 }}>
      <ScreenHeader
        title="Settle up"
        eyebrow="POST-PARTY"
        leading={<IconBtn icon="back" onClick={onBack} label="Back" />}
      />
      <div style={{ padding: '0 20px' }}>
        <Card variant="money" style={{ padding: 22 }}>
          <div className="eyebrow">FINAL BILL · SAFFRON TRAIL</div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 36,
              letterSpacing: '-0.02em',
              fontFeatureSettings: '"tnum"',
              color: 'var(--rose-700)',
              marginTop: 4,
            }}
          >
            ₹3,240
          </div>
          <div style={{ fontSize: 12, color: 'var(--fg-2)' }}>
            6 covers · ₹540 each (after 40% off)
          </div>
        </Card>
        <h3
          style={{
            marginTop: 24,
            marginBottom: 10,
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--fg-2)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Split equally
        </h3>
        <div
          style={{
            background: 'var(--paper)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-md)',
            overflow: 'hidden',
          }}
        >
          {settleSplits.map((s, i) => (
            <div
              key={s.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 16px',
                borderBottom:
                  i < settleSplits.length - 1 ? '1px solid var(--ink-200)' : 'none',
              }}
            >
              <Avatar initials={s.name.slice(0, 2).toUpperCase()} tone={i + 1} size={32} />
              <div style={{ flex: 1, fontSize: 14, fontWeight: 600, color: 'var(--fg-1)' }}>
                {s.name}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, color: 'var(--fg-1)' }}>
                {s.amt}
              </div>
              <Pill tone={s.note === 'pending' ? 'warning' : 'success'} withDot>
                {s.note}
              </Pill>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 18 }}>
          <Btn full size="lg">
            Nudge the 2 pending
          </Btn>
        </div>
      </div>
    </div>
  );
}
