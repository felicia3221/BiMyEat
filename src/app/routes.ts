import { createBrowserRouter } from 'react-router';
import { Locations } from './pages/Locations';
import { Canteens } from './pages/Canteens';
import { Menu } from './pages/Menu';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Orders } from './pages/Orders';
import { GetStarted } from './pages/GetStarted';
import { Pricing } from './pages/Pricing';
import { Rewards } from './pages/Rewards';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Locations,
  },
  {
    path: '/get-started',
    Component: GetStarted,
  },
  {
    path: '/pricing',
    Component: Pricing,
  },
  {
    path: '/rewards',
    Component: Rewards,
  },
  {
    path: '/location/:locationId',
    Component: Canteens,
  },
  {
    path: '/canteen/:canteenId',
    Component: Menu,
  },
  {
    path: '/cart',
    Component: Cart,
  },
  {
    path: '/checkout',
    Component: Checkout,
  },
  {
    path: '/orders',
    Component: Orders,
  },
]);