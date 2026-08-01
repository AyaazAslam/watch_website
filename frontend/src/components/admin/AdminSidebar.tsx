import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  ExternalLink,
  X,
} from 'lucide-react';
import { useAppSelector } from '../../store/hooks';
import { selectAuthUser } from '../../store/slices/authSlice';

const NAV_ITEMS = [
  { name: 'Overview', path: '/admin', icon: LayoutDashboard, end: true },
  { name: 'Products', path: '/admin/products', icon: Package },
  { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
  { name: 'Users', path: '/admin/users', icon: Users },
];

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const user = useAppSelector(selectAuthUser);

  if (user?.role !== 'admin') {
    return null;
  }

  return (
    <>
      {open && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-[#0D0B0A]/50 backdrop-blur-sm lg:hidden"
          aria-label="Close sidebar"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 shrink-0 bg-[#0D0B0A] text-stone-100 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between gap-3 px-5 h-16 border-b border-stone-800">
          <Link to="/admin" className="flex items-center gap-2.5 min-w-0" onClick={onClose}>
            <img src="/img/logo.png" alt="Watch World" className="h-9 w-auto object-contain" />
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.12em] truncate">
                Watch World
              </p>
              <p className="text-[10px] text-stone-500 uppercase tracking-wider">Admin</p>
            </div>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden size-8 rounded-lg flex items-center justify-center text-stone-400 hover:bg-stone-800 hover:text-white"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-1">
          <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-stone-500">
            Menu
          </p>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#AC7A37] text-white'
                    : 'text-stone-400 hover:bg-stone-900 hover:text-stone-100'
                }`
              }
            >
              <item.icon size={18} />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-stone-800">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-stone-700 text-xs font-semibold uppercase tracking-wider text-stone-300 hover:border-[#AC7A37] hover:text-[#AC7A37] transition-colors"
          >
            <ExternalLink size={14} />
            View storefront
          </Link>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
