import { useState, type CSSProperties } from 'react';
import { Btn, IconBtn, ScreenHeader } from '@/components/primitives';
import { venueOptions, type VenueOption } from '../data';

interface VoteScreenProps {
  onBack: () => void;
  onDone: () => void;
}

const arrowStyle: CSSProperties = {
  width: 28,
  height: 26,
  fontSize: 11,
  border: '1px solid var(--border)',
  background: 'var(--paper)',
  borderRadius: 8,
  cursor: 'pointer',
  color: 'var(--fg-1)',
};

export function VoteScreen({ onBack, onDone }: VoteScreenProps) {
  const [order, setOrder] = useState<VenueOption[]>(venueOptions);

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= order.length) return;
    const next = [...order];
    [next[i], next[j]] = [next[j]!, next[i]!];
    setOrder(next);
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100%', paddingBottom: 140 }}>
      <ScreenHeader
        title="Where to this Saturday?"
        eyebrow="RANK YOUR PICKS"
        leading={<IconBtn icon="back" onClick={onBack} label="Back" />}
      />
      <div style={{ padding: '0 20px' }}>
        <p className="p-small" style={{ marginTop: 0 }}>
          Drag or use arrows to rank. We'll combine everyone's ballot using ranked-choice — no
          ties, no re-voting.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {order.map((v, i) => (
            <div
              key={v.id}
              style={{
                background: 'var(--paper)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-md)',
                padding: 14,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 999,
                  background: i === 0 ? 'var(--rose-600)' : 'var(--bg-elev-2)',
                  color: i === 0 ? 'var(--on-primary)' : 'var(--fg-1)',
                  fontWeight: 700,
                  fontSize: 13,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {i + 1}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--fg-1)' }}>
                  {v.name}
                </div>
                <div style={{ fontSize: 12, color: 'var(--fg-2)' }}>
                  {v.area} · {v.cuisine}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: 'var(--rose-700)',
                    fontWeight: 600,
                    marginTop: 2,
                  }}
                >
                  {v.off}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <button
                  type="button"
                  aria-label={`Move ${v.name} up`}
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  style={arrowStyle}
                >
                  ▲
                </button>
                <button
                  type="button"
                  aria-label={`Move ${v.name} down`}
                  onClick={() => move(i, 1)}
                  disabled={i === order.length - 1}
                  style={arrowStyle}
                >
                  ▼
                </button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 20 }}>
          <Btn full size="lg" onClick={onDone}>
            Cast my ranked vote
          </Btn>
        </div>
        <div style={{ marginTop: 14, fontSize: 12, color: 'var(--fg-2)', textAlign: 'center' }}>
          4 of 6 members have voted · closes at 9 PM
        </div>
      </div>
    </div>
  );
}
