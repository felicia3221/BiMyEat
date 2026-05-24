import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, CreditCard, Wallet, Smartphone, QrCode, AlertCircle, Zap, Crown, Info, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Switch } from '../components/ui/switch';
import { toast } from 'sonner';

export function Checkout() {
  const { cart, getCartTotal, createOrder } = useCart();
  const { user, addPoints } = useUser();
  const navigate = useNavigate();
  const [pickupTime, setPickupTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [priorityOrderEnabled, setPriorityOrderEnabled] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Priority Order fee logic
  const getPriorityFee = () => {
    if (!priorityOrderEnabled) return 0;
    if (user?.isMember) return 0; // Free for members

    // Non-members: surge pricing between 2rb-5rb
    // In real app, this would be dynamic based on demand
    return 3500; // Example surge price
  };

  const priorityFee = getPriorityFee();
  const subtotal = getCartTotal();
  const platformFee = 2000;
  const total = subtotal + platformFee + priorityFee;

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      toast.error('Silakan login terlebih dahulu');
      navigate('/get-started');
    }
  }, [user, navigate]);

 // Logika baru untuk slot waktu 30 menitan (Mulai 07:30 - 16:30)
  const generateTimeSlots = () => {
    const slots = [];
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();

    // Membulatkan ke 30 menit selanjutnya
    if (minute < 30) {
      minute = 30;
    } else {
      minute = 0;
      hour += 1;
    }

    // Jika memesan sebelum jam buka kantin, slot pengambilan PERTAMA adalah 07:30
    if (hour < 7 || (hour === 7 && minute < 30)) {
      hour = 7;
      minute = 30;
    }

    // Generate slot waktu sampai maksimal 16:30
    while (hour < 16 || (hour === 16 && minute <= 30)) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push(timeString);

      // Tambah 30 menit
      minute += 30;
      if (minute >= 60) {
        minute = 0;
        hour += 1;
      }
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Redirect jika cart kosong
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/');
    }
  }, [cart.length, navigate]);

  const handleSubmitOrder = () => {
    if (timeSlots.length === 0) return toast.error('Maaf, kantin sudah tutup.');
    if (!pickupTime) return toast.error('Pilih waktu pengambilan');
    if (!paymentMethod) return toast.error('Pilih metode pembayaran');

    if (!user) {
      toast.error('Silakan login terlebih dahulu');
      navigate('/get-started');
      return;
    }

    // Calculate points earned (1 point per 1000 rupiah)
    const pointsEarned = Math.floor(total / 1000);

    // Add points to user
    addPoints(pointsEarned);

    createOrder(pickupTime, paymentMethod);
    toast.success(`Pesanan berhasil! Kamu dapat ${pointsEarned} poin 🎉`);
    navigate('/orders');
  };

  if (cart.length === 0) {
    return null;
  }

  // Data metode pembayaran dengan icon
  const paymentOptions = [
    { id: 'gopay', label: 'GoPay', icon: Smartphone, color: 'text-blue-400' },
    { id: 'ovo', label: 'OVO', icon: Wallet, color: 'text-purple-400' },
    { id: 'dana', label: 'DANA', icon: Wallet, color: 'text-blue-500' },
    { id: 'qris', label: 'QRIS', icon: QrCode, color: 'text-pink-400' },
  ];

  return (
    <div className="relative min-h-screen bg-[#faf9f7] font-sans overflow-hidden">

      {/* 🌸 Floating Pastel Glow Background */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>

      {/* Floating Food Emojis - Subtle */}
      <div className="absolute top-32 right-24 text-4xl opacity-10 animate-float">💳</div>
      <div className="absolute bottom-40 left-20 text-5xl opacity-10 animate-float" style={{ animationDelay: '1.3s' }}>⏰</div>

      {/* Header */}
      <header className="relative bg-white/70 backdrop-blur-md border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-12 flex items-center justify-between">
          <div className="animate-fade-in">
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
              Checkout
            </h1>
            <p className="mt-3 text-base text-gray-500">
              Atur waktu ambil & metode pembayaran 
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/cart')}
            className="rounded-xl hover:bg-white/50 animate-fade-in"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-12 lg:grid-cols-3">

          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-8">

            {/* Priority Order Toggle */}
            <Card
              className="rounded-3xl bg-white/80 backdrop-blur-md border-2 border-purple-200/50 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 animate-fade-up"
              style={{ animationDelay: '0s' }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                      <Zap className="h-5 w-5 text-purple-500" />
                      Priority Order
                    </CardTitle>
                    <CardDescription className="text-gray-500">
                      Skip antrian dan pesanan kamu diproses pertama
                    </CardDescription>
                  </div>
                  <Switch
                    checked={priorityOrderEnabled}
                    onCheckedChange={setPriorityOrderEnabled}
                    className="data-[state=checked]:bg-purple-400"
                  />
                </div>
              </CardHeader>

              {priorityOrderEnabled && (
                <CardContent className="space-y-4">
                  {user?.isMember ? (
                    // Member View
                    <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 border border-purple-200/50 rounded-2xl p-4">
                      <div className="flex items-start gap-3">
                        <Crown className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <h4 className="font-semibold text-gray-900">Member Perk Aktif</h4>
                          <p className="text-sm text-gray-700">
                            Priority Order <span className="font-semibold">GRATIS</span> untuk Pro Members.
                            Pesanan kamu akan diproses langsung!
                          </p>
                          <div className="flex items-center gap-2 text-xs text-purple-600 mt-2">
                            <Clock className="w-3 h-3" />
                            <span>Estimasi siap dalam 10-15 menit</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Non-Member View
                    <div className="bg-orange-50 border border-orange-200/50 rounded-2xl p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                          <Info className="w-4 h-4 text-orange-600" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <h4 className="font-semibold text-orange-900 flex items-center gap-2">
                            Priority Fee: 2rb - 5rb
                            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full border border-orange-200">
                              Surge Pricing
                            </span>
                          </h4>
                          <p className="text-sm text-orange-700">
                            Priority fee bervariasi berdasarkan demand saat ini. Fee akan muncul di ringkasan pesanan.
                          </p>
                          <div className="bg-purple-50 border border-purple-200/50 rounded-xl p-3 mt-3">
                            <div className="flex items-start gap-2">
                              <Crown className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                              <p className="text-sm text-purple-700">
                                <span className="font-semibold">Pro Members dapat Priority Order GRATIS!</span>
                                {' '}
                                <a href="/pricing" className="underline hover:text-purple-800">
                                  Upgrade sekarang
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-gray-500">
                    <Clock className="w-3 h-3 inline mr-1" />
                    Priority order diproses langsung dan siap pickup dalam 10-15 menit
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Pickup Time */}
            <Card 
              className="rounded-3xl bg-white/80 backdrop-blur-md border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 animate-fade-up"
              style={{ animationDelay: '0s' }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Clock className="h-5 w-5 text-purple-400" />
                  Waktu Pengambilan
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Pilih jam untuk mengambil pesanan Anda
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Pengecekan Jika Waktu Pemesanan Sudah Lewat dari 16:30 */}
                {timeSlots.length > 0 ? (
                  <RadioGroup value={pickupTime} onValueChange={setPickupTime}>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                      {timeSlots.map((time) => (
                        <div key={time}>
                          <RadioGroupItem value={time} id={time} className="peer sr-only" />
                          <Label
                            htmlFor={time}
                            className="flex cursor-pointer items-center justify-center rounded-2xl border border-gray-200 px-4 py-3 text-sm font-medium transition-all duration-300
                            hover:bg-gray-50 hover:border-gray-300
                            peer-data-[state=checked]:bg-gradient-to-r
                            peer-data-[state=checked]:from-pink-100
                            peer-data-[state=checked]:via-purple-100
                            peer-data-[state=checked]:to-blue-100
                            peer-data-[state=checked]:border-transparent
                            peer-data-[state=checked]:shadow-sm"
                          >
                            {time}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 bg-red-50/50 rounded-2xl border border-red-100">
                    <AlertCircle className="h-8 w-8 text-red-400 mb-2" />
                    <p className="text-red-600 font-medium text-center">
                      Maaf, jam pemesanan hari ini sudah ditutup.
                    </p>
                    <p className="text-red-400 text-sm mt-1 text-center">
                      Kantin beroperasi dari jam 07:00 hingga 16:30.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card 
              className={`rounded-3xl bg-white/80 backdrop-blur-md border border-gray-100 shadow-sm transition-all duration-500 animate-fade-up ${timeSlots.length === 0 ? 'opacity-50 pointer-events-none' : 'hover:shadow-xl hover:-translate-y-1'}`}
              style={{ animationDelay: '0.1s' }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <CreditCard className="h-5 w-5 text-pink-400" />
                  Metode Pembayaran
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Pilih metode pembayaran digital
                </CardDescription>
              </CardHeader>

              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-4">
                    {paymentOptions.map((method) => {
                      const Icon = method.icon;
                      return (
                        <div key={method.id}>
                          <RadioGroupItem value={method.id} id={method.id} className="peer sr-only" />
                          <Label
                            htmlFor={method.id}
                            className="flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-gray-200 p-4 transition-all duration-300
                            hover:bg-gray-50 hover:border-gray-300
                            peer-data-[state=checked]:bg-gradient-to-r
                            peer-data-[state=checked]:from-pink-100
                            peer-data-[state=checked]:via-purple-100
                            peer-data-[state=checked]:to-blue-100
                            peer-data-[state=checked]:border-transparent
                            peer-data-[state=checked]:shadow-sm"
                          >
                            <div className={`p-2 bg-white rounded-xl shadow-sm ${method.color}`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <span className="font-medium text-gray-900">{method.label}</span>
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT SECTION - SUMMARY */}
          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <Card className="sticky top-6 h-fit rounded-3xl bg-white/80 backdrop-blur-md border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Ringkasan Pesanan
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm text-gray-600">
                      <span className="truncate pr-4">{item.name} <span className="text-gray-400">x{item.quantity}</span></span>
                      <span className="font-medium text-gray-900 whitespace-nowrap">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4 mt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="text-gray-900">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Platform Fee</span>
                    <span className="text-gray-900">{formatPrice(platformFee)}</span>
                  </div>

                  {priorityOrderEnabled && (
                    <div className="flex justify-between items-center text-gray-600">
                      <span className="flex items-center gap-1">
                        Priority Fee
                        {!user?.isMember && (
                          <Info className="w-3 h-3 text-orange-500" />
                        )}
                      </span>
                      <span className={user?.isMember ? 'text-purple-600 font-medium' : 'text-gray-900'}>
                        {user?.isMember ? (
                          <span className="flex items-center gap-1">
                            <Crown className="w-3 h-3" />
                            GRATIS
                          </span>
                        ) : (
                          formatPrice(priorityFee)
                        )}
                      </span>
                    </div>
                  )}
                </div>

                {user?.isMember && priorityOrderEnabled && (
                  <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 border border-purple-200/50 rounded-xl p-3 text-xs text-purple-700">
                    <Crown className="w-3 h-3 inline mr-1" />
                    Kamu hemat {formatPrice(Math.floor(Math.random() * 3000 + 2000))} dengan Pro Membership
                  </div>
                )}

                <div className="bg-yellow-50 border border-yellow-200/50 rounded-xl p-3 text-xs text-yellow-700">
                  <Sparkles className="w-3 h-3 inline mr-1" />
                  Kamu akan dapat <span className="font-semibold">{Math.floor(total / 1000)} poin</span> dari order ini
                </div>

                <div className="border-t border-gray-100 pt-4 mt-4 flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                    {formatPrice(total)}
                  </span>
                </div>

                <Button
                  className={`w-full mt-2 rounded-2xl font-medium transition-all duration-300 shadow-sm ${
                    timeSlots.length === 0 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-gray-800 hover:opacity-90'
                  }`}
                  size="lg"
                  onClick={handleSubmitOrder}
                  disabled={timeSlots.length === 0}
                >
                  {timeSlots.length === 0 ? 'Kantin Tutup' : 'Konfirmasi Pesanan'}
                </Button>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
}