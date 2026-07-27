'use client';

import React from 'react';
import { CartItem } from '@/lib/types';
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 text-slate-100 shadow-2xl p-6 flex flex-col justify-between">
          
          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-white">Your Cart</h3>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            {cartItems.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-slate-600" />
                <p className="text-sm font-semibold">Your cart is empty</p>
                <p className="text-xs text-slate-400 mt-1">Explore our catalog to add items</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between bg-slate-800/50 p-3 rounded-xl border border-slate-700/50"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-lg object-cover bg-slate-950"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80';
                        }}
                      />
                      <div>
                        <h4 className="text-xs font-bold text-white line-clamp-1">
                          {item.product.name}
                        </h4>
                        <span className="text-[11px] text-slate-400">
                          ₹{item.product.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-slate-900">
                        <button
                          onClick={() => onUpdateQty(item.product.id, -1)}
                          className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.product.id, 1)}
                          className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-rose-400 hover:text-rose-300 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Summary & Checkout Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-slate-800 pt-4 space-y-3">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Subtotal</span>
                <span>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Shipping & GST</span>
                <span className="text-emerald-400 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                <span>Total Payable</span>
                <span className="text-indigo-400">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                onClick={() => alert('Order Placed Successfully! (Razorpay Sandbox Simulator)')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
              >
                <span>Checkout Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
