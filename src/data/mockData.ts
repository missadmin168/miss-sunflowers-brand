export type DealerTier = 'vip' | 'province' | 'retail';
export type DealerStatus = 'active' | 'suspended';

export interface Dealer {
  id: string;
  name: string;
  code: string;
  phone: string;
  tier: DealerTier;
  status: DealerStatus;
  location: { km: string; en: string };
  fb: string;
  tiktok: string;
  portraitColor: string;
  joinDate: string;
}

export type StockStatus = 'in' | 'low' | 'out' | 'incoming';

export interface Product {
  id: string;
  name: { km: string; en: string };
  category: { km: string; en: string };
  stock: StockStatus;
  stockCount: number;
  retailPrice: number;
  wholesalePrices: Record<DealerTier, number>;
  colorA: string;
  colorB: string;
}

export interface Broadcast {
  id: string;
  title: string;
  message: string;
  tier: 'all' | DealerTier;
  timestamp: string;
  hasImage: boolean;
  imageColor: string;
}

export interface FakeReport {
  id: string;
  link: string;
  reporter: string;
  timestamp: string;
  status: 'new' | 'reviewing' | 'resolved';
}

export const tierLabels: Record<DealerTier, { km: string; en: string }> = {
  vip: { km: 'VIP បោះដុំធំ', en: 'VIP Wholesale' },
  province: { km: 'តំណាងខេត្ត', en: 'Provincial Dealer' },
  retail: { km: 'តំណាងចែកចាយ', en: 'Retail Dealer' },
};

export const dealers: Dealer[] = [
  {
    id: 'd1', name: 'សុខ សុភាព', code: 'MSF-001', phone: '012111222',
    tier: 'vip', status: 'active',
    location: { km: 'ភ្នំពេញ / Phnom Penh', en: 'Phnom Penh / Cambodia' },
    fb: 'MissSunflower.Pnh', tiktok: '@missunflower.pnh',
    portraitColor: '#F5B700', joinDate: '2023-01-15',
  },
  {
    id: 'd2', name: 'ចាន់ ដារា', code: 'MSF-002', phone: '012333444',
    tier: 'province', status: 'active',
    location: { km: 'ក្រចេះ / Kratie', en: 'Kratie / Cambodia' },
    fb: 'MissSunflower.Kratie', tiktok: '@msf.kratie',
    portraitColor: '#D97706', joinDate: '2023-03-20',
  },
  {
    id: 'd3', name: 'Kim Minji', code: 'MSF-003', phone: '+82-10-5555-6666',
    tier: 'vip', status: 'active',
    location: { km: 'កូរ៉េខាងត្បូង / South Korea', en: 'Seoul / South Korea' },
    fb: 'MissSunflower.Korea', tiktok: '@msf.korea',
    portraitColor: '#EAB308', joinDate: '2023-06-10',
  },
  {
    id: 'd4', name: 'ហ៊ុន សុគន្ធា', code: 'MSF-004', phone: '016777888',
    tier: 'retail', status: 'active',
    location: { km: 'សៀមរាប / Siem Reap', en: 'Siem Reap / Cambodia' },
    fb: 'MissSunflower.SiemReap', tiktok: '@msf.siemreap',
    portraitColor: '#B45309', joinDate: '2023-08-05',
  },
  {
    id: 'd5', name: 'Vuong Thi Lan', code: 'MSF-005', phone: '+84-90-1234-567',
    tier: 'province', status: 'active',
    location: { km: 'វៀតណាម / Vietnam', en: 'Ho Chi Minh / Vietnam' },
    fb: 'MissSunflower.Vietnam', tiktok: '@msf.vietnam',
    portraitColor: '#7C2D12', joinDate: '2023-10-12',
  },
  {
    id: 'd6', name: 'លី បូណា', code: 'MSF-006', phone: '012444555',
    tier: 'retail', status: 'suspended',
    location: { km: 'បាត់ដំបង / Battambang', en: 'Battambang / Cambodia' },
    fb: 'FakeSunflower.BTB', tiktok: '@fakesunflower.btb',
    portraitColor: '#C62828', joinDate: '2023-02-01',
  },
];

