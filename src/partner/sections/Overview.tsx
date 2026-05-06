import { Btn, Pill } from '@/components/primitives';
import { useIsMobile } from '@/hooks/useMediaQuery';
import {
  offPeakFill,
  overviewStats,
  stateTone,
  upcomingBookings,
  type UpcomingBooking,
} from '../data';

export function Overview() {
  const isMobile = useIsMobile();
  return (
    <div
      style={{
        padding: isMobile ? '20px 16px 32px' : 32,
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? 20 : 24,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'flex-start',
          gap: 16,
        }}
      >
        <div>
          <div className="eyebrow">DASHBOARD · MARCH</div>
          <h1 style={{ margin: '4px 0 0' }}>Good morning, Saffron Trail.</h1>
          <p className="p-small" style={{ marginTop: 6 }}>
            You have 4 off-peak group bookings this week. Two need your confirmation by 6 PM today.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Btn variant="secondary">Export report</Btn>
          <Btn>Open new slot</Btn>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 16,
        }}
      >
        {overviewStats.map((s) => (
          <div
            key={s.label}
            style={{
              background: 'var(--paper)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-md)',
              padding: 18,
              boxShadow: 'var(--shadow-1)',
            }}
          >
            <div style={{ fontSize: 12, color: 'var(--fg-2)', fontWeight: 500 }}>{s.label}</div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 32,
                letterSpacing: '-0.01em',
                fontFeatureSettings: '"tnum"',
                marginTop: 4,
                color: 'var(--fg-1)',
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontSize: 12,
                color: s.tone === 'success' ? 'var(--success-700)' : 'var(--fg-2)',
                marginTop: 2,
              }}
            >
              {s.sub}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 2fr) minmax(280px, 1fr)',
          gap: 20,
        }}
      >
        <div
          style={{
            background: 'var(--paper)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-md)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--ink-200)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h3
              style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 18,
                color: 'var(--fg-1)',
              }}
            >
              Upcoming groups
            </h3>
            <span
              role="link"
              tabIndex={0}
              style={{
                fontSize: 13,
                color: 'var(--plum-700)',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              See all →
            </span>
          </div>
          {upcomingBookings.map((u, i) =>
            isMobile ? (
              <UpcomingCard
                key={u.group}
                booking={u}
                last={i === upcomingBookings.length - 1}
              />
            ) : (
              <UpcomingRow
                key={u.group}
                booking={u}
                last={i === upcomingBookings.length - 1}
              />
            ),
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              background: 'var(--paper)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-md)',
              padding: 20,
            }}
          >
            <h3
              style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 18,
                color: 'var(--fg-1)',
              }}
            >
              Off-peak fill
            </h3>
            <p className="p-small" style={{ marginTop: 4 }}>
              Mon–Fri · 2–5 PM
            </p>
            <div style={{ display: 'flex', gap: 6, marginTop: 16, alignItems: 'flex-end', height: 120 }}>
              {offPeakFill.map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: `${h}%`,
                      background: i === offPeakFill.length - 1 ? 'var(--rose-600)' : 'var(--rose-200)',
                      borderRadius: 4,
                    }}
                  />
                  <span style={{ fontSize: 10, color: 'var(--fg-2)' }}>
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 16,
                padding: 12,
                background: 'var(--rose-50)',
                borderRadius: 'var(--r-sm)',
                fontSize: 12,
                color: 'var(--rose-900)',
              }}
            >
              <strong style={{ color: 'var(--rose-700)' }}>91% utilisation</strong> last
              Saturday at 2 PM — your best off-peak slot this month.
            </div>
          </div>

          <div
            style={{
              background: 'var(--paper)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-md)',
              padding: 20,
            }}
          >
            <h3
              style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 18,
                color: 'var(--fg-1)',
              }}
            >
              Action needed
            </h3>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <ActionRow title="Confirm Cousins kitty" sub="Pending since 9:14 AM" />
              <ActionRow title="Approve Nidhi's package" sub="₹350 hi-tea · 8 guests" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UpcomingRow({ booking: u, last }: { booking: UpcomingBooking; last: boolean }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1.5fr) minmax(0, 1fr) 80px',
        gap: 12,
        alignItems: 'center',
        padding: '14px 20px',
        borderBottom: last ? 'none' : '1px solid var(--ink-200)',
      }}
    >
      <div>
        <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--fg-1)' }}>{u.group}</div>
        <div style={{ fontSize: 12, color: 'var(--fg-2)' }}>
          {u.size} guests · organiser verified
        </div>
      </div>
      <div style={{ fontSize: 13, color: 'var(--fg-1)' }}>{u.when}</div>
      <div style={{ fontSize: 13, color: 'var(--fg-2)' }}>{u.package}</div>
      <Pill tone={stateTone[u.state]} withDot>
        {u.state}
      </Pill>
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
        View
      </button>
    </div>
  );
}

function UpcomingCard({ booking: u, last }: { booking: UpcomingBooking; last: boolean }) {
  return (
    <div
      style={{
        padding: '14px 16px',
        borderBottom: last ? 'none' : '1px solid var(--ink-200)',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 10,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--fg-1)' }}>{u.group}</div>
          <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 2 }}>
            {u.size} guests · organiser verified
          </div>
        </div>
        <Pill tone={stateTone[u.state]} withDot>
          {u.state}
        </Pill>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 12,
          color: 'var(--fg-2)',
        }}
      >
        <span>{u.when}</span>
        <span>{u.package}</span>
      </div>
      <button
        type="button"
        className="sakhi-focus-ring"
        style={{
          marginTop: 4,
          alignSelf: 'flex-start',
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
        View
      </button>
    </div>
  );
}

function ActionRow({ title, sub }: { title: string; sub: string }) {
  return (
    <div
      style={{
        padding: 12,
        background: 'var(--bg-elev-2)',
        borderRadius: 'var(--r-sm)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <div style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--warning-600)' }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg-1)' }}>{title}</div>
        <div style={{ fontSize: 11, color: 'var(--fg-2)' }}>{sub}</div>
      </div>
      <button
        type="button"
        className="sakhi-focus-ring"
        style={{
          padding: '4px 10px',
          fontSize: 11,
          fontWeight: 600,
          border: 'none',
          background: 'var(--rose-600)',
          color: 'var(--on-primary)',
          borderRadius: 999,
          cursor: 'pointer',
        }}
      >
        Review
      </button>
    </div>
  );
}
