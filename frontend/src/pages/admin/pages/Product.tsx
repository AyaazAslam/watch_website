import { useState } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { useProducts } from '../../../hooks/useProducts';
import type { CatalogProduct } from '../../../types';
import type { ProductFormPayload } from '../../../services/productService';
import ProductModal from '../../../components/admin/ProductModal';
import { formatPkr } from '../../../data/products';
import { notify } from '../../../lib/toast';
import { mediaUrl } from '../../../lib/media';

function ProductPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<CatalogProduct | null>(null);
  const [query, setQuery] = useState('');

  const filtered = products.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.handle.toLowerCase().includes(q)
    );
  });

  const handleAddClick = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (product: CatalogProduct) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleSave = async (product: ProductFormPayload) => {
    try {
      if (product.id) {
        await updateProduct(product).unwrap();
        notify.success('Product updated successfully');
      } else {
        await addProduct(product).unwrap();
        notify.success('Product added successfully');
      }
    } catch (error) {
      notify.error(typeof error === 'string' ? error : 'Failed to save product');
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#0D0B0A]">Products</h2>
          <p className="text-sm text-stone-500 mt-0.5">
            {products.length} watches in catalog
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddClick}
          className="inline-flex items-center justify-center gap-2 self-start px-4 py-2.5 rounded-lg bg-[#AC7A37] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#966832] transition-colors shadow-sm"
        >
          <Plus size={16} />
          Add product
        </button>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2.5 max-w-md shadow-sm">
        <Search size={16} className="text-stone-400 shrink-0" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title or brand…"
          className="w-full bg-transparent text-sm outline-none text-stone-700 placeholder:text-stone-400"
        />
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-stone-50 text-[11px] uppercase tracking-wider text-stone-500">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Product</th>
                <th className="px-5 py-3.5 font-semibold">Brand</th>
                <th className="px-5 py-3.5 font-semibold">Price</th>
                <th className="px-5 py-3.5 font-semibold">Stock</th>
                <th className="px-5 py-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-stone-500">
                    {query
                      ? 'No products match your search.'
                      : 'No products yet. Add one to get started.'}
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr
                    key={product.id}
                    className="border-t border-stone-100 hover:bg-stone-50/80"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3 min-w-[200px]">
                        <div className="size-12 rounded-lg overflow-hidden bg-stone-100 border border-stone-100 shrink-0">
                          <img
                            src={mediaUrl(product.image)}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-[#0D0B0A] line-clamp-1">
                            {product.title}
                          </p>
                          <p className="text-xs text-stone-400 truncate">{product.handle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-stone-600 whitespace-nowrap">
                      {product.brand}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <p className="font-semibold text-[#0D0B0A]">
                        {formatPkr(product.price)}
                      </p>
                      {product.comparePrice && (
                        <p className="text-xs text-stone-400 line-through">
                          {formatPkr(product.comparePrice)}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          product.inStock === false
                            ? 'bg-red-50 text-red-700'
                            : 'bg-emerald-50 text-emerald-700'
                        }`}
                      >
                        {product.inStock === false ? 'Out of stock' : 'In stock'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleEditClick(product)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-stone-600 hover:bg-stone-100 hover:text-[#0D0B0A] transition-colors"
                      >
                        <Pencil size={14} />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (!window.confirm(`Delete “${product.title}”?`)) return;
                          try {
                            await deleteProduct(product.id).unwrap();
                            notify.success('Product deleted successfully');
                          } catch (error) {
                            notify.error(
                              typeof error === 'string' ? error : 'Failed to delete',
                            );
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors ml-1"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        productToEdit={productToEdit}
      />
    </div>
  );
}

export default ProductPage;
