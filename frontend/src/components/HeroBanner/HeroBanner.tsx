import { Link } from 'react-router-dom';

export default function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Main Hero */}
      <div
        className="relative min-h-[92vh] flex items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.3em] mb-5">
            New Collection 2025
          </p>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-none uppercase mb-6 tracking-tight">
            Culture <br />
            <span className="text-[#C9A84C]">Meets</span> <br />
            Style
          </h1>
          <p className="text-gray-300 text-sm uppercase tracking-[0.2em] mb-10 font-medium">
            Cultural Fusion &nbsp;•&nbsp; Timeless Style &nbsp;•&nbsp; Eco-Friendly
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/products"
              className="bg-[#C9A84C] text-white px-10 py-4 text-sm font-black uppercase tracking-widest hover:bg-white hover:text-[#1A5C58] transition-all duration-200"
            >
              Shop All
            </Link>
            <Link
              to="/products?gender=women"
              className="border-2 border-white text-white px-10 py-4 text-sm font-black uppercase tracking-widest hover:bg-white hover:text-[#1c1c1c] transition-all duration-200"
            >
              Women
            </Link>
            <Link
              to="/products?gender=men"
              className="border-2 border-white text-white px-10 py-4 text-sm font-black uppercase tracking-widest hover:bg-white hover:text-[#1c1c1c] transition-all duration-200"
            >
              Men
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-10 bg-white/30 animate-pulse" />
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
