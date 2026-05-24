import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Check, Crown, Zap, ArrowLeft, CreditCard, Wallet, Building2, X } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { toast } from 'sonner';

const pricingPlans = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: '15rb',
    priceNumber: 15000,
    period: '/bulan',
    badge: null,
  },
  {
    id: 'bimonthly',
    name: 'Bi-Monthly',
    price: '25rb',
    priceNumber: 25000,
    period: '/2 bulan',
    badge: 'Best Value',
    highlighted: true,
  },
  {
    id: 'semester',
    name: 'Semester',
    price: '80rb',
    priceNumber: 80000,
    period: '/6 bulan',
    badge: null,
  },
];

const paymentMethods = [
  { id: 'transfer', label: 'Transfer Bank', icon: Building2 },
  { id: 'ewallet', label: 'E-Wallet', icon: Wallet },
  { id: 'card', label: 'Kartu Kredit/Debit', icon: CreditCard },
];

export function Pricing() {
  const navigate = useNavigate();
  const { user, upgradeMembership } = useUser();

  const [selectedPlan, setSelectedPlan] = useState<typeof pricingPlans[0] | null>(null);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [ewalletData, setEwalletData] = useState({ phone: '' });

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

  const handleSelectPlan = (plan: typeof pricingPlans[0]) => {
    if (!user) {
      toast.error('Silakan login terlebih dahulu');
      navigate('/get-started');
      return;
    }
    setSelectedPlan(plan);
    setSelectedPayment('');
  };

  const handlePay = () => {
    if (!selectedPayment) {
      toast.error('Pilih metode pembayaran dulu');
      return;
    }
    if (selectedPayment === 'card' && (!cardData.number || !cardData.name || !cardData.expiry || !cardData.cvv)) {
      toast.error('Lengkapi data kartu dulu');
      return;
    }
    if (selectedPayment === 'ewallet' && !ewalletData.phone) {
      toast.error('Masukkan nomor HP dulu');
      return;
    }

    upgradeMembership(selectedPlan!.id);
    toast.success('Pembayaran berhasil! Selamat datang Pro Member 🎉');
    setSelectedPlan(null);
    navigate('/');
  };

  return (
    <div className="relative min-h-screen bg-[#faf9f7] font-sans overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="absolute top-24 right-16 text-5xl opacity-10 animate-float">👑</div>
      <div className="absolute bottom-32 left-20 text-5xl opacity-10 animate-float" style={{ animationDelay: '1.5s' }}>⚡</div>

      {/* Back Button */}
      <div className="absolute top-6 left-6 z-50 animate-fade-in">
        <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="rounded-xl hover:bg-white/50 backdrop-blur-sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Button>
      </div>

      {/* Payment Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <Card className="w-full max-w-md rounded-3xl bg-white border border-gray-100 shadow-2xl animate-fade-up">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-gray-900">Pembayaran</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setSelectedPlan(null)} className="rounded-xl">
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 rounded-2xl p-4 border border-purple-100 mt-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900">Paket {selectedPlan.name}</p>
                    <p className="text-sm text-gray-500">{selectedPlan.period}</p>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">{selectedPlan.price}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Pilih Metode */}
              <div>
                <Label className="text-gray-700 font-medium mb-3 block">Metode Pembayaran</Label>
                <div className="grid grid-cols-3 gap-3">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all text-sm font-medium ${
                          selectedPayment === method.id
                            ? 'border-purple-400 bg-purple-50 text-purple-700'
                            : 'border-gray-200 bg-white text-gray-600 hover:border-purple-200'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-xs text-center">{method.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Transfer Bank */}
              {selectedPayment === 'transfer' && (
                <div className="bg-gray-50 rounded-2xl p-4 space-y-2 text-sm">
                  <p className="font-semibold text-gray-900">Transfer ke:</p>
                  <p className="text-gray-700">BCA — <span className="font-mono font-bold">1234567890</span></p>
                  <p className="text-gray-700">a.n. <span className="font-medium">BiMyEat Official</span></p>
                  <p className="text-gray-500 text-xs mt-2">Konfirmasi pembayaran akan diverifikasi dalam 1x24 jam</p>
                </div>
              )}

              {/* E-Wallet */}
              {selectedPayment === 'ewallet' && (
                <div className="space-y-3">
                  <Label className="text-gray-700">Nomor HP (GoPay / OVO / Dana)</Label>
                  <Input
                    placeholder="08123456789"
                    className="rounded-2xl border-gray-200 h-11"
                    value={ewalletData.phone}
                    onChange={(e) => setEwalletData({ phone: e.target.value })}
                  />
                </div>
              )}

              {/* Kartu */}
              {selectedPayment === 'card' && (
                <div className="space-y-3">
                  <div>
                    <Label className="text-gray-700">Nomor Kartu</Label>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      className="rounded-2xl border-gray-200 h-11 mt-1"
                      maxLength={19}
                      value={cardData.number}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 16);
                        const formatted = val.replace(/(.{4})/g, '$1 ').trim();
                        setCardData({ ...cardData, number: formatted });
                      }}
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700">Nama di Kartu</Label>
                    <Input
                      placeholder="JOHN DOE"
                      className="rounded-2xl border-gray-200 h-11 mt-1"
                      value={cardData.name}
                      onChange={(e) => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-gray-700">Expired (MM/YY)</Label>
                      <Input
                        placeholder="12/27"
                        className="rounded-2xl border-gray-200 h-11 mt-1"
                        maxLength={5}
                        value={cardData.expiry}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                          const formatted = val.length > 2 ? val.slice(0, 2) + '/' + val.slice(2) : val;
                          setCardData({ ...cardData, expiry: formatted });
                        }}
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700">CVV</Label>
                      <Input
                        placeholder="123"
                        type="password"
                        className="rounded-2xl border-gray-200 h-11 mt-1"
                        maxLength={3}
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '') })}
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              <Button
                className="w-full h-12 rounded-2xl bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-gray-800 font-medium hover:opacity-90 transition-all shadow-sm"
                onClick={handlePay}
                disabled={!selectedPayment}
              >
                Bayar {formatPrice(selectedPlan.priceNumber)}
              </Button>
              <p className="text-xs text-gray-400 text-center">🔒 Pembayaran aman & terenkripsi</p>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Header */}
      <header className="relative bg-white/70 backdrop-blur-md border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 px-6 py-2 rounded-full mb-6 border border-purple-200/50">
              <Crown className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium text-purple-700">Pro Membership</span>
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
              Pilih Paket <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">Membership</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Semua paket include gratis priority order dan rewards eksklusif
            </p>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {pricingPlans.map((plan, index) => (
            <Card
              key={plan.id}
              className={`relative rounded-3xl bg-white/80 backdrop-blur-md border transition-all duration-500 hover:-translate-y-2 animate-fade-up ${
                plan.highlighted
                  ? 'border-purple-300 shadow-2xl scale-105 hover:shadow-2xl'
                  : 'border-gray-100 shadow-sm hover:shadow-xl'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.badge && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white border-0 hover:opacity-90">
                  {plan.badge}
                </Badge>
              )}
              <CardHeader className="text-center space-y-2 pt-8">
                <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                <CardDescription className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 px-6">
                <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 rounded-2xl p-4 border border-purple-100">
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-gray-900">
                    <Zap className="w-5 h-5 text-purple-500" />
                    Benefit Member
                  </h4>
                  <ul className="space-y-2">
                    {['Gratis Priority Order setiap pembelian', 'Dapat poin rewards di semua pesanan', 'Diskon eksklusif member', 'Skip antrian guaranteed'].map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-xs text-gray-500 text-center">
                  {plan.id === 'monthly' && 'Cocok untuk mencoba membership'}
                  {plan.id === 'bimonthly' && 'Hemat lebih banyak dengan paket 2 bulan'}
                  {plan.id === 'semester' && 'Paling hemat untuk satu semester penuh'}
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6">
                <Button
                  className="w-full h-12 rounded-2xl bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-gray-800 font-medium hover:opacity-90 transition-all shadow-sm"
                  onClick={() => handleSelectPlan(plan)}
                  disabled={user?.isMember}
                >
                  {user?.isMember ? 'Sudah Member' : `Pilih ${plan.name}`}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center pt-8 pb-12 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <p className="text-gray-600 mb-2">Belum siap upgrade?</p>
          <Button variant="ghost" asChild className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
            <Link to="/">Lanjut sebagai Free User →</Link>
          </Button>
        </div>

        <Card className="mt-12 rounded-3xl bg-white/80 backdrop-blur-md border border-gray-100 shadow-sm animate-fade-up" style={{ animationDelay: '0.5s' }}>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-gray-900">Member vs Free User</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-3">
                <h3 className="font-semibold text-purple-600 flex items-center gap-2 text-lg">
                  <Crown className="w-5 h-5" />
                  Pro Members
                </h3>
                <ul className="space-y-2 text-sm">
                  {['Gratis Priority Order (hemat 2rb-5rb tiap order)', 'Dapat poin di setiap pembelian', 'Tukar poin untuk voucher diskon', 'Skip antrian guaranteed'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-purple-500" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-600 text-lg">Free Users</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {['Bayar 2rb-5rb untuk Priority Order (surge pricing berlaku)', 'Tidak dapat reward poin', 'Harga standar', 'Antri regular'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-gray-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}