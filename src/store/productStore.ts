import type { Product } from '../types';

// Mock initial data if empty
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Midnight Chronograph',
    price: 1250,
    description: 'An elegant black dial chronograph with a premium leather strap. Perfect for evening wear.',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2080&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Ocean Diver Pro',
    price: 1800,
    description: 'Water-resistant up to 300m, featuring a luminescent dial and durable stainless steel band.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Minimalist Gold',
    price: 950,
    description: 'A sleek, ultra-thin gold-plated case with a minimalist white face. Pure sophistication.',
    image: 'https://images.unsplash.com/photo-1587836173420-eb406e653a0f?q=80&w=2070&auto=format&fit=crop',
  }
];

type Listener = () => void;
let listeners: Listener[] = [];

export const productStore = {
  getProducts: (): Product[] => {
    const data = localStorage.getItem('products');
    if (!data) {
      // Seed with initial products
      localStorage.setItem('products', JSON.stringify(initialProducts));
      return initialProducts;
    }
    return JSON.parse(data);
  },
  addProduct: (product: Omit<Product, 'id'>) => {
    const products = productStore.getProducts();
    const newProduct = { ...product, id: Date.now().toString() };
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    productStore.notify();
  },
  updateProduct: (updatedProduct: Product) => {
    const products = productStore.getProducts().map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    localStorage.setItem('products', JSON.stringify(products));
    productStore.notify();
  },
  deleteProduct: (id: string) => {
    const products = productStore.getProducts().filter((p) => p.id !== id);
    localStorage.setItem('products', JSON.stringify(products));
    productStore.notify();
  },
  subscribe: (listener: Listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  notify: () => {
    listeners.forEach((listener) => listener());
  },
};
