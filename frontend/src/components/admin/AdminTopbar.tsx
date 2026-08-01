import { Menu, LogOut } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout, selectAuthUser } from '../../store/slices/authSlice';
import { notify } from '../../lib/toast';

const PAGE_TITLES: Record<string, string> = {
  '/admin': 'Overview',
  '/admin/products': 'Products',
  '/admin/users': 'Users',
  '/admin/orders': 'Orders',
};

interface AdminTopbarProps {
  onMenuClick: () => void;
}

function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);
  const title = PAGE_TITLES[pathname] ?? 'Dashboard';

  const initials =
    user?.name
      ?.split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'AD';

  const handleLogout = () => {
    dispatch(logout());
    notify.info('Signed out successfully');
    navigate('/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-stone-200 flex items-center justify-between gap-4 px-4 sm:px-6">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden size-9 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-100"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <div className="min-w-0">
          <h1 className="text-base sm:text-lg font-bold text-[#0D0B0A] truncate">{title}</h1>
          <p className="hidden sm:block text-[11px] text-stone-500">
            Watch World by Azdadkhan management
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-2.5 pl-1 sm:pl-2">
          <div className="size-9 rounded-full bg-[#0D0B0A] text-[#AC7A37] flex items-center justify-center text-xs font-bold">
            {initials}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-[#0D0B0A] leading-tight">
              {user?.name || 'Admin'}
            </p>
            <p className="text-[11px] text-stone-500 capitalize">{user?.role}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-stone-600 hover:bg-stone-100 hover:text-[#0D0B0A] transition-colors"
        >
          <LogOut size={14} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}

export default AdminTopbar;
