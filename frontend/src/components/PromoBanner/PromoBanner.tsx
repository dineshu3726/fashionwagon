import { Link } from 'react-router-dom';

const promos = [
  {
    title: 'Ethnic Wear',
    sub: 'New Arrivals',
    desc: 'Celebrate every occasion in style with our curated ethnic collection.',
    link: '/products?gender=women&category=kurtas',
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80',
    cta: 'Explore Ethnic',
    dark: true,
  },
  {
    title: 'Western Edit',
    sub: 'Trending Now',
    desc: 'Contemporary styles for the modern wardrobe — effortless and bold.',
    link: '/products?gender=women',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    cta: 'Shop Western',
    dark: false,
  },
];

export default function PromoBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-4">
        {promos.map((p) => (
          <div key={p.title} className="relative overflow-hidden group min-h-[420px] flex items-end">
            <img
              src={p.image}
              alt={p.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className={`absolute inset-0 ${p.dark ? 'bg-black/60' : 'bg-black/40'}`} />

            <div className="relative z-10 p-8 w-full">
              <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.3em] mb-2">{p.sub}</p>
              <h3 className="text-white font-black text-4xl uppercase tracking-tight leading-none mb-3">{p.title}</h3>
              <p className="text-white/70 text-sm mb-6 max-w-xs">{p.desc}</p>
              <Link
                to={p.link}
                className="inline-block bg-white text-[#1c1c1c] px-8 py-3 text-xs font-black uppercase tracking-widest hover:bg-[#C9A84C] hover:text-white transition-all duration-200"
              >
                {p.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
