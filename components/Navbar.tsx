'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Search, ShoppingCart, Store, User } from 'lucide-react';
import { CartItem } from '@/lib/types';

interface NavbarProps {
  role: 'buyer' | 'seller';
  setRole: (role: 'buyer' | 'seller') => void;
  cartItems: CartItem[];
  setIsCartOpen: (open: boolean) => void;
}

export default function Navbar({ role, setRole, cartItems, setIsCartOpen }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              AuraStore
            </span>
            <span className="block text-[10px] text-indigo-400 font-semibold uppercase tracking-widest -mt-1">
              B2B & B2C Engine
            </span>
          </div>
        </Link>

        {/* Search Form */}
        <div className="flex-1 max-w-xl hidden md:block">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across Apparel, FMCG, Electronics, Steel, Pharma..."
              className="w-full bg-slate-900/90 text-sm text-slate-100 placeholder-slate-400 pl-11 pr-24 py-2.5 rounded-full border border-slate-700/80 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3" />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-xs font-semibold text-white shadow-md transition-all"
            >
              Search
            </button>
          </form>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {/* Role Switcher */}
          <button
            onClick={() => setRole(role === 'buyer' ? 'seller' : 'buyer')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              role === 'buyer'
                ? 'border-emerald-500/40 text-emerald-400 bg-emerald-950/30 hover:bg-emerald-950/60'
                : 'border-purple-500/40 text-purple-400 bg-purple-950/30 hover:bg-purple-950/60'
            }`}
          >
            {role === 'buyer' ? <ShoppingCart className="w-3.5 h-3.5" /> : <Store className="w-3.5 h-3.5" />}
            <span>{role === 'buyer' ? 'Buyer Mode' : 'Seller Mode'}</span>
          </button>

          {/* Cart Trigger Button */}
          {role === 'buyer' && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center shadow-lg shadow-indigo-500/50">
                  {totalCartCount}
                </span>
              )}
            </button>
          )}

          {/* Account Avatar */}
          <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer">
            <User className="w-4 h-4" />
          </div>
        </div>

      </div>
    </header>
  );
}
