import { Link } from 'react-router-dom';

const categories = [
  { label: "Women's Fashion", sub: 'Kurtas, Dresses, Sarees', gender: 'women', emoji: '👗', bg: 'bg-pink-50', accent: '#C9A84C' },
  { label: "Men's Fashion", sub: 'Shirts, T-Shirts, Jeans', gender: 'men', emoji: '👔', bg: 'bg-blue-50', accent: '#1A5C58' },
  { label: "Kids' Fashion", sub: 'Boys, Girls, Infant', gender: 'kids', emoji: '🧒', bg: 'bg-yellow-50', accent: '#C9A84C' },
  { label: 'Accessories', sub: 'Bags, Belts, Jewellery', slug: 'accessories', emoji: '👜', bg: 'bg-green-50', accent: '#1A5C58' },
  { label: 'Ethnic Wear', sub: 'Kurtas, Sherwanis, Sarees', gender: 'women', category: 'kurtas', emoji: '🪆', bg: 'bg-orange-50', accent: '#C9A84C' },
  { label: 'Western Wear', sub: 'Tops, Jeans, Dresses', gender: 'women', category: 'tops', emoji: '✨', bg: 'bg-purple-50', accent: '#1A5C58' },
  { label: "Men's Ethnic", sub: 'Kurtas, Sherwanis, Dhotis', gender: 'men', category: 'ethnic-men', emoji: '🧣', bg: 'bg-amber-50', accent: '#C9A84C' },
  { label: 'Sale', sub: 'Up to 60% off', sale: true, emoji: '🏷️', bg: 'bg-red-50', accent: '#e07b4f' },
];

export default function CategoryGrid() {
  const getLink = (cat: typeof categories[0]) => {
    if ('sale' in cat) return '/products?ordering=-discount_percent';
    if ('slug' in cat) return `/products?category=${cat.slug}`;
    let url = `/products?gender=${cat.gender}`;
    if ('category' in cat) url += `&category=${cat.category}`;
    return url;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <div className="text-center mb-10">
        <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-2">Explore</p>
        <h2 className="text-3xl font-bold text-[#1A5C58]">Shop by Category</h2>
        <p className="text-gray-400 text-sm mt-2">Curated collections for every occasion</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {categories.map((cat) => (
          <Link
            key={cat.label}
            to={getLink(cat)}
            className={`${cat.bg} rounded-xl p-6 flex flex-col items-center gap-3 hover:shadow-lg transition-all group border border-transparent hover:border-[#C9A84C]`}
          >
            <span className="text-4xl group-hover:scale-110 transition-transform">{cat.emoji}</span>
            <div className="text-center">
              <p className="font-bold text-[#1c1c1c] text-sm">{cat.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{cat.sub}</p>
              <p className="text-xs font-semibold mt-2" style={{ color: cat.accent }}>Shop Now →</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
