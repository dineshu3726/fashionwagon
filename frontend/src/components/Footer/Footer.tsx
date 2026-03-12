import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-[#1A5C58] text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div>
          <img src="/fw_logo.jpg" alt="FashionWagon" className="h-14 w-auto object-contain mb-4 bg-white rounded-lg p-1" />
          <p className="text-sm leading-relaxed mb-2">
            Where culture meets contemporary fashion. Curating the best of Indian and global style.
          </p>
          <p className="text-[#C9A84C] text-xs font-semibold tracking-wider mb-4">
            Cultural Fusion • Timeless Style • Eco-Friendly
          </p>
          <div className="flex gap-3">
            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="bg-white/10 p-2 rounded-full hover:bg-[#C9A84C] hover:text-white transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <p className="text-white font-semibold mb-4 uppercase text-sm tracking-wider border-b border-[#C9A84C40] pb-2">Quick Links</p>
          <ul className="space-y-2 text-sm">
            {[['Home', '/'], ['Shop All', '/products'], ['Women', '/products?gender=women'], ['Men', '/products?gender=men'], ['Kids', '/products?gender=kids'], ['Sale', '/products?ordering=-discount_percent']].map(([label, to]) => (
              <li key={label}>
                <Link to={to} className="hover:text-[#C9A84C] transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Account */}
        <div>
          <p className="text-white font-semibold mb-4 uppercase text-sm tracking-wider border-b border-[#C9A84C40] pb-2">My Account</p>
          <ul className="space-y-2 text-sm">
            {[['My Orders', '/orders'], ['Wishlist', '/wishlist'], ['Cart', '/cart'], ['Login', '/login'], ['Register', '/register']].map(([label, to]) => (
              <li key={label}>
                <Link to={to} className="hover:text-[#C9A84C] transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <p className="text-white font-semibold mb-4 uppercase text-sm tracking-wider border-b border-[#C9A84C40] pb-2">Newsletter</p>
          <p className="text-sm mb-4">Subscribe and get ₹200 off your first order.</p>
          <form onSubmit={(e) => { e.preventDefault(); setEmail(''); }} className="flex flex-col gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="bg-white/10 border border-white/20 text-white px-4 py-2 text-sm focus:outline-none focus:border-[#C9A84C] placeholder-gray-500"
            />
            <button type="submit" className="bg-[#C9A84C] text-white py-2 text-sm font-semibold hover:bg-white hover:text-[#1A5C58] transition-colors tracking-wider">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 text-xs">
        <p>© 2025 FashionWagon. All rights reserved.</p>
        <p className="text-[#C9A84C] font-medium tracking-wider">Cultural Fusion • Timeless Style • Eco-Friendly</p>
        <div className="flex gap-4">
          <span className="hover:text-[#C9A84C] cursor-pointer">Privacy Policy</span>
          <span className="hover:text-[#C9A84C] cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
