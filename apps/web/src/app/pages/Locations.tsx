import { ChevronRight, MapPin, Sparkles, Crown, Gift, LogIn, Trophy, User, LogOut } from 'lucide-react';
import { Link } from 'react-router';
import { locations } from '../data/locations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useUser } from '../context/UserContext';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

export function Locations() {
  const { user, logout } = useUser();

  return (
    <div className="relative min-h-screen bg-[#faf9f7] font-sans overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Floating Food Emojis - Subtle and Not Too Many */}
      <div className="absolute top-24 right-16 text-5xl opacity-20 animate-float">🍜</div>
      <div className="absolute top-1/3 left-12 text-4xl opacity-20 animate-float" style={{ animationDelay: '0.8s' }}>🍕</div>
      <div className="absolute bottom-32 right-24 text-5xl opacity-20 animate-float" style={{ animationDelay: '1.5s' }}>🥤</div>
      <div className="absolute bottom-1/4 left-20 text-4xl opacity-20 animate-float" style={{ animationDelay: '2.2s' }}>🍱</div>
      <div className="absolute top-1/2 right-32 text-4xl opacity-20 animate-float" style={{ animationDelay: '3s' }}>🍔</div>
      <div className="absolute top-1/4 left-1/4 text-4xl opacity-20 animate-float" style={{ animationDelay: '0.5s' }}>🍛</div>
      <div className="absolute top-2/3 right-1/3 text-4xl opacity-20 animate-float" style={{ animationDelay: '1.2s' }}>🧋</div>
      <div className="absolute top-1/2 left-1/3 text-4xl opacity-20 animate-float" style={{ animationDelay: '2.8s' }}>🍗</div>
      <div className="absolute bottom-1/3 right-16 text-4xl opacity-20 animate-float" style={{ animationDelay: '3.5s' }}>🥗</div>
      <div className="absolute top-1/3 right-1/4 text-3xl opacity-20 animate-float" style={{ animationDelay: '1.8s' }}>🍩</div>
      <div className="absolute bottom-1/2 left-1/2 text-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}>🌮</div>
      <div className="absolute top-3/4 left-1/3 text-4xl opacity-20 animate-float" style={{ animationDelay: '2.5s' }}>🍣</div>
      <div className="absolute top-1/4 right-1/3 text-3xl opacity-20 animate-float" style={{ animationDelay: '0.3s' }}>🥙</div>
      <div className="absolute bottom-1/4 right-1/2 text-4xl opacity-20 animate-float" style={{ animationDelay: '3.8s' }}>🍦</div>
      <div className="absolute top-2/3 left-1/4 text-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🥐</div>
      
      {/* Header */}
      <header
        className="relative border-b border-gray-100 overflow-hidden"
        style={{
          backgroundImage: 'url(kantin.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '320px',
        }}
      >
        {/* Overlay */}
        {/* <div className="absolute inset-0 bg-black/40" /> */}

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          {/* User Profile - Top Right */}
          {user && (
            <div className="absolute top-6 right-6 animate-fade-in">
              {/* ... card user tetap sama ... */}
            </div>
          )}

          {/* Hanya logo + badge, tulisan deskripsi dipindah ke bawah */}
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 px-6 py-2 rounded-full mb-6 border border-purple-200/50">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium text-purple-800">Pre-Order Makanan Tanpa Antre</span>
            </div>

            <h1 className="text-6xl font-extrabold tracking-tight text-whit mb-4">
              BiMy<span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">Eat</span>
            </h1>
          </div>
        </div>
      </header>

      {/* Tulisan deskripsi dipindah ke sini, di bawah foto */}
      <div className="text-center px-6 py-8">
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Pilih lokasi kantin favoritmu dan nikmati kemudahan pesan makan tanpa antri 𑣲⋆
        </p>
      </div>

      {/*  decorative wave divider */}
      {/* <div className="relative -mt-8 z-10">
        <svg viewBox="0 0 1440 60" className="w-full fill-[#faf9f7]">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div> */}

      {/* Main Content */}
      <main className="relative mx-auto max-w-6xl px-6 py-9">
        {/* Quick Access - Membership Features */}
        <div className="mb-16 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Link to="/get-started">
              <Card className="group rounded-3xl bg-white/80 backdrop-blur-md border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-pointer">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <LogIn className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">Masuk / Daftar</h3>
                    <p className="text-xs text-gray-500">Mulai pesan makanan</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </CardContent>
              </Card>
            </Link>

            <Link to="/pricing">
              <Card className="group rounded-3xl bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border-2 border-purple-200/50 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-pointer">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Crown className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">Pro Member</h3>
                    <p className="text-xs text-gray-600">Gratis priority order</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </CardContent>
              </Card>
            </Link>

            <Link to="/rewards">
              <Card className="group rounded-3xl bg-white/80 backdrop-blur-md border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-pointer">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-100 to-orange-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Gift className="w-6 h-6 text-pink-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">Rewards</h3>
                    <p className="text-xs text-gray-500">Tukar poin kamu</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        <div className="text-center mb-12 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="inline-flex items-center gap-2 text-gray-600 mb-3">
            <MapPin className="h-5 w-5 text-pink-400" />
            <span className="font-medium">Pilih Lokasi</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Mau Makan di Mana?</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {locations.map((location, index) => (
            <Card
              key={location.id}
              className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-md border-2 border-transparent hover:border-purple-200 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 hover:scale-105 animate-fade-up"
              style={{ animationDelay: `${0.3 + index * 0.2}s` }}
            >
              {/* Shimmer Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              {/* Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10"></div>
                <img
                  src={location.image}
                  alt={location.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Floating Icon */}
                <div className="absolute top-4 right-4 text-6xl z-20 transform group-hover:rotate-12 transition-transform duration-500">
                  {location.icon}
                </div>
              </div>

              {/* Content */}
              <CardHeader className="pb-3 relative">
                <CardTitle className="text-3xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                  {location.name}
                </CardTitle>
                <CardDescription className="text-base text-gray-600 leading-relaxed mt-2">
                  {location.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0 pb-6">
                <Link to={`/location/${location.id}`}>
                  <Button
                    className="w-full rounded-2xl bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-gray-800 font-medium hover:from-pink-300 hover:via-purple-300 hover:to-blue-300 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 group/btn"
                    size="lg"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Lihat Kantin
                      <ChevronRight className="h-5 w-5 transform group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>
              </CardContent>

              {/* Decorative Corner */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-purple-200/30 to-transparent rounded-br-full"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-pink-200/30 to-transparent rounded-tl-full"></div>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: '0.7s' }}>
          <div className="text-center">
            <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 mb-2">2</div>
            <div className="text-sm text-gray-600 font-medium">Lokasi Kantin</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 mb-2">6+</div>
            <div className="text-sm text-gray-600 font-medium">Kantin Tersedia</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-pink-500 mb-2">50+</div>
            <div className="text-sm text-gray-600 font-medium">Menu Pilihan</div>
          </div>
        </div>

        {/* Contact Person */}
        <div className="mt-16 mb-8 animate-fade-up" style={{ animationDelay: '0.8s' }}>
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Hubungi Kami</h3>
            <p className="text-sm text-gray-500 mt-1">Ada pertanyaan? Reach out ke kita!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
              <Card className="group rounded-3xl bg-white/80 backdrop-blur-md border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <FaWhatsapp className="text-2xl text-green-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">WhatsApp</p>
                    <p className="text-sm text-gray-500">+62 812-3456-7890</p>
                  </div>
                </CardContent>
              </Card>
            </a>

            <a href="https://instagram.com/bimyeat" target="_blank" rel="noopener noreferrer">
              <Card className="group rounded-3xl bg-white/80 backdrop-blur-md border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <FaInstagram className="text-2xl text-pink-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Instagram</p>
                    <p className="text-sm text-gray-500">@bimyeat</p>
                  </div>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
