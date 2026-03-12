import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', first_name: '', last_name: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await register(form);
      setAuth(res.data.user, res.data.access, res.data.refresh);
      toast.success('Account created! Welcome to fashionWagon 🎉');
      navigate('/');
    } catch (err: any) {
      const msg = err.response?.data?.username?.[0] || err.response?.data?.email?.[0] || 'Registration failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const field = (key: keyof typeof form, label: string, type = 'text', placeholder = '') => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-[#1c1c1c] mb-1.5">{label}</label>
      <input
        type={type}
        required
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        placeholder={placeholder}
        className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-[#e07b4f]"
      />
    </div>
  );

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1c1c1c] mb-1">
            fashion<span className="text-[#e07b4f]">Wagon</span>
          </h1>
          <p className="text-gray-500 text-sm">Create your account</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-8 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#1c1c1c] mb-1.5">First Name</label>
              <input type="text" required value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                placeholder="John" className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-[#e07b4f]" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#1c1c1c] mb-1.5">Last Name</label>
              <input type="text" required value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                placeholder="Doe" className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-[#e07b4f]" />
            </div>
          </div>
          {field('username', 'Username', 'text', 'Choose a username')}
          {field('email', 'Email', 'email', 'your@email.com')}
          {field('password', 'Password', 'password', 'Min. 6 characters')}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1c1c1c] text-white py-3 font-semibold text-sm hover:bg-[#e07b4f] transition-colors disabled:opacity-60 mt-2"
          >
            {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
          </button>
          <p className="text-center text-sm text-gray-500 mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-[#e07b4f] font-semibold hover:underline">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
