import { Avatar, Btn, Card, Icon, IconBtn, ScreenHeader } from '@/components/primitives';
import { useTheme } from '@/theme';

const settingsItems: Array<[string, string]> = [
  ['Personal info', 'PAN, Aadhaar verified'],
  ['Linked banks', 'ICICI · HDFC'],
  ['Notifications', 'Reminders, draws, votes'],
  ['Language', 'English (हिन्दी available)'],
  ['Help & disputes', 'Talk to the sangat'],
];

export function ProfileScreen() {
  const { theme, toggle } = useTheme();
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100%', paddingBottom: 140 }}>
      <ScreenHeader title="You" eyebrow="PROFILE" trailing={<IconBtn icon="more" label="More" />} />
      <div style={{ padding: '0 20px' }}>
        <Card style={{ padding: 22, textAlign: 'center' }}>
          <div style={{ display: 'inline-block', position: 'relative' }}>
            <Avatar initials="RK" tone={1} size={72} />
            <div
              style={{
                position: 'absolute',
                bottom: -2,
                right: -2,
                width: 22,
                height: 22,
                borderRadius: 999,
                background: 'var(--success-600)',
                border: '2px solid var(--paper)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="check" size={12} color="#fff" strokeWidth={2.5} />
            </div>
          </div>
          <h2
            style={{
              margin: '12px 0 2px',
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 22,
              color: 'var(--fg-1)',
            }}
          >
            Riya Kapoor
          </h2>
          <div style={{ fontSize: 12, color: 'var(--fg-2)' }}>KYC verified · Bangalore</div>
          <div
            style={{
              display: 'flex',
              gap: 24,
              justifyContent: 'center',
              marginTop: 16,
              paddingTop: 16,
              borderTop: '1px solid var(--ink-200)',
            }}
          >
            <Stat n="3" l="kitties" />
            <Stat n="14" l="parties" />
            <Stat n="₹52k" l="this year" />
          </div>
        </Card>

        <h3
          style={{
            marginTop: 22,
            marginBottom: 10,
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--fg-2)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Settings
        </h3>
        <div
          style={{
            background: 'var(--paper)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-md)',
            overflow: 'hidden',
          }}
        >
          {settingsItems.map(([label, sub], i) => (
            <div
              key={label}
              style={{
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                borderBottom:
                  i < settingsItems.length - 1 ? '1px solid var(--ink-200)' : 'none',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--fg-1)' }}>{label}</div>
                <div style={{ fontSize: 12, color: 'var(--fg-2)' }}>{sub}</div>
              </div>
              <Icon name="forward" size={16} color="var(--fg-3)" strokeWidth={1.5} />
            </div>
          ))}
          <button
            type="button"
            onClick={toggle}
            className="sangat-focus-ring"
            style={{
              width: '100%',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              border: 'none',
              borderTop: '1px solid var(--ink-200)',
              background: 'transparent',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <Icon
              name={theme === 'dark' ? 'sun' : 'moon'}
              size={18}
              color="var(--plum-700)"
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--fg-1)' }}>
                Appearance
              </div>
              <div style={{ fontSize: 12, color: 'var(--fg-2)' }}>
                {theme === 'dark' ? 'Dark · tap to switch to light' : 'Light · tap to switch to dark'}
              </div>
            </div>
          </button>
        </div>

        <div
          style={{
            marginTop: 22,
            padding: 16,
            background: 'var(--plum-50)',
            borderRadius: 'var(--r-md)',
            display: 'flex',
            gap: 12,
            alignItems: 'center',
          }}
        >
          <img src="/assets/icons/kitty-pot.svg" width={40} height={40} alt="" />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--fg-1)' }}>
              Invite a friend
            </div>
            <div style={{ fontSize: 12, color: 'var(--fg-2)' }}>
              Both get ₹100 in escrow on her first kitty.
            </div>
          </div>
          <Btn size="sm" variant="secondary">
            Invite
          </Btn>
        </div>
      </div>
    </div>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 22,
          color: 'var(--fg-1)',
        }}
      >
        {n}
      </div>
      <div
        style={{
          fontSize: 11,
          color: 'var(--fg-2)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        {l}
      </div>
    </div>
  );
}
