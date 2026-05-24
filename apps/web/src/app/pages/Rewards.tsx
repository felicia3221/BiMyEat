import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
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
  const { user } = useUser();
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

  // Mock vouchers
  const vouchers = [
    {
      id: 1,
      title: '10% OFF Discount',
      description: 'Valid untuk semua menu',
      status: 'claimed',
      expiresAt: '2026-06-14',
      code: 'REWARD10',
    },
    {
      id: 2,
      title: '15% OFF Discount',
      description: 'Minimum pembelian 50rb',
      status: 'available',
      expiresAt: '2026-07-14',
      code: 'REWARD15',
      pointsCost: 150,
    },
    {
      id: 3,
      title: 'Free Drink',
      description: 'Minuman dingin gratis',
      status: 'used',
      usedAt: '2026-05-10',
      code: 'FREEDRINK',
    },
  ];

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
                  <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">{currentPoints}</div>
                  <div className="text-sm text-gray-600">poin tersedia</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-semibold text-gray-900">{pointsNeeded - currentPoints}</div>
                  <div className="text-sm text-gray-600">poin lagi</div>
                </div>
              </div>

              <div className="space-y-2">
                <Progress value={progressPercentage} className="h-3" />
                <p className="text-xs text-center text-gray-500">
                  {progressPercentage.toFixed(0)}% menuju 100 poin berikutnya
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
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              <Tag className="w-6 h-6 text-purple-500" />
              Tukar Poin
            </h2>
            <Button
              disabled={currentPoints < 100}
              className="rounded-2xl bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-gray-800 font-medium hover:opacity-90 transition-all shadow-sm disabled:opacity-50"
            >
              <Gift className="w-4 h-4 mr-2" />
              Konversi Poin
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="rounded-3xl bg-white/80 backdrop-blur-md border-2 border-dashed border-purple-300 hover:border-purple-500 transition-colors cursor-pointer shadow-sm hover:shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center flex-shrink-0">
                    <Tag className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 text-gray-900">Voucher 10% OFF</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Valid untuk semua menu
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-0">
                        100 poin
                      </Badge>
                      <Button size="sm" disabled={currentPoints < 100} className="rounded-xl">
                        Tukar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl bg-white/80 backdrop-blur-md border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors opacity-60 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Crown className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 text-gray-900">Voucher 15% OFF</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Minimum pembelian 50rb
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-0">
                        150 poin
                      </Badge>
                      <Button size="sm" disabled className="rounded-xl">
                        {currentPoints}/150
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

          <div className="grid gap-4">
            {vouchers.map((voucher, index) => (
              <Card
                key={voucher.id}
                className={`rounded-3xl bg-white/80 backdrop-blur-md border-2 border-dashed shadow-sm animate-fade-up ${
                  voucher.status === 'claimed'
                    ? 'border-purple-300 bg-gradient-to-r from-purple-50/50 via-pink-50/50 to-blue-50/50'
                    : voucher.status === 'used'
                    ? 'border-gray-300 opacity-60'
                    : 'border-blue-300 bg-blue-50/30'
                }`}
                style={{ animationDelay: `${0.3 + index * 0.05}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{voucher.title}</h3>
                        {voucher.status === 'claimed' && (
                          <Badge className="bg-gradient-to-r from-purple-400 to-pink-400 text-white border-0">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Claimed
                          </Badge>
                        )}
                        {voucher.status === 'used' && (
                          <Badge variant="secondary" className="bg-gray-200 text-gray-600 border-0">Terpakai</Badge>
                        )}
                        {voucher.status === 'available' && (
                          <Badge variant="outline" className="border-blue-400 text-blue-700 bg-blue-50">
                            Tersedia
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{voucher.description}</p>

                      {voucher.status !== 'used' && (
                        <div className="flex items-center gap-4 text-sm">
                          <div className="font-mono bg-white px-3 py-1.5 rounded-xl border border-gray-200 text-gray-900">
                            {voucher.code}
                          </div>
                          {voucher.expiresAt && (
                            <div className="flex items-center gap-1 text-gray-500">
                              <Clock className="w-4 h-4" />
                              Berlaku hingga {new Date(voucher.expiresAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </div>
                          )}
                        </div>
                      )}
                      {voucher.status === 'used' && voucher.usedAt && (
                        <div className="text-sm text-gray-500">
                          Dipakai pada {new Date(voucher.usedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                      )}
                    </div>

                    {voucher.status === 'claimed' && (
                      <Button className="rounded-2xl bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-gray-800 font-medium hover:opacity-90 transition-all shadow-sm">
                        Pakai di Checkout
                      </Button>
                    )}
                    {voucher.status === 'available' && voucher.pointsCost && (
                      <Button variant="outline" disabled={currentPoints < voucher.pointsCost} className="rounded-2xl">
                        Claim {voucher.pointsCost} pts
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
