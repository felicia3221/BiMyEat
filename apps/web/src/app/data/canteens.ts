import { Canteen } from '../types';

export const canteens: Canteen[] = [
  // Food Park Canteens
  {
    id: 'kantin-utama',
    locationId: 'food-park',
    name: 'Bakmi Effata',
    description: 'Bakmi favorite binusian',
    image: 'https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/e88540f8-489e-4b1d-a7f8-ac5c21590968_1e489b41-2189-4086-a8c0-92e04f3bc5b4.jpg?auto=format',
    location: 'Food Park',
    openHours: '07:00 - 17:00',
  },
  {
    id: 'kantin-nusantara',
    locationId: 'food-park',
    name: 'Cerita Cinta',
    description: 'Dari rasa turun ke hati',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBpZJ6ObPJBMQ93hXTxkntqA0Qu-0N2uL7Vg&s',
    location: 'Food Park',
    openHours: '07:00 - 17:00',
  },
  {
    id: 'kafe-modern',
    locationId: 'food-park',
    name: 'Good Waffle',
    description: 'Good waffle, Good mood',
    image: 'https://cdn.shopify.com/s/files/1/2493/3652/files/2022-09-04_17.28.17_480x480.jpg?v=1662305310',
    location: 'Food Park',
    openHours: '07:00 - 17:00',
  },
  
  // Kantin Payung Canteens
  {
    id: 'warung-mie',
    locationId: 'kantin-payung',
    name: 'Rasa Sayange',
    description: 'Spesialis makanan nusantara',
    image: 'https://i0.wp.com/i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/05b60439-2caa-4afc-8243-43c8ba8aa552_Go-Biz_20190702_105923.jpeg',
    location: 'Kantin Payung',
    openHours: '07:00 - 17:00',
  },
  {
    id: 'warung-padang',
    locationId: 'kantin-payung',
    name: 'Warung Padang Express',
    description: 'Masakan Padang autentik dengan harga terjangkau',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBpZJ6ObPJBMQ93hXTxkntqA0Qu-0N2uL7Vg&s',
    location: 'Kantin Payung',
    openHours: '07:00 - 17:00',
  },
  {
    id: 'juice-bar',
    locationId: 'kantin-payung',
    name: 'Fresh Juice Bar',
    description: 'Minuman segar dan sehat untuk temani hari kamu',
    image: 'https://images.unsplash.com/photo-1689697971955-9368177cd795?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBsYXR0ZSUyMGhvdHxlbnwxfHx8fDE3NzI0NTgxMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    location: 'Kantin Payung',
    openHours: '07:00 - 17:00',
  },
];