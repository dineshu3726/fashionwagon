import { Link } from 'react-router-dom';

export default function HeroBanner() {
  return (
    <section className="relative bg-[#F5F0E8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 flex flex-col md:flex-row items-center gap-10">
        {/* Text */}
        <div className="flex-1 z-10">
          <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-3">
            New Collection 2025
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-[#1A5C58] leading-tight mb-4">
            Where Culture <br />
            Meets <span className="text-[#C9A84C]">Style</span>
          </h1>
          <p className="text-gray-500 text-base mb-3 font-medium tracking-wider uppercase text-sm">
            Cultural Fusion • Timeless Style • Eco-Friendly
          </p>
          <p className="text-gray-500 text-base mb-8 max-w-md">
            Discover premium Indian and fusion fashion — from traditional kurtas to contemporary western wear. Style that tells your story.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link to="/products" className="bg-[#1A5C58] text-white px-8 py-3 text-sm font-semibold hover:bg-[#C9A84C] transition-colors tracking-wider">
              SHOP NOW
            </Link>
            <Link to="/products?gender=women" className="border-2 border-[#1A5C58] text-[#1A5C58] px-8 py-3 text-sm font-semibold hover:bg-[#1A5C58] hover:text-white transition-colors tracking-wider">
              WOMEN'S FASHION
            </Link>
          </div>
        </div>

        {/* Hero visual */}
        <div className="flex-1 flex justify-center items-center">
          <div className="relative w-72 h-96 md:w-96 md:h-[480px]">
            {/* Main circle */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1A5C5820] to-[#C9A84C20] rounded-full" />
            <div className="w-full h-full flex items-center justify-center">
              <img src="/fw_logo.jpg" alt="FashionWagon" className="w-64 h-auto object-contain drop-shadow-xl" />
            </div>
            {/* Floating badges */}
            <div className="absolute top-8 -right-4 bg-white shadow-lg px-4 py-2 rounded-full text-sm font-semibold text-[#1A5C58] border border-[#C9A84C]">
              400+ Brands ✨
            </div>
            <div className="absolute bottom-12 -left-4 bg-[#C9A84C] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              Up to 60% OFF
            </div>
            <div className="absolute top-1/2 -right-8 bg-[#1A5C58] text-white px-3 py-1.5 rounded-full text-xs font-semibold">
              Eco-Friendly 🌿
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="bg-[#1A5C58] py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-center gap-10 text-white text-xs tracking-widest font-medium">
          <span>FREE SHIPPING OVER ₹999</span>
          <span>•</span>
          <span>30-DAY RETURNS</span>
          <span>•</span>
          <span>AUTHENTIC PRODUCTS</span>
        </div>
      </div>
    </section>
  );
}
