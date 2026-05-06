import { Btn, Pill } from '@/components/primitives';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { settlementRows, weeklyRevenue, type SettlementRow } from '../data';

export function Reports() {
  const isMobile = useIsMobile();
  return (
    <div style={{ padding: isMobile ? '20px 16px 32px' : 32 }}>
      <div className="eyebrow">FINANCIALS</div>
      <h1 style={{ margin: '4px 0 0' }}>Reports</h1>
      <p className="p-small" style={{ marginTop: 6 }}>
        Settles every Monday for the prior week. Commission charged on confirmed group spend only.
      </p>

      <div
        style={{
          marginTop: 20,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
        }}
      >
        <BigStat label="Gross group spend · Mar" value="₹2,14,800" sub="46 confirmed groups" />
        <BigStat label="Sakhi commission" value="₹14,820" sub="6.9% effective rate" />
        <BigStat label="Net to you" value="₹1,99,980" sub="Settles Mon, 16 Mar" highlight />
      </div>

      <div
        style={{
          marginTop: 20,
          background: 'var(--paper)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r-md)',
          padding: isMobile ? 18 : 24,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
            flexWrap: 'wrap',
            gap: 12,
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
            Off-peak revenue · last 12 weeks
          </h3>
          <Btn size="sm" variant="secondary">
            Download CSV
          </Btn>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 6,
            alignItems: 'flex-end',
            height: isMobile ? 140 : 180,
            overflowX: 'auto',
          }}
        >
          {weeklyRevenue.map((h, i) => (
            <div
              key={i}
              style={{
                flex: '1 0 18px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: `${h * (isMobile ? 1.2 : 1.6)}px`,
                  background:
                    i === weeklyRevenue.length - 1 ? 'var(--rose-600)' : 'var(--rose-200)',
                  borderRadius: 4,
                }}
              />
              <span style={{ fontSize: 10, color: 'var(--fg-2)' }}>W{i + 1}</span>
            </div>
          ))}
        </div>
      </div>

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
            padding: '16px 20px',
            borderBottom: '1px solid var(--ink-200)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,
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
            Weekly settlements
          </h3>
          <span style={{ fontSize: 12, color: 'var(--fg-2)' }}>
            Auto-credited to ICICI XX0421
          </span>
        </div>
        {settlementRows.map((r, i) =>
          isMobile ? (
            <SettlementCard key={r.week} row={r} last={i === settlementRows.length - 1} />
          ) : (
            <SettlementRow key={r.week} row={r} last={i === settlementRows.length - 1} />
          ),
        )}
      </div>
    </div>
  );
}

function SettlementRow({ row: r, last }: { row: SettlementRow; last: boolean }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
        gap: 12,
        padding: '14px 20px',
        borderBottom: last ? 'none' : '1px solid var(--ink-200)',
        alignItems: 'center',
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg-1)' }}>{r.week}</div>
      <div style={{ fontSize: 13, color: 'var(--fg-2)' }}>{r.spend}</div>
      <div style={{ fontSize: 13, color: 'var(--fg-2)' }}>{r.com}</div>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          color: 'var(--fg-1)',
        }}
      >
        {r.net}
      </div>
      <div>
        <Pill tone="success" withDot>
          {r.state}
        </Pill>
      </div>
    </div>
  );
}

function SettlementCard({ row: r, last }: { row: SettlementRow; last: boolean }) {
  return (
    <div
      style={{
        padding: '14px 16px',
        borderBottom: last ? 'none' : '1px solid var(--ink-200)',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg-1)' }}>{r.week}</div>
        <Pill tone="success" withDot>
          {r.state}
        </Pill>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: 8,
          fontSize: 12,
        }}
      >
        <Stat label="Spend" value={r.spend} />
        <Stat label="Commission" value={r.com} />
        <Stat label="Net" value={r.net} highlight />
      </div>
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <div className="eyebrow" style={{ fontSize: 10 }}>{label}</div>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 16,
          color: highlight ? 'var(--fg-1)' : 'var(--fg-2)',
          marginTop: 2,
        }}
      >
        {value}
      </div>
    </div>
  );
}

interface BigStatProps {
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
}

function BigStat({ label, value, sub, highlight }: BigStatProps) {
  return (
    <div
      style={{
        background: highlight ? 'var(--success-50)' : 'var(--paper)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-md)',
        padding: 22,
      }}
    >
      <div style={{ fontSize: 12, color: 'var(--fg-2)', fontWeight: 500 }}>{label}</div>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 36,
          letterSpacing: '-0.018em',
          fontFeatureSettings: '"tnum"',
          marginTop: 6,
          color: highlight ? 'var(--success-700)' : 'var(--fg-1)',
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 2 }}>{sub}</div>
    </div>
  );
}
