import type { ButtonHTMLAttributes } from 'react';
import { Icon, type IconName } from './Icon';

interface IconBtnProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: IconName;
  label: string;
  size?: number;
}

export function IconBtn({ icon, label, size = 18, ...rest }: IconBtnProps) {
  return (
    <button
      {...rest}
      aria-label={label}
      title={label}
      className={`sakhi-focus-ring${rest.className ? ` ${rest.className}` : ''}`}
      style={{
        width: 36,
        height: 36,
        borderRadius: 999,
        background: 'transparent',
        border: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--fg-1)',
        cursor: 'pointer',
        transition: 'background 180ms cubic-bezier(.2,.7,.2,1)',
        ...rest.style,
      }}
    >
      <Icon name={icon} size={size} />
    </button>
  );
}
