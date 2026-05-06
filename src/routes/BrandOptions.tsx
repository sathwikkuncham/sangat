import { Link } from 'react-router-dom';
import { Icon } from '@/components/primitives';
import { useTheme } from '@/theme';

interface BrandOption {
  id: string;
  name: string;
  phonetic: string;
  origin: string;
  meaning: string;
  tagline: string;
  sample: string;
  logo: string;
  /**
   * `prerendered` marks logos that ship with their own coloured tile (eg. the rose monogram).
   * For SVGs that show a cream tile baked-in, we wrap them on a coloured swatch to demo dark mode.
   */
  prerendered?: boolean;
}

const options: BrandOption[] = [
  {
    id: 'mehfil',
    name: 'Mehfil',
    phonetic: 'MEH-fil',
    origin: 'Hindi · Urdu',
    meaning: 'a gathering, especially festive',
    tagline: 'When the calendar gathers.',
    sample: 'Open your March mehfil.',
    logo: '/assets/logo/options/mehfil.svg',
  },
  {
    id: 'sangat',
    name: 'Sangat',
    phonetic: 'SUN-gut',
    origin: 'Hindi · Punjabi',
    meaning: 'a circle of trusted companions',
    tagline: 'The friends who pool.',
    sample: 'Tuesday Lunch sangat is ready.',
    logo: '/assets/logo/options/sangat.svg',
  },
  {
    id: 'halqa',
    name: 'Halqa',
    phonetic: 'HUL-kuh',
    origin: 'Urdu · Arabic',
    meaning: 'a ring or closed circle',
    tagline: 'A perfect circle of friends.',
    sample: 'You + 5 others in this halqa.',
    logo: '/assets/logo/options/halqa.svg',
  },
  {
    id: 'daawat',
    name: 'Daawat',
    phonetic: 'dah-WAT',
    origin: 'Hindi · Urdu',
    meaning: 'an invitation, a feast',
    tagline: 'Every kitty is a feast.',
    sample: "You're invited to a daawat.",
    logo: '/assets/logo/options/daawat.svg',
  },
  {
    id: 'marigold',
    name: 'Marigold',
    phonetic: 'MAR-i-gold',
    origin: 'English · genda phool',
    meaning: 'auspicious flower of celebration',
    tagline: 'Petals of celebration, every month.',
    sample: 'Your March Marigold pool.',
    logo: '/assets/logo/options/marigold.svg',
  },
  {
    id: 'monogram',
    name: 'Type-only',
    phonetic: '—',
    origin: 'Wordmark only',
    meaning: 'no glyph, just the chosen name set in italic Fraunces',
    tagline: 'Let the name carry the weight.',
    sample: 'Pair this with any of the names above.',
    logo: '/assets/logo/options/monogram.svg',
    prerendered: true,
  },
];

