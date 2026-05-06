interface AvatarProps {
  initials: string;
  size?: number;
  tone?: number;
}

const palette: Array<[string, string]> = [
  ['var(--rose-200)', 'var(--rose-900)'],
  ['var(--rose-50)', 'var(--rose-700)'],
  ['var(--plum-50)', 'var(--plum-700)'],
  ['var(--cream-200)', 'var(--ink-700)'],
  ['var(--ink-100)', 'var(--ink-800)'],
];

export function Avatar({ initials, size = 40, tone = 1 }: AvatarProps) {
  const [bg, fg] = palette[(tone - 1) % palette.length];
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        background: bg,
        color: fg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: size * 0.38,
        flexShrink: 0,
        userSelect: 'none',
      }}
    >
      {initials}
    </div>
  );
}

export interface AvatarSpec {
  initials: string;
  tone?: number;
}

interface AvatarStackProps {
  people: AvatarSpec[];
  size?: number;
  max?: number;
}

export function AvatarStack({ people, size = 28, max = 4 }: AvatarStackProps) {
  const shown = people.slice(0, max);
  const more = people.length - max;
  return (
    <div style={{ display: 'flex' }}>
      {shown.map((p, i) => (
        <div
          key={`${p.initials}-${i}`}
          style={{
            marginLeft: i ? -8 : 0,
            border: '2px solid var(--bg)',
            borderRadius: 999,
          }}
        >
          <Avatar initials={p.initials} size={size} tone={p.tone ?? i + 1} />
        </div>
      ))}
      {more > 0 && (
        <div
          style={{
            marginLeft: -8,
            border: '2px solid var(--bg)',
            borderRadius: 999,
          }}
        >
          <Avatar initials={`+${more}`} size={size} tone={5} />
        </div>
      )}
    </div>
  );
}
