import User from '../models/authModel.js';

/** GET /api/users */
export async function getUsers(req, res, next) {
  try {
    const { role, q } = req.query;
    const filter = {};

    if (role && role !== 'all') filter.role = role;

    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { phone: { $regex: q, $options: 'i' } },
      ];
    }

    const users = await User.find(filter).sort({ createdAt: -1 });
    res.json({ count: users.length, users });
  } catch (error) {
    next(error);
  }
}

/** GET /api/users/:id */
export async function getUserById(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (error) {
    next(error);
  }
}

/** POST /api/users — admin creates user with role */
export async function createUser(req, res, next) {
  try {
    const { name, email, phone, password, role, status, orders } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required',
      });
    }

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const user = await User.create({
      name,
      email,
      phone: phone || '',
      password,
      role: role || 'customer',
      status: status || 'active',
      orders: orders || 0,
    });

    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
}

/** PUT /api/users/:id */
export async function updateUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id).select('+password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { name, email, phone, password, role, status, orders, avatar } = req.body;

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (phone !== undefined) user.phone = phone;
    if (role !== undefined) user.role = role;
    if (status !== undefined) user.status = status;
    if (orders !== undefined) user.orders = orders;
    if (avatar !== undefined) user.avatar = avatar;
    if (password) user.password = password;

    const updated = await user.save();
    res.json({ user: updated.toJSON() });
  } catch (error) {
    next(error);
  }
}

/** PATCH /api/users/:id/role */
export async function updateUserRole(req, res, next) {
  try {
    const { role } = req.body;
    if (!['admin', 'customer'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.role === 'admin' && role !== 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin' });
      if (adminCount <= 1) {
        return res.status(400).json({ message: 'Must keep at least one admin' });
      }
    }

    user.role = role;
    const updated = await user.save();
    res.json({ user: updated });
  } catch (error) {
    next(error);
  }
}

/** PATCH /api/users/:id/status */
export async function updateUserStatus(req, res, next) {
  try {
    const { status } = req.body;
    if (!['active', 'inactive'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.status = status;
    const updated = await user.save();
    res.json({ user: updated });
  } catch (error) {
    next(error);
  }
}

/** DELETE /api/users/:id */
export async function deleteUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.role === 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin' });
      if (adminCount <= 1) {
        return res.status(400).json({ message: 'Must keep at least one admin' });
      }
    }

    if (req.user._id.toString() === user._id.toString()) {
      return res.status(400).json({ message: 'You cannot delete your own account' });
    }

    await user.deleteOne();
    res.json({ message: 'User deleted', id: req.params.id });
  } catch (error) {
    next(error);
  }
}
