import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { useUser } from '../context/UserContext';

export function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();
  const { user } = useUser();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="relative min-h-screen bg-[#faf9f7] font-sans overflow-hidden">

      {/* 🌸 Floating Pastel Glow Background */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>

      {/* Floating Food Emojis - Subtle */}
      <div className="absolute top-32 right-20 text-4xl opacity-10 animate-float">🛒</div>
      <div className="absolute bottom-32 left-20 text-5xl opacity-10 animate-float" style={{ animationDelay: '1.2s' }}>🍱</div>

      {/* Header */}
      <header className="relative bg-white/70 backdrop-blur-md border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-12 flex items-center justify-between">
          <div className="animate-fade-in">
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
              Keranjang Belanja
            </h1>
            <p className="mt-3 text-base text-gray-500">
              Lihat kembali pesanan kamu sebelum checkout 
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/canteen/' + (cart[0]?.canteenId ?? ''))}
            className="rounded-xl hover:bg-white/50 animate-fade-in"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative mx-auto max-w-7xl px-6 py-14">
        
        {cart.length === 0 ? (
          /* Empty State */
          <div className="py-20 text-center animate-fade-in">
            <h2 className="text-2xl font-semibold text-gray-900">Keranjang Kosong</h2>
            <p className="mt-3 text-gray-500">Belum ada item di keranjang Anda</p>

            <Button
              className="mt-8 rounded-2xl bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-gray-800 font-medium hover:opacity-90 transition-all duration-300 shadow-sm"
              onClick={() => navigate('/')}
            >
              Pilih Kantin
            </Button>
          </div>
        ) : (
          /* Cart Items State */
          <div className="grid gap-12 lg:grid-cols-3">

            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item, index) => (
                <Card
                  key={item.id}
                  className="group overflow-hidden rounded-3xl bg-white/80 backdrop-blur-md border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 animate-fade-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-28 w-28 rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {item.description}
                          </p>
                          <p className="mt-3 font-semibold text-gray-900">
                            {formatPrice(item.price)}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-6">
                          <div className="flex items-center gap-3">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="rounded-xl border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>

                            <span className="w-10 text-center font-medium text-gray-900">
                              {item.quantity}
                            </span>

                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="rounded-xl border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors rounded-xl"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <Card className="sticky top-6 h-fit rounded-3xl bg-white/80 backdrop-blur-md border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    Ringkasan Pesanan
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>
                      Subtotal ({cart.reduce((total, item) => total + item.quantity, 0)} item)
                    </span>
                    <span className="font-medium text-gray-900">
                      {formatPrice(getCartTotal())}
                    </span>
                  </div>

                  <Separator className="bg-gray-100" />

                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>{formatPrice(getCartTotal())}</span>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    className="w-full rounded-2xl bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-gray-800 font-medium hover:opacity-90 transition-all duration-300 shadow-sm"
                    size="lg"
                    onClick={() => {
                      if (!user) {
                        navigate('/get-started', { state: { from: '/cart' } });
                      } else {
                        navigate('/checkout');
                      }
                    }}
                  >
                    Lanjut ke Checkout
                  </Button>
                </CardFooter>
              </Card>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}