import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Product } from '../../types';
import { getProducts } from '../../api/products';
import ProductCard from '../ProductCard/ProductCard';

export default function BestSellers() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts({ ordering: '-rating', page_size: 8 })
      .then((res) => setProducts(res.data.results || []))
      .catch(() => {});
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C9A84C] mb-2">Top Picks</p>
            <h2 className="text-4xl font-black uppercase text-[#1c1c1c] tracking-tight">Best Sellers</h2>
          </div>
          <Link
            to="/products?ordering=-rating"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1A5C58] hover:text-[#C9A84C] transition-colors group"
          >
            View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}
