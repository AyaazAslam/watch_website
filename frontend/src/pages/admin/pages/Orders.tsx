import { useEffect, useState } from 'react';
import { Search, ShoppingBag } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  selectOrders,
  selectOrdersStatus,
  fetchOrders,
  updateOrderStatus,
} from '../../../store/slices/ordersSlice';
import { formatPkr } from '../../../data/products';
import type { AdminOrder } from '../../../types';
import { notify } from '../../../lib/toast';

const STATUS_STYLES: Record<AdminOrder['status'], string> = {
  pending: 'bg-amber-50 text-amber-700',
  confirmed: 'bg-sky-50 text-sky-700',
  shipped: 'bg-indigo-50 text-indigo-700',
  delivered: 'bg-emerald-50 text-emerald-700',
  cancelled: 'bg-red-50 text-red-700',
};

const STATUS_OPTIONS: AdminOrder['status'][] = [
  'pending',
  'confirmed',
  'shipped',
  'delivered',
  'cancelled',
];

function Orders() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const status = useAppSelector(selectOrdersStatus);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | AdminOrder['status']>('all');

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const filtered = orders.filter((order) => {
    const q = query.toLowerCase();
    const matchesQuery =
      order.id.toLowerCase().includes(q) ||
      order.customer.toLowerCase().includes(q) ||
      order.product.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#0D0B0A]">Orders</h2>
          <p className="text-sm text-stone-500 mt-0.5">
            WhatsApp and walk-in inquiries
          </p>
        </div>
        <div className="inline-flex items-center gap-2 text-xs text-stone-500 bg-white border border-stone-200 rounded-lg px-3 py-2">
          <ShoppingBag size={14} className="text-[#AC7A37]" />
          {orders.length} recent
        </div>
      </div>

      {status === 'loading' && (
        <p className="text-sm text-stone-500">Loading orders…</p>
      )}
      {status === 'failed' && (
        <p className="text-sm text-red-600">Failed to load orders from API.</p>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2.5 flex-1 max-w-md shadow-sm">
          <Search size={16} className="text-stone-400 shrink-0" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search order, customer, product…"
            className="w-full bg-transparent text-sm outline-none text-stone-700 placeholder:text-stone-400"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as 'all' | AdminOrder['status'])
          }
          className="rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm font-medium text-stone-700 outline-none focus:border-[#AC7A37] shadow-sm"
        >
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-stone-50 text-[11px] uppercase tracking-wider text-stone-500">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Order</th>
                <th className="px-5 py-3.5 font-semibold">Customer</th>
                <th className="px-5 py-3.5 font-semibold">Product</th>
                <th className="px-5 py-3.5 font-semibold">Channel</th>
                <th className="px-5 py-3.5 font-semibold">Amount</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-stone-500">
                    No orders match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t border-stone-100 hover:bg-stone-50/80"
                  >
                    <td className="px-5 py-3.5 font-semibold text-[#0D0B0A] whitespace-nowrap">
                      {order.id}
                    </td>
                    <td className="px-5 py-3.5 text-stone-700 whitespace-nowrap">
                      {order.customer}
                    </td>
                    <td className="px-5 py-3.5 text-stone-600 max-w-[200px] truncate">
                      {order.product}
                    </td>
                    <td className="px-5 py-3.5 capitalize text-stone-600 whitespace-nowrap">
                      {order.channel}
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-[#0D0B0A] whitespace-nowrap">
                      {formatPkr(order.amount)}
                    </td>
                    <td className="px-5 py-3.5">
                      <select
                        value={order.status}
                        onChange={async (e) => {
                          try {
                            await dispatch(
                              updateOrderStatus({
                                id: order.id,
                                status: e.target.value as AdminOrder['status'],
                              }),
                            ).unwrap();
                            notify.success('Order status updated');
                          } catch (error) {
                            notify.error(
                              typeof error === 'string'
                                ? error
                                : 'Failed to update order',
                            );
                          }
                        }}
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold capitalize border-0 outline-none cursor-pointer ${STATUS_STYLES[order.status]}`}
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-3.5 text-stone-500 whitespace-nowrap">
                      {new Date(order.date).toLocaleDateString('en-PK', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Orders;