export function BrandOptions() {
  const { theme, toggle } = useTheme();
  return (
    <div className="sakhi-stage" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          padding: '16px clamp(20px, 5vw, 48px)',
          maxWidth: 1240,
          width: '100%',
          margin: '0 auto',
        }}
      >
        <Link
          to="/"
          className="sakhi-link-reset sakhi-focus-ring"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 13,
            color: 'var(--fg-2)',
            padding: '6px 10px',
            borderRadius: 999,
            border: '1px solid var(--border)',
            background: 'var(--paper)',
          }}
        >
          <Icon name="back" size={14} />
          Surfaces
        </Link>
        <button
          type="button"
          onClick={toggle}
          aria-label="Toggle theme"
          className="sakhi-focus-ring"
          style={{
            width: 36,
            height: 36,
            borderRadius: 999,
            border: '1px solid var(--border)',
            background: 'var(--paper)',
            color: 'var(--fg-1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={16} />
        </button>
      </header>

      <main
        style={{
          maxWidth: 1240,
          width: '100%',
          margin: '0 auto',
          padding: 'clamp(16px, 4vw, 48px)',
        }}
      >
        <div className="eyebrow" style={{ color: 'var(--plum-700)' }}>
          BRAND DIRECTIONS
        </div>
        <h1
          style={{
            margin: '8px 0 0',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            color: 'var(--fg-1)',
          }}
        >
          Pick a name + mark.
        </h1>
        <p className="p-lead" style={{ marginTop: 12, maxWidth: 640, color: 'var(--fg-2)' }}>
          Six candidates. Five lean into the kitty-party heritage but feel less single-demographic
          than <em>Sakhi</em>; the last is a wordmark-only fallback so any of the names can stand
          alone. Pick one and I'll rename the package, repo, manifest, and PWA assets in one pass.
        </p>

        <section
          style={{
            marginTop: 32,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 20,
          }}
        >
          {options.map((option) => (
            <BrandCard key={option.id} option={option} />
          ))}
        </section>

        <footer
          style={{
            marginTop: 36,
            padding: 18,
            background: 'var(--paper)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-md)',
            color: 'var(--fg-2)',
            fontSize: 13,
            lineHeight: 1.6,
          }}
        >
          <strong style={{ color: 'var(--fg-1)' }}>How to choose:</strong> Mehfil and Sangat read
          warmest and most native to the kitty-party setting. Halqa is the most graphic, app-icon
          friendly. Daawat leans into the dining hook — strong if positioning ever shifts toward
          restaurants. Marigold is the most globally pronounceable.
        </footer>
      </main>
    </div>
  );
}

function BrandCard({ option }: { option: BrandOption }) {
  return (
    <article
      style={{
        background: 'var(--paper)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        boxShadow: 'var(--shadow-1)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 8,
          padding: 8,
          background: 'var(--bg-elev-2)',
          borderRadius: 'var(--r-md)',
        }}
      >
        <LogoTile src={option.logo} dark={false} prerendered={option.prerendered} />
        <LogoTile src={option.logo} dark prerendered={option.prerendered} />
      </div>

      <div>
        <h2
          style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 30,
            fontWeight: 500,
            letterSpacing: '-0.01em',
            color: 'var(--fg-1)',
            lineHeight: 1,
          }}
        >
          {option.name}
        </h2>
        <div
          style={{
            display: 'flex',
            gap: 8,
            alignItems: 'baseline',
            marginTop: 4,
            color: 'var(--fg-3)',
            fontSize: 12,
          }}
        >
          <code className="mono" style={{ background: 'transparent' }}>/{option.phonetic}/</code>
          <span style={{ color: 'var(--fg-2)' }}>· {option.origin}</span>
        </div>
      </div>

      <p style={{ margin: 0, fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.5 }}>
        {option.meaning}.
      </p>

      <p
        style={{
          margin: 0,
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 16,
          color: 'var(--rose-700)',
          lineHeight: 1.3,
        }}
      >
        “{option.tagline}”
      </p>

      <div
        style={{
          marginTop: 'auto',
          paddingTop: 12,
          borderTop: '1px solid var(--ink-200)',
          fontSize: 11,
          color: 'var(--fg-3)',
          fontStyle: 'italic',
        }}
      >
        {option.sample}
      </div>
    </article>
  );
}

interface LogoTileProps {
  src: string;
  dark: boolean;
  prerendered?: boolean;
}

function LogoTile({ src, dark, prerendered }: LogoTileProps) {
  // For the cream-tiled SVGs we drop them onto a contrast swatch so dark theme reads correctly.
  // The monogram is already on a rose tile so we just place it as-is.
  const background = prerendered
    ? 'transparent'
    : dark
      ? '#160F11'
      : 'transparent';

  return (
    <div
      style={{
        background,
        borderRadius: 'var(--r-sm)',
        aspectRatio: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        border: dark ? 'none' : '1px solid var(--ink-200)',
      }}
    >
      <img src={src} alt="" width="80%" height="80%" style={{ display: 'block' }} />
    </div>
  );
}
