import { Btn, Card, IconBtn, ScreenHeader } from '@/components/primitives';
import { walletTxs } from '../data';

export function WalletScreen() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100%', paddingBottom: 140 }}>
      <ScreenHeader title="Wallet" eyebrow="MARCH" trailing={<IconBtn icon="more" label="More" />} />
      <div style={{ padding: '0 20px' }}>
        <Card variant="money" style={{ padding: 22 }}>
          <div className="eyebrow" style={{ fontSize: 11 }}>SANGAT BALANCE</div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 44,
              letterSpacing: '-0.02em',
              fontFeatureSettings: '"tnum"',
              marginTop: 4,
              color: 'var(--fg-1)',
            }}
          >
            ₹4,820
          </div>
          <div style={{ fontSize: 12, color: 'var(--fg-2)' }}>
            Held in nodal escrow · ICICI
          </div>
          <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
            <Btn size="sm">Add money</Btn>
            <Btn size="sm" variant="secondary">Withdraw</Btn>
            <Btn size="sm" variant="ghost">Sangat Gold</Btn>
          </div>
        </Card>

        <div
          style={{
            marginTop: 18,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 10,
          }}
        >
          <Card style={{ padding: 14 }}>
            <div className="eyebrow" style={{ fontSize: 10 }}>SANGAT GOLD</div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 20,
                fontWeight: 500,
                marginTop: 4,
                color: 'var(--fg-1)',
              }}
            >
              1.8g
            </div>
            <div style={{ fontSize: 11, color: 'var(--success-700)', marginTop: 1 }}>
              +2.1% this week
            </div>
          </Card>
          <Card style={{ padding: 14 }}>
            <div className="eyebrow" style={{ fontSize: 10 }}>SIP · MONTHLY</div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 20,
                fontWeight: 500,
                marginTop: 4,
                color: 'var(--fg-1)',
              }}
            >
              ₹2,500
            </div>
            <div style={{ fontSize: 11, color: 'var(--fg-2)', marginTop: 1 }}>Next 1 Apr</div>
          </Card>
        </div>

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
          Recent activity
        </h3>
        <div
          style={{
            background: 'var(--paper)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-md)',
            overflow: 'hidden',
          }}
        >
          {walletTxs.map((tx, i) => (
            <div
              key={`${tx.t}-${i}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 16px',
                borderBottom:
                  i < walletTxs.length - 1 ? '1px solid var(--ink-200)' : 'none',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--fg-1)' }}>{tx.t}</div>
                <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 1 }}>{tx.m}</div>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize: 16,
                  fontFeatureSettings: '"tnum"',
                  color: tx.tone === 'success' ? 'var(--success-700)' : 'var(--fg-1)',
                }}
              >
                {tx.amt}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
