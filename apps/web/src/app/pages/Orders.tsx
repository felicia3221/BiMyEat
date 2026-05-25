import { useState } from 'react';
import { ArrowLeft, Clock, CheckCircle2, Package, MapPin, Receipt, X, Download } from 'lucide-react';
import { Link } from 'react-router';
import { useCart } from '../context/CartContext';
import { Order } from '../types'; 
import { canteens } from '../data/canteens';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';

export function Orders() {
  const { orders } = useCart();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  console.log('orders:', orders);
  console.log('selectedOrder:', selectedOrder);

  const getCanteenName = (canteenId: string) => {
    const canteen = canteens.find((c) => c.id === canteenId);
    return canteen?.name || canteenId;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      pending: { label: 'Menunggu', className: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
      confirmed: { label: 'Dikonfirmasi ✓', className: 'bg-blue-100 text-blue-700 border-blue-200' },
      ready: { label: 'Siap Diambil', className: 'bg-green-100 text-green-700 border-green-200' },
      completed: { label: 'Selesai', className: 'bg-gray-100 text-gray-700 border-gray-200' },
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <Badge className={`${config.className} border rounded-full px-3 py-1 text-xs font-medium`}>
        {config.label}
      </Badge>
    );
  };

  if (orders.length === 0) {
    return (
      <div className="relative min-h-screen bg-[#faf9f7] font-sans overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-32 right-24 text-5xl opacity-10 animate-float">📦</div>
        <div className="absolute bottom-40 left-24 text-4xl opacity-10 animate-float" style={{ animationDelay: '1.5s' }}>✓</div>

        <header className="relative bg-white/70 backdrop-blur-md border-b border-gray-100">
          <div className="mx-auto max-w-7xl px-6 py-12 flex items-center justify-between">
            <div className="animate-fade-in">
              <h1 className="text-4xl font-semibold tracking-tight text-gray-900">Riwayat Pesanan</h1>
              <p className="mt-3 text-base text-gray-500">Belum ada pesanan yang dibuat</p>
            </div>
            <Link to="/">
              <Button variant="ghost" size="sm" className="rounded-xl hover:bg-white/50 animate-fade-in">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali
              </Button>
            </Link>
          </div>
        </header>

        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center animate-fade-in">
          <div className="bg-white/50 p-8 rounded-full inline-block mb-6 shadow-sm border border-gray-100">
            <Package className="h-16 w-16 text-purple-300" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Belum Ada Pesanan</h2>
          <p className="mt-3 text-gray-500 max-w-md mx-auto">
            Anda belum memiliki riwayat pesanan. Mulai pesan makanan favorit Anda sekarang!
          </p>
          <Link to="/">
            <Button className="mt-8 rounded-2xl bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-gray-800 font-medium hover:opacity-90 transition-all duration-300 shadow-sm">
              Mulai Pesan
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#faf9f7] font-sans overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
      <div className="absolute top-40 right-20 text-4xl opacity-10 animate-float">📦</div>
      <div className="absolute bottom-32 left-16 text-5xl opacity-10 animate-float" style={{ animationDelay: '1.5s' }}>✓</div>

      {/* Receipt Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl animate-fade-up overflow-hidden">
            
            {/* Receipt Header */}
            <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 px-6 pt-8 pb-6 text-center relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedOrder(null)}
                className="absolute top-4 right-4 rounded-xl hover:bg-white/50"
              >
                <X className="w-4 h-4" />
              </Button>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <CheckCircle2 className="w-8 h-8 text-purple-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Struk Pesanan</h2>
              <p className="text-sm text-gray-600 mt-1">BiMyEat</p>
            </div>

            {/* Receipt Body */}
            <div className="px-6 py-5 space-y-4 font-mono text-sm">
              
              {/* Order Info */}
              <div className="space-y-1">
                <div className="flex justify-between text-gray-500">
                  <span>No. Pesanan</span>
                  <span className="font-semibold text-gray-900">#{selectedOrder.id}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Tanggal</span>
                  <span className="text-gray-900 text-xs">{formatDate(selectedOrder.createdAt)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Kantin</span>
                  <span className="text-gray-900">{getCanteenName(selectedOrder.canteenId)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Ambil Jam</span>
                  <span className="text-gray-900">{selectedOrder.pickupTime}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Pembayaran</span>
                  <span className="text-gray-900 uppercase">{selectedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Status</span>
                  <span>{getStatusBadge(selectedOrder.status)}</span>
                </div>
              </div>

              <Separator className="border-dashed" />

              {/* Items */}
              <div className="space-y-2">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Item Pesanan</p>
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-gray-700">{item.name} <span className="text-gray-400">x{item.quantity}</span></span>
                    <span className="text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <Separator className="border-dashed" />

              {/* Total */}
              <div className="space-y-1">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="text-gray-900">{formatPrice(selectedOrder.total - 2000)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Platform Fee</span>
                  <span className="text-gray-900">{formatPrice(2000)}</span>
                </div>
                <Separator className="border-dashed" />
                <div className="flex justify-between font-bold text-base">
                  <span>TOTAL</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                    {formatPrice(selectedOrder.total)}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center text-xs text-gray-400 pt-2">
                <p>Terima kasih sudah order di BiMyEat! 🎉</p>
                <p className="mt-1">Tunjukkan struk ini saat ambil pesanan</p>
              </div>
            </div>

            {/* Receipt Actions */}
            <div className="px-6 pb-6">
              <Button
                className="w-full rounded-2xl bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-gray-800 font-medium hover:opacity-90 transition-all shadow-sm"
                onClick={() => window.print()}
              >
                <Download className="w-4 h-4 mr-2" />
                Simpan / Print Struk
              </Button>
            </div>
          </div>
        </div>
      )}

      <header className="relative bg-white/70 backdrop-blur-md border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-12 flex items-center justify-between">
          <div className="animate-fade-in">
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900">Riwayat Pesanan</h1>
            <p className="mt-3 text-base text-gray-500">
              {orders.length} pesanan • Klik untuk lihat struk
            </p>
          </div>
          <Link to="/">
            <Button variant="ghost" size="sm" className="rounded-xl hover:bg-white/50 animate-fade-in">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Button>
          </Link>
        </div>
      </header>

      <main className="relative mx-auto max-w-4xl px-6 py-14">
        <div className="space-y-6">
          {orders.map((order, index) => (
            <Card
              key={order.id}
              className="overflow-hidden rounded-3xl bg-white/80 backdrop-blur-md border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 animate-fade-up cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedOrder(order)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      #{order.id}
                    </CardTitle>
                    <p className="text-sm text-gray-500 mt-1">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(order.status)}
                    <Receipt className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 p-4 border border-purple-100">
                  <div className="bg-white p-2 rounded-xl shadow-sm">
                    <MapPin className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Kantin</p>
                    <p className="text-sm font-semibold text-purple-900">{getCanteenName(order.canteenId)}</p>
                  </div>
                </div>

                <div className="space-y-3 bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Pesanan</p>
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-700">
                        {item.name} <span className="text-gray-400">x{item.quantity}</span>
                      </span>
                      <span className="font-medium text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 p-4 border border-blue-100">
                    <div className="bg-white p-2 rounded-xl shadow-sm">
                      <Clock className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Waktu Ambil</p>
                      <p className="text-sm font-semibold text-blue-900">{order.pickupTime}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 p-4 border border-green-100">
                    <div className="bg-white p-2 rounded-xl shadow-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Pembayaran</p>
                      <p className="text-sm font-semibold text-green-900 uppercase">{order.paymentMethod}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                  <span className="text-base font-medium text-gray-600">Total Pembayaran</span>
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                    {formatPrice(order.total)}
                  </span>
                </div>

                <p className="text-xs text-center text-gray-400">Klik untuk lihat struk lengkap 🧾</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}