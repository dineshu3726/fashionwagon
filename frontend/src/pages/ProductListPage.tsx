import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import type { Product } from '../types';
import { getProducts } from '../api/products';
import ProductCard from '../components/ProductCard/ProductCard';

const SORT_OPTIONS = [
  { label: 'Newest', value: '-created_at' },
  { label: 'Price: Low to High', value: 'price' },
  { label: 'Price: High to Low', value: '-price' },
  { label: 'Top Rated', value: '-rating' },
  { label: 'Biggest Discount', value: '-discount_percent' },
];

export default function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);

  const gender = searchParams.get('gender') || '';
  const search = searchParams.get('search') || '';
  const ordering = searchParams.get('ordering') || '-created_at';
  const minPrice = searchParams.get('min_price') || '';
  const maxPrice = searchParams.get('max_price') || '';

  useEffect(() => {
    setLoading(true);
    const params: Record<string, string> = { ordering };
    if (gender) params.gender = gender;
    if (search) params.search = search;
    if (minPrice) params.min_price = minPrice;
    if (maxPrice) params.max_price = maxPrice;

    getProducts(params)
      .then((res) => {
        setProducts(res.data.results || []);
        setCount(res.data.count || 0);
      })
      .finally(() => setLoading(false));
  }, [gender, search, ordering, minPrice, maxPrice]);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value); else next.delete(key);
    setSearchParams(next);
  };

  const clearFilters = () => setSearchParams({});

  const pageTitle = search
    ? `Results for "${search}"`
    : gender
    ? `${gender.charAt(0).toUpperCase() + gender.slice(1)}'s Fashion`
    : 'All Products';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1c1c1c]">{pageTitle}</h1>
          <p className="text-sm text-gray-400">{count} items</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 border border-gray-300 px-4 py-2 text-sm hover:border-[#e07b4f] hover:text-[#e07b4f] md:hidden"
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
          <select
            value={ordering}
            onChange={(e) => setParam('ordering', e.target.value)}
            className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#e07b4f]"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar filters */}
        <aside className={`w-56 shrink-0 ${filterOpen ? 'block' : 'hidden'} md:block`}>
          <div className="flex items-center justify-between mb-4">
            <p className="font-semibold text-[#1c1c1c]">Filters</p>
            <button onClick={clearFilters} className="text-xs text-[#e07b4f] hover:underline flex items-center gap-1">
              <X size={12} /> Clear All
            </button>
          </div>

          {/* Gender */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-[#1c1c1c] mb-3 uppercase tracking-wider">Gender</p>
            {['men', 'women', 'kids', 'unisex'].map((g) => (
              <label key={g} className="flex items-center gap-2 text-sm mb-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  checked={gender === g}
                  onChange={() => setParam('gender', g)}
                  className="accent-[#e07b4f]"
                />
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </label>
            ))}
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-[#1c1c1c] mb-3 uppercase tracking-wider">Price Range</p>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min ₹"
                value={minPrice}
                onChange={(e) => setParam('min_price', e.target.value)}
                className="w-full border border-gray-300 px-2 py-1.5 text-xs focus:outline-none focus:border-[#e07b4f]"
              />
              <input
                type="number"
                placeholder="Max ₹"
                value={maxPrice}
                onChange={(e) => setParam('max_price', e.target.value)}
                className="w-full border border-gray-300 px-2 py-1.5 text-xs focus:outline-none focus:border-[#e07b4f]"
              />
            </div>
          </div>

          {/* Quick price filters */}
          <div className="mb-6">
            <p className="text-xs text-gray-400 mb-2">Quick Select</p>
            {[['Under ₹500', '', '500'], ['₹500 – ₹1000', '500', '1000'], ['₹1000 – ₹2000', '1000', '2000'], ['Above ₹2000', '2000', '']].map(([label, min, max]) => (
              <button
                key={label}
                onClick={() => { setParam('min_price', min); setParam('max_price', max); }}
                className="block text-sm text-gray-600 hover:text-[#e07b4f] mb-1.5"
              >
                {label}
              </button>
            ))}
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 aspect-[3/4] w-full" />
                  <div className="mt-3 h-3 bg-gray-200 rounded w-2/3" />
                  <div className="mt-2 h-3 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              <p className="text-5xl mb-4">🛍️</p>
              <p className="text-lg font-semibold">No products found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
              <button onClick={clearFilters} className="mt-4 text-[#e07b4f] text-sm hover:underline">
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
