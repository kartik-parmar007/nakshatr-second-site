'use client';
import { motion } from 'framer-motion';

export default function Section({ children, className = '', id = '' }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={'py-20 px-4 sm:px-6 lg:px-8 ' + className}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </motion.section>
  );
}
