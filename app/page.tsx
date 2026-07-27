'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import CartDrawer from '@/components/CartDrawer';
import SellerDashboard from '@/components/SellerDashboard';
import { Product, CartItem } from '@/lib/types';
import { INITIAL_PRODUCTS } from '@/lib/mockProducts';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const catQuery = selectedCategory !== 'all' ? `?category=${selectedCategory}` : '';
    fetch(`/api/products${catQuery}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.products && data.products.length > 0) {
          setProducts(data.products);
        }
      })
      .catch((err) => console.error('Products fetch error:', err))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleAddProduct = (newProd: Partial<Product>) => {
    const created: Product = {
      id: String(Date.now()),
      name: newProd.name || 'New Product',
      price: newProd.price || 999,
      quantity: 1,
      image: newProd.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
      category: newProd.category || 'Apparel',
      col_name: newProd.col_name || 'apparel',
      description: newProd.description || 'Verified product listing',
      stock: newProd.stock || 50,
    };

    setProducts((prev) => [created, ...prev]);
  };

  const categories = [
    { id: 'all', label: 'All Products', icon: '✨' },
    { id: 'apparel', label: 'Apparel', icon: '👕' },
    { id: 'fmcg', label: 'FMCG & Groceries', icon: '🥑' },
    { id: 'electronics', label: 'Electronics', icon: '🎧' },
    { id: 'beauty', label: 'Beauty & Care', icon: '💄' },
    { id: 'pharma', label: 'Pharma', icon: '💊' },
    { id: 'steel_work', label: 'Steel & Industrial', icon: '🏗️' },
    { id: 'furniture', label: 'Furniture', icon: '🪑' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      
      {/* Top Glass Navbar */}
      <Navbar
        role={role}
        setRole={setRole}
        cartItems={cartItems}
        setIsCartOpen={setIsCartOpen}
      />

      {/* Content Area Based on Role */}
      <main className="flex-grow">
        {role === 'seller' ? (
          <SellerDashboard products={products} onAddProduct={handleAddProduct} />
        ) : (
          <div>
            
            {/* Hero Banner */}
            <section className="relative overflow-hidden pt-12 pb-16 border-b border-slate-800/80">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.25),rgba(255,255,255,0))] pointer-events-none" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      Next-Gen Unified B2B & B2C Marketplace
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                      Discover verified products across{' '}
                      <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Every Category
                      </span>
                    </h1>

                    <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
                      Instant sub-50ms search powered by Next.js 14, PostgreSQL verified sellers, and MongoDB document catalog collections.
                    </p>
                  </div>

                  <div className="lg:col-span-5 bg-slate-900/60 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
                      <span className="font-mono">Live PostgreSQL + Mongo State</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Active
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Verified Sellers</span>
                        <span className="text-lg font-bold text-white">12 Connected</span>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Active Catalog</span>
                        <span className="text-lg font-bold text-indigo-400">10,000+ Items</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Category Filter Pills Bar */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
                      selectedCategory === cat.id
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-400/50 shadow-lg shadow-indigo-500/25'
                        : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Products Catalog Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Product Catalog</h2>
                  <p className="text-xs text-slate-400">
                    {loading ? 'Fetching products...' : `Showing ${products.length} verified listings`}
                  </p>
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-64 rounded-2xl bg-slate-900/50 animate-pulse border border-slate-800" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              )}
            </section>

          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-8 text-center text-xs text-slate-400">
        &copy; 2026 AuraStore Engine. Built with Next.js 14, Tailwind CSS, PostgreSQL, and MongoDB.
      </footer>

      {/* Slide-Over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
      />

    </div>
  );
}
