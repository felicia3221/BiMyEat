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

interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updatePoints: (newPoints: number) => void;
  addPoints: (points: number) => void;
  upgradeMembership: (tier: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Load from localStorage on init
    const saved = localStorage.getItem('biMyEatUser');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    // Save to localStorage whenever user changes
    if (user) {
      localStorage.setItem('biMyEatUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('biMyEatUser');
    }
  }, [user]);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updatePoints = (newPoints: number) => {
    if (user) {
      setUser({ ...user, points: newPoints });
    }
  };

  const addPoints = (points: number) => {
    if (user) {
      setUser({ ...user, points: user.points + points });
    }
  };

  const upgradeMembership = (tier: string) => {
    if (user) {
      setUser({ ...user, isMember: true, membershipTier: tier });
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updatePoints, addPoints, upgradeMembership }}>
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
