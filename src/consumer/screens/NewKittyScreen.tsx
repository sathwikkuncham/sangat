import { useMemo, useState, type CSSProperties } from 'react';
import { Btn, Icon, IconBtn, ScreenHeader } from '@/components/primitives';

interface NewKittyScreenProps {
  onBack: () => void;
  onDone: () => void;
}

const inputStyle: CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 'var(--r-sm)',
  border: '1px solid var(--border)',
  background: 'var(--paper)',
  fontFamily: 'var(--font-text)',
  fontSize: 16,
  color: 'var(--fg-1)',
  outline: 'none',
};

const stepperStyle: CSSProperties = {
  width: 48,
  height: 48,
  borderRadius: 999,
  border: '1px solid var(--border)',
  background: 'var(--paper)',
  color: 'var(--fg-1)',
  fontSize: 20,
  cursor: 'pointer',
};

export function NewKittyScreen({ onBack, onDone }: NewKittyScreenProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');
  const [amt, setAmt] = useState('2000');
  const [members, setMembers] = useState(6);

  const pool = useMemo(() => {
    const value = (parseInt(amt || '0', 10) || 0) * members;
    return value.toLocaleString('en-IN');
  }, [amt, members]);

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100%', paddingBottom: 140 }}>
      <ScreenHeader
        title="Start a new kitty"
        eyebrow={`STEP ${step} OF 3`}
        leading={
          <IconBtn
            icon="back"
            onClick={step === 1 ? onBack : () => setStep((step - 1) as 1 | 2)}
            label="Back"
          />
        }
      />
      <div style={{ padding: '0 20px' }}>
        <div
          style={{
            height: 4,
            background: 'var(--ink-200)',
            borderRadius: 999,
            overflow: 'hidden',
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: `${(step / 3) * 100}%`,
              height: '100%',
              background: 'var(--rose-600)',
              transition: 'width 260ms cubic-bezier(.2,.7,.2,1)',
            }}
          />
        </div>

        {step === 1 && (
          <>
            <h2 style={stepHeading}>Name your kitty</h2>
            <p className="p-small">Members will see this. You can change it later.</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tuesday Lunch Club"
              style={inputStyle}
              aria-label="Kitty name"
            />
            <div style={{ marginTop: 8, fontSize: 12, color: 'var(--fg-2)' }}>
              Suggested: Sangat · Cousins kitty · Book club
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 style={stepHeading}>Contribution &amp; members</h2>
            <p className="p-small">How much each month, and how many sakhi-s?</p>
            <div className="label" style={{ marginTop: 16 }}>Monthly contribution</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 26,
                  color: 'var(--fg-2)',
                }}
              >
                ₹
              </span>
              <input
                value={amt}
                onChange={(e) => setAmt(e.target.value.replace(/[^0-9]/g, ''))}
                inputMode="numeric"
                aria-label="Monthly contribution"
                style={{
                  ...inputStyle,
                  fontFamily: 'var(--font-display)',
                  fontSize: 26,
                  fontWeight: 500,
                }}
              />
            </div>
            <div className="label" style={{ marginTop: 20 }}>Members</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 8 }}>
              <button
                type="button"
                aria-label="Remove a member"
                onClick={() => setMembers((m) => Math.max(2, m - 1))}
                style={stepperStyle}
              >
                −
              </button>
              <div
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontFamily: 'var(--font-display)',
                  fontSize: 26,
                  fontWeight: 500,
                  color: 'var(--fg-1)',
                }}
              >
                {members}
              </div>
              <button
                type="button"
                aria-label="Add a member"
                onClick={() => setMembers((m) => Math.min(20, m + 1))}
                style={stepperStyle}
              >
                +
              </button>
            </div>
            <div
              style={{
                marginTop: 16,
                padding: 14,
                background: 'var(--bg-elev-2)',
                borderRadius: 'var(--r-md)',
                fontSize: 13,
                color: 'var(--fg-2)',
              }}
            >
              Pool per round:{' '}
              <span style={{ fontWeight: 600, color: 'var(--rose-700)' }}>₹{pool}</span>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 style={stepHeading}>Invite your sakhi-s</h2>
            <p className="p-small">
              Add by phone or share a link. Everyone gets a one-tap KYC flow before they can
              contribute.
            </p>
            <div
              style={{
                marginTop: 16,
                padding: 16,
                background: 'var(--paper)',
                border: '1px dashed var(--border)',
                borderRadius: 'var(--r-md)',
                textAlign: 'center',
              }}
            >
              <Icon name="qr" size={48} color="var(--rose-600)" />
              <div style={{ fontWeight: 600, fontSize: 14, marginTop: 8, color: 'var(--fg-1)' }}>
                Share invite QR
              </div>
              <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 4 }}>sakhi.in/j/8f3m2</div>
            </div>
          </>
        )}

        <div style={{ marginTop: 24 }}>
          {step < 3 ? (
            <Btn full size="lg" onClick={() => setStep((step + 1) as 2 | 3)}>
              Continue
            </Btn>
          ) : (
            <Btn full size="lg" onClick={onDone}>
              Create kitty
            </Btn>
          )}
        </div>
      </div>
    </div>
  );
}

const stepHeading: CSSProperties = {
  margin: '0 0 6px',
  fontFamily: 'var(--font-display)',
  fontWeight: 500,
  fontSize: 26,
  color: 'var(--fg-1)',
};
