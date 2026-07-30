import { useState, useEffect } from 'react';
import type { Product } from '../../types';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id'> | Product) => void;
  productToEdit?: Product | null;
}

export default function ProductModal({ isOpen, onClose, onSave, productToEdit }: ProductModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        price: productToEdit.price.toString(),
        description: productToEdit.description,
        image: productToEdit.image,
      });
    } else {
      setFormData({ name: '', price: '', description: '', image: '' });
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description,
      image: formData.image,
    };

    if (productToEdit) {
      onSave({ ...payload, id: productToEdit.id });
    } else {
      onSave(payload);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-[#262626]/50 p-4 sm:p-0 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b p-5">
          <h3 className="text-xl font-semibold text-gray-900">
            {productToEdit ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button
            onClick={onClose}
            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid gap-6 mb-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">Product Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-[#D6B16A] focus:ring-[#D6B16A]"
                placeholder="e.g. Royal Oak"
              />
            </div>
            
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">Price ($)</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-[#D6B16A] focus:ring-[#D6B16A]"
                placeholder="1500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">Image URL</label>
              <input
                type="url"
                required
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-[#D6B16A] focus:ring-[#D6B16A]"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">Description</label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-[#D6B16A] focus:ring-[#D6B16A]"
                placeholder="Write a compelling description..."
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 border-t pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#D6B16A] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#c19b2f] focus:outline-none focus:ring-4 focus:ring-[#D6B16A]/50"
            >
              {productToEdit ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
