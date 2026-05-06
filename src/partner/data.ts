import type { PillTone } from '@/components/primitives';

export interface OverviewStat {
  label: string;
  value: string;
  sub: string;
  tone: 'success' | 'plum' | 'rose';
}

export const overviewStats: OverviewStat[] = [
  { label: 'Off-peak covers booked', value: '184', sub: '+22% vs last month', tone: 'success' },
  { label: 'Confirmed groups · 30d', value: '46', sub: '78% show-up rate', tone: 'plum' },
  { label: 'Commission owed', value: '₹14,820', sub: 'Settles Mon, 16 Mar', tone: 'rose' },
  { label: 'Avg party size', value: '11.2', sub: 'Up from 9.4', tone: 'rose' },
];

export type BookingState = 'confirmed' | 'pending' | 'awaiting';

export const stateTone: Record<BookingState, PillTone> = {
  confirmed: 'success',
  pending: 'warning',
  awaiting: 'plum',
};

export interface UpcomingBooking {
  group: string;
  size: number;
  when: string;
  package: string;
  state: BookingState;
}

export const upcomingBookings: UpcomingBooking[] = [
  { group: 'Tuesday Lunch Club', size: 12, when: 'Sat 14 Mar · 2:00 PM', package: 'Set thali ₹450', state: 'confirmed' },
  { group: 'Cousins kitty', size: 6, when: 'Tue 17 Mar · 3:30 PM', package: 'À la carte', state: 'pending' },
  { group: "Anjali's 40th", size: 18, when: 'Sat 21 Mar · 1:00 PM', package: 'Private room', state: 'confirmed' },
  { group: "Nidhi's book club", size: 8, when: 'Wed 25 Mar · 4:00 PM', package: 'Hi-tea ₹350', state: 'awaiting' },
];

export interface BookingRow extends UpcomingBooking {
  org: string;
  spend: string;
}

export const bookingRows: BookingRow[] = [
  { group: 'Tuesday Lunch Club', org: 'Riya Kapoor', size: 12, when: 'Sat 14 Mar · 2:00 PM', spend: '₹3,240', state: 'confirmed', package: 'Set thali ₹450' },
  { group: 'Cousins kitty', org: 'Sangeeta S.', size: 6, when: 'Tue 17 Mar · 3:30 PM', spend: '₹1,620', state: 'pending', package: 'À la carte' },
  { group: "Anjali's 40th", org: 'Anjali T.', size: 18, when: 'Sat 21 Mar · 1:00 PM', spend: '₹14,400', state: 'confirmed', package: 'Private room' },
  { group: "Nidhi's book club", org: 'Nidhi V.', size: 8, when: 'Wed 25 Mar · 4:00 PM', spend: '₹2,240', state: 'awaiting', package: 'Hi-tea ₹350' },
  { group: 'Lavanya housewarming', org: 'Lavanya R.', size: 22, when: 'Sun 29 Mar · 12:30 PM', spend: '₹17,600', state: 'confirmed', package: 'Group menu' },
  { group: 'Mehta family lunch', org: 'Preeti M.', size: 9, when: 'Tue 31 Mar · 2:00 PM', spend: '₹2,430', state: 'pending', package: 'Set thali ₹450' },
];

export interface Slot {
  day: string;
  vals: [number, number, number, number];
}

export const inventorySlots: Slot[] = [
  { day: 'Mon', vals: [40, 30, 25, 35] },
  { day: 'Tue', vals: [50, 40, 30, 25] },
  { day: 'Wed', vals: [45, 35, 25, 30] },
  { day: 'Thu', vals: [40, 30, 25, 35] },
  { day: 'Fri', vals: [30, 25, 20, 25] },
];

export interface PackageItem {
  name: string;
  price: string;
  desc: string;
  uses: number;
  active: boolean;
}

export const packageItems: PackageItem[] = [
  { name: 'Set thali · veg', price: '₹450', desc: '7 items, 2 sweets, papad. Lunch only.', uses: 84, active: true },
  { name: 'Hi-tea · ₹350', price: '₹350', desc: 'Chaat platter, 3 mains, masala chai.', uses: 32, active: true },
  { name: 'Group à la carte', price: 'open', desc: '15% off bill for groups of 8+.', uses: 18, active: true },
  { name: 'Private room minimum', price: '₹8,000', desc: 'Reserved corner, table reset, 4-hr block.', uses: 6, active: false },
];

export interface SettlementRow {
  week: string;
  spend: string;
  com: string;
  net: string;
  state: string;
}

export const settlementRows: SettlementRow[] = [
  { week: 'Week of 4 Mar', spend: '₹54,200', com: '₹3,690', net: '₹50,510', state: 'paid' },
  { week: 'Week of 25 Feb', spend: '₹48,900', com: '₹3,330', net: '₹45,570', state: 'paid' },
  { week: 'Week of 18 Feb', spend: '₹61,400', com: '₹4,180', net: '₹57,220', state: 'paid' },
  { week: 'Week of 11 Feb', spend: '₹50,300', com: '₹3,420', net: '₹46,880', state: 'paid' },
];

export const offPeakFill = [35, 48, 62, 72, 58, 84, 91] as const;
export const weeklyRevenue = [28, 35, 41, 38, 52, 48, 61, 58, 72, 68, 84, 91] as const;

export interface OutletField {
  label: string;
  value: string;
}

export const outletDetails: OutletField[] = [
  { label: 'Restaurant name', value: 'Saffron Trail' },
  { label: 'Location', value: '100ft Road, Indiranagar, Bangalore 560038' },
  { label: 'Capacity', value: '64 covers · 1 private room (12 covers)' },
  { label: 'Cuisine', value: 'North Indian thali · regional vegetarian' },
  { label: 'Off-peak window', value: '2 PM – 5 PM, Mon–Fri' },
];

export const payoutDetails: OutletField[] = [
  { label: 'Bank account', value: 'ICICI Bank · XXX-XXX-0421' },
  { label: 'Settlement cadence', value: 'Weekly · Mondays' },
  { label: 'GSTIN', value: '29AABCU9603R1ZJ' },
];
