import { useState } from 'react';
import { Card, Icon, IconBtn, Pill, ScreenHeader } from '@/components/primitives';
import { partyEvents, partyStatusMeta, type PartyEventStatus } from '../data';

const filters: Array<{ id: 'all' | PartyEventStatus | 'past'; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'confirmed', label: 'Booked' },
  { id: 'voting', label: 'Voting' },
  { id: 'past', label: 'Past' },
];

export function PartiesScreen() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]['id']>('all');

  const visible = partyEvents.filter((e) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'past') return false; // no past data in the prototype
    return e.status === activeFilter;
  });

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100%', paddingBottom: 140 }}>
      <ScreenHeader title="Parties" eyebrow="MARCH" trailing={<IconBtn icon="search" label="Search" />} />
      <div style={{ padding: '0 20px' }}>
        <div
          role="tablist"
          aria-label="Filter parties"
          style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}
        >
          {filters.map((f) => {
            const active = activeFilter === f.id;
            return (
              <button
                key={f.id}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => setActiveFilter(f.id)}
                className="sangat-focus-ring"
                style={{
                  padding: '6px 14px',
                  borderRadius: 999,
                  border: '1px solid var(--border)',
                  background: active ? 'var(--rose-600)' : 'var(--paper)',
                  color: active ? 'var(--on-primary)' : 'var(--fg-1)',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 180ms cubic-bezier(.2,.7,.2,1)',
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {visible.length === 0 ? (
          <EmptyState />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {visible.map((e, i) => {
              const meta = partyStatusMeta[e.status];
              const [day, dayNumber, month] = parseDate(e.date);
              return (
                <Card key={`${e.title}-${i}`} style={{ padding: 16 }}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    <DateBadge day={day} number={dayNumber} month={month} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 11,
                          color: 'var(--fg-2)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                        }}
                      >
                        <Icon name="clock" size={11} /> {e.time}
                      </div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: 14,
                          marginTop: 2,
                          color: 'var(--fg-1)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {e.title}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--fg-2)', marginTop: 1 }}>{e.sub}</div>
                    </div>
                    <Pill tone={meta.tone} withDot>
                      {meta.label}
                    </Pill>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

interface DateBadgeProps {
  day: string;
  number: string;
  month: string;
}

function DateBadge({ day, number, month }: DateBadgeProps) {
  return (
    <div
      style={{
        width: 56,
        textAlign: 'center',
        borderRight: '1px solid var(--ink-200)',
        paddingRight: 14,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: 'var(--fg-2)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {day}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 24,
          lineHeight: 1,
          marginTop: 2,
          color: 'var(--fg-1)',
        }}
      >
        {number}
      </div>
      <div style={{ fontSize: 11, color: 'var(--fg-2)', marginTop: 2 }}>{month}</div>
    </div>
  );
}

function EmptyState() {
  return (
    <div
      style={{
        background: 'var(--paper)',
        border: '1px dashed var(--border)',
        borderRadius: 'var(--r-md)',
        padding: 24,
        textAlign: 'center',
        color: 'var(--fg-2)',
        fontSize: 13,
      }}
    >
      Nothing in this filter yet.
    </div>
  );
}

function parseDate(date: string): [string, string, string] {
  // Input shape: "Sat, 14 Mar"
  const [day, rest] = date.split(',');
  const trimmed = rest?.trim() ?? '';
  const [number, month] = trimmed.split(' ');
  return [day?.trim() ?? '', number ?? '', month ?? ''];
}
