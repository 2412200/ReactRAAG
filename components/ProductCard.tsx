'use client';

import React from 'react';
import { Product } from '@/lib/types';
import { ShoppingCart, Tag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="group bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 hover:border-indigo-500/40 p-4 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col justify-between">
      
      <div>
        {/* Image Container */}
        <div className="relative w-full h-48 rounded-xl overflow-hidden bg-slate-950 mb-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80';
            }}
          />
          <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-[10px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
            <Tag className="w-3 h-3" /> {product.category}
          </span>
        </div>

        {/* Product Name & Description */}
        <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Price & Cart Trigger */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-400 block">Price</span>
          <span className="text-base font-extrabold text-indigo-400">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>

    </div>
  );
}
