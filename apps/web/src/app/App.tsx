import { RouterProvider } from 'react-router';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import { Toaster } from './components/ui/sonner';
import { router } from './routes';

export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </CartProvider>
    </UserProvider>
  );
}
