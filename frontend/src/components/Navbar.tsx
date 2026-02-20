'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Leaf, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  
  // Handle background blur on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleConnect = () => {
    // Mock wallet connection for UI demonstration
    if (walletAddress) {
      setWalletAddress(null);
    } else {
      setWalletAddress('0x71C...976F');
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
        isScrolled ? 'glass border-white/10 py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-xl bg-green-400/10 text-green-400 group-hover:bg-green-400/20 transition-colors">
            <Leaf className="w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">
            Eco<span className="text-green-400">Analyzer</span>
          </span>
        </Link>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/analyze" className="hover:text-white transition-colors">Analyze</Link>
            <Link href="#about" className="hover:text-white transition-colors">About</Link>
          </div>
          
          <button 
            onClick={handleConnect}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 active:scale-95",
              walletAddress 
                ? "bg-zinc-800 border border-white/10 hover:border-white/20 text-gray-200"
                : "bg-green-400 text-black hover:bg-[#00e65c] shadow-[0_0_15px_rgba(74,222,128,0.3)] hover:shadow-[0_0_20px_rgba(74,222,128,0.5)]"
            )}
          >
            <Wallet className="w-4 h-4" />
            <span className="hidden sm:inline">
              {walletAddress ? walletAddress : 'Connect Wallet'}
            </span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
