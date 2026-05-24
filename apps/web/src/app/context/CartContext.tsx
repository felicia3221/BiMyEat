import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, MenuItem, Order } from '../types';

interface CartContextType {
  cart: CartItem[];
  orders: Order[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  createOrder: (pickupTime: string, paymentMethod: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  
  // 1. Ambil data dengan aman (dilengkapi try-catch)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('bimy_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const savedOrders = localStorage.getItem('bimy_orders');
      if (savedOrders) {
        const parsedOrders = JSON.parse(savedOrders);
        return parsedOrders.map((order: any) => ({
          ...order,
          createdAt: new Date(order.createdAt),
        }));
      }
      return [];
    } catch {
      return [];
    }
  });

  // 2. FUNGSI KUNCI: Helper untuk update State SEKALIGUS simpan ke LocalStorage seketika!
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('bimy_cart', JSON.stringify(newCart));
  };

  const saveOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    localStorage.setItem('bimy_orders', JSON.stringify(newOrders));
  };

  // 3. Kita ubah semua aksi untuk menggunakan fungsi Helper di atas

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      saveCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      saveCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: string) => {
    saveCart(cart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    saveCart(
      cart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    saveCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const createOrder = (pickupTime: string, paymentMethod: string) => {
    if (cart.length === 0) return;
    
    const canteenId = cart[0].canteenId;
    const canteenName = cart[0].canteenId; // Info: Ini bisa di-improve ambil nama dari canteens.ts nanti
    
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      canteenId,
      canteenName,
      items: [...cart],
      total: getCartTotal(),
      pickupTime,
      paymentMethod,
      status: 'confirmed',
      createdAt: new Date(),
    };
    
    // Langsung simpan pesanan dan hapus keranjang secara sinkron
    saveOrders([newOrder, ...orders]);
    clearCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}