import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { Crown, Zap, ShieldCheck, Sparkles, ArrowLeft } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { toast } from 'sonner';
import { useLocation } from 'react-router';

export function GetStarted() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [isSignIn, setIsSignIn] = useState(true);
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    studentId: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Email dan password harus diisi');
      return;
    }

    if (!isSignIn && !formData.name) {
      toast.error('Nama harus diisi');
      return;
    }

    login({
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
      phone: formData.phone || undefined,
      studentId: formData.studentId || undefined,
      points: 0,
      isMember: false,
    });

    toast.success(isSignIn ? 'Berhasil masuk!' : 'Akun berhasil dibuat! 🎉');
    
    // Kalau datang dari cart, langsung ke checkout
    const from = location.state?.from;
    if (from === '/cart') {
      navigate('/checkout');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="relative min-h-screen bg-[#faf9f7] font-sans overflow-hidden">
      {/* 🌸 Floating Pastel Glow Background */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Floating Food Emojis */}
      <div className="absolute top-24 right-16 text-5xl opacity-10 animate-float">👤</div>
      <div className="absolute bottom-32 left-20 text-5xl opacity-10 animate-float" style={{ animationDelay: '1.5s' }}>👑</div>

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

      <div className="min-h-screen flex">
        {/* Hero Side */}
        <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
          <div className="relative z-10 space-y-6 max-w-md animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 px-6 py-2 rounded-full mb-6 border border-purple-200/50">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium text-purple-700">Gabung Sekarang</span>
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
              Selamat Datang di BiMy<span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">Eat</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Pesan makanan tanpa antri dan nikmati benefit eksklusif member
            </p>

            <div className="flex items-center gap-3 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 backdrop-blur-sm rounded-3xl p-5 border border-purple-200/50">
              <Crown className="w-10 h-10 text-purple-500" />
              <div>
                <h3 className="font-semibold text-gray-900">Gabung Sebagai Pro Member</h3>
                <p className="text-sm text-gray-600">Gratis priority order & rewards eksklusif</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <Card className="w-full max-w-md rounded-3xl bg-white/80 backdrop-blur-md border border-gray-100 shadow-xl animate-fade-up">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-3xl font-bold text-gray-900">
              {isSignIn ? 'Masuk' : 'Daftar'}
            </CardTitle>
            <CardDescription className="text-gray-500">
              {isSignIn
                ? 'Selamat datang kembali! Lanjutkan pesan makanan'
                : 'Buat akun untuk mulai pesan makanan'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Member Teaser - Only show on Sign Up */}
            {!isSignIn && (
              <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 border border-purple-200/50 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-purple-600" />
                  <h4 className="font-semibold text-gray-900">Benefit Pro Member</h4>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-purple-500" />
                    <span>Gratis Priority Order</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-purple-500" />
                    <span>Rewards Eksklusif</span>
                  </div>
                </div>
              </div>
            )}

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full h-12 gap-3 rounded-2xl border-gray-200 hover:bg-gray-50 transition-all" type="button">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Lanjut dengan Google
              </Button>

              <Button variant="outline" className="w-full h-12 gap-3 rounded-2xl border-gray-200 hover:bg-gray-50 transition-all" type="button">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Lanjut dengan Apple
              </Button>
            </div>

            <div className="relative">
              <Separator className="bg-gray-200" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-gray-500">
                ATAU
              </span>
            </div>

            {/* Email Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {!isSignIn && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700">Nama Lengkap</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="rounded-2xl border-gray-200 h-11"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700">Nomor HP (Opsional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="08123456789"
                      className="rounded-2xl border-gray-200 h-11"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="studentId" className="text-gray-700">NIM/Student ID (Opsional)</Label>
                    <Input
                      id="studentId"
                      placeholder="2501234567"
                      className="rounded-2xl border-gray-200 h-11"
                      value={formData.studentId}
                      onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  className="rounded-2xl border-gray-200 h-11"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="rounded-2xl border-gray-200 h-11"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              {isSignIn && (
                <div className="flex items-center justify-end">
                  <Button variant="link" className="px-0 text-sm text-purple-600 hover:text-purple-700" type="button">
                    Lupa password?
                  </Button>
                </div>
              )}

              <Button className="w-full h-12 rounded-2xl bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-gray-800 font-medium hover:opacity-90 transition-all shadow-sm" type="submit">
                {isSignIn ? 'Masuk' : 'Buat Akun'}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-gray-600">
                {isSignIn ? "Belum punya akun? " : "Sudah punya akun? "}
              </span>
              <Button
                variant="link"
                className="px-0 text-purple-600 hover:text-purple-700"
                onClick={() => setIsSignIn(!isSignIn)}
                type="button"
              >
                {isSignIn ? 'Daftar' : 'Masuk'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
}
