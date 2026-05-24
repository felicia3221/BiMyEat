import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  name: string;
  email: string;
  phone?: string;
  studentId?: string;
  points: number;
  isMember: boolean;
  membershipTier?: string;
}

export interface Voucher {
  id: string;
  title: string;
  description: string;
  code: string;
  discount: number; // persentase diskon
  claimedAt: string;
}

interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updatePoints: (newPoints: number) => void;
  addPoints: (points: number) => void;
  redeemPoints: (cost: number, voucher: Omit<Voucher, 'claimedAt'>) => boolean;
  upgradeMembership: (tier: string) => void;
  claimedVouchers: Voucher[];
  useVoucher: (code: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('biMyEatUser');
    return saved ? JSON.parse(saved) : null;
  });

  const [claimedVouchers, setClaimedVouchers] = useState<Voucher[]>(() => {
    const saved = localStorage.getItem('biMyEatVouchers');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('biMyEatUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('biMyEatUser');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('biMyEatVouchers', JSON.stringify(claimedVouchers));
  }, [claimedVouchers]);

  const login = (userData: User) => setUser(userData);

  const logout = () => {
    setUser(null);
    setClaimedVouchers([]);
    localStorage.removeItem('biMyEatVouchers');
  };

  const updatePoints = (newPoints: number) => {
    if (user) setUser({ ...user, points: newPoints });
  };

  const addPoints = (points: number) => {
    if (user) setUser({ ...user, points: user.points + points });
  };

  // Kurangi poin dan tambah voucher, return false kalau poin kurang
  const redeemPoints = (cost: number, voucher: Omit<Voucher, 'claimedAt'>): boolean => {
    if (!user || user.points < cost) return false;
    setUser({ ...user, points: user.points - cost });
    setClaimedVouchers(prev => [...prev, {
      ...voucher,
      claimedAt: new Date().toISOString(),
    }]);
    return true;
  };

  // Hapus voucher setelah dipakai di checkout
  const useVoucher = (code: string) => {
    setClaimedVouchers(prev => prev.filter(v => v.code !== code));
  };

  const upgradeMembership = (tier: string) => {
    if (user) setUser({ ...user, isMember: true, membershipTier: tier });
  };

  return (
    <UserContext.Provider value={{
      user, login, logout,
      updatePoints, addPoints, redeemPoints,
      upgradeMembership,
      claimedVouchers, useVoucher,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}