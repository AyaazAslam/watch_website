import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  addProduct,
  updateProduct,
  deleteProduct,
  fetchProducts,
  selectProducts,
  selectProductsStatus,
  type ProductInput,
} from '../store/slices/productsSlice';
export function useProducts(autoFetch = true) {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const status = useAppSelector(selectProductsStatus);

  useEffect(() => {
    if (autoFetch && status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [autoFetch, dispatch, status]);

  return {
    products,
    status,
    loading: status === 'loading',
    refetch: () => dispatch(fetchProducts()),
    addProduct: (product: ProductInput) => dispatch(addProduct(product)),
    updateProduct: (product: ProductInput) => dispatch(updateProduct(product)),
    deleteProduct: (id: string) => dispatch(deleteProduct(id)),
  };
}
