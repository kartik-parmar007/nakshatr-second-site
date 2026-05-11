'use client';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import {
  universityProvides, nakshatrProvides,
  whyUniversities, collaborationFormats, partnershipTimeline
} from '@/data/mockData';
import PageHeader from '@/components/ui/PageHeader';
import Button from '@/components/ui/Button';

export default function UniversitiesPage() {
  return (
    <div>
      <PageHeader
        label="For Universities"
        title="Bring drone education inside your university."
        subtitle="Nakshatr helps universities offer practical, hands-on drone learning through structured programs, labs, and industry-aligned training."
      />

      {/* Partnership Model */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-extrabold text-nk-navy text-center mb-10">The Partnership Model</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* University provides */}
            <motion.div
              initial={{ opacity:0, x:-20 }}
              whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }}
              className="bg-nk-surface rounded-3xl p-6 border border-nk-border"
            >
              <h3 className="text-nk-secondary text-xs font-semibold tracking-widest uppercase mb-5 font-mono">University Provides</h3>
              <ul className="space-y-3">
                {universityProvides.map(item => (
                  <li key={item} className="flex items-center gap-3 text-nk-navy text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-nk-secondary shrink-0"/>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            {/* Nakshatr provides */}
            <motion.div
              initial={{ opacity:0, x:20 }}
              whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }}
              className="bg-nk-navy rounded-3xl p-6 border border-nk-cyan"
            >
              <h3 className="text-nk-cyan text-xs font-semibold tracking-widest uppercase mb-5 font-mono">Nakshatr Provides</h3>
              <ul className="space-y-3">
                {nakshatrProvides.map(item => (
                  <li key={item} className="flex items-center gap-3 text-white text-sm">
                    <Check size={14} className="text-nk-cyan shrink-0"/>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Universities Need Drone Education */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-nk-surface">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-extrabold text-nk-navy text-center mb-10">Why universities need drone education</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUniversities.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity:0, y:20 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-5 border border-nk-border hover:border-nk-cyan/40 transition-all"
              >
                <h3 className="font-bold text-nk-navy mb-2">{item.title}</h3>
                <p className="text-nk-secondary text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Formats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-extrabold text-nk-navy text-center mb-10">Possible collaboration formats</h2>
          <div className="space-y-3">
            {collaborationFormats.map((fmt, i) => (
              <motion.div
                key={fmt.number}
                initial={{ opacity:0, x:-16 }}
                whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 bg-nk-surface rounded-2xl px-6 py-4 border border-nk-border"
              >
                <span className="text-nk-cyan font-mono text-sm font-semibold">{fmt.number}</span>
                <span className="text-nk-navy font-medium">{fmt.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-nk-navy">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-extrabold text-white text-center mb-12">Partnership Process</h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative">
            <div className="hidden sm:block absolute top-5 left-8 right-8 h-0.5 bg-nk-cyan/30"/>
            {partnershipTimeline.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity:0, y:16 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ delay: i * 0.1 }}
                className="flex sm:flex-col items-center sm:items-center gap-4 sm:gap-2 z-10"
              >
                <div className="w-10 h-10 rounded-full bg-nk-cyan text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {step.step}
                </div>
                <p className="text-white text-xs text-center sm:max-w-[80px]">{step.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-extrabold text-nk-navy mb-3">Start a university partnership conversation</h2>
          <p className="text-nk-secondary mb-6">We work with universities to design the right format together.</p>
          <Button href="/connect">Connect With Us</Button>
        </div>
      </section>
    </div>
  );
}
