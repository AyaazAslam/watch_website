import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import AuthShell from '../../components/auth/AuthShell';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  login,
  clearAuthError,
  selectAuth,
  selectIsAuthenticated,
} from '../../store/slices/authSlice';
import { notify } from '../../lib/toast';

type LoginLocationState = {
  from?: { pathname?: string };
  signupSuccess?: boolean;
  email?: string;
} | null;

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { status, error, user } = useAppSelector(selectAuth);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const locationState = location.state as LoginLocationState;

  const [email, setEmail] = useState(locationState?.email || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState(
    locationState?.signupSuccess
      ? 'Account created successfully. Please sign in.'
      : '',
  );

  const from = locationState?.from?.pathname || '/account';

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    if (user.role === 'admin') {
      navigate('/admin', { replace: true });
    } else {
      navigate(from.startsWith('/admin') ? '/account' : from, { replace: true });
    }
  }, [isAuthenticated, user, navigate, from]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    const result = await dispatch(
      login({ email: email.trim(), password }),
    );

    if (login.fulfilled.match(result)) {
      const role = result.payload.user.role;
      const name = result.payload.user.name;
      notify.success(`Welcome back, ${name}`);
      if (role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate(from.startsWith('/admin') ? '/account' : from, {
          replace: true,
        });
      }
    } else if (login.rejected.match(result)) {
      notify.error((result.payload as string) || 'Login failed');
    }
  };

  return (
    <AuthShell
      title="Welcome Back"
      subtitle="Sign in to your Watch World by Azdadkhan account"
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link
            to="/signup"
            className="font-semibold text-[#AC7A37] hover:underline"
          >
            Create one
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {successMessage && (
          <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
            {successMessage}
          </p>
        )}

        <div>
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-stone-500">
            Email
          </label>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-[#0D0B0A] outline-none focus:border-[#AC7A37] focus:ring-1 focus:ring-[#AC7A37]/40"
            placeholder="you@email.com"
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3.5 py-2.5 pr-11 text-sm text-[#0D0B0A] outline-none focus:border-[#AC7A37] focus:ring-1 focus:ring-[#AC7A37]/40"
              placeholder="Your password"
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

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full rounded-lg bg-[#0D0B0A] py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#AC7A37] transition-colors disabled:opacity-60"
        >
          {status === 'loading' ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

     
    </AuthShell>
  );
}

export default Login;
