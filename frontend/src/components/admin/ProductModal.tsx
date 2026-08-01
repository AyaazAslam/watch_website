import { useState, useEffect } from 'react';
import { X, ImagePlus } from 'lucide-react';
import type { CatalogProduct, ProductGender } from '../../types';
import { BRANDS } from '../../data/products';
import { mediaUrl } from '../../lib/media';
import type { ProductFormPayload } from '../../services/productService';

const GENDERS: { value: ProductGender; label: string }[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'unisex', label: 'Unisex' },
];

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: ProductFormPayload) => void | Promise<void>;
  productToEdit?: CatalogProduct | null;
}

/** Form uses rupees; store uses paisa */
function toRupees(paisa: number) {
  return (paisa / 100).toString();
}

function toPaisa(rupees: string) {
  return Math.round(parseFloat(rupees || '0') * 100);
}

export default function ProductModal({
  isOpen,
  onClose,
  onSave,
  productToEdit,
}: ProductModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    brand: BRANDS[0] as string,
    gender: 'male' as ProductGender,
    price: '',
    comparePrice: '',
    image: '',
    image2: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [image2File, setImage2File] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [image2Preview, setImage2Preview] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        title: productToEdit.title,
        brand: productToEdit.brand,
        gender: productToEdit.gender || 'male',
        price: toRupees(productToEdit.price),
        comparePrice: productToEdit.comparePrice
          ? toRupees(productToEdit.comparePrice)
          : '',
        image: productToEdit.image,
        image2: productToEdit.image2 || '',
      });
      setImagePreview(mediaUrl(productToEdit.image));
      setImage2Preview(mediaUrl(productToEdit.image2));
    } else {
      setFormData({
        title: '',
        brand: BRANDS[0],
        gender: 'male',
        price: '',
        comparePrice: '',
        image: '',
        image2: '',
      });
      setImagePreview('');
      setImage2Preview('');
    }
    setImageFile(null);
    setImage2File(null);
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (
    file: File | null,
    which: 'image' | 'image2',
  ) => {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    if (which === 'image') {
      setImageFile(file);
      setImagePreview(preview);
    } else {
      setImage2File(file);
      setImage2Preview(preview);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productToEdit && !imageFile) {
      return;
    }

    const compare = formData.comparePrice ? toPaisa(formData.comparePrice) : undefined;
    const price = toPaisa(formData.price);
    const onSale = Boolean(compare && compare > price);

    const payload: ProductFormPayload = {
      title: formData.title.trim(),
      brand: formData.brand,
      gender: formData.gender,
      handle: productToEdit
        ? productToEdit.handle
        : formData.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, ''),
      price,
      comparePrice: onSale ? compare : undefined,
      inStock: true,
      badge: onSale ? 'Sale' : undefined,
      badgeType: onSale ? 'sale' : undefined,
      imageFile,
      image2File,
      image: formData.image || undefined,
      image2: formData.image2 || undefined,
    };

    if (productToEdit) {
      payload.id = productToEdit.id;
    }

    try {
      setSaving(true);
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
            {productToEdit ? 'Edit Product' : 'Add Product'}
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
              Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none focus:border-[#AC7A37] focus:ring-1 focus:ring-[#AC7A37]/40"
              placeholder="Rolex DateJust…"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-500">
                Brand
              </label>
              <select
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none focus:border-[#AC7A37]"
              >
                {BRANDS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-500">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    gender: e.target.value as ProductGender,
                  })
                }
                className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none focus:border-[#AC7A37]"
              >
                {GENDERS.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-500">
              Price (Rs.)
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none focus:border-[#AC7A37] focus:ring-1 focus:ring-[#AC7A37]/40"
              placeholder="3799"
            />
          </div>

          {productToEdit && (
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-500">
                Compare price (Rs.) — optional
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.comparePrice}
                onChange={(e) => setFormData({ ...formData, comparePrice: e.target.value })}
                className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none focus:border-[#AC7A37] focus:ring-1 focus:ring-[#AC7A37]/40"
                placeholder="5000"
              />
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-500">
              Main image {!productToEdit && <span className="text-red-500">*</span>}
            </label>
            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-stone-300 bg-stone-50 px-3 py-4 text-center hover:border-[#AC7A37]/60 transition-colors">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Main preview"
                  className="h-28 w-auto rounded-md object-cover"
                />
              ) : (
                <ImagePlus className="text-stone-400" size={28} />
              )}
              <span className="text-xs text-stone-500">
                {imageFile ? imageFile.name : 'Click to upload (jpg, png, webp)'}
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                required={!productToEdit}
                className="hidden"
                onChange={(e) =>
                  handleFileChange(e.target.files?.[0] || null, 'image')
                }
              />
            </label>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-500">
              Hover image — optional
            </label>
            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-stone-300 bg-stone-50 px-3 py-4 text-center hover:border-[#AC7A37]/60 transition-colors">
              {image2Preview ? (
                <img
                  src={image2Preview}
                  alt="Hover preview"
                  className="h-28 w-auto rounded-md object-cover"
                />
              ) : (
                <ImagePlus className="text-stone-400" size={28} />
              )}
              <span className="text-xs text-stone-500">
                {image2File ? image2File.name : 'Click to upload alternate view'}
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={(e) =>
                  handleFileChange(e.target.files?.[0] || null, 'image2')
                }
              />
            </label>
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
              {saving
                ? 'Saving…'
                : productToEdit
                  ? 'Save changes'
                  : 'Add product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
