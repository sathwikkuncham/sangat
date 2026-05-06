import { Btn, Card, Icon, IconBtn, ScreenHeader } from '@/components/primitives';

interface ResultScreenProps {
  onBack: () => void;
  onConfirm: () => void;
}

export function ResultScreen({ onBack, onConfirm }: ResultScreenProps) {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100%', paddingBottom: 140 }}>
      <ScreenHeader
        title="Saffron Trail wins"
        eyebrow="VOTE COMPLETE"
        leading={<IconBtn icon="back" onClick={onBack} label="Back" />}
      />
      <div style={{ padding: '0 20px' }}>
        <Card
          variant="money"
          style={{ padding: 22, textAlign: 'center', position: 'relative', overflow: 'hidden' }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at 50% 0%,var(--rose-100),transparent 60%)',
            }}
          />
          <div style={{ position: 'relative' }}>
            <img
              src="/assets/icons/lotus.svg"
              width={56}
              height={56}
              alt=""
              style={{ marginBottom: 8, filter: 'drop-shadow(0 2px 4px rgba(184,56,90,0.2))' }}
            />
            <h2
              style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 26,
                letterSpacing: '-0.01em',
                color: 'var(--fg-1)',
              }}
            >
              Saturday, 14 March
            </h2>
            <p style={{ margin: '4px 0 0', color: 'var(--fg-2)', fontSize: 13 }}>
              2 PM · 12 seats held · private corner
            </p>
            <div
              style={{
                marginTop: 18,
                padding: 14,
                background: 'var(--paper)',
                borderRadius: 'var(--r-sm)',
                textAlign: 'left',
              }}
            >
              <Row label="Set thali" value="₹450 / head" />
              <Row label="12 covers held" value="₹5,400 estimate" />
              <Row label="Off-peak partner discount" value="−40%" valueColor="var(--success-700)" />
              <div
                style={{
                  marginTop: 8,
                  paddingTop: 8,
                  borderTop: '1px solid var(--ink-200)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 14,
                }}
              >
                <span style={{ fontWeight: 600, color: 'var(--fg-1)' }}>Group total</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, color: 'var(--fg-1)' }}>
                  ₹3,240
                </span>
              </div>
            </div>
          </div>
        </Card>
        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Btn full size="lg" onClick={onConfirm}>
            Confirm booking
          </Btn>
          <Btn full variant="secondary">
            Share with the group
          </Btn>
        </div>
        <div
          style={{
            marginTop: 18,
            padding: 14,
            background: 'var(--plum-50)',
            borderRadius: 'var(--r-md)',
            display: 'flex',
            gap: 10,
          }}
        >
          <Icon name="qr" size={22} color="var(--plum-700)" />
          <div>
            <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--fg-1)' }}>
              QR ready at the venue
            </div>
            <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 2 }}>
              Scan at the table to confirm seating &amp; lock the group rate.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface RowProps {
  label: string;
  value: string;
  valueColor?: string;
}

function Row({ label, value, valueColor }: RowProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 13,
        color: 'var(--fg-1)',
        marginTop: 6,
      }}
    >
      <span style={{ color: 'var(--fg-2)' }}>{label}</span>
      <span style={{ fontWeight: 600, color: valueColor ?? 'var(--fg-1)' }}>{value}</span>
    </div>
  );
}
