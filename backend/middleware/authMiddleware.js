import jwt from 'jsonwebtoken';
import User from '../models/authModel.js';

export async function protect(req, res, next) {
  try {
    const header = req.headers.authorization;

    if (!header?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.status !== 'active') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
}

export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role '${req.user?.role || 'unknown'}' is not allowed`,
      });
    }
    next();
  };
}
