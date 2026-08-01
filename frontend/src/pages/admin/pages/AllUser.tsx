import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Search, Users, Plus, Pencil, Trash2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  selectUsers,
  selectUsersStatus,
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
  setUserRole,
  setUserStatus,
} from '../../../store/slices/usersSlice';
import { selectAuthUser } from '../../../store/slices/authSlice';
import UserModal, { type UserFormPayload } from '../../../components/admin/UserModal';
import type { AdminUser, UserRole, UserStatus } from '../../../types';
import { notify } from '../../../lib/toast';

const ROLE_STYLES: Record<UserRole, string> = {
  admin: 'bg-[#0D0B0A] text-[#AC7A37]',
  customer: 'bg-stone-100 text-stone-700',
};

const STATUS_STYLES: Record<UserStatus, string> = {
  active: 'bg-emerald-50 text-emerald-700',
  inactive: 'bg-stone-100 text-stone-500',
};

const ROLES: UserRole[] = ['admin', 'customer'];
const STATUSES: UserStatus[] = ['active', 'inactive'];

function AllUser() {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(selectAuthUser);
  const users = useAppSelector(selectUsers);
  const status = useAppSelector(selectUsersStatus);
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<AdminUser | null>(null);

  useEffect(() => {
    if (authUser?.role === 'admin') {
      dispatch(fetchUsers());
    }
  }, [dispatch, authUser?.role]);

  if (authUser && authUser.role !== 'admin') {
    return <Navigate to="/admin" replace />;
  }

  const filtered = users.filter((user) => {
    const q = query.toLowerCase();
    const matchesQuery =
      user.name.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q) ||
      user.phone.includes(q);
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesQuery && matchesRole;
  });

  const handleAddClick = () => {
    setUserToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (user: AdminUser) => {
    setUserToEdit(user);
    setIsModalOpen(true);
  };

  const handleSave = async (payload: UserFormPayload) => {
    try {
      if (payload.id) {
        const { id, ...data } = payload;
        await dispatch(updateUser({ id, data })).unwrap();
        notify.success('User updated successfully');
      } else {
        await dispatch(
          addUser({
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            password: payload.password || '',
            role: payload.role,
            status: payload.status,
            orders: payload.orders,
          }),
        ).unwrap();
        notify.success('User added successfully');
      }
    } catch (error) {
      notify.error(typeof error === 'string' ? error : 'Failed to save user');
      throw error;
    }
  };

  const handleDelete = async (user: AdminUser) => {
    if (user.role === 'admin' && users.filter((u) => u.role === 'admin').length <= 1) {
      notify.warning('You must keep at least one admin user.');
      return;
    }
    if (!window.confirm(`Delete user “${user.name}”?`)) return;
    try {
      await dispatch(deleteUser(user.id)).unwrap();
      notify.success('User deleted successfully');
    } catch (error) {
      notify.error(typeof error === 'string' ? error : 'Failed to delete user');
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#0D0B0A]">Users</h2>
          <p className="text-sm text-stone-500 mt-0.5">
            Add, edit, delete users and change roles
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 text-xs text-stone-500 bg-white border border-stone-200 rounded-lg px-3 py-2">
            <Users size={14} className="text-[#AC7A37]" />
            {users.length} total
          </div>
          <button
            type="button"
            onClick={handleAddClick}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#AC7A37] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#966832] transition-colors shadow-sm"
          >
            <Plus size={16} />
            Add user
          </button>
        </div>
      </div>

      {status === 'loading' && (
        <p className="text-sm text-stone-500">Loading users…</p>
      )}
      {status === 'failed' && (
        <p className="text-sm text-red-600">Failed to load users from API.</p>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2.5 flex-1 max-w-md shadow-sm">
          <Search size={16} className="text-stone-400 shrink-0" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, phone…"
            className="w-full bg-transparent text-sm outline-none text-stone-700 placeholder:text-stone-400"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as 'all' | UserRole)}
          className="rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm font-medium text-stone-700 outline-none focus:border-[#AC7A37] shadow-sm"
        >
          <option value="all">All roles</option>
          <option value="admin">Admin</option>
          <option value="customer">Customer</option>
        </select>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-stone-50 text-[11px] uppercase tracking-wider text-stone-500">
              <tr>
                <th className="px-5 py-3.5 font-semibold">User</th>
                <th className="px-5 py-3.5 font-semibold">Contact</th>
                <th className="px-5 py-3.5 font-semibold">Role</th>
                <th className="px-5 py-3.5 font-semibold">Orders</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5 font-semibold">Joined</th>
                <th className="px-5 py-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-stone-500">
                    {query || roleFilter !== 'all'
                      ? 'No users match your filters.'
                      : 'No users yet. Add one to get started.'}
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-stone-100 hover:bg-stone-50/80"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3 min-w-[180px]">
                        <div className="size-10 rounded-full bg-[#0D0B0A] text-[#AC7A37] flex items-center justify-center text-xs font-bold shrink-0">
                          {user.name
                            .split(' ')
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join('')}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-[#0D0B0A] truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-stone-400 truncate">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-stone-600 whitespace-nowrap">
                      {user.phone}
                    </td>
                    <td className="px-5 py-3.5">
                      <select
                        value={user.role}
                        onChange={async (e) => {
                          try {
                            await dispatch(
                              setUserRole({
                                id: user.id,
                                role: e.target.value as UserRole,
                              }),
                            ).unwrap();
                            notify.success('User role updated');
                          } catch (error) {
                            notify.error(
                              typeof error === 'string'
                                ? error
                                : 'Failed to update role',
                            );
                          }
                        }}
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold capitalize border-0 outline-none cursor-pointer ${ROLE_STYLES[user.role]}`}
                        aria-label={`Change role for ${user.name}`}
                      >
                        {ROLES.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-[#0D0B0A]">
                      {user.orders}
                    </td>
                    <td className="px-5 py-3.5">
                      <select
                        value={user.status}
                        onChange={async (e) => {
                          try {
                            await dispatch(
                              setUserStatus({
                                id: user.id,
                                status: e.target.value as UserStatus,
                              }),
                            ).unwrap();
                            notify.success('User status updated');
                          } catch (error) {
                            notify.error(
                              typeof error === 'string'
                                ? error
                                : 'Failed to update status',
                            );
                          }
                        }}
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold capitalize border-0 outline-none cursor-pointer ${STATUS_STYLES[user.status]}`}
                        aria-label={`Change status for ${user.name}`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-3.5 text-stone-500 whitespace-nowrap">
                      {user.joinedAt
                        ? new Date(user.joinedAt).toLocaleDateString('en-PK', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })
                        : '—'}
                    </td>
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleEditClick(user)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-stone-600 hover:bg-stone-100 hover:text-[#0D0B0A] transition-colors"
                      >
                        <Pencil size={14} />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(user)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors ml-1"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        userToEdit={userToEdit}
      />
    </div>
  );
}

export default AllUser;
