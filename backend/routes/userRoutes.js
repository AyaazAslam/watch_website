import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserRole,
  updateUserStatus,
  deleteUser,
} from '../controllers/userControllers.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = Router();

router.use(protect, authorize('admin'));

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.patch('/:id/role', updateUserRole);
router.patch('/:id/status', updateUserStatus);
router.delete('/:id', deleteUser);

export default router;
