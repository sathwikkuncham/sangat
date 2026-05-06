import { Btn } from '@/components/primitives';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { outletDetails, payoutDetails, type OutletField } from '../data';

export function Settings() {
  const isMobile = useIsMobile();
  return (
    <div style={{ padding: isMobile ? '20px 16px 32px' : 32, maxWidth: 720 }}>
      <div className="eyebrow">RESTAURANT</div>
      <h1 style={{ margin: '4px 0 0' }}>Settings</h1>

      <Group title="Outlet details" fields={outletDetails} isMobile={isMobile} />
      <Group title="Payouts" fields={payoutDetails} isMobile={isMobile} />

      <div
        style={{
          marginTop: 16,
          padding: 18,
          background: 'var(--rose-50)',
          border: '1px solid var(--rose-200)',
          borderRadius: 'var(--r-md)',
          display: 'flex',
          gap: 14,
          alignItems: isMobile ? 'flex-start' : 'center',
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        <img src="/assets/icons/lotus.svg" width={40} height={40} alt="" />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--rose-700)' }}>
            Sakhi Partner+ pilot
          </div>
          <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 2 }}>
            Yield-managed packages, AI-suggested off-peak slots, priority placement.
          </div>
        </div>
        <Btn>Apply</Btn>
      </div>
    </div>
  );
}

interface GroupProps {
  title: string;
  fields: OutletField[];
  isMobile: boolean;
}

function Group({ title, fields, isMobile }: GroupProps) {
  return (
    <div
      style={{
        marginTop: 24,
        background: 'var(--paper)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-md)',
        padding: isMobile ? 18 : 24,
      }}
    >
      <h3
        style={{
          margin: '0 0 16px',
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 18,
          color: 'var(--fg-1)',
        }}
      >
        {title}
      </h3>
      {fields.map((f, i) => (
        <Field key={f.label} field={f} last={i === fields.length - 1} isMobile={isMobile} />
      ))}
    </div>
  );
}

function Field({ field, last, isMobile }: { field: OutletField; last: boolean; isMobile: boolean }) {
  if (isMobile) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          padding: '12px 0',
          borderBottom: last ? 'none' : '1px solid var(--ink-200)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div className="eyebrow" style={{ fontSize: 10 }}>{field.label}</div>
          <button
            type="button"
            className="sakhi-focus-ring"
            style={{
              padding: '4px 10px',
              fontSize: 11,
              fontWeight: 600,
              border: '1px solid var(--border)',
              background: 'var(--paper)',
              color: 'var(--fg-1)',
              borderRadius: 999,
              cursor: 'pointer',
            }}
          >
            Edit
          </button>
        </div>
        <div style={{ fontSize: 14, color: 'var(--fg-1)' }}>{field.value}</div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '180px 1fr 60px',
        gap: 12,
        padding: '12px 0',
        borderBottom: last ? 'none' : '1px solid var(--ink-200)',
        alignItems: 'center',
      }}
    >
      <div style={{ fontSize: 13, color: 'var(--fg-2)', fontWeight: 500 }}>{field.label}</div>
      <div style={{ fontSize: 14, color: 'var(--fg-1)' }}>{field.value}</div>
      <button
        type="button"
        className="sakhi-focus-ring"
        style={{
          padding: '4px 10px',
          fontSize: 11,
          fontWeight: 600,
          border: '1px solid var(--border)',
          background: 'var(--paper)',
          color: 'var(--fg-1)',
          borderRadius: 999,
          cursor: 'pointer',
          justifySelf: 'end',
        }}
      >
        Edit
      </button>
    </div>
  );
}
