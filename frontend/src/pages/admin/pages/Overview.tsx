import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Users,
  ShoppingBag,
  TrendingUp,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import StatCard from '../../../components/admin/StatCard';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectProducts, fetchProducts } from '../../../store/slices/productsSlice';
import { selectUsers, fetchUsers } from '../../../store/slices/usersSlice';
import { selectOrders, fetchOrders } from '../../../store/slices/ordersSlice';
import { selectAuthUser } from '../../../store/slices/authSlice';
import { formatPkr } from '../../../data/products';
import { mediaUrl } from '../../../lib/media';
import { whatsappHref } from '../../../data/brand';

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700',
  confirmed: 'bg-sky-50 text-sky-700',
  shipped: 'bg-indigo-50 text-indigo-700',
  delivered: 'bg-emerald-50 text-emerald-700',
  cancelled: 'bg-red-50 text-red-700',
};

function Overview() {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(selectAuthUser);
  const products = useAppSelector(selectProducts);
  const users = useAppSelector(selectUsers);
  const orders = useAppSelector(selectOrders);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchOrders());
    if (authUser?.role === 'admin') dispatch(fetchUsers());
  }, [dispatch, authUser?.role]);

  const inStock = products.filter((p) => p.inStock !== false).length;
  const onSale = products.filter((p) => p.comparePrice).length;
  const customers = users.filter((u) => u.role === 'customer').length;
  const revenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.amount, 0);

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0D0B0A] tracking-tight">
            Welcome back
          </h2>
          <p className="text-sm text-stone-500 mt-1">
            Store snapshot for Watch World by Azdadkhan — Bolton Market, Karachi
          </p>
        </div>
        <Link
          to="/admin/products"
          className="inline-flex items-center gap-2 self-start px-4 py-2.5 rounded-lg bg-[#0D0B0A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#AC7A37] transition-colors"
        >
          Manage products
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Products"
          value={String(products.length)}
          hint={`${inStock} in stock · ${onSale} on sale`}
          icon={Package}
          tone="gold"
        />
        <StatCard
          title="Orders"
          value={String(orders.length)}
          hint="Recent WhatsApp & walk-in"
          icon={ShoppingBag}
          tone="blue"
        />
        <StatCard
          title="Customers"
          value={String(customers)}
          hint={`${users.length} total accounts`}
          icon={Users}
          tone="dark"
        />
        <StatCard
          title="Est. revenue"
          value={formatPkr(revenue)}
          hint="From recent orders"
          icon={TrendingUp}
          tone="green"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="xl:col-span-2 rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
            <h3 className="text-sm font-black uppercase tracking-[0.14em] text-[#0D0B0A]">
              Recent orders
            </h3>
            <Link
              to="/admin/orders"
              className="text-xs font-semibold text-[#AC7A37] hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-stone-50 text-[11px] uppercase tracking-wider text-stone-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Order</th>
                  <th className="px-5 py-3 font-semibold">Customer</th>
                  <th className="px-5 py-3 font-semibold">Amount</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-t border-stone-100 hover:bg-stone-50/80">
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-[#0D0B0A]">{order.id}</p>
                      <p className="text-xs text-stone-500 truncate max-w-[160px]">
                        {order.product}
                      </p>
                    </td>
                    <td className="px-5 py-3.5 text-stone-600">{order.customer}</td>
                    <td className="px-5 py-3.5 font-semibold text-[#0D0B0A]">
                      {formatPkr(order.amount)}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold capitalize ${STATUS_STYLES[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick panel */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-[0.14em] text-[#0D0B0A] mb-4">
              Quick actions
            </h3>
            <div className="space-y-2">
              <Link
                to="/admin/products"
                className="flex items-center gap-3 rounded-xl border border-stone-100 px-3 py-3 text-sm font-medium text-stone-700 hover:border-[#AC7A37]/40 hover:bg-[#AC7A37]/5 transition-colors"
              >
                <Package size={16} className="text-[#AC7A37]" />
                Add / edit products
              </Link>
              <Link
                to="/admin/users"
                className="flex items-center gap-3 rounded-xl border border-stone-100 px-3 py-3 text-sm font-medium text-stone-700 hover:border-[#AC7A37]/40 hover:bg-[#AC7A37]/5 transition-colors"
              >
                <Users size={16} className="text-[#AC7A37]" />
                Manage users
              </Link>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-stone-100 px-3 py-3 text-sm font-medium text-stone-700 hover:border-[#25D366]/40 hover:bg-[#25D366]/5 transition-colors"
              >
                <MessageCircle size={16} className="text-[#25D366]" />
                Open WhatsApp
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-[#0D0B0A] p-5 text-stone-100 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-[0.14em] text-[#AC7A37] mb-2">
              Catalog tip
            </h3>
            <p className="text-sm text-stone-400 leading-relaxed">
              Products you add here are saved in this browser and shown in the admin catalog.
              Keep images and brands consistent for a cleaner storefront.
            </p>
          </div>
        </div>
      </div>

      {/* Top products */}
      <div className="rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
          <h3 className="text-sm font-black uppercase tracking-[0.14em] text-[#0D0B0A]">
            Catalog preview
          </h3>
          <Link
            to="/admin/products"
            className="text-xs font-semibold text-[#AC7A37] hover:underline"
          >
            Manage
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5">
          {products.slice(0, 4).map((product) => (
            <div key={product.id} className="group">
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-stone-50 border border-stone-100">
                <img
                  src={mediaUrl(product.image)}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="mt-2 text-[10px] uppercase tracking-wider text-[#AC7A37] font-semibold">
                {product.brand}
              </p>
              <p className="text-xs font-semibold text-[#0D0B0A] line-clamp-2">{product.title}</p>
              <p className="text-xs font-bold text-stone-600 mt-0.5">
                {formatPkr(product.price)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Overview;
