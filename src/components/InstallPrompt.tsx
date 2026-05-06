import { useCallback, useEffect, useMemo, useState } from 'react';
import { Btn, Icon } from './primitives';
import { usePwaInstall } from '@/pwa';
import { useIsMobile } from '@/hooks/useMediaQuery';

const SNOOZE_KEY = 'sakhi.install.snoozedAt';
const PERMANENT_KEY = 'sakhi.install.dismissed';
const SNOOZE_DAYS = 7;
const FIRST_RENDER_DELAY_MS = 1500;

type Mode = 'native' | 'ios';

function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(display-mode: standalone)').matches) return true;
  // iOS Safari surfaces a non-standard `standalone` flag on the navigator.
  return Boolean(
    (window.navigator as Navigator & { standalone?: boolean }).standalone,
  );
}

function isIosSafari(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent;
  const isIos = /iPad|iPhone|iPod/.test(ua);
  if (!isIos) return false;
  // Exclude Chrome/Firefox/Edge on iOS — those are still WebKit but show their own UI.
  return /WebKit/.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua);
}

function shouldShowDueToHistory(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.localStorage.getItem(PERMANENT_KEY) === 'true') return false;
  const at = window.localStorage.getItem(SNOOZE_KEY);
  if (!at) return true;
  const ts = Number(at);
  if (!Number.isFinite(ts)) return true;
  const ageDays = (Date.now() - ts) / (1000 * 60 * 60 * 24);
  return ageDays >= SNOOZE_DAYS;
}

interface InstallPromptProps {
  /** Pass false to suppress the prompt on routes where it doesn't make sense. */
  enabled?: boolean;
}

export function InstallPrompt({ enabled = true }: InstallPromptProps) {
  const { canInstall, promptInstall } = usePwaInstall();
  const isMobile = useIsMobile();
  const [mode, setMode] = useState<Mode | null>(null);
  const [visible, setVisible] = useState(false);

  const eligible = useMemo(() => {
    if (!enabled) return false;
    if (isStandalone()) return false;
    if (!shouldShowDueToHistory()) return false;
    return true;
  }, [enabled]);

  useEffect(() => {
    if (!eligible) return;
    let timer: number | undefined;

    if (canInstall) {
      timer = window.setTimeout(() => {
        setMode('native');
        setVisible(true);
      }, FIRST_RENDER_DELAY_MS);
    } else if (isIosSafari()) {
      timer = window.setTimeout(() => {
        setMode('ios');
        setVisible(true);
      }, FIRST_RENDER_DELAY_MS);
    }

    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [eligible, canInstall]);

  const dismiss = useCallback((permanent = false) => {
    setVisible(false);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(SNOOZE_KEY, Date.now().toString());
      if (permanent) window.localStorage.setItem(PERMANENT_KEY, 'true');
    }
  }, []);

  const onInstall = useCallback(async () => {
    await promptInstall();
    dismiss(true);
  }, [dismiss, promptInstall]);

  if (!visible || !mode) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="sakhi-install-title"
      className="sakhi-install-prompt"
      style={{
        position: 'fixed',
        zIndex: 80,
        left: isMobile ? 16 : 'auto',
        right: 16,
        bottom: `calc(env(safe-area-inset-bottom, 0px) + ${isMobile ? 16 : 24}px)`,
        maxWidth: isMobile ? 'calc(100vw - 32px)' : 360,
        background: 'var(--paper)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)',
        boxShadow: 'var(--shadow-3)',
        padding: 18,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        animation: 'sakhi-install-in 320ms cubic-bezier(.2,.7,.2,1)',
      }}
    >
      <header style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <img
          src="/assets/logo/sakhi-mark.svg"
          width={36}
          height={36}
          alt=""
          style={{ borderRadius: 8, flexShrink: 0 }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="eyebrow" style={{ fontSize: 10, color: 'var(--plum-700)' }}>
            INSTALL SAKHI
          </div>
          <h3
            id="sakhi-install-title"
            style={{
              margin: '2px 0 0',
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 18,
              letterSpacing: '-0.01em',
              color: 'var(--fg-1)',
              lineHeight: 1.2,
            }}
          >
            Keep Sakhi a tap away
          </h3>
        </div>
        <button
          type="button"
          aria-label="Close install prompt"
          onClick={() => dismiss(false)}
          className="sakhi-focus-ring"
          style={{
            width: 28,
            height: 28,
            borderRadius: 999,
            border: 'none',
            background: 'var(--bg-elev-2)',
            color: 'var(--fg-2)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <CloseIcon />
        </button>
      </header>

      <p
        style={{
          margin: 0,
          fontSize: 13,
          lineHeight: 1.5,
          color: 'var(--fg-2)',
        }}
      >
        Add Sakhi to your home screen to get reminders, draws, and party RSVPs without opening the
        browser.
      </p>

      {mode === 'ios' ? (
        <ol
          style={{
            margin: 0,
            padding: '4px 0 0 0',
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <IosStep n={1}>
            Tap the <ShareGlyph /> share icon in Safari's toolbar.
          </IosStep>
          <IosStep n={2}>Choose "Add to Home Screen".</IosStep>
          <IosStep n={3}>Confirm to drop the Sakhi mark on your home screen.</IosStep>
        </ol>
      ) : null}

      <div
        style={{
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          flexWrap: 'wrap',
          marginTop: 4,
        }}
      >
        {mode === 'native' && (
          <Btn size="sm" onClick={onInstall} style={{ flex: 1, minWidth: 120 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Icon name="arrow-down" size={14} strokeWidth={2.2} /> Install Sakhi
            </span>
          </Btn>
        )}
        <button
          type="button"
          onClick={() => dismiss(false)}
          className="sakhi-focus-ring"
          style={{
            padding: '8px 14px',
            background: 'transparent',
            color: 'var(--fg-2)',
            border: '1px solid var(--border)',
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Maybe later
        </button>
        <button
          type="button"
          onClick={() => dismiss(true)}
          className="sakhi-focus-ring"
          style={{
            padding: '8px 4px',
            background: 'transparent',
            color: 'var(--fg-3)',
            border: 'none',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          Don't show again
        </button>
      </div>
    </div>
  );
}

function IosStep({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
      <span
        style={{
          width: 20,
          height: 20,
          borderRadius: 999,
          background: 'var(--rose-50)',
          color: 'var(--rose-700)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontWeight: 700,
          flexShrink: 0,
          marginTop: 1,
        }}
      >
        {n}
      </span>
      <span style={{ fontSize: 13, color: 'var(--fg-1)', lineHeight: 1.5 }}>{children}</span>
    </li>
  );
}

function ShareGlyph() {
  return (
    <svg
      aria-hidden
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ verticalAlign: '-2px', display: 'inline-block', margin: '0 2px' }}
    >
      <path d="M12 3v13" />
      <path d="m7 8 5-5 5 5" />
      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path d="M6 6l12 12M6 18 18 6" />
    </svg>
  );
}
