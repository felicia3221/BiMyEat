import { useState } from 'react';
import { ShoppingCart, ArrowLeft, MapPin, Clock, UtensilsCrossed, Sparkles } from 'lucide-react';
import { useParams, Link, useNavigate } from 'react-router';
import { menuItems } from '../data/menu';
import { canteens } from '../data/canteens';
import { MenuCard } from '../components/MenuCard';
import { Button } from '../components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { useCart } from '../context/CartContext';

export function Menu() {
  const { canteenId } = useParams<{ canteenId: string }>();
  const navigate = useNavigate();
  const { cart } = useCart();
  const [category, setCategory] = useState<'semua' | 'makanan' | 'minuman'>('semua');

  const canteen = canteens.find((c) => c.id === canteenId);

  if (!canteen) {
    navigate('/');
    return null;
  }

  const canteenMenuItems = menuItems.filter((item) => item.canteenId === canteenId);
  const filteredItems =
    category === 'semua'
      ? canteenMenuItems
      : canteenMenuItems.filter((item) => item.category === category);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="relative min-h-screen bg-[#faf9f7] font-sans overflow-hidden">

      {/* 🌸 Floating Pastel Glow Background with Animation */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Floating Food Emojis - Subtle */}
      <div className="absolute top-24 right-12 text-4xl opacity-10 animate-float">🍔</div>
      <div className="absolute bottom-24 left-12 text-5xl opacity-10 animate-float" style={{ animationDelay: '1s' }}>🍜</div>
      <div className="absolute top-1/2 left-16 text-4xl opacity-8 animate-float" style={{ animationDelay: '1.8s' }}>🍕</div>
      <div className="absolute bottom-1/3 right-20 text-4xl opacity-8 animate-float" style={{ animationDelay: '2.5s' }}>🥤</div>

      {/* Header */}
      <header className="relative bg-white/70 backdrop-blur-md border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-8">
          
          {/* Top Navigation Bar */}
          <div className="flex items-center justify-between mb-8 animate-fade-in">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="rounded-xl hover:bg-purple-50 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Button>

            <Link to="/cart">
              <Button
                size="lg"
                className="relative rounded-2xl bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 text-grey-900 font-semibold hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 shadow-md group/cart"
              >
                <ShoppingCart className="mr-2 h-5 w-5 transform group-hover/cart:scale-110 transition-transform" />
                Keranjang
                {cartItemCount > 0 && (
                  <Badge className="absolute -right-2 -top-2 h-6 w-6 rounded-full p-0 flex items-center justify-center bg-orange-500 text-white border-2 border-white shadow-md text-xs animate-in zoom-in">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>

          {/* Canteen Info */}
          <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 px-4 py-2 rounded-full mb-4 border border-purple-200/50">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium text-purple-700">Menu Tersedia</span>
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-3">
              {canteen.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-pink-100 shadow-sm hover:shadow-md transition-shadow">
                <MapPin className="h-4 w-4 text-pink-400" />
                <span className="text-sm font-medium text-gray-700">{canteen.location}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                <Clock className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-medium text-gray-700">{canteen.openHours}</span>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="relative mx-auto max-w-7xl px-6 py-10">

        {/* Category Tabs */}
        <div className="mb-12 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <Tabs defaultValue="semua">
            <TabsList className="grid w-full max-w-md grid-cols-3 rounded-2xl bg-white/80 backdrop-blur-md border-1 border-purple-100 p-1 shadow-sm mx-auto">
              <TabsTrigger
                value="semua"
                onClick={() => setCategory('semua')}
                className="flex items-center gap-1 leading-none rounded-xl text-gray-600 font-medium transition-all duration-300 data-[state=active]:text-gray-800 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-200 data-[state=active]:via-purple-200 data-[state=active]:to-blue-200 data-[state=active]:shadow-sm"
              >
                🍽️ Semua
              </TabsTrigger>
              <TabsTrigger
                value="makanan"
                onClick={() => setCategory('makanan')}
                className="flex items-center gap-1 leading-none rounded-xl text-gray-600 font-medium transition-all duration-300 data-[state=active]:text-gray-800 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-200 data-[state=active]:via-purple-200 data-[state=active]:to-blue-200 data-[state=active]:shadow-sm"
              >
                🍜 Makanan
              </TabsTrigger>
              <TabsTrigger
                value="minuman"
                onClick={() => setCategory('minuman')}
                className="flex items-center gap-1 leading-none rounded-xl text-gray-600 font-medium transition-all duration-300 data-[state=active]:text-gray-800 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-200 data-[state=active]:via-purple-200 data-[state=active]:to-blue-200 data-[state=active]:shadow-sm"
              >
                🥤 Minuman
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Menu Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="animate-fade-up"
                style={{ animationDelay: `${0.3 + index * 0.05}s` }}
              >
                <MenuCard item={item} />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State jika kategori kosong */
          <div className="py-24 flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-8 rounded-full mb-6 shadow-lg border-2 border-white">
              <UtensilsCrossed className="h-12 w-12 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Menu tidak ditemukan</h3>
            <p className="text-gray-600 max-w-sm">
              Sepertinya kantin ini belum memiliki menu untuk kategori <span className="font-semibold text-purple-600">{category}</span>.
            </p>
          </div>
        )}

      </main>
    </div>
  );
}