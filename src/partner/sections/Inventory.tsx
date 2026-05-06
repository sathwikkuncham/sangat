import { Btn, Pill } from '@/components/primitives';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { inventorySlots, type Slot } from '../data';

const headers = ['2 PM', '3 PM', '4 PM', '5 PM'];

export function Inventory() {
  const isMobile = useIsMobile();
  return (
    <div style={{ padding: isMobile ? '20px 16px 32px' : 32 }}>
      <div className="eyebrow">YIELD ENGINE</div>
      <h1 style={{ margin: '4px 0 12px' }}>Off-peak inventory</h1>
      <p className="p-small" style={{ marginTop: 0, maxWidth: 640 }}>
        Set the discount or commission you'll offer for confirmed group bookings in each slot.
        Sakhi only fills these from groups of 6+ members.
      </p>

      {isMobile ? (
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {inventorySlots.map((s) => (
            <SlotCard key={s.day} slot={s} />
          ))}
        </div>
      ) : (
        <div
          style={{
            background: 'var(--paper)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-md)',
            padding: 20,
            marginTop: 20,
            overflowX: 'auto',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'separate',
              borderSpacing: '0 8px',
              fontFamily: 'var(--font-text)',
              fontSize: 14,
            }}
          >
            <thead>
              <tr
                style={{
                  color: 'var(--fg-2)',
                  fontSize: 12,
                  textAlign: 'left',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                <th style={{ padding: '0 8px' }} />
                {headers.map((h) => (
                  <th key={h} style={{ padding: '0 8px' }}>
                    {h}
                  </th>
                ))}
                <th style={{ padding: '0 8px' }}>Discount offered</th>
              </tr>
            </thead>
            <tbody>
              {inventorySlots.map((s) => (
                <tr key={s.day}>
                  <td style={{ fontWeight: 600, padding: '10px 8px', color: 'var(--fg-1)' }}>
                    {s.day}
                  </td>
                  {s.vals.map((v, i) => (
                    <td key={i} style={{ padding: '4px 8px' }}>
                      <SlotCell value={v} />
                    </td>
                  ))}
                  <td style={{ padding: '4px 8px' }}>
                    <Pill tone="rose">40% off</Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Btn>Save inventory</Btn>
        <Btn variant="secondary">Copy from last week</Btn>
      </div>
    </div>
  );
}

function SlotCell({ value }: { value: number }) {
  return (
    <div
      style={{
        background: 'var(--bg-elev-2)',
        border: '1px solid var(--ink-200)',
        borderRadius: 8,
        padding: '8px 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 6,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontFeatureSettings: '"tnum"',
          color: 'var(--fg-1)',
        }}
      >
        {value}
      </span>
      <span style={{ fontSize: 11, color: 'var(--fg-2)' }}>seats</span>
    </div>
  );
}

function SlotCard({ slot }: { slot: Slot }) {
  return (
    <article
      style={{
        background: 'var(--paper)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-md)',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg-1)' }}>{slot.day}</div>
        <Pill tone="rose">40% off</Pill>
      </header>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 8,
        }}
      >
        {headers.map((h, i) => (
          <div key={h} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div className="eyebrow" style={{ fontSize: 10 }}>{h}</div>
            <SlotCell value={slot.vals[i] ?? 0} />
          </div>
        ))}
      </div>
    </article>
  );
}
