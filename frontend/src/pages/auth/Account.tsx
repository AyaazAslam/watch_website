import { Link, Navigate, useNavigate } from 'react-router-dom';
import { LogOut, Package, Shield } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  logout,
  selectAuthUser,
  selectIsAuthenticated,
} from '../../store/slices/authSlice';
import { notify } from '../../lib/toast';

function Account() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectAuthUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace state={{ from: { pathname: '/account' } }} />;
  }

  const handleLogout = () => {
    dispatch(logout());
    notify.info('Signed out successfully');
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#f8f9fb] py-12 sm:py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-[0.16em] text-[#0D0B0A]">
          My <span className="text-[#AC7A37]">Account</span>
        </h1>
        <div className="w-14 h-0.5 bg-[#AC7A37] mt-3 rounded-full" />

        <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="size-14 rounded-full bg-[#0D0B0A] text-[#AC7A37] flex items-center justify-center text-lg font-bold shrink-0">
              {user.name
                .split(' ')
                .map((n) => n[0])
                .slice(0, 2)
                .join('')
                .toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-lg font-bold text-[#0D0B0A]">{user.name}</p>
              <p className="text-sm text-stone-500">{user.email}</p>
              {user.phone && (
                <p className="text-sm text-stone-500 mt-0.5">{user.phone}</p>
              )}
              <span className="inline-flex mt-2 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#AC7A37]/10 text-[#AC7A37]">
                {user.role}
              </span>
            </div>
          </div>

          <div className="mt-8 grid gap-3">
            <Link
              to="/collection"
              className="flex items-center gap-3 rounded-xl border border-stone-100 px-4 py-3.5 text-sm font-medium text-stone-700 hover:border-[#AC7A37]/40 hover:bg-[#AC7A37]/5 transition-colors"
            >
              <Package size={18} className="text-[#AC7A37]" />
              Browse collection
            </Link>

            {user.role === 'admin' && (
              <Link
                to="/admin"
                className="flex items-center gap-3 rounded-xl border border-stone-100 px-4 py-3.5 text-sm font-medium text-stone-700 hover:border-[#AC7A37]/40 hover:bg-[#AC7A37]/5 transition-colors"
              >
                <Shield size={18} className="text-[#AC7A37]" />
                Open admin dashboard
              </Link>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-3 rounded-xl border border-stone-100 px-4 py-3.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={18} />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
