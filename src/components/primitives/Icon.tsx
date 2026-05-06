import type { CSSProperties, ReactNode } from 'react';

export type IconName =
  | 'users'
  | 'cal'
  | 'plus'
  | 'wallet'
  | 'user'
  | 'bell'
  | 'back'
  | 'forward'
  | 'check'
  | 'rupee'
  | 'pin'
  | 'clock'
  | 'more'
  | 'search'
  | 'qr'
  | 'star'
  | 'home'
  | 'food'
  | 'chart'
  | 'gear'
  | 'sun'
  | 'moon'
  | 'arrow-up'
  | 'arrow-down'
  | 'logout';

const paths: Record<IconName, ReactNode> = {
  users: (
    <>
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <circle cx="17" cy="9" r="3" />
      <path d="M21 21v-1a3 3 0 0 0-3-3" />
    </>
  ),
  cal: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M16 3v4M8 3v4" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  wallet: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
      <circle cx="17" cy="14" r="1.4" fill="currentColor" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  bell: (
    <>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10 21a2 2 0 0 0 4 0" />
    </>
  ),
  back: <path d="M15 18l-6-6 6-6" />,
  forward: <path d="M9 6l6 6-6 6" />,
  check: <path d="M5 12l5 5 9-11" />,
  rupee: <path d="M6 4h12M9 4v3a3 3 0 0 0 6 0V4M9 14h6M8 21l8-14" />,
  pin: (
    <>
      <path d="M12 21s-7-7.5-7-12a7 7 0 0 1 14 0c0 4.5-7 12-7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  more: (
    <>
      <circle cx="6" cy="12" r="1.4" />
      <circle cx="12" cy="12" r="1.4" />
      <circle cx="18" cy="12" r="1.4" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  qr: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3M21 14v3M14 21h3M21 17v4" />
    </>
  ),
  star: <path d="M12 3l2.6 5.5L21 9l-4.5 4.4L18 20l-6-3.4L6 20l1.5-6.6L3 9l6.4-.5z" />,
  home: (
    <>
      <path d="M3 12L12 3l9 9" />
      <path d="M5 10v10h14V10" />
    </>
  ),
  food: <path d="M4 11h16M5 11v9h14v-9M9 7c0-2 6-2 6 0M3 7h18" />,
  chart: <path d="M3 21h18M6 17V9M11 17V5M16 17v-7M21 17v-3" />,
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.36.13.66.32.91.59a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4" />
    </>
  ),
  moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />,
  'arrow-up': <path d="M12 19V5M5 12l7-7 7 7" />,
  'arrow-down': <path d="M12 5v14M5 12l7 7 7-7" />,
  logout: (
    <>
      <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" />
      <path d="M10 17l-5-5 5-5M5 12h12" />
    </>
  ),
};

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: CSSProperties;
}

export function Icon({ name, size = 20, color = 'currentColor', strokeWidth = 1.75, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={{ flexShrink: 0, ...style }}
    >
      {paths[name]}
    </svg>
  );
}
