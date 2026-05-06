import {
  Avatar,
  Btn,
  Card,
  Icon,
  IconBtn,
  Pill,
  ScreenHeader,
  type PillTone,
} from '@/components/primitives';
import { groupMembers, type KittyGroup } from '../data';
import type { ReactNode } from 'react';

interface GroupDetailScreenProps {
  group: KittyGroup | undefined;
  voted: boolean;
  booked: boolean;
  onBack: () => void;
  onVote: () => void;
  onResult: () => void;
  onSettle: () => void;
}

const statusPills: Record<'paid' | 'due' | 'sched', { tone: PillTone; label: string }> = {
  paid: { tone: 'success', label: 'paid' },
  due: { tone: 'warning', label: 'due' },
  sched: { tone: 'plum', label: 'scheduled' },
};

export function GroupDetailScreen({
  group,
  voted,
  booked,
  onBack,
  onVote,
  onResult,
  onSettle,
}: GroupDetailScreenProps) {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100%', paddingBottom: 140 }}>
      <ScreenHeader
        title={group?.name ?? 'Tuesday Lunch Club'}
        eyebrow="MARCH KITTY"
        leading={<IconBtn icon="back" onClick={onBack} label="Back" />}
        trailing={<IconBtn icon="more" label="More" />}
      />

      <div style={{ padding: '0 20px' }}>
        <Card variant="money" style={{ padding: 22, position: 'relative', overflow: 'hidden' }}>
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse at 80% 0%,var(--rose-100),transparent 60%)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ position: 'relative' }}>
            <div className="eyebrow" style={{ fontSize: 11 }}>
              THIS MONTH'S POOL
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 44,
                letterSpacing: '-0.02em',
                fontFeatureSettings: '"tnum"',
                marginTop: 4,
                color: 'var(--rose-700)',
              }}
            >
              ₹16,000
            </div>
            <div style={{ fontSize: 13, color: 'var(--fg-2)', marginTop: 2 }}>
              5 of 6 contributed · escrow held
            </div>
            <div
              style={{
                marginTop: 12,
                height: 6,
                background: 'var(--ink-200)',
                borderRadius: 999,
                overflow: 'hidden',
              }}
            >
              <div style={{ width: '83%', height: '100%', background: 'var(--rose-600)' }} />
            </div>
            <div style={{ marginTop: 14, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {!voted && (
                <Btn size="sm" onClick={onVote}>
                  Vote on venue
                </Btn>
              )}
              {voted && !booked && (
                <Btn size="sm" onClick={onResult}>
                  See result
                </Btn>
              )}
              {booked && (
                <Btn size="sm" onClick={onSettle}>
                  Settle up
                </Btn>
              )}
              <Btn size="sm" variant="secondary">
                Send reminder
              </Btn>
            </div>
          </div>
        </Card>

        {booked && (
          <div
            style={{
              marginTop: 14,
              padding: 14,
              background: 'var(--success-50)',
              border: '1px solid var(--success-600)',
              borderRadius: 'var(--r-md)',
              display: 'flex',
              gap: 12,
            }}
          >
            <Icon name="check" size={20} color="var(--success-700)" />
            <div>
              <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--success-700)' }}>
                Saffron Trail booked
              </div>
              <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 2 }}>
                Sat 14 Mar · 2 PM · 12 covers · QR sent
              </div>
            </div>
          </div>
        )}

        <SectionHeading>Members</SectionHeading>
        <div
          style={{
            background: 'var(--paper)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-md)',
            overflow: 'hidden',
          }}
        >
          {groupMembers.map((m, i) => {
            const pill = statusPills[m.status];
            return (
              <div
                key={m.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '12px 16px',
                  borderBottom:
                    i < groupMembers.length - 1 ? '1px solid var(--ink-200)' : 'none',
                }}
              >
                <Avatar initials={m.initials} tone={m.tone} size={36} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--fg-1)' }}>
                    {m.name}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 1 }}>
                    {m.when}
                  </div>
                </div>
                <Pill tone={pill.tone} withDot>
                  {pill.label}
                </Pill>
              </div>
            );
          })}
        </div>

        <SectionHeading>Group activity</SectionHeading>
        <div
          style={{
            background: 'var(--paper)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-md)',
            padding: 16,
            fontSize: 13,
            color: 'var(--fg-2)',
          }}
        >
          <div style={{ paddingBottom: 10, borderBottom: '1px solid var(--ink-200)' }}>
            <strong style={{ color: 'var(--fg-1)' }}>Sangeeta</strong> opened venue voting · 6h
            ago
          </div>
          <div style={{ padding: '10px 0', borderBottom: '1px solid var(--ink-200)' }}>
            <strong style={{ color: 'var(--fg-1)' }}>Ritu</strong> contributed ₹2,000 · yesterday
          </div>
          <div style={{ paddingTop: 10 }}>
            <strong style={{ color: 'var(--fg-1)' }}>You</strong> joined this kitty · 3 days ago
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h3
      style={{
        marginTop: 24,
        marginBottom: 10,
        fontFamily: 'var(--font-text)',
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--fg-2)',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      }}
    >
      {children}
    </h3>
  );
}
