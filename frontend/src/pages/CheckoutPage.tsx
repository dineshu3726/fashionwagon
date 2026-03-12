import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { createOrder } from '../api/orders';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: '', phone: '', address_line1: '', address_line2: '',
    city: '', state: '', pincode: '',
  });

  const shippingFee = totalPrice() >= 999 ? 0 : 99;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const address = `${form.full_name}, ${form.phone}, ${form.address_line1}${form.address_line2 ? ', ' + form.address_line2 : ''}, ${form.city}, ${form.state} - ${form.pincode}`;
    try {
      const res = await createOrder({
        shipping_address: address,
        items: items.map((i) => ({
          product_id: i.product.id,
          size: i.size,
          quantity: i.quantity,
          price: i.product.discounted_price,
        })),
      });
      clearCart();
      toast.success('Order placed successfully!');
      navigate(`/orders/${res.data.id}`);
    } catch {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) { navigate('/cart'); return null; }

  const f = (key: keyof typeof form, label: string, placeholder = '', half = false) => (
    <div className={half ? 'w-1/2' : 'w-full'}>
      <label className="block text-sm font-medium text-[#1c1c1c] mb-1.5">{label}</label>
      <input
        type="text"
        required={key !== 'address_line2'}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        placeholder={placeholder}
        className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-[#e07b4f]"
      />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-[#1c1c1c] mb-8">Checkout</h1>
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Address Form */}
        <form onSubmit={handleSubmit} className="flex-1">
          <h2 className="font-bold text-[#1c1c1c] mb-5">Delivery Address</h2>
          <div className="space-y-4">
            {f('full_name', 'Full Name', 'John Doe')}
            {f('phone', 'Phone Number', '9876543210')}
            {f('address_line1', 'Address Line 1', 'House no., Street, Area')}
            {f('address_line2', 'Address Line 2 (Optional)', 'Landmark')}
            <div className="flex gap-4">
              {f('city', 'City', 'Mumbai', true)}
              {f('state', 'State', 'Maharashtra', true)}
            </div>
            {f('pincode', 'Pincode', '400001')}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-[#1c1c1c] text-white py-4 font-semibold text-sm hover:bg-[#e07b4f] transition-colors disabled:opacity-60"
          >
            {loading ? 'PLACING ORDER...' : `PLACE ORDER — ₹${(totalPrice() + shippingFee).toFixed(0)}`}
          </button>
          <p className="text-xs text-gray-400 text-center mt-3">
            Cash on Delivery / Pay on delivery available
          </p>
        </form>

        {/* Order Summary */}
        <div className="lg:w-80 h-fit">
          <h2 className="font-bold text-[#1c1c1c] mb-5">Order Summary ({items.length} items)</h2>
          <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
            {items.map((item) => (
              <div key={`${item.product.id}-${item.size}`} className="flex justify-between text-sm">
                <span className="text-gray-600 truncate flex-1 mr-2">
                  {item.product.brand} {item.product.name} × {item.quantity} <span className="text-gray-400">({item.size})</span>
                </span>
                <span className="font-medium shrink-0">₹{(item.product.discounted_price * item.quantity).toFixed(0)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span><span>₹{totalPrice().toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className={shippingFee === 0 ? 'text-green-600' : ''}>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
            </div>
          </div>
          <div className="border-t mt-3 pt-3 flex justify-between font-bold text-[#1c1c1c]">
            <span>Total</span>
            <span>₹{(totalPrice() + shippingFee).toFixed(0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
