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
    <section
      className="relative w-full min-h-[500px] flex items-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80')" }}
    >
      <div className="absolute inset-0 bg-[#1A5C58]/85" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-16 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Text */}
        <div>
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.3em] mb-4">Limited Time</p>
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase leading-none tracking-tight mb-4">
            Grand <br />
            <span className="text-[#C9A84C]">Sale</span>
          </h2>
          <p className="text-white/70 text-sm uppercase tracking-wider mb-2">Up to 60% off across all categories</p>
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-8">Cultural Fusion • Timeless Style • Eco-Friendly</p>
          <Link
            to="/products?ordering=-discount_percent"
            className="inline-block bg-[#C9A84C] text-white px-10 py-4 text-sm font-black uppercase tracking-widest hover:bg-white hover:text-[#1A5C58] transition-all duration-200"
          >
            Shop the Sale
          </Link>
        </div>

        {/* Countdown */}
        <div className="flex gap-2 md:gap-4">
          {[{ label: 'Days', val: days }, { label: 'Hrs', val: hours }, { label: 'Min', val: minutes }, { label: 'Sec', val: seconds }].map(({ label, val }) => (
            <div key={label} className="text-center min-w-[70px] md:min-w-[90px]">
              <div className="bg-white/10 border border-white/20 px-4 py-5">
                <p className="text-4xl md:text-5xl font-black text-[#C9A84C] leading-none">{pad(val)}</p>
              </div>
              <p className="text-white/60 text-xs uppercase tracking-widest mt-2 font-bold">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
