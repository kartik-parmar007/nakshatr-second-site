'use client';
import { motion } from 'framer-motion';

export default function Card({ children, className = '', highlight = false }) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,174,239,0.12)' }}
      transition={{ duration: 0.2 }}
      className={`rounded-3xl p-6 border transition-all duration-200 ${
        highlight
          ? 'bg-nk-navy text-white border-nk-cyan shadow-lg shadow-nk-cyan/10'
          : 'bg-white border-nk-border hover:border-nk-cyan/40'
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
