'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import { Store, TrendingUp, Package, Plus, Eye, Trash2, CheckCircle2 } from 'lucide-react';

interface SellerDashboardProps {
  products: Product[];
  onAddProduct: (newProduct: Partial<Product>) => void;
}

export default function SellerDashboard({ products, onAddProduct }: SellerDashboardProps) {
  const [stats, setStats] = useState<any>({
    totalSales: 284500,
    totalOrders: 48,
    totalProducts: products.length,
    lowStockAlerts: 4,
    verifiedSellers: 12,
    activeBuyers: 148,
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Apparel',
    stock: '50',
    description: '',
    image: '',
  });

  useEffect(() => {
    fetch('/api/seller/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data.stats) setStats(data.stats);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    onAddProduct({
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      col_name: formData.category.toLowerCase(),
      stock: parseInt(formData.stock) || 50,
      description: formData.description || 'Verified product listing',
      image: formData.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    });

    setIsAddModalOpen(false);
    setFormData({ name: '', price: '', category: 'Apparel', stock: '50', description: '', image: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-950 p-6 rounded-3xl border border-purple-500/20">
        <div>
          <div className="flex items-center gap-2">
            <Store className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-extrabold text-white">Seller Management Hub</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time catalog control & order pipeline (PostgreSQL & MongoDB backend synced)
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-xs font-bold text-white shadow-lg shadow-purple-500/25 flex items-center gap-2 transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 backdrop-blur-md p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Total GMV Sales</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">₹{stats.totalSales.toLocaleString('en-IN')}</div>
          <span className="text-[11px] text-emerald-400 font-semibold mt-1 inline-block">+18.4% this month</span>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-md p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Total Orders</span>
            <Package className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{stats.totalOrders}</div>
          <span className="text-[11px] text-indigo-400 font-semibold mt-1 inline-block">12 unaccepted (&lt; 6 hrs)</span>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-md p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Active Products</span>
            <Store className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{products.length}</div>
          <span className="text-[11px] text-purple-400 font-semibold mt-1 inline-block">MongoDB collections</span>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-md p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Postgres Verified</span>
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{stats.verifiedSellers} Sellers</div>
          <span className="text-[11px] text-amber-400 font-semibold mt-1 inline-block">{stats.activeBuyers} Registered Buyers</span>
        </div>
      </div>

      {/* Catalog Table */}
      <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 p-6 space-y-4">
        <h2 className="text-lg font-bold text-white">Product Inventory Catalog</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Product Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock Level</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-semibold text-white flex items-center gap-2">
                    <img src={p.image} alt="" className="w-8 h-8 rounded-lg object-cover bg-slate-950" />
                    <span className="line-clamp-1">{p.name}</span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-indigo-400 text-[10px] font-semibold">
                      {p.category}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-white">₹{p.price.toLocaleString('en-IN')}</td>
                  <td className="p-3">
                    <span className={`font-semibold ${p.stock < 20 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {p.stock} units
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button className="p-1 text-slate-400 hover:text-white mr-2">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-rose-400 hover:text-rose-300">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 text-slate-100 space-y-4">
            <h3 className="text-lg font-bold text-white">Add New Product to Catalog</h3>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Cotton Polo T-Shirt"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="999"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Apparel">Apparel</option>
                  <option value="FMCG">FMCG & Groceries</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Beauty">Beauty & Care</option>
                  <option value="Pharma">Pharma</option>
                  <option value="Steel Work">Steel Work</option>
                  <option value="Furniture">Furniture</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter product details..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-500"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
