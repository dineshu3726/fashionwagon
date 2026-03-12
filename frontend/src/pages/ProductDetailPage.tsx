import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, ChevronLeft } from 'lucide-react';
import type { Product } from '../types';
import { getProduct } from '../api/products';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);

  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isWishlisted } = useWishlistStore();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getProduct(Number(id))
      .then((res) => {
        setProduct(res.data);
        if (res.data.sizes?.length > 0) setSelectedSize(res.data.sizes[0]);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-16 animate-pulse">
      <div className="flex gap-12">
        <div className="w-1/2 bg-gray-200 aspect-square" />
        <div className="flex-1 space-y-4">
          <div className="h-6 bg-gray-200 w-1/3 rounded" />
          <div className="h-8 bg-gray-200 w-2/3 rounded" />
          <div className="h-6 bg-gray-200 w-1/4 rounded" />
        </div>
      </div>
    </div>
  );

  if (!product) return (
    <div className="max-w-7xl mx-auto px-4 py-24 text-center">
      <p className="text-xl font-semibold text-gray-400">Product not found</p>
      <Link to="/products" className="text-[#e07b4f] mt-4 inline-block hover:underline">← Back to shop</Link>
    </div>
  );

  const wishlisted = isWishlisted(product.id);
  const images = product.images || [];
  const currentImage = images[selectedImage]?.image;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Link to="/products" className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#e07b4f] mb-8">
        <ChevronLeft size={16} /> Back to Shop
      </Link>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Images */}
        <div className="flex gap-4 md:w-1/2">
          <div className="flex flex-col gap-2">
            {images.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setSelectedImage(i)}
                className={`w-16 h-20 overflow-hidden border-2 ${i === selectedImage ? 'border-[#e07b4f]' : 'border-transparent'}`}
              >
                <img src={img.image} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1 bg-[#f5f5f5] aspect-[3/4] overflow-hidden">
            {currentImage ? (
              <img src={currentImage} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <ShoppingBag size={64} />
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="md:w-1/2">
          <p className="text-[#e07b4f] text-sm font-semibold uppercase tracking-widest mb-1">{product.brand}</p>
          <h1 className="text-2xl font-bold text-[#1c1c1c] mb-2">{product.name}</h1>

          {/* Rating */}
          {product.rating > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={14} className={s <= Math.round(Number(product.rating)) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.rating} ({product.review_count} reviews)</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-[#1c1c1c]">₹{Number(product.discounted_price).toFixed(0)}</span>
            {product.discount_percent > 0 && (
              <>
                <span className="text-gray-400 line-through text-lg">₹{Number(product.price).toFixed(0)}</span>
                <span className="bg-green-100 text-green-700 text-sm font-semibold px-2 py-0.5 rounded">
                  {product.discount_percent}% off
                </span>
              </>
            )}
          </div>

          {/* Category */}
          {product.category && (
            <p className="text-sm text-gray-500 mb-4">
              Category: <span className="font-medium text-[#1c1c1c]">{product.category.name}</span>
            </p>
          )}

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-semibold text-[#1c1c1c] mb-2">
                Size: <span className="text-[#e07b4f]">{selectedSize}</span>
              </p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2 border text-sm font-medium transition-colors ${
                      selectedSize === s
                        ? 'border-[#1c1c1c] bg-[#1c1c1c] text-white'
                        : 'border-gray-300 hover:border-[#1c1c1c]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors?.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-semibold text-[#1c1c1c] mb-2">Colors</p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <span key={c} className="border border-gray-300 px-3 py-1 text-sm text-gray-600">{c}</span>
                ))}
              </div>
            </div>
          )}

          {/* Stock */}
          <p className={`text-sm font-medium mb-6 ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {product.stock > 0 ? `✓ In Stock (${product.stock} left)` : '✗ Out of Stock'}
          </p>

          {/* Buttons */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => {
                if (!selectedSize) return toast.error('Please select a size');
                addItem(product, selectedSize);
                toast.success('Added to cart!');
              }}
              disabled={product.stock === 0}
              className="flex-1 bg-[#1c1c1c] text-white py-3.5 font-semibold text-sm hover:bg-[#e07b4f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <ShoppingBag size={18} /> ADD TO BAG
            </button>
            <button
              onClick={() => { toggle(product.id); toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist!'); }}
              className={`border px-4 py-3.5 transition-colors ${wishlisted ? 'border-[#e07b4f] bg-[#e07b4f] text-white' : 'border-gray-300 hover:border-[#e07b4f] hover:text-[#e07b4f]'}`}
            >
              <Heart size={18} className={wishlisted ? 'fill-white' : ''} />
            </button>
          </div>

          {/* Description */}
          {product.description && (
            <div className="border-t pt-6">
              <p className="font-semibold text-[#1c1c1c] mb-2">Product Details</p>
              <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
