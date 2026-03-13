import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Menu, X, User, ChevronDown } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const totalItems = useCartStore((s) => s.totalItems());
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-[#1A5C58] text-white text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span className="tracking-wider">Cultural Fusion • Timeless Style • Eco-Friendly</span>
          <div className="flex gap-4">
            {isAuthenticated() ? (
              <>
                <span className="text-[#C9A84C]">Hi, {user?.first_name || user?.username}</span>
                <button onClick={() => { logout(); navigate('/'); }} className="hover:text-[#C9A84C] transition-colors">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-[#C9A84C] transition-colors">Login</Link>
                <Link to="/register" className="hover:text-[#C9A84C] transition-colors">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/fw_logo.jpg" alt="FashionWagon" className="h-14 w-14 object-contain rounded-sm" />
          <div className="hidden sm:flex flex-col leading-none">
            <span className="text-xl font-black uppercase tracking-tight text-[#1A5C58]">Fashion</span>
            <span className="text-xl font-black uppercase tracking-tight text-[#C9A84C]">Wagon</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#1c1c1c]">
          <Link to="/" className="hover:text-[#1A5C58] transition-colors">Home</Link>
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-[#1A5C58] transition-colors">
              Women <ChevronDown size={14} />
            </button>
            <div className="absolute top-full left-0 bg-white shadow-lg py-2 w-44 hidden group-hover:block z-50 border-t-2 border-[#C9A84C]">
              <Link to="/products?gender=women" className="block px-4 py-2 hover:bg-[#F5F0E8] text-sm hover:text-[#1A5C58]">All Women</Link>
              <Link to="/products?gender=women&category=kurtas" className="block px-4 py-2 hover:bg-[#F5F0E8] text-sm hover:text-[#1A5C58]">Kurtas & Suits</Link>
              <Link to="/products?gender=women&category=dresses" className="block px-4 py-2 hover:bg-[#F5F0E8] text-sm hover:text-[#1A5C58]">Dresses</Link>
              <Link to="/products?gender=women&category=tops" className="block px-4 py-2 hover:bg-[#F5F0E8] text-sm hover:text-[#1A5C58]">Tops & Tees</Link>
              <Link to="/products?gender=women&category=sarees" className="block px-4 py-2 hover:bg-[#F5F0E8] text-sm hover:text-[#1A5C58]">Sarees</Link>
            </div>
          </div>
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-[#1A5C58] transition-colors">
              Men <ChevronDown size={14} />
            </button>
            <div className="absolute top-full left-0 bg-white shadow-lg py-2 w-44 hidden group-hover:block z-50 border-t-2 border-[#C9A84C]">
              <Link to="/products?gender=men" className="block px-4 py-2 hover:bg-[#F5F0E8] text-sm hover:text-[#1A5C58]">All Men</Link>
              <Link to="/products?gender=men&category=shirts" className="block px-4 py-2 hover:bg-[#F5F0E8] text-sm hover:text-[#1A5C58]">Shirts</Link>
              <Link to="/products?gender=men&category=tshirts" className="block px-4 py-2 hover:bg-[#F5F0E8] text-sm hover:text-[#1A5C58]">T-Shirts & Polos</Link>
              <Link to="/products?gender=men&category=jeans" className="block px-4 py-2 hover:bg-[#F5F0E8] text-sm hover:text-[#1A5C58]">Jeans & Trousers</Link>
              <Link to="/products?gender=men&category=ethnic-men" className="block px-4 py-2 hover:bg-[#F5F0E8] text-sm hover:text-[#1A5C58]">Ethnic Wear</Link>
            </div>
          </div>
          <Link to="/products?gender=kids" className="hover:text-[#1A5C58] transition-colors">Kids</Link>
          <Link to="/products?category=accessories" className="hover:text-[#1A5C58] transition-colors">Accessories</Link>
          <Link to="/products" className="hover:text-[#1A5C58] transition-colors">Shop All</Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button onClick={() => setSearchOpen(!searchOpen)} className="hover:text-[#1A5C58] transition-colors">
            <Search size={20} />
          </button>
          {isAuthenticated() && (
            <Link to="/orders" className="hover:text-[#1A5C58] transition-colors">
              <User size={20} />
            </Link>
          )}
          <Link to="/wishlist" className="hover:text-[#1A5C58] transition-colors">
            <Heart size={20} />
          </Link>
          <Link to="/cart" className="relative hover:text-[#1A5C58] transition-colors">
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#C9A84C] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div className="border-t border-gray-100 px-4 py-3 bg-white">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2">
            <input
              autoFocus
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, brands, categories..."
              className="flex-1 border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-[#1A5C58]"
            />
            <button type="submit" className="bg-[#1A5C58] text-white px-6 py-2 text-sm hover:bg-[#C9A84C] transition-colors font-semibold">
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3 text-sm font-medium">
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-[#1A5C58]">Home</Link>
          <Link to="/products?gender=women" onClick={() => setMenuOpen(false)} className="hover:text-[#1A5C58]">Women</Link>
          <Link to="/products?gender=men" onClick={() => setMenuOpen(false)} className="hover:text-[#1A5C58]">Men</Link>
          <Link to="/products?gender=kids" onClick={() => setMenuOpen(false)} className="hover:text-[#1A5C58]">Kids</Link>
          <Link to="/products" onClick={() => setMenuOpen(false)} className="hover:text-[#1A5C58]">Shop All</Link>
          <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="hover:text-[#1A5C58]">Wishlist</Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)} className="hover:text-[#1A5C58]">Cart ({totalItems})</Link>
          {!isAuthenticated() && (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="text-[#1A5C58] font-semibold">Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="text-[#C9A84C] font-semibold">Register</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