export const products: Product[] = [
  {
    id: 'p1', name: { km: 'សេរ៉ូមមាសព្រះអាទិត្យ', en: 'Sunflower Gold Serum' },
    category: { km: 'សេរ៉ូម', en: 'Serum' },
    stock: 'in', stockCount: 120, retailPrice: 35,
    wholesalePrices: { vip: 22, province: 25, retail: 28 },
    colorA: '#FDE047', colorB: '#F5B700',
  },
  {
    id: 'p2', name: { km: 'ក្រែមថែរការមុខរលោង', en: 'Radiance Face Cream' },
    category: { km: 'ក្រែម', en: 'Cream' },
    stock: 'low', stockCount: 15, retailPrice: 28,
    wholesalePrices: { vip: 18, province: 20, retail: 23 },
    colorA: '#FEF3C7', colorB: '#EAB308',
  },
  {
    id: 'p3', name: { km: 'ប៊័ងទឹកការពារពន្លឺអាទិត្យ', en: 'Sunshield BB Essence' },
    category: { km: 'BB / SPF', en: 'BB / SPF' },
    stock: 'in', stockCount: 85, retailPrice: 32,
    wholesalePrices: { vip: 20, province: 23, retail: 26 },
    colorA: '#FDE68A', colorB: '#D97706',
  },
  {
    id: 'p4', name: { km: 'ម៉ាសកជ្រលក់ផ្កាឆ្មា', en: 'Sunflower Petal Mask' },
    category: { km: 'ម៉ាសក', en: 'Mask' },
    stock: 'out', stockCount: 0, retailPrice: 18,
    wholesalePrices: { vip: 10, province: 12, retail: 14 },
    colorA: '#F5B700', colorB: '#B45309',
  },
  {
    id: 'p5', name: { km: 'ទឹកអប់ធាតុផ្កាឆ្មា', en: 'Sunflower Toning Mist' },
    category: { km: 'ទឹកអប់', en: 'Toner' },
    stock: 'incoming', stockCount: 0, retailPrice: 22,
    wholesalePrices: { vip: 13, province: 15, retail: 17 },
    colorA: '#FFFDF5', colorB: '#EAB308',
  },
  {
    id: 'p6', name: { km: 'លីបស្ទីកប័ត្រមាស', en: 'Gold Petal Lipstick' },
    category: { km: 'លីបស្ទីក', en: 'Lipstick' },
    stock: 'in', stockCount: 200, retailPrice: 15,
    wholesalePrices: { vip: 8, province: 10, retail: 12 },
    colorA: '#FDE047', colorB: '#C62828',
  },
];

export const broadcasts: Broadcast[] = [
  {
    id: 'b1', title: 'ប្រូម៉ូសិនខែវិច្ឆិកា - 50% បោះដុំ',
    message: 'ផលិតផលទាំងអស់បញ្ចុះតម្លៃ ៥០% សម្រាប់តំណាង VIP ប្រាក្រ១០ទេសៈ១៥ ខែវិច្ឆិកា។ កម្ម៉ង់ឆ្លងកាត់ Telegram ប៉ុណ្ណោះ។',
    tier: 'vip', timestamp: '2026-11-22 09:30', hasImage: true, imageColor: '#F5B700',
  },
  {
    id: 'b2', title: 'ផលិតផលថ្មី: សេរ៉ូមមាសព្រះអាទិត្យ V2',
    message: 'សេរ៉ូមថ្មីការពារស្បែកពីពន្លឺអាទិត្យ ៧០SPF អាចប្រើបានគ្រប់ប្រភេទស្បែក។ តម្លៃបោះដុំថេរ។',
    tier: 'all', timestamp: '2026-11-20 14:00', hasImage: true, imageColor: '#D97706',
  },
  {
    id: 'b3', title: 'ប្រព័ន្ធត្រួតពិនិត្យការក្លែងក្លាយ',
    message: 'សូមប្រើប្រព័ន្ធត្រួតពិនិត្យដើម្បីផ្ទៀងផ្ទាត់តំណាងមុនវេរលុយ។ ការពារអតិថិជន។',
    tier: 'all', timestamp: '2026-11-18 10:15', hasImage: false, imageColor: '#EAB308',
  },
];

export const fakeReports: FakeReport[] = [
  { id: 'r1', link: 'facebook.com/FakeSunflower.Official', reporter: 'Customer', timestamp: '2026-11-23 08:45', status: 'new' },
  { id: 'r2', link: 'tiktok.com/@realsunflower2024', reporter: 'Dealer MSF-001', timestamp: '2026-11-22 16:20', status: 'reviewing' },
  { id: 'r3', link: 'facebook.com/Sunflower.Cosmetics.KH', reporter: 'Customer', timestamp: '2026-11-20 11:30', status: 'resolved' },
  { id: 'r4', link: 'tiktok.com/@missunflower.shop', reporter: 'Customer', timestamp: '2026-11-19 19:10', status: 'reviewing' },
  { id: 'r5', link: 'facebook.com/MSF.Outlet.Pnh', reporter: 'Dealer MSF-003', timestamp: '2026-11-18 07:00', status: 'resolved' },
];

export const currentDealer: Dealer = dealers[0];
export const ceoProfile = {
  name: 'Dr. Sopheap Chea',
  code: 'MSF-CEO',
  role: 'CEO Admin',
  phone: '012000000',
};
