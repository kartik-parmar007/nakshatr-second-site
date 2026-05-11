'use client';
import { motion } from 'framer-motion';

export default function PageHeader({ label, title, subtitle }) {
  return (
    <div className="text-center max-w-3xl mx-auto px-4 pt-32 pb-16">
      {label && (
        <motion.p
          initial={{ opacity:0, y:10 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay:0.1 }}
          className="text-nk-cyan text-xs font-semibold tracking-widest uppercase mb-4 font-mono"
        >
          {label}
        </motion.p>
      )}
      <motion.h1
        initial={{ opacity:0, y:20 }}
        animate={{ opacity:1, y:0 }}
        transition={{ delay:0.2 }}
        className="text-4xl sm:text-5xl font-extrabold text-nk-navy leading-tight mb-5"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay:0.3 }}
          className="text-nk-secondary text-lg leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX:0 }}
        animate={{ scaleX:1 }}
        transition={{ delay:0.4, duration:0.5 }}
        className="w-16 h-0.5 bg-nk-cyan mx-auto mt-8"
      />
    </div>
  );
}
