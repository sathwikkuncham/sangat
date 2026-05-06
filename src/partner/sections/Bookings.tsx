import { Pill } from '@/components/primitives';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { bookingRows, stateTone, type BookingRow } from '../data';

const filters = ['All', 'Confirmed', 'Pending', 'Past'] as const;

export function Bookings() {
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
          <div className="eyebrow">SCHEDULE</div>
          <h1 style={{ margin: '4px 0 0' }}>Bookings</h1>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {filters.map((f, i) => (
            <button
              key={f}
              type="button"
              className="sakhi-focus-ring"
              style={{
                padding: '8px 14px',
                borderRadius: 999,
                border: '1px solid var(--border)',
                background: i === 0 ? 'var(--rose-600)' : 'var(--paper)',
                color: i === 0 ? 'var(--on-primary)' : 'var(--fg-1)',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {isMobile ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
          {bookingRows.map((u) => (
            <BookingCard key={u.group} booking={u} />
          ))}
        </div>
      ) : (
        <BookingTable />
      )}
    </div>
  );
}

function BookingTable() {
  return (
    <div
      style={{
        marginTop: 20,
        background: 'var(--paper)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-md)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'minmax(0, 2fr) minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 1.5fr) minmax(0, 1fr) minmax(0, 1fr) 90px',
          gap: 12,
          padding: '14px 20px',
          background: 'var(--bg-elev-2)',
          borderBottom: '1px solid var(--ink-200)',
          fontSize: 11,
          fontWeight: 600,
          color: 'var(--fg-2)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        <div>Group</div>
        <div>Organiser</div>
        <div>Size</div>
        <div>When</div>
        <div>Est. spend</div>
        <div>Status</div>
        <div />
      </div>
      {bookingRows.map((u, i) => (
        <div
          key={u.group}
          style={{
            display: 'grid',
            gridTemplateColumns:
              'minmax(0, 2fr) minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 1.5fr) minmax(0, 1fr) minmax(0, 1fr) 90px',
            gap: 12,
            alignItems: 'center',
            padding: '14px 20px',
            borderBottom: i < bookingRows.length - 1 ? '1px solid var(--ink-200)' : 'none',
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--fg-1)' }}>{u.group}</div>
          <div style={{ fontSize: 13, color: 'var(--fg-2)' }}>{u.org}</div>
          <div style={{ fontSize: 13, color: 'var(--fg-1)' }}>{u.size}</div>
          <div style={{ fontSize: 13, color: 'var(--fg-1)' }}>{u.when}</div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 14,
              color: 'var(--fg-1)',
            }}
          >
            {u.spend}
          </div>
          <div>
            <Pill tone={stateTone[u.state]} withDot>
              {u.state}
            </Pill>
          </div>
          <button
            type="button"
            className="sakhi-focus-ring"
            style={{
              padding: '6px 12px',
              fontSize: 12,
              fontWeight: 600,
              border: '1px solid var(--border)',
              background: 'var(--paper)',
              color: 'var(--fg-1)',
              borderRadius: 999,
              cursor: 'pointer',
            }}
          >
            Manage
          </button>
        </div>
      ))}
    </div>
  );
}

function BookingCard({ booking: u }: { booking: BookingRow }) {
  return (
    <article
      style={{
        background: 'var(--paper)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-md)',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <header style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--fg-1)' }}>{u.group}</div>
          <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 2 }}>
            {u.org} · {u.size} guests
          </div>
        </div>
        <Pill tone={stateTone[u.state]} withDot>
          {u.state}
        </Pill>
      </header>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 10 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--fg-2)' }}>{u.when}</div>
          <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 2 }}>{u.package}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="eyebrow" style={{ fontSize: 10 }}>EST. SPEND</div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 18,
              color: 'var(--fg-1)',
            }}
          >
            {u.spend}
          </div>
        </div>
      </div>
      <button
        type="button"
        className="sakhi-focus-ring"
        style={{
          padding: '8px 12px',
          fontSize: 12,
          fontWeight: 600,
          border: '1px solid var(--border)',
          background: 'var(--paper)',
          color: 'var(--fg-1)',
          borderRadius: 999,
          cursor: 'pointer',
          alignSelf: 'flex-start',
        }}
      >
        Manage
      </button>
    </article>
  );
}
