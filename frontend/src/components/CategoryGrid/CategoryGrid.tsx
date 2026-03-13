import { Link } from 'react-router-dom';

const categories = [
  {
    label: "Women's",
    sub: 'Kurtas, Dresses, Tops',
    link: '/products?gender=women',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    label: "Men's",
    sub: 'Shirts, T-Shirts, Jeans',
    link: '/products?gender=men',
    image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&q=80',
    span: '',
  },
  {
    label: 'Accessories',
    sub: 'Bags, Jewellery & More',
    link: '/products?gender=unisex',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    span: '',
  },
  {
    label: "Kids'",
    sub: 'Boys, Girls & Infant',
    link: '/products?gender=kids',
    image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&q=80',
    span: '',
  },
  {
    label: 'Sale',
    sub: 'Up to 60% off',
    link: '/products?ordering=-discount_percent',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80',
    span: '',
  },
];

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C9A84C] mb-2">Collections</p>
        <h2 className="text-4xl font-black uppercase text-[#1c1c1c] tracking-tight">Shop by Category</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-auto md:grid-rows-2 gap-3 h-auto md:h-[600px]">
        {categories.map((cat) => (
          <Link
            key={cat.label}
            to={cat.link}
            className={`relative overflow-hidden group ${cat.span} min-h-[200px]`}
          >
            {/* Background image */}
            <img
              src={cat.image}
              alt={cat.label}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            {/* Hover tint */}
            <div className="absolute inset-0 bg-[#1A5C58]/0 group-hover:bg-[#1A5C58]/30 transition-all duration-300" />

            {/* Text */}
            <div className="absolute bottom-0 left-0 p-5">
              <h3 className="text-white font-black text-2xl uppercase tracking-tight leading-none">{cat.label}</h3>
              <p className="text-gray-300 text-xs mt-1 uppercase tracking-wider">{cat.sub}</p>
              <span className="inline-block mt-3 text-xs font-bold uppercase tracking-widest text-[#C9A84C] border-b border-[#C9A84C] pb-0.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Shop Now
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
