import { MapPin, Clock, ChevronRight, ArrowLeft, Store } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router';
import { canteens } from '../data/canteens';
import { locations } from '../data/locations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

export function Canteens() {
  const { locationId } = useParams<{ locationId: string }>();
  const navigate = useNavigate();

  const location = locations.find((l) => l.id === locationId);

  if (!location) {
    navigate('/');
    return null;
  }

  const locationCanteens = canteens.filter((c) => c.locationId === locationId);

  return (
    <div className="relative min-h-screen bg-[#faf9f7] font-sans overflow-hidden">

      {/* 🌸 Floating Pastel Glow Background */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Floating Food Emojis - Subtle */}
      <div className="absolute top-32 right-16 text-5xl opacity-10 animate-float">🍜</div>
      <div className="absolute bottom-32 left-16 text-5xl opacity-10 animate-float" style={{ animationDelay: '1s' }}>🍱</div>
      <div className="absolute top-1/2 right-1/4 text-4xl opacity-8 animate-float" style={{ animationDelay: '2s' }}>🍔</div>

      {/* Header */}
      <header className="relative z-10 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="animate-fade-in">
            <Button
              variant="ghost"
              size="sm"
              className="mb-6 rounded-xl hover:bg-purple-50 transition-colors"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Pilih Lokasi Lain
            </Button>

            <div className="flex items-center gap-4 mb-4">
              <div className="text-6xl">{location.icon}</div>
              <div>
                <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
                  {location.name}
                </h1>
                <p className="mt-3 text-lg text-gray-600">
                  {location.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main */}
      <main className="relative mx-auto max-w-7xl px-6 py-14">
        <div className="text-center mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="inline-flex items-center gap-2 text-gray-600 mb-3">
            <Store className="h-5 w-5 text-purple-400" />
            <span className="font-medium">Pilih Kantin</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Mau Pesan dari Mana?</h2>
        </div>

        {locationCanteens.length > 0 ? (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {locationCanteens.map((canteen, index) => (
              <Card
                key={canteen.id}
                className="group overflow-hidden rounded-3xl bg-white/80 backdrop-blur-md border-2 border-transparent hover:border-purple-200 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-fade-up"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                {/* Image */}
                <div className="aspect-video w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10"></div>
                  <img
                    src={canteen.image}
                    alt={canteen.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-purple-700 border border-purple-100 z-20">
                    ✨ Popular
                  </div>
                </div>

                {/* Content */}
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {canteen.name}
                  </CardTitle>
                  <CardDescription className="text-gray-500 text-sm leading-relaxed">
                    {canteen.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6 pb-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="bg-pink-50 p-2 rounded-lg">
                        <MapPin className="h-4 w-4 text-pink-400" />
                      </div>
                      <span className="text-sm">{canteen.location}</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="bg-purple-50 p-2 rounded-lg">
                        <Clock className="h-4 w-4 text-purple-400" />
                      </div>
                      <span className="text-sm">{canteen.openHours}</span>
                    </div>
                  </div>

                  <Link to={`/canteen/${canteen.id}`}>
                    <Button
                      className="w-full rounded-2xl bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-gray-800 font-medium hover:from-pink-300 hover:via-purple-300 hover:to-blue-300 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 group/btn"
                      size="lg"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Lihat Menu
                        <ChevronRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </Link>
                </CardContent>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-purple-200/20 to-transparent rounded-br-full"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-pink-200/20 to-transparent rounded-tl-full"></div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <div className="text-6xl mb-4">🏪</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Belum Ada Kantin</h3>
            <p className="text-gray-600">Kantin akan segera hadir di lokasi ini</p>
          </div>
        )}
      </main>
    </div>
  );
}