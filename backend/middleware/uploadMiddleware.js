import multer from 'multer';

/** Keep files in memory — then stream to Cloudinary in the controller. */
const storage = multer.memoryStorage();

function fileFilter(_req, file, cb) {
  const allowed = /jpeg|jpg|png|webp|gif/;
  const extOk = allowed.test(
    (file.originalname.split('.').pop() || '').toLowerCase(),
  );
  const mimeOk = allowed.test((file.mimetype.split('/')[1] || '').toLowerCase());

  if (extOk && mimeOk) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpg, png, webp, gif)'));
  }
}

export const uploadProductImages = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
}).fields([
  { name: 'image', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
]);
