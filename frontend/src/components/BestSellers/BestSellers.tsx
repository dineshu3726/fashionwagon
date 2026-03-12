import { useEffect, useState } from 'react';
import type { Product } from '../../types';
import { getProducts } from '../../api/products';
import ProductCard from '../ProductCard/ProductCard';

export default function BestSellers() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts({ ordering: '-rating', page_size: 4 })
      .then((res) => setProducts(res.data.results || []))
      .catch(() => {});
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <div className="text-center mb-10">
        <p className="text-[#e07b4f] text-sm font-semibold uppercase tracking-widest mb-2">Top Picks</p>
        <h2 className="text-3xl font-bold text-[#1c1c1c]">Best Sellers</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
