import { Plus } from 'lucide-react';
import { MenuItem } from '../types'; // Sesuaikan path jika berbeda
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner';

interface MenuCardProps {
  item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    addToCart(item);
    toast.success(`${item.name} ditambahkan ke keranjang! 🛒`);
  };

  return (
    <Card className="group flex flex-col h-full overflow-hidden rounded-3xl bg-white/80 backdrop-blur-md border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
      
      {/* Gambar Menu */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Badge Kategori (opsional, biar manis) */}
        <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm">
          {item.category === 'makanan' ? '🍲 Makanan' : '🥤 Minuman'}
        </div>
      </div>

      {/* Info Menu */}
      <CardHeader className="flex-none pb-2 pt-5 px-5">
        <CardTitle className="line-clamp-1 text-lg font-semibold text-gray-900">
          {item.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 px-5 pb-4">
        <p className="line-clamp-2 text-sm text-gray-500 mb-3">
          {item.description}
        </p>
        <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
          {formatPrice(item.price)}
        </p>
      </CardContent>

      {/* Tombol Tambah ke Keranjang */}
      <CardFooter className="px-5 pb-6 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full rounded-2xl bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-gray-800 font-medium hover:opacity-90 hover:shadow-md transition-all duration-300"
        >
          <Plus className="mr-2 h-4 w-4" />
          Tambah ke keranjang
        </Button>
      </CardFooter>

    </Card>
  );
}