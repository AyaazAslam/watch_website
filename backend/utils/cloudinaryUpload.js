import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cloudinary from '../config/cloudinary.js';

const FOLDER = 'watch-world/products';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const uploadsDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

function isCloudinaryReady() {
  const { cloud_name, api_key, api_secret } = cloudinary.config();
  return Boolean(cloud_name && api_key && api_secret);
}

function saveLocalUpload(file) {
  const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const original = file.originalname || 'image.jpg';
  const ext = path.extname(original).toLowerCase() || '.jpg';
  const filename = `product-${unique}${ext}`;
  fs.writeFileSync(path.join(uploadsDir, filename), file.buffer);
  return `/uploads/${filename}`;
}

function uploadOnce(file, folder) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        overwrite: false,
        timeout: 120000,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      },
    );
    stream.end(file.buffer);
  });
}

function isAuthError(error) {
  const message = String(error?.message || '').toLowerCase();
  const code = error?.http_code || error?.error?.http_code;
  return (
    code === 401 ||
    message.includes('api_secret mismatch') ||
    message.includes('invalid signature') ||
    message.includes('unauthorized')
  );
}

function isTimeoutError(error) {
  const message = String(error?.message || '').toLowerCase();
  return (
    message.includes('timeout') ||
    message.includes('timed out') ||
    error?.name === 'TimeoutError' ||
    error?.http_code === 499
  );
}

/** Upload to Cloudinary; retry once on timeout; fall back to local only for timeouts. */
export async function uploadImageBuffer(file, folder = FOLDER) {
  if (!file?.buffer) {
    const error = new Error('No image file provided');
    error.statusCode = 400;
    throw error;
  }

  if (!isCloudinaryReady()) {
    const error = new Error(
      'Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in backend/.env',
    );
    error.statusCode = 500;
    throw error;
  }

  try {
    return await uploadOnce(file, folder);
  } catch (firstError) {
    if (isAuthError(firstError)) {
      const error = new Error(
        'Cloudinary API secret mismatch. Copy the correct API secret from Cloudinary Dashboard → Settings → API Keys into CLOUDINARY_API_SECRET, then restart the backend.',
      );
      error.statusCode = 401;
      throw error;
    }

    if (isTimeoutError(firstError)) {
      console.warn('Cloudinary timeout — retrying once...');
      try {
        return await uploadOnce(file, folder);
      } catch (retryError) {
        if (isAuthError(retryError)) {
          const error = new Error(
            'Cloudinary API secret mismatch. Update CLOUDINARY_API_SECRET in backend/.env and restart.',
          );
          error.statusCode = 401;
          throw error;
        }
        console.warn(
          `Cloudinary upload failed (${retryError?.message || 'timeout'}) — saving image locally`,
        );
        return saveLocalUpload(file);
      }
    }

    console.warn(
      `Cloudinary upload failed (${firstError?.message || 'unknown'}) — saving image locally`,
    );
    return saveLocalUpload(file);
  }
}

/** Extract public_id from a Cloudinary delivery URL for destroy(). */
export function cloudinaryPublicId(url) {
  if (!url || typeof url !== 'string' || !url.includes('res.cloudinary.com')) {
    return null;
  }

  const afterUpload = url.split('/upload/')[1]?.split('?')[0];
  if (!afterUpload) return null;

  const segments = afterUpload.split('/');
  const versionIdx = segments.findIndex((segment) => /^v\d+$/.test(segment));
  const idSegments =
    versionIdx >= 0 ? segments.slice(versionIdx + 1) : segments;

  if (!idSegments.length) return null;

  const joined = idSegments.join('/');
  return joined.replace(/\.[a-zA-Z0-9]+$/, '') || null;
}

export async function destroyCloudinaryImage(url) {
  if (!url) return;

  if (url.startsWith('/uploads/')) {
    const absolute = path.join(uploadsDir, path.basename(url));
    fs.unlink(absolute, () => {});
    return;
  }

  const publicId = cloudinaryPublicId(url);
  if (!publicId || !isCloudinaryReady()) return;

  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
  } catch {
    // best-effort cleanup
  }
}
