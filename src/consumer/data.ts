import type { AvatarSpec } from '@/components/primitives';
import type { PillTone } from '@/components/primitives';

export interface KittyGroup {
  id: number;
  name: string;
  city: string;
  members: number;
  due: string;
  status: string;
  tone: PillTone;
  when: string;
  membersArr: AvatarSpec[];
}

export const kittyGroups: KittyGroup[] = [
  {
    id: 1,
    name: 'Tuesday Lunch Club',
    city: 'Bangalore',
    members: 8,
    due: '₹16,000',
    status: 'pool open',
    tone: 'warning',
    when: 'Draw Sat, 14 Mar',
    membersArr: [
      { initials: 'SS', tone: 1 },
      { initials: 'PM', tone: 2 },
      { initials: 'RK', tone: 3 },
      { initials: 'AT', tone: 4 },
      { initials: 'NV', tone: 1 },
    ],
  },
  {
    id: 2,
    name: 'Cousins kitty',
    city: 'Delhi NCR',
    members: 6,
    due: '₹30,000',
    status: 'all paid',
    tone: 'success',
    when: 'Drawn · Ritu won',
    membersArr: [
      { initials: 'RK', tone: 2 },
      { initials: 'NM', tone: 3 },
      { initials: 'SA', tone: 1 },
      { initials: 'PJ', tone: 4 },
    ],
  },
  {
    id: 3,
    name: 'Sunday brunch sangat',
    city: 'Mumbai',
    members: 12,
    due: '₹6,000',
    status: '4 awaiting',
    tone: 'warning',
    when: 'Vote closes tonight',
    membersArr: [
      { initials: 'AM', tone: 3 },
      { initials: 'KP', tone: 1 },
      { initials: 'SH', tone: 2 },
      { initials: 'RP', tone: 4 },
    ],
  },
];

export interface GroupMember {
  name: string;
  initials: string;
  tone: number;
  status: 'paid' | 'due' | 'sched';
  when: string;
  amt: string;
}

export const groupMembers: GroupMember[] = [
  { name: 'Sangeeta Sharma', initials: 'SS', tone: 1, status: 'paid', when: '2 days ago', amt: '₹2,000' },
  { name: 'Preeti Mehta', initials: 'PM', tone: 2, status: 'due', when: 'Reminder sent 6h ago', amt: '₹2,000' },
  { name: 'Ritu Kapoor', initials: 'RK', tone: 3, status: 'paid', when: 'Yesterday', amt: '₹2,000' },
  { name: 'Anjali Tewari', initials: 'AT', tone: 4, status: 'sched', when: 'Auto-debit Sat 14 Mar', amt: '₹2,000' },
  { name: 'Nidhi Verma', initials: 'NV', tone: 1, status: 'paid', when: '3 days ago', amt: '₹2,000' },
  { name: 'You', initials: 'YO', tone: 5, status: 'paid', when: 'Today', amt: '₹2,000' },
];

export interface VenueOption {
  id: number;
  name: string;
  area: string;
  cuisine: string;
  off: string;
}

export const venueOptions: VenueOption[] = [
  { id: 1, name: 'Saffron Trail', area: 'Indiranagar', cuisine: 'North Indian thali', off: '40% off · 2–5 PM' },
  { id: 2, name: 'Toast & Tonic', area: 'Lavelle Rd', cuisine: 'European small plates', off: '20% off · weekday lunch' },
  { id: 3, name: 'Karavalli', area: 'Koramangala', cuisine: 'Coastal', off: 'Group menu ₹650' },
];

export interface SettleSplit {
  name: string;
  amt: string;
  note: 'paid' | 'pending' | 'paid bill';
}

export const settleSplits: SettleSplit[] = [
  { name: 'Sangeeta', amt: '₹540', note: 'paid bill' },
  { name: 'Preeti', amt: '₹540', note: 'pending' },
  { name: 'Ritu', amt: '₹540', note: 'pending' },
  { name: 'Anjali', amt: '₹540', note: 'paid' },
  { name: 'Nidhi', amt: '₹540', note: 'paid' },
  { name: 'You', amt: '₹540', note: 'paid' },
];

export type PartyEventStatus = 'confirmed' | 'voting' | 'online' | 'planned';

export interface PartyEvent {
  date: string;
  time: string;
  title: string;
  sub: string;
  status: PartyEventStatus;
}

export const partyStatusMeta: Record<PartyEventStatus, { tone: PillTone; label: string }> = {
  confirmed: { tone: 'success', label: 'Confirmed' },
  voting: { tone: 'warning', label: 'Voting open' },
  online: { tone: 'plum', label: 'Online' },
  planned: { tone: 'neutral', label: 'Planned' },
};

export const partyEvents: PartyEvent[] = [
  { date: 'Sat, 14 Mar', time: '2:00 PM', title: 'Tuesday Lunch Club at Saffron Trail', sub: '12 covers · Indiranagar', status: 'confirmed' },
  { date: 'Tue, 17 Mar', time: '3:30 PM', title: 'Cousins kitty draw', sub: 'Online · video call', status: 'online' },
  { date: 'Sat, 21 Mar', time: '1:00 PM', title: "Anjali's 40th party", sub: 'Karavalli · 18 covers', status: 'voting' },
  { date: 'Wed, 25 Mar', time: '4:00 PM', title: 'Book club hi-tea', sub: 'Toast & Tonic · 8 covers', status: 'planned' },
];

export interface WalletTx {
  t: string;
  m: string;
  amt: string;
  tone: 'success' | 'warning';
}

export const walletTxs: WalletTx[] = [
  { t: 'Contributed to Tuesday Lunch Club', m: 'Today · 11:32 AM', amt: '−₹2,000', tone: 'warning' },
  { t: 'Saffron Trail · Saturday lunch', m: 'Mar 8 · escrow hold', amt: '−₹450', tone: 'warning' },
  { t: 'Cousins kitty disbursal', m: 'Mar 1 · received', amt: '+₹30,000', tone: 'success' },
  { t: 'Refund · Karavalli (cancelled)', m: 'Feb 24', amt: '+₹650', tone: 'success' },
  { t: 'Sangat Gold purchase', m: 'Feb 18 · 0.5g', amt: '−₹3,400', tone: 'warning' },
];
