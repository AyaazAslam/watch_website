import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import AuthShell from '../../components/auth/AuthShell';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  register,
  clearAuthError,
  selectAuth,
  selectIsAuthenticated,
} from '../../store/slices/authSlice';
import { notify } from '../../lib/toast';

function Signup() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error } = useAppSelector(selectAuth);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) navigate('/account', { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const handleChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setLocalError(null);
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (form.password.length < 6) {
      setLocalError('Password must be at least 6 characters.');
      notify.warning('Password must be at least 6 characters.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setLocalError('Passwords do not match.');
      notify.warning('Passwords do not match.');
      return;
    }

    const email = form.email.trim();
    const result = await dispatch(
      register({
        name: form.name.trim(),
        email,
        phone: form.phone.trim(),
        password: form.password,
      }),
    );

    if (register.fulfilled.match(result)) {
      notify.success('Account created successfully. Please sign in.');
      navigate('/login', {
        replace: true,
        state: {
          signupSuccess: true,
          email,
        },
      });
    } else if (register.rejected.match(result)) {
      notify.error((result.payload as string) || 'Signup failed');
    }
  };

  return (
    <AuthShell
      title="Create Account"
      subtitle="Join Watch World by Azdadkhan for a smoother shopping experience"
      footer={
        <>
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-[#AC7A37] hover:underline"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-stone-500">
            Full name
          </label>
          <input
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={handleChange('name')}
            className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-[#0D0B0A] outline-none focus:border-[#AC7A37] focus:ring-1 focus:ring-[#AC7A37]/40"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-stone-500">
            Email
          </label>
          <input
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={handleChange('email')}
            className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-[#0D0B0A] outline-none focus:border-[#AC7A37] focus:ring-1 focus:ring-[#AC7A37]/40"
            placeholder="you@email.com"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-stone-500">
            Phone
          </label>
          <input
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange('phone')}
            className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-[#0D0B0A] outline-none focus:border-[#AC7A37] focus:ring-1 focus:ring-[#AC7A37]/40"
            placeholder="+92 300 1234567"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-stone-500">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              minLength={6}
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange('password')}
              className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3.5 py-2.5 pr-11 text-sm text-[#0D0B0A] outline-none focus:border-[#AC7A37] focus:ring-1 focus:ring-[#AC7A37]/40"
              placeholder="Min 6 characters"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-stone-500">
            Confirm password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            required
            minLength={6}
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={handleChange('confirmPassword')}
            className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-[#0D0B0A] outline-none focus:border-[#AC7A37] focus:ring-1 focus:ring-[#AC7A37]/40"
            placeholder="Repeat password"
          />
        </div>

        {(localError || error) && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {localError || error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full rounded-lg bg-[#AC7A37] py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#966832] transition-colors disabled:opacity-60"
        >
          {status === 'loading' ? 'Creating account…' : 'Create account'}
        </button>
      </form>
    </AuthShell>
  );
}

export default Signup;
