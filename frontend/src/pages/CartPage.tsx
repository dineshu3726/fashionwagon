import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  if (items.length === 0) return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
      <h2 className="text-xl font-bold text-[#1c1c1c] mb-2">Your bag is empty</h2>
      <p className="text-gray-500 text-sm mb-6">Add some items to get started</p>
      <Link to="/products" className="bg-[#1c1c1c] text-white px-8 py-3 text-sm font-semibold hover:bg-[#e07b4f] transition-colors">
        CONTINUE SHOPPING
      </Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-[#1c1c1c] mb-8">Shopping Bag ({totalItems()} items)</h1>
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Items */}
        <div className="flex-1 space-y-4">
          {items.map((item) => {
            const image = item.product.images?.find((i) => i.is_primary)?.url || item.product.images?.[0]?.url;
            return (
              <div key={`${item.product.id}-${item.size}`} className="flex gap-4 border-b pb-6">
                <Link to={`/product/${item.product.id}`} className="w-24 h-32 bg-gray-100 shrink-0 overflow-hidden">
                  {image ? (
                    <img src={image} alt={item.product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <ShoppingBag size={24} />
                    </div>
                  )}
                </Link>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 uppercase">{item.product.brand}</p>
                  <Link to={`/product/${item.product.id}`} className="font-semibold text-[#1c1c1c] hover:text-[#e07b4f] text-sm">
                    {item.product.name}
                  </Link>
                  <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-gray-300">
                      <button onClick={() => updateQuantity(item.product.id, item.size, Math.max(1, item.quantity - 1))}
                        className="px-3 py-1 text-lg hover:bg-gray-100">-</button>
                      <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                        className="px-3 py-1 text-lg hover:bg-gray-100">+</button>
                    </div>
                    <button onClick={() => removeItem(item.product.id, item.size)}
                      className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#1c1c1c]">₹{(item.product.discounted_price * item.quantity).toFixed(0)}</p>
                  {item.product.discount_percent > 0 && (
                    <p className="text-xs text-gray-400 line-through">₹{(Number(item.product.price) * item.quantity).toFixed(0)}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="lg:w-80 h-fit border border-gray-200 p-6">
          <h2 className="font-bold text-[#1c1c1c] mb-6 text-lg">Order Summary</h2>
          <div className="space-y-3 text-sm mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({totalItems()} items)</span>
              <span>₹{totalPrice().toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className={totalPrice() >= 999 ? 'text-green-600' : ''}>
                {totalPrice() >= 999 ? 'FREE' : '₹99'}
              </span>
            </div>
            {totalPrice() < 999 && (
              <p className="text-xs text-[#e07b4f]">Add ₹{(999 - totalPrice()).toFixed(0)} more for free shipping!</p>
            )}
          </div>
          <div className="border-t pt-4 flex justify-between font-bold text-[#1c1c1c] text-base mb-6">
            <span>Total</span>
            <span>₹{(totalPrice() + (totalPrice() >= 999 ? 0 : 99)).toFixed(0)}</span>
          </div>
          <button
            onClick={() => isAuthenticated() ? navigate('/checkout') : navigate('/login')}
            className="w-full bg-[#1c1c1c] text-white py-3.5 font-semibold text-sm hover:bg-[#e07b4f] transition-colors"
          >
            {isAuthenticated() ? 'PROCEED TO CHECKOUT' : 'LOGIN TO CHECKOUT'}
          </button>
          <Link to="/products" className="block text-center text-sm text-[#e07b4f] mt-4 hover:underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
