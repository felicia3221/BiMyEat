import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';

interface Profile {
  full_name: string | null;
  phone: string | null;
  student_id: string | null;
  points: number;
  is_member: boolean;
  membership_tier?: string | null;
}

export interface Voucher {
  id: string;
  title: string;
  description: string;
  code: string;
  discount: number; // persentase diskon
  claimedAt: string;
}

interface SignUpMeta {
  fullName: string;
  phone?: string;
  studentId?: string;
}

interface UserContextType {
  // auth state
  user: SupabaseUser | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;

  // auth actions
  signUp: (email: string, password: string, meta: SignUpMeta) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;

  // app data (points/membership) — dibaca dari tabel profiles
  addPoints: (points: number) => Promise<void>;
  upgradeMembership: (tier: string) => Promise<void>;

  // vouchers — TODO: masih localStorage, belum dipindah ke Supabase.
  // Rencana selanjutnya: tabel `vouchers` sendiri, foreign key ke user id.
  claimedVouchers: Voucher[];
  redeemPoints: (cost: number, voucher: Omit<Voucher, 'claimedAt'>) => Promise<boolean>;
  useVoucher: (code: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // vouchers tetap localStorage untuk sekarang, tapi di-scope per user id
  // biar ganti akun nggak ketuker vouchernya.
  const [claimedVouchers, setClaimedVouchers] = useState<Voucher[]>([]);

  const voucherStorageKey = (userId: string) => `biMyEatVouchers_${userId}`;

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Gagal ambil profile:', error.message);
      setProfile(null);
      return;
    }
    setProfile(data);
  };

  const loadVouchersFor = (userId: string) => {
    const saved = localStorage.getItem(voucherStorageKey(userId));
    setClaimedVouchers(saved ? JSON.parse(saved) : []);
  };

  useEffect(() => {
    // ambil session yang udah ada (misal user refresh halaman)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
        loadVouchersFor(session.user.id);
      }
      setLoading(false);
    });

    // dengerin perubahan auth: login, logout, token refresh
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
        loadVouchersFor(session.user.id);
      } else {
        setProfile(null);
        setClaimedVouchers([]);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, meta: SignUpMeta) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: meta.fullName,
          phone: meta.phone ?? null,
          student_id: meta.studentId ?? null,
        },
      },
    });
    return { error: error?.message ?? null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    // state user/profile/claimedVouchers otomatis kereset lewat onAuthStateChange di atas
  };

  const addPoints = async (points: number) => {
    if (!user || !profile) return;
    const newPoints = profile.points + points;
    const { error } = await supabase
      .from('profiles')
      .update({ points: newPoints })
      .eq('id', user.id);
    if (error) {
      console.error('Gagal update points:', error.message);
      return;
    }
    setProfile({ ...profile, points: newPoints });
  };

  const upgradeMembership = async (tier: string) => {
    if (!user || !profile) return;
    const { error } = await supabase
      .from('profiles')
      .update({ is_member: true, membership_tier: tier })
      .eq('id', user.id);
    if (error) {
      console.error('Gagal upgrade membership:', error.message);
      return;
    }
    setProfile({ ...profile, is_member: true, membership_tier: tier });
  };

  // Kurangi poin dan tambah voucher. Return false kalau poin kurang.
  const redeemPoints = async (cost: number, voucher: Omit<Voucher, 'claimedAt'>): Promise<boolean> => {
    if (!user || !profile || profile.points < cost) return false;

    const newPoints = profile.points - cost;
    const { error } = await supabase
      .from('profiles')
      .update({ points: newPoints })
      .eq('id', user.id);
    if (error) {
      console.error('Gagal redeem points:', error.message);
      return false;
    }
    setProfile({ ...profile, points: newPoints });

    const newVoucher: Voucher = { ...voucher, claimedAt: new Date().toISOString() };
    const updated = [...claimedVouchers, newVoucher];
    setClaimedVouchers(updated);
    localStorage.setItem(voucherStorageKey(user.id), JSON.stringify(updated));
    return true;
  };

  // Hapus voucher setelah dipakai di checkout
  const useVoucher = (code: string) => {
    if (!user) return;
    const updated = claimedVouchers.filter((v) => v.code !== code);
    setClaimedVouchers(updated);
    localStorage.setItem(voucherStorageKey(user.id), JSON.stringify(updated));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        signUp,
        signIn,
        signOut,
        addPoints,
        upgradeMembership,
        claimedVouchers,
        redeemPoints,
        useVoucher,
      }}
    >
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
