import { useState, useEffect } from 'react';
import { productStore } from '../store/productStore';
import type { Product } from '../types';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(productStore.getProducts());

  useEffect(() => {
    const unsubscribe = productStore.subscribe(() => {
      setProducts(productStore.getProducts());
    });
    return unsubscribe;
  }, []);

  return {
    products,
    addProduct: productStore.addProduct,
    updateProduct: productStore.updateProduct,
    deleteProduct: productStore.deleteProduct,
  };
}
