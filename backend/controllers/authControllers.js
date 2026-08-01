import User from '../models/authModel.js';
import { generateToken } from '../utils/generateToken.js';

function sendAuthResponse(res, user, statusCode = 200) {
  res.status(statusCode).json({
    token: generateToken(user._id),
    user: user.toJSON(),
  });
}

/** POST /api/auth/register */
export async function register(req, res, next) {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Public register always creates a customer
    const user = await User.create({
      name,
      email,
      phone: phone || '',
      password,
      role: 'customer',
    });

    sendAuthResponse(res, user, 201);
  } catch (error) {
    next(error);
  }
}

/** POST /api/auth/login */
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (user.status !== 'active') {
      return res.status(403).json({ message: 'Account is inactive' });
    }

    sendAuthResponse(res, user);
  } catch (error) {
    next(error);
  }
}

/** GET /api/auth/me */
export async function getMe(req, res) {
  res.json({ user: req.user.toJSON() });
}

/** PUT /api/auth/me */
export async function updateMe(req, res, next) {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { name, phone, email, password } = req.body;

    if (name !== undefined) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (email !== undefined) user.email = email;
    if (password) user.password = password;

    const updated = await user.save();
    res.json({ user: updated.toJSON() });
  } catch (error) {
    next(error);
  }
}
