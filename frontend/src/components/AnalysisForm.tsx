'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Factory, Truck, Sparkles } from 'lucide-react';

export function AnalysisForm({ onSubmit }: { onSubmit: () => void }) {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    manufacturing: '',
    supplyChain: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 md:p-8 w-full max-w-2xl mx-auto"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-cyan-400/10 text-cyan-400">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">New Analysis</h2>
          <p className="text-sm text-gray-400">Enter product details for AI evaluation</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Package className="w-4 h-4 text-green-400" />
              Product Information
            </label>
            <input
              required
              type="text"
              placeholder="Product Name"
              className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400/50 focus:ring-1 focus:ring-green-400/50 transition-all"
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
            />
          </div>

          <div>
            <textarea
              required
              placeholder="Detailed description, materials used, packaging..."
              rows={4}
              className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400/50 focus:ring-1 focus:ring-green-400/50 transition-all resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-white/5">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Factory className="w-4 h-4 text-cyan-400" />
              Manufacturing Data (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g., Factory location, energy sources (solar, grid)"
              className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 transition-all"
              value={formData.manufacturing}
              onChange={(e) => setFormData({ ...formData, manufacturing: e.target.value })}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Truck className="w-4 h-4 text-orange-400" />
              Supply Chain (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g., Shipping distance, transportation methods"
              className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-400/50 focus:ring-1 focus:ring-orange-400/50 transition-all"
              value={formData.supplyChain}
              onChange={(e) => setFormData({ ...formData, supplyChain: e.target.value })}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-green-400 text-black font-bold rounded-xl hover:bg-[#00e65c] hover:shadow-[0_0_20px_rgba(0,255,102,0.4)] transition-all active:scale-[0.98]"
        >
          Run AI Analysis
        </button>
      </form>
    </motion.div>
  );
}
