import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productControllers.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { uploadProductImages } from '../middleware/uploadMiddleware.js';

const router = Router();

function handleUpload(req, res, next) {
  uploadProductImages(req, res, (err) => {
    if (err) {
      err.statusCode = err.code === 'LIMIT_FILE_SIZE' ? 400 : 400;
      if (err.code === 'LIMIT_FILE_SIZE') {
        err.message = 'Image must be smaller than 5MB';
      }
      return next(err);
    }
    next();
  });
}

router.get('/', getProducts);
router.get('/:id', getProductById);

router.post('/', protect, authorize('admin'), handleUpload, createProduct);
router.put('/:id', protect, authorize('admin'), handleUpload, updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);

export default router;
