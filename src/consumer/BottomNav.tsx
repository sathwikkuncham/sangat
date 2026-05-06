import { Icon, type IconName } from '@/components/primitives';

export type ConsumerTab = 'groups' | 'parties' | 'wallet' | 'you';

interface NavItem {
  id: ConsumerTab;
  icon: IconName;
  label: string;
}

const tabs: NavItem[] = [
  { id: 'groups', icon: 'users', label: 'Groups' },
  { id: 'parties', icon: 'cal', label: 'Parties' },
  { id: 'wallet', icon: 'wallet', label: 'Wallet' },
  { id: 'you', icon: 'user', label: 'You' },
];

interface BottomNavProps {
  tab: ConsumerTab;
  onTab: (next: ConsumerTab) => void;
  onFab: () => void;
}

export function BottomNav({ tab, onTab, onFab }: BottomNavProps) {
  return (
    <nav
      style={{
        position: 'absolute',
        bottom: 28,
        left: 16,
        right: 16,
        background: 'var(--paper)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)',
        padding: 8,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        boxShadow: 'var(--shadow-2)',
        zIndex: 10,
      }}
    >
      {tabs.slice(0, 2).map((t) => (
        <TabButton key={t.id} item={t} active={tab === t.id} onClick={() => onTab(t.id)} />
      ))}
      <button
        onClick={onFab}
        aria-label="Start a new kitty"
        title="Start a new kitty"
        className="sakhi-focus-ring"
        style={{
          background: 'var(--rose-600)',
          color: 'var(--on-primary)',
          width: 48,
          height: 48,
          borderRadius: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          boxShadow: '0 6px 14px -4px rgba(184, 56, 90, 0.5)',
          cursor: 'pointer',
        }}
      >
        <Icon name="plus" size={22} strokeWidth={2.2} />
      </button>
      {tabs.slice(2).map((t) => (
        <TabButton key={t.id} item={t} active={tab === t.id} onClick={() => onTab(t.id)} />
      ))}
    </nav>
  );
}

interface TabButtonProps {
  item: NavItem;
  active: boolean;
  onClick: () => void;
}

function TabButton({ item, active, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className="sakhi-focus-ring"
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        padding: '6px 4px',
        borderRadius: 'var(--r-sm)',
        color: active ? 'var(--rose-700)' : 'var(--fg-3)',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-text)',
        fontWeight: 500,
        fontSize: 11,
      }}
    >
      <Icon name={item.icon} size={22} strokeWidth={active ? 2 : 1.75} />
      {item.label}
    </button>
  );
}
