import cloudinary from '../config/cloudinary.js';

const FOLDER = 'watch-world/products';

function assertConfigured() {
  const { cloud_name, api_key, api_secret } = cloudinary.config();
  if (!cloud_name || !api_key || !api_secret) {
    const error = new Error(
      'Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to .env',
    );
    error.statusCode = 500;
    throw error;
  }
}

/** Upload a multer memory file buffer to Cloudinary. Returns secure_url. */
export function uploadImageBuffer(file, folder = FOLDER) {
  assertConfigured();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        overwrite: false,
      },
      (error, result) => {
        if (error) {
          const err = new Error(error.message || 'Cloudinary upload failed');
          err.statusCode = 400;
          return reject(err);
        }
        resolve(result.secure_url);
      },
    );

    stream.end(file.buffer);
  });
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
  const publicId = cloudinaryPublicId(url);
  if (!publicId) return;

  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
  } catch {
    // best-effort cleanup
  }
}
