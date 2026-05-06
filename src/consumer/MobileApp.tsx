import { useEffect, useState } from 'react';
import { BottomNav, type ConsumerTab } from './BottomNav';
import { HomeScreen } from './screens/HomeScreen';
import { GroupDetailScreen } from './screens/GroupDetailScreen';
import { VoteScreen } from './screens/VoteScreen';
import { ResultScreen } from './screens/ResultScreen';
import { SettleScreen } from './screens/SettleScreen';
import { NewKittyScreen } from './screens/NewKittyScreen';
import { PartiesScreen } from './screens/PartiesScreen';
import { WalletScreen } from './screens/WalletScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import type { KittyGroup } from './data';

type ViewName = 'home' | 'group' | 'vote' | 'result' | 'settle' | 'new' | 'parties' | 'wallet' | 'profile';

interface ViewState {
  name: ViewName;
  group?: KittyGroup;
}

export function MobileApp() {
  const [tab, setTab] = useState<ConsumerTab>('groups');
  const [view, setView] = useState<ViewState>({ name: 'home' });
  const [voted, setVoted] = useState(false);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    if (tab === 'groups') setView({ name: 'home' });
    if (tab === 'parties') setView({ name: 'parties' });
    if (tab === 'wallet') setView({ name: 'wallet' });
    if (tab === 'you') setView({ name: 'profile' });
  }, [tab]);

  let screen;
  switch (view.name) {
    case 'group':
      screen = (
        <GroupDetailScreen
          group={view.group}
          voted={voted}
          booked={booked}
          onBack={() => setView({ name: 'home' })}
          onVote={() => setView({ name: 'vote', group: view.group })}
          onResult={() => setView({ name: 'result', group: view.group })}
          onSettle={() => setView({ name: 'settle', group: view.group })}
        />
      );
      break;
    case 'vote':
      screen = (
        <VoteScreen
          onBack={() => setView({ name: 'group', group: view.group })}
          onDone={() => {
            setVoted(true);
            setView({ name: 'result', group: view.group });
          }}
        />
      );
      break;
    case 'result':
      screen = (
        <ResultScreen
          onBack={() => setView({ name: 'group', group: view.group })}
          onConfirm={() => {
            setBooked(true);
            setView({ name: 'group', group: view.group });
          }}
        />
      );
      break;
    case 'settle':
      screen = <SettleScreen onBack={() => setView({ name: 'group', group: view.group })} />;
      break;
    case 'new':
      screen = (
        <NewKittyScreen
          onBack={() => setView({ name: 'home' })}
          onDone={() => setView({ name: 'home' })}
        />
      );
      break;
    case 'parties':
      screen = <PartiesScreen />;
      break;
    case 'wallet':
      screen = <WalletScreen />;
      break;
    case 'profile':
      screen = <ProfileScreen />;
      break;
    case 'home':
    default:
      screen = (
        <HomeScreen
          onOpen={(g) => setView({ name: 'group', group: g })}
          onNew={() => setView({ name: 'new' })}
        />
      );
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: 'var(--bg)',
      }}
    >
      <div className="sakhi-scroll" style={{ position: 'absolute', inset: 0, overflowY: 'auto' }}>
        {screen}
      </div>
      <BottomNav tab={tab} onTab={setTab} onFab={() => setView({ name: 'new' })} />
    </div>
  );
}
