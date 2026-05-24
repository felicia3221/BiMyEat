import { Link, useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Check, Crown, Zap, Sparkles, ArrowLeft } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { toast } from 'sonner';

const pricingPlans = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: '15rb',
    period: '/bulan',
    badge: null,
  },
  {
    id: 'bimonthly',
    name: 'Bi-Monthly',
    price: '25rb',
    period: '/2 bulan',
    badge: 'Best Value',
    highlighted: true,
  },
  {
    id: 'semester',
    name: 'Semester',
    price: '80rb',
    period: '/6 bulan',
    badge: null,
  },
];

export function Pricing() {
  const navigate = useNavigate();
  const { user, upgradeMembership } = useUser();

  const handleSelectPlan = (planId: string) => {
    if (!user) {
      toast.error('Silakan login terlebih dahulu');
      navigate('/get-started');
      return;
    }

    // Upgrade membership (gratis untuk sekarang)
    upgradeMembership(planId);
    toast.success('Berhasil upgrade ke Pro Member! 🎉');
    navigate('/');
  };

  return (
    <div className="relative min-h-screen bg-[#faf9f7] font-sans overflow-hidden">
      {/* 🌸 Floating Pastel Glow Background */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Floating Food Emojis */}
      <div className="absolute top-24 right-16 text-5xl opacity-10 animate-float">👑</div>
      <div className="absolute bottom-32 left-20 text-5xl opacity-10 animate-float" style={{ animationDelay: '1.5s' }}>⚡</div>

      {/* Back Button */}
      <div className="absolute top-6 left-6 z-50 animate-fade-in">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          className="rounded-xl hover:bg-white/50 backdrop-blur-sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Button>
      </div>

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
        {/* Pricing Cards */}
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
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Gratis Priority Order setiap pembelian</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Dapat poin rewards di semua pesanan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Diskon eksklusif member</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">Skip antrian guaranteed</span>
                    </li>
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
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={user?.isMember}
                >
                  {user?.isMember ? 'Sudah Member' : `Pilih ${plan.name}`}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Continue as Free User */}
        <div className="text-center pt-8 pb-12 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <p className="text-gray-600 mb-2">Belum siap upgrade?</p>
          <Button variant="ghost" asChild className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
            <Link to="/">
              Lanjut sebagai Free User →
            </Link>
          </Button>
        </div>

        {/* Member vs Free Comparison */}
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
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-500" />
                    <span className="text-gray-700">Gratis Priority Order (hemat 2rb-5rb tiap order)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-500" />
                    <span className="text-gray-700">Dapat poin di setiap pembelian</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-500" />
                    <span className="text-gray-700">Tukar poin untuk voucher diskon</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-500" />
                    <span className="text-gray-700">Skip antrian guaranteed</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-600 text-lg">Free Users</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-gray-400" />
                    Bayar 2rb-5rb untuk Priority Order (surge pricing berlaku)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-gray-400" />
                    Tidak dapat reward poin
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-gray-400" />
                    Harga standar
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-gray-400" />
                    Antri regular
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
