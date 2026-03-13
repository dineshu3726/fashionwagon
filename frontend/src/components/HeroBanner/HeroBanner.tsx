import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
    tag: 'New Collection 2025',
    title: ['Culture', 'Meets', 'Style'],
    highlight: 1,
    cta: { label: 'Shop All', link: '/products' },
    cta2: { label: 'Women', link: '/products?gender=women' },
  },
  {
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80',
    tag: "Women's Collection",
    title: ['Ethnic', 'Meets', 'Chic'],
    highlight: 2,
    cta: { label: "Shop Women's", link: '/products?gender=women' },
    cta2: { label: 'Kurtas', link: '/products?gender=women&category=kurtas' },
  },
  {
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80',
    tag: "Men's Edition",
    title: ['Bold.', 'Sharp.', 'Modern.'],
    highlight: 0,
    cta: { label: "Shop Men's", link: '/products?gender=men' },
    cta2: { label: 'New Arrivals', link: '/products?ordering=-created_at' },
  },
  {
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80',
    tag: 'Grand Sale — Up to 60% Off',
    title: ['Biggest', 'Sale', 'Ever'],
    highlight: 2,
    cta: { label: 'Shop the Sale', link: '/products?ordering=-discount_percent' },
    cta2: { label: 'All Categories', link: '/products' },
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = (index: number) => {
    if (animating) return;
    setAnimating(true);
    setCurrent((index + slides.length) % slides.length);
    setTimeout(() => setAnimating(false), 600);
  };

  useEffect(() => {
    const timer = setInterval(() => goTo(current + 1), 5000);
    return () => clearInterval(timer);
  }, [current]);

  const slide = slides[current];

  return (
    <section className="relative w-full overflow-hidden">
      {/* Slides */}
      <div className="relative min-h-[92vh] flex items-center overflow-hidden">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url('${s.image}')` }}
          />
        ))}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55 z-10" />

        {/* Content */}
        <div className={`relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full transition-all duration-500 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.3em] mb-5">
            {slide.tag}
          </p>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-none uppercase mb-6 tracking-tight">
            {slide.title.map((word, i) => (
              <span key={i} className={`block ${i === slide.highlight ? 'text-[#C9A84C]' : ''}`}>{word}</span>
            ))}
          </h1>
          <p className="text-gray-300 text-sm uppercase tracking-[0.2em] mb-10 font-medium">
            Cultural Fusion &nbsp;•&nbsp; Timeless Style &nbsp;•&nbsp; Eco-Friendly
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to={slide.cta.link} className="bg-[#C9A84C] text-white px-10 py-4 text-sm font-black uppercase tracking-widest hover:bg-white hover:text-[#1A5C58] transition-all duration-200">
              {slide.cta.label}
            </Link>
            <Link to={slide.cta2.link} className="border-2 border-white text-white px-10 py-4 text-sm font-black uppercase tracking-widest hover:bg-white hover:text-[#1c1c1c] transition-all duration-200">
              {slide.cta2.label}
            </Link>
          </div>
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={() => goTo(current - 1)}
          className="absolute left-4 md:left-8 z-30 bg-black/30 hover:bg-[#C9A84C] text-white p-3 transition-all duration-200"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => goTo(current + 1)}
          className="absolute right-4 md:right-8 z-30 bg-black/30 hover:bg-[#C9A84C] text-white p-3 transition-all duration-200"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 ${i === current ? 'w-8 h-2 bg-[#C9A84C]' : 'w-2 h-2 bg-white/50 hover:bg-white'}`}
            />
          ))}
        </div>
      </div>

      {/* Ticker strip */}
      <div className="bg-[#1A5C58] py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="text-white text-xs font-bold uppercase tracking-[0.25em] mx-10">
              Free Shipping Over ₹999 &nbsp;•&nbsp; 30-Day Returns &nbsp;•&nbsp; Authentic Products &nbsp;•&nbsp; Eco-Friendly Fashion &nbsp;•&nbsp; Up To 60% Off
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
