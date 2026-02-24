'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, History, Activity, CalendarDays, ExternalLink, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock history data
const historyItems = [
  {
    id: 1,
    productName: "Eco Water Bottle",
    score: 24,
    date: "2026-02-23",
    status: "Verified",
    hash: "0x8f2a...c91b",
    color: "text-green-400"
  },
  {
    id: 2,
    productName: "Solar Power Bank",
    score: 71,
    date: "2026-02-22",
    status: "Verified",
    hash: "0x4a1f...b72c",
    color: "text-red-500"
  },
  {
    id: 3,
    productName: "Recycled Running Shoes",
    score: 45,
    date: "2026-02-20",
    status: "Verified",
    hash: "0x1b9e...d43a",
    color: "text-yellow-400"
  }
];

export function HistorySidebar({ isOpen, onClose }: HistorySidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
            aria-hidden="true"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-zinc-950/95 border-l border-white/10 z-50 shadow-[-20px_0_40px_rgba(0,0,0,0.5)] flex flex-col backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-400/10 text-cyan-400">
                  <History className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold">Analysis History</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content list */}
            <div className="flex-1 overflow-y-auto w-full">
              <div className="p-6 space-y-4">
                {historyItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="group relative p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all cursor-pointer"
                  >
                    <div className="absolute top-4 right-4 text-xs font-mono text-gray-500 group-hover:text-cyan-400 transition-colors flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      Tx
                    </div>
                    
                    <h3 className="font-semibold text-lg text-gray-200 mb-1 pe-10 truncate">
                      {item.productName}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="w-4 h-4" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full bg-green-400/10 text-green-400 border border-green-400/20">
                        <Activity className="w-3 h-3" />
                        {item.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 mb-1">Impact Score</span>
                        <span className={cn("text-2xl font-bold leading-none", item.color)}>
                          {item.score}
                        </span>
                      </div>
                      
                      <button className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-2">
                        <RefreshCw className="w-3 h-3" />
                        Re-analyze
                      </button>
                    </div>
                  </motion.div>
                ))}
                
                <div className="text-center pt-8 pb-4">
                  <p className="text-sm text-gray-500">End of history</p>
                </div>
              </div>
            </div>
            
            {/* Footer action */}
            <div className="p-6 border-t border-white/10 shrink-0 bg-zinc-950/50">
              <Link 
                href="/analyze" 
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-green-400 text-black font-bold hover:bg-[#00e65c] transition-colors"
               >
                 Start New Analysis
               </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
