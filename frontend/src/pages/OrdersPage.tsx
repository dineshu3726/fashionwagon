import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getOrders, getOrder } from '../api/orders';
import type { Order } from '../types';
import { Package } from 'lucide-react';

const STATUS_COLOR: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export function OrdersListPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders().then((res) => setOrders(res.data.results || res.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="max-w-4xl mx-auto px-4 py-16 text-center text-gray-400">Loading orders...</div>;

  if (orders.length === 0) return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <Package size={64} className="mx-auto text-gray-300 mb-4" />
      <h2 className="text-xl font-bold text-[#1c1c1c] mb-2">No orders yet</h2>
      <Link to="/products" className="bg-[#1c1c1c] text-white px-8 py-3 text-sm font-semibold hover:bg-[#e07b4f] transition-colors inline-block mt-4">
        START SHOPPING
      </Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-[#1c1c1c] mb-8">My Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <Link key={order.id} to={`/orders/${order.id}`}
            className="block border border-gray-200 p-5 hover:border-[#e07b4f] hover:shadow-sm transition-all">
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="font-semibold text-[#1c1c1c]">Order #{order.id}</p>
                <p className="text-xs text-gray-400">{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              <div className="text-right">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_COLOR[order.status] || 'bg-gray-100 text-gray-600'}`}>
                  {order.status.toUpperCase()}
                </span>
                <p className="font-bold text-[#1c1c1c] mt-1">₹{Number(order.total_amount).toFixed(0)}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">{order.items?.length || 0} item(s)</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getOrder(Number(id)).then((res) => setOrder(res.data)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="max-w-4xl mx-auto px-4 py-16 text-center text-gray-400">Loading order...</div>;
  if (!order) return <div className="text-center py-16">Order not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1c1c1c]">Order #{order.id}</h1>
          <p className="text-sm text-gray-400">{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        <span className={`text-sm font-semibold px-4 py-1.5 rounded-full ${STATUS_COLOR[order.status]}`}>
          {order.status.toUpperCase()}
        </span>
      </div>

      <div className="border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold text-[#1c1c1c] mb-4">Items</h2>
        <div className="space-y-4">
          {order.items?.map((item) => (
            <div key={item.id} className="flex justify-between items-center text-sm">
              <div>
                <p className="font-medium text-[#1c1c1c]">{item.product?.brand} {item.product?.name}</p>
                <p className="text-gray-400 text-xs">Size: {item.size} × {item.quantity}</p>
              </div>
              <p className="font-semibold">₹{Number(item.subtotal).toFixed(0)}</p>
            </div>
          ))}
        </div>
        <div className="border-t mt-4 pt-4 flex justify-between font-bold text-[#1c1c1c]">
          <span>Total</span>
          <span>₹{Number(order.total_amount).toFixed(0)}</span>
        </div>
      </div>

      <div className="border border-gray-200 p-6">
        <h2 className="font-semibold text-[#1c1c1c] mb-2">Delivery Address</h2>
        <p className="text-sm text-gray-600">{order.shipping_address}</p>
      </div>

      <Link to="/orders" className="inline-block mt-6 text-sm text-[#e07b4f] hover:underline">← Back to Orders</Link>
    </div>
  );
}
