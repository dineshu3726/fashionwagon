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
    <section className="border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-gray-100">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center gap-2 py-8 px-4 text-center group hover:bg-[#F5F0E8] transition-colors duration-200">
              <Icon size={22} className="text-[#1A5C58] group-hover:scale-110 transition-transform duration-200" />
              <p className="font-black text-xs uppercase tracking-wider text-[#1c1c1c]">{title}</p>
              <p className="text-xs text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
