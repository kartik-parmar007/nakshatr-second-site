'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Button({ children, href, variant = 'primary', onClick, className = '' }) {
  const base = 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ' + className;
  const styles = {
    primary: 'bg-nk-cyan text-white hover:bg-[#009BD8] hover:-translate-y-0.5 shadow-md hover:shadow-nk-cyan/30',
    secondary: 'bg-transparent border border-nk-cyan text-nk-cyan hover:bg-nk-cyan hover:text-white',
    outline: 'bg-transparent border border-nk-border text-nk-navy hover:border-nk-cyan hover:text-nk-cyan',
    ghost: 'bg-nk-surface text-nk-navy hover:bg-nk-border',
  };
  const cls = `${base} ${styles[variant]}`;
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <motion.button whileTap={{ scale: 0.97 }} className={cls} onClick={onClick}>{children}</motion.button>;
}
