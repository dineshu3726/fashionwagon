import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(form);
      setAuth(res.data.user || { id: 0, username: form.username, email: '', first_name: '', last_name: '' }, res.data.access, res.data.refresh);
      toast.success('Welcome back!');
      navigate('/');
    } catch {
      toast.error('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1c1c1c] mb-1">
            fashion<span className="text-[#e07b4f]">Wagon</span>
          </h1>
          <p className="text-gray-500 text-sm">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-8 shadow-sm">
          <div className="mb-5">
            <label className="block text-sm font-medium text-[#1c1c1c] mb-1.5">Username</label>
            <input
              type="text"
              required
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-[#e07b4f]"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#1c1c1c] mb-1.5">Password</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-[#e07b4f]"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1c1c1c] text-white py-3 font-semibold text-sm hover:bg-[#e07b4f] transition-colors disabled:opacity-60"
          >
            {loading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
          <p className="text-center text-sm text-gray-500 mt-5">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#e07b4f] font-semibold hover:underline">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
