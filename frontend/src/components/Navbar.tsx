'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Leaf, Wallet, History } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Navbar({ onOpenHistory }: { onOpenHistory: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  
  // Handle background blur on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthAction = () => {
    if (user) {
      logout();
    } else {
      router.push('/login');
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
            <Link href="/learning" className="hover:text-white transition-colors">Learning</Link>
            <Link href="/leaderboard" className="hover:text-white transition-colors">Leaderboard</Link>
            {user?.role === 'admin' && (
              <Link href="/admin" className="hover:text-white transition-colors text-purple-400">Admin</Link>
            )}
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            {user && (
              <button
                onClick={onOpenHistory}
                className="flex items-center justify-center p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors border border-transparent hover:border-white/10"
                title="Analysis History"
              >
                <History className="w-5 h-5" />
              </button>
            )}
            
            <button 
              onClick={handleAuthAction}
              className={cn(
                "hidden sm:flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 active:scale-95",
                user 
                  ? "bg-zinc-800 border border-white/10 hover:border-white/20 text-gray-200"
                  : "bg-green-400 text-black hover:bg-[#00e65c] shadow-[0_0_15px_rgba(74,222,128,0.3)] hover:shadow-[0_0_20px_rgba(74,222,128,0.5)]"
              )}
            >
              <span className="inline">
                {user ? 'Logout' : 'Login'}
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-white/10 text-gray-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-zinc-900 border-b border-white/10 shadow-lg px-4 py-4 flex flex-col gap-4">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md">Home</Link>
          <Link href="/analyze" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md">Analyze</Link>
          <Link href="/learning" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md">Learning</Link>
          <Link href="/leaderboard" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md">Leaderboard</Link>
          {user?.role === 'admin' && (
            <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-base font-medium text-purple-400 hover:text-purple-300 hover:bg-white/5 rounded-md">Admin Dashboard</Link>
          )}
          <button 
            onClick={() => { handleAuthAction(); setMobileMenuOpen(false); }}
            className="mt-2 w-full px-4 py-3 rounded-md font-medium text-center bg-zinc-800 border border-white/10 text-white"
          >
            {user ? 'Logout' : 'Login / Sign up'}
          </button>
        </div>
      )}
    </motion.nav>
  );
}
