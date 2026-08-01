import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { AdminUser, UserRole, UserStatus } from '../../types';
import { notify } from '../../lib/toast';

export type UserFormPayload = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  orders: number;
  password?: string;
};

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: UserFormPayload) => void | Promise<void>;
  userToEdit?: AdminUser | null;
}

const ROLES: UserRole[] = ['admin', 'customer'];
const STATUSES: UserStatus[] = ['active', 'inactive'];

export default function UserModal({
  isOpen,
  onClose,
  onSave,
  userToEdit,
}: UserModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'customer' as UserRole,
    status: 'active' as UserStatus,
    orders: '0',
    password: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        name: userToEdit.name,
        email: userToEdit.email,
        phone: userToEdit.phone,
        role: userToEdit.role,
        status: userToEdit.status,
        orders: String(userToEdit.orders),
        password: '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'customer',
        status: 'active',
        orders: '0',
        password: '',
      });
    }
  }, [userToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userToEdit && formData.password.length < 6) {
      notify.warning('Password must be at least 6 characters.');
      return;
    }

    const payload: UserFormPayload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      role: formData.role,
      status: formData.status,
      orders: Math.max(0, parseInt(formData.orders || '0', 10) || 0),
    };

    if (userToEdit) {
      payload.id = userToEdit.id;
      if (formData.password.trim()) payload.password = formData.password;
    } else {
      payload.password = formData.password;
    }

    setSaving(true);
    try {
      await onSave(payload);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-[#0D0B0A]/50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between border-b border-stone-100 bg-white px-5 py-4 rounded-t-2xl">
          <h3 className="text-lg font-bold text-[#0D0B0A]">
            {userToEdit ? 'Edit User' : 'Add User'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="size-8 rounded-lg flex items-center justify-center text-stone-400 hover:bg-stone-100 hover:text-stone-700"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-500">
              Full name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none focus:border-[#AC7A37] focus:ring-1 focus:ring-[#AC7A37]/40"
              placeholder="Azad Khan"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-500">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none focus:border-[#AC7A37] focus:ring-1 focus:ring-[#AC7A37]/40"
                placeholder="name@email.com"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-500">
                Phone
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none focus:border-[#AC7A37] focus:ring-1 focus:ring-[#AC7A37]/40"
                placeholder="+92 300 1234567"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-500">
              Password {userToEdit ? '(optional)' : ''}
            </label>
            <input
              type="password"
              required={!userToEdit}
              minLength={userToEdit ? undefined : 6}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none focus:border-[#AC7A37] focus:ring-1 focus:ring-[#AC7A37]/40"
              placeholder={userToEdit ? 'Leave blank to keep current' : 'Min 6 characters'}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-500">
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value as UserRole })
                }
                className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none focus:border-[#AC7A37] capitalize"
              >
                {ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-500">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as UserStatus,
                  })
                }
                className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none focus:border-[#AC7A37] capitalize"
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-500">
                Orders
              </label>
              <input
                type="number"
                min="0"
                value={formData.orders}
                onChange={(e) => setFormData({ ...formData, orders: e.target.value })}
                className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none focus:border-[#AC7A37] focus:ring-1 focus:ring-[#AC7A37]/40"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-stone-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-stone-200 px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[#AC7A37] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#966832] transition-colors disabled:opacity-60"
            >
              {saving ? 'Saving…' : userToEdit ? 'Save changes' : 'Add user'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
