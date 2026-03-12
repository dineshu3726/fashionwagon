import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '../store/wishlistStore';
import { useEffect, useState } from 'react';
import type { Product } from '../types';
import { getProducts } from '../api/products';
import ProductCard from '../components/ProductCard/ProductCard';

export default function WishlistPage() {
  const { ids } = useWishlistStore();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (ids.length === 0) { setProducts([]); return; }
    getProducts()
      .then((res) => {
        const all: Product[] = res.data.results || [];
        setProducts(all.filter((p) => ids.includes(p.id)));
      })
      .catch(() => {});
  }, [ids]);

  if (ids.length === 0) return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <Heart size={64} className="mx-auto text-gray-300 mb-4" />
      <h2 className="text-xl font-bold text-[#1c1c1c] mb-2">Your wishlist is empty</h2>
      <p className="text-gray-500 text-sm mb-6">Save items you love to buy them later</p>
      <Link to="/products" className="bg-[#1c1c1c] text-white px-8 py-3 text-sm font-semibold hover:bg-[#e07b4f] transition-colors">
        EXPLORE PRODUCTS
      </Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-[#1c1c1c] mb-8">My Wishlist ({ids.length} items)</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
