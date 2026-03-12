import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function useCountdown(targetDate: Date) {
  const calc = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function CountdownBanner() {
  const target = new Date();
  target.setDate(target.getDate() + 7);
  const { days, hours, minutes, seconds } = useCountdown(target);
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section className="relative bg-[#1A5C58] text-white py-14 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#C9A84C] rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C9A84C] rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-2">
            🏷️ Limited Time Deal
          </p>
          <h2 className="text-4xl font-bold mb-2">
            Grand Fashion Sale <span className="text-[#C9A84C]">60% OFF</span>
          </h2>
          <p className="text-gray-300 mb-1">Across all categories — Indian & Western wear</p>
          <p className="text-[#C9A84C] text-sm font-medium">Cultural Fusion • Timeless Style • Eco-Friendly</p>
          <Link
            to="/products?ordering=-discount_percent"
            className="inline-block mt-5 bg-[#C9A84C] text-white px-8 py-3 text-sm font-semibold hover:bg-white hover:text-[#1A5C58] transition-colors tracking-wider"
          >
            SHOP THE SALE
          </Link>
        </div>

        {/* Countdown */}
        <div className="flex gap-3">
          {[{ label: 'Days', val: days }, { label: 'Hours', val: hours }, { label: 'Mins', val: minutes }, { label: 'Secs', val: seconds }].map(({ label, val }) => (
            <div key={label} className="text-center bg-white/10 border border-[#C9A84C40] px-5 py-4 rounded-xl min-w-[70px]">
              <p className="text-3xl font-bold text-[#C9A84C]">{pad(val)}</p>
              <p className="text-xs text-gray-300 mt-1 uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
