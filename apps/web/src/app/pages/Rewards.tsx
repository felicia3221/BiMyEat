import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { toast } from 'sonner';

import {
  Trophy,
  Gift,
  Sparkles,
  TrendingUp,
  Crown,
  Tag,
  CheckCircle2,
  Clock
} from 'lucide-react';

export function Rewards() {
  const navigate = useNavigate();
  const { user, claimedVouchers, redeemPoints } = useUser();
  const pointsNeeded = 100;
  const currentPoints = user?.points || 0;
  const progressPercentage = (currentPoints / pointsNeeded) * 100;

  useEffect(() => {
    if (!user) {
      navigate('/get-started');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  // Calculate total earned (example: current + redeemed)
  const totalEarned = currentPoints + 300; // Mock data: assume 300 points already redeemed

  // Recent point activity
  const pointHistory = [
    { date: '2026-05-14', description: 'Order #1234 - Nasi Goreng', points: 25, type: 'earned' },
    { date: '2026-05-12', description: 'Order #1233 - Bakmi Special', points: 30, type: 'earned' },
    { date: '2026-05-10', description: 'Redeem voucher Free Drink', points: -100, type: 'redeemed' },
    { date: '2026-05-08', description: 'Order #1232 - Mie Ayam', points: 20, type: 'earned' },
  ];

  return (
    <div className="relative min-h-screen bg-[#faf9f7] font-sans overflow-hidden">
      {/* 🌸 Floating Pastel Glow Background */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Floating Emojis */}
      <div className="absolute top-24 right-16 text-5xl opacity-10 animate-float">🎁</div>
      <div className="absolute bottom-32 left-20 text-5xl opacity-10 animate-float" style={{ animationDelay: '1.5s' }}>🏆</div>

      {/* Header */}
      <header className="relative bg-white/70 backdrop-blur-md border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-12 flex items-center justify-between">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 px-6 py-2 rounded-full mb-4 border border-purple-200/50">
              <Trophy className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium text-purple-700">Rewards Dashboard</span>
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
              Rewards Kamu
            </h1>
            <p className="mt-3 text-base text-gray-500">
              Dapat poin setiap pembelian dan tukar dengan rewards eksklusif
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="rounded-xl hover:bg-white/50 animate-fade-in"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-6 py-14 space-y-8">
        {/* Points Tracker Card */}
        <Card className="rounded-3xl bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border-2 border-purple-200/50 shadow-xl animate-fade-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Sparkles className="w-6 h-6 text-purple-500" />
              Poin Kamu
            </CardTitle>
            <CardDescription className="text-gray-600">Dapat 1 poin untuk setiap 1.000rb belanja</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
                    {currentPoints}
                  </div>
                  <div className="text-sm text-gray-600">poin tersedia</div>
                </div>
                {currentPoints < pointsNeeded && (
                  <div className="text-right">
                    <div className="text-2xl font-semibold text-gray-900">{pointsNeeded - currentPoints}</div>
                    <div className="text-sm text-gray-600">poin lagi</div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Progress value={Math.min(progressPercentage, 100)} className="h-3" />
                <p className="text-xs text-center text-gray-500">
                  {currentPoints >= pointsNeeded
                    ? '100 poin sudah tercapai! 🎉'
                    : `${progressPercentage.toFixed(0)}% menuju 100 poin`}
                </p>
              </div>     
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 text-purple-600 mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs font-medium">Total Dapat</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{totalEarned}</div>
                <div className="text-xs text-gray-500">poin lifetime</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 text-pink-600 mb-1">
                  <Gift className="w-4 h-4" />
                  <span className="text-xs font-medium">Ditukar</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">3</div>
                <div className="text-xs text-gray-500">voucher terpakai</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Redemption Section */}
        <div className="space-y-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <Tag className="w-6 h-6 text-purple-500" />
            Tukar Poin
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Voucher 10% */}
            <Card className={`rounded-3xl bg-white/80 backdrop-blur-md border-2 border-dashed transition-colors shadow-sm ${
              currentPoints >= 100 ? 'border-purple-300 hover:border-purple-500 cursor-pointer' : 'border-gray-200 opacity-60'
            }`}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center flex-shrink-0">
                    <Tag className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 text-gray-900">Voucher 10% OFF</h3>
                    <p className="text-sm text-gray-600 mb-3">Valid untuk semua menu</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-0">
                        100 poin
                      </Badge>
                      <Button
                        size="sm"
                        className="rounded-xl"
                        disabled={currentPoints < 100}
                        onClick={() => {
                          const success = redeemPoints(100, {
                            id: 'voucher-10',
                            title: 'Voucher 10% OFF',
                            description: 'Valid untuk semua menu',
                            code: 'REWARD10',
                            discount: 10,
                          });
                          if (success) toast.success('Voucher 10% OFF berhasil ditukar! 🎉');
                          else toast.error('Poin tidak cukup');
                        }}
                      >
                        {currentPoints >= 100 ? 'Tukar' : `${currentPoints}/100`}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Voucher 15% */}
            <Card className={`rounded-3xl bg-white/80 backdrop-blur-md border-2 border-dashed transition-colors shadow-sm ${
              currentPoints >= 150 ? 'border-purple-300 hover:border-purple-500 cursor-pointer' : 'border-gray-200 opacity-60'
            }`}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center flex-shrink-0">
                    <Crown className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 text-gray-900">Voucher 15% OFF</h3>
                    <p className="text-sm text-gray-600 mb-3">Minimum pembelian 50rb</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-0">
                        150 poin
                      </Badge>
                      <Button
                        size="sm"
                        className="rounded-xl"
                        disabled={currentPoints < 150}
                        onClick={() => {
                          const success = redeemPoints(150, {
                            id: 'voucher-15',
                            title: 'Voucher 15% OFF',
                            description: 'Minimum pembelian 50rb',
                            code: 'REWARD15',
                            discount: 15,
                          });
                          if (success) toast.success('Voucher 15% OFF berhasil ditukar! 🎉');
                          else toast.error('Poin tidak cukup');
                        }}
                      >
                        {currentPoints >= 150 ? 'Tukar' : `${currentPoints}/150`}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Vouchers Section */}
        <div className="space-y-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <Gift className="w-6 h-6 text-purple-500" />
            Voucher Kamu
          </h2>

          {claimedVouchers.length === 0 ? (
            <Card className="rounded-3xl bg-white/80 backdrop-blur-md border border-gray-100 shadow-sm">
              <CardContent className="py-12 text-center">
                <Gift className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Belum ada voucher. Tukar poinmu di atas!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {claimedVouchers.map((voucher) => (
                <Card
                  key={voucher.id}
                  className="rounded-3xl bg-white/80 backdrop-blur-md border-2 border-dashed border-purple-300 bg-gradient-to-r from-purple-50/50 via-pink-50/50 to-blue-50/50 shadow-sm"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{voucher.title}</h3>
                          <Badge className="bg-gradient-to-r from-purple-400 to-pink-400 text-white border-0">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Claimed
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{voucher.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="font-mono bg-white px-3 py-1.5 rounded-xl border border-gray-200 text-gray-900">
                            {voucher.code}
                          </div>
                          <div className="flex items-center gap-1 text-gray-500">
                            <Clock className="w-4 h-4" />
                            Diklaim {new Date(voucher.claimedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => navigate('/checkout')}
                        className="rounded-2xl bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-gray-800 font-medium hover:opacity-90 transition-all shadow-sm"
                      >
                        Pakai di Checkout
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Point History */}
        <Card className="rounded-3xl bg-white/80 backdrop-blur-md border border-gray-100 shadow-sm animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle className="text-gray-900">Aktivitas Terakhir</CardTitle>
            <CardDescription className="text-gray-600">Riwayat dapat dan tukar poin kamu</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pointHistory.map((activity, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'earned'
                          ? 'bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600'
                          : 'bg-orange-100 text-orange-600'
                      }`}>
                        {activity.type === 'earned' ? (
                          <TrendingUp className="w-5 h-5" />
                        ) : (
                          <Gift className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(activity.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className={`font-semibold ${
                      activity.type === 'earned' ? 'text-purple-600' : 'text-orange-600'
                    }`}>
                      {activity.points > 0 ? '+' : ''}{activity.points} pts
                    </div>
                  </div>
                  {index < pointHistory.length - 1 && <Separator className="bg-gray-100" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
