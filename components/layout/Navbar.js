'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/data/mockData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-nk-border' : 'bg-white border-b border-nk-border'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 relative">
              <svg viewBox="0 0 28 28" fill="none" className="w-full h-full">
                <rect x="12" y="2" width="4" height="24" rx="2" fill="#1C2B4A"/>
                <rect x="2" y="12" width="24" height="4" rx="2" fill="#1C2B4A"/>
                <circle cx="14" cy="14" r="4" fill="#00AEEF"/>
                <circle cx="5" cy="5" r="2.5" fill="#00AEEF" opacity="0.6"/>
                <circle cx="23" cy="5" r="2.5" fill="#00AEEF" opacity="0.6"/>
                <circle cx="5" cy="23" r="2.5" fill="#00AEEF" opacity="0.6"/>
                <circle cx="23" cy="23" r="2.5" fill="#00AEEF" opacity="0.6"/>
              </svg>
            </div>
            <span className="font-bold text-nk-navy text-sm tracking-wide">
              NAKSHATR <span className="text-nk-cyan">TECHNOLOGIES</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors group ${
                    active ? 'text-nk-cyan' : 'text-nk-navy hover:text-nk-cyan'
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-nk-cyan transition-all duration-200 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              );
            })}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/connect"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-nk-cyan text-white text-sm font-semibold hover:bg-[#009BD8] transition-colors"
            >
              Pre-Register
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg border border-nk-border text-nk-navy"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20}/> : <Menu size={20}/>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity:0, y:-10 }}
            animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-10 }}
            className="lg:hidden bg-white border-t border-nk-border"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'bg-nk-cyan/10 text-nk-cyan'
                      : 'text-nk-navy hover:bg-nk-surface'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/connect"
                onClick={() => setMobileOpen(false)}
                className="block mt-2 px-3 py-2.5 rounded-lg bg-nk-cyan text-white text-sm font-semibold text-center"
              >
                Pre-Register
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
