import { Truck, RotateCcw, Headphones, Shield, Leaf } from 'lucide-react';

const features = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders over ₹999' },
  { icon: RotateCcw, title: 'Easy Returns', desc: '30-day return policy' },
  { icon: Headphones, title: '24/7 Support', desc: 'Always here to help' },
  { icon: Shield, title: 'Secure Payment', desc: '100% protected' },
  { icon: Leaf, title: 'Eco-Friendly', desc: 'Sustainable fashion' },
];

export default function FeatureBar() {
  return (
    <section className="bg-[#F5F0E8] border-y border-[#C9A84C30]">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-5 gap-6">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-center gap-3">
            <div className="bg-white p-2.5 rounded-full shadow-sm border border-[#C9A84C30]">
              <Icon size={20} className="text-[#1A5C58]" />
            </div>
            <div>
              <p className="font-semibold text-[#1A5C58] text-sm">{title}</p>
              <p className="text-xs text-gray-500">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
