export type UserRole = 'salon' | 'partner';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  token: string;
  phone?: string;
  salonName?: string;
}

export interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  category: string;
}

export interface Barber {
  id: string;
  name: string;
  specialty: string[];
  experience: string;
  image: string;
  rating?: number;
}

export interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  customerImage?: string;
  service: string;
  barber?: string;
  date: string;
  time: string;
  status: 'pending' | 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
  type: 'slot' | 'queue';
  price: number;
}

export interface Job {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  services: string[];
  scheduledTime: string;
  status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
  payment: number;
  location: {
    lat: number;
    lng: number;
  };
}

export interface Stats {
  todayBookings: number;
  todayRevenue: number;
  activeBarbers: number;
  completedToday: number;
}
