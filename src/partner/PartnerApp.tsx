import { useEffect, useState } from 'react';
import { Sidebar, type PartnerSection } from './Sidebar';
import { MobileTopBar } from './MobileTopBar';
import { Overview } from './sections/Overview';
import { Inventory } from './sections/Inventory';
import { Bookings } from './sections/Bookings';
import { Packages } from './sections/Packages';
import { Reports } from './sections/Reports';
import { Settings } from './sections/Settings';
import { useIsCompactPartner } from '@/hooks/useMediaQuery';

const sectionLabels: Record<PartnerSection, string> = {
  overview: 'Overview',
  inventory: 'Off-peak inventory',
  bookings: 'Bookings',
  packages: 'Packages & menus',
  reports: 'Reports',
  settings: 'Settings',
};

export function PartnerApp() {
  const [active, setActive] = useState<PartnerSection>('overview');
  const compact = useIsCompactPartner();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Closing the drawer automatically when we cross back to desktop avoids a stuck-open state.
  useEffect(() => {
    if (!compact) setDrawerOpen(false);
  }, [compact]);

  // Lock scroll while the drawer is open on small screens.
  useEffect(() => {
    if (!compact) return;
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [compact, drawerOpen]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: compact ? 'column' : 'row',
        minHeight: '100vh',
        background: 'var(--bg)',
        fontFamily: 'var(--font-text)',
      }}
    >
      {compact ? (
        <>
          <MobileTopBar
            onOpenMenu={() => setDrawerOpen(true)}
            sectionLabel={sectionLabels[active]}
          />
          <Sidebar
            asDrawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            active={active}
            onChange={setActive}
          />
        </>
      ) : (
        <Sidebar active={active} onChange={setActive} />
      )}
      <main className="sakhi-scroll" style={{ flex: 1, overflow: 'auto', background: 'var(--bg)' }}>
        {active === 'overview' && <Overview />}
        {active === 'inventory' && <Inventory />}
        {active === 'bookings' && <Bookings />}
        {active === 'packages' && <Packages />}
        {active === 'reports' && <Reports />}
        {active === 'settings' && <Settings />}
      </main>
    </div>
  );
}
