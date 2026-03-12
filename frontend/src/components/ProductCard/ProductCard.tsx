import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import type { Product } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import toast from 'react-hot-toast';

interface Props { product: Product; }

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  const primaryImage = product.images?.find((i) => i.is_primary)?.url || product.images?.[0]?.url;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const size = product.sizes?.[0] || 'M';
    addItem(product, size);
    toast.success(`Added to bag!`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggle(product.id);
    toast.success(wishlisted ? 'Removed from wishlist' : 'Saved to wishlist!');
  };

  return (
    <Link to={`/product/${product.id}`} className="group block bg-white">
      <div className="relative overflow-hidden bg-[#F5F0E8] aspect-[3/4]">
        {primaryImage ? (
          <img src={primaryImage} alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <ShoppingBag size={48} />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.discount_percent > 0 && (
            <span className="bg-[#C9A84C] text-white text-xs px-2 py-0.5 font-bold">
              -{product.discount_percent}%
            </span>
          )}
          {product.stock === 0 && (
            <span className="bg-gray-800 text-white text-xs px-2 py-0.5 font-semibold">OUT OF STOCK</span>
          )}
        </div>

        {/* Wishlist */}
        <button onClick={handleWishlist}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:shadow-md transition-all opacity-0 group-hover:opacity-100">
          <Heart size={16} className={wishlisted ? 'fill-[#C9A84C] text-[#C9A84C]' : 'text-gray-400'} />
        </button>

        {/* Add to bag */}
        <button onClick={handleAddToCart}
          className="absolute bottom-0 left-0 right-0 bg-[#1A5C58] text-white text-xs font-semibold py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-[#C9A84C] tracking-wider">
          ADD TO BAG
        </button>
      </div>

      <div className="pt-3 pb-4 px-1">
        <p className="text-xs text-[#1A5C58] uppercase tracking-wider font-semibold mb-0.5">{product.brand}</p>
        <p className="text-sm font-medium text-[#1c1c1c] truncate">{product.name}</p>

        {product.rating > 0 && (
          <div className="flex items-center gap-1 mt-1">
            <div className="flex items-center gap-0.5 bg-[#1A5C58] text-white text-xs px-1.5 py-0.5 rounded">
              <Star size={9} className="fill-white" />
              <span>{product.rating}</span>
            </div>
            <span className="text-xs text-gray-400">({product.review_count})</span>
          </div>
        )}

        <div className="flex items-center gap-2 mt-1.5">
          <span className="font-bold text-[#1c1c1c]">₹{Number(product.discounted_price).toFixed(0)}</span>
          {product.discount_percent > 0 && (
            <>
              <span className="text-gray-400 line-through text-xs">₹{Number(product.price).toFixed(0)}</span>
              <span className="text-green-600 text-xs font-semibold">{product.discount_percent}% off</span>
            </>
          )}
        </div>

        {product.sizes?.length > 0 && (
          <div className="flex gap-1 mt-2 flex-wrap">
            {product.sizes.slice(0, 4).map((s) => (
              <span key={s} className="text-xs border border-gray-200 px-1.5 py-0.5 text-gray-500">{s}</span>
            ))}
            {product.sizes.length > 4 && <span className="text-xs text-gray-400">+{product.sizes.length - 4}</span>}
          </div>
        )}
      </div>
    </Link>
  );
}
