const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/** Resolve relative upload paths against the API host. Full Cloudinary URLs pass through. */
export function mediaUrl(path?: string | null): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const base = API_URL.replace(/\/api\/?$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
