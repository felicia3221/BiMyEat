export interface Location {
  id: string;
  name: string;
  description: string;
  image: string;
  icon: string;
}

export interface Canteen {
  id: string;
  locationId: string;
  name: string;
  description: string;
  image: string;
  location: string;
  openHours: string;
}

export interface MenuItem {
  id: string;
  canteenId: string;
  name: string;
  description: string;
  price: number;
  category: 'makanan' | 'minuman';
  image: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  canteenId: string;
  canteenName: string;
  items: CartItem[];
  total: number;
  pickupTime: string;
  paymentMethod: string;
  status: 'pending' | 'confirmed' | 'ready' | 'completed';
  createdAt: Date;
}