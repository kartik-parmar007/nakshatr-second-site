'use client';
import { motion } from 'framer-motion';
import { aboutValues } from '@/data/mockData';
import PageHeader from '@/components/ui/PageHeader';
import Button from '@/components/ui/Button';

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        label="About"
        title="Built from curiosity. Designed for students."
        subtitle="Nakshatr Technologies exists to make drone technology understandable from the root."
      />

      {/* Origin */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity:0, y:20 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            className="bg-nk-surface rounded-3xl p-8 border border-nk-border"
          >
            <p className="text-nk-cyan text-xs font-semibold tracking-widest uppercase mb-4 font-mono">Origin</p>
            <p className="text-nk-navy text-lg leading-relaxed">
              Nakshatr was created with a simple belief: technology should not feel unreachable.
              If a student can touch it, break it down, question it, and understand the root,
              the subject becomes theirs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-nk-surface">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Founder visual */}
          <motion.div
            initial={{ opacity:0, scale:0.95 }}
            whileInView={{ opacity:1, scale:1 }}
            viewport={{ once:true }}
            className="flex items-center justify-center"
          >
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 rounded-3xl bg-nk-navy"/>
              <div className="absolute inset-4 rounded-2xl border border-nk-cyan/30 flex items-center justify-center">
                <svg viewBox="0 0 120 120" className="w-32 h-32" fill="none">
                  <circle cx="60" cy="40" r="20" fill="#00AEEF" opacity="0.3"/>
                  <circle cx="60" cy="40" r="14" fill="#00AEEF" opacity="0.6"/>
                  <path d="M20 100 Q60 75 100 100" fill="#00AEEF" opacity="0.2"/>
                  <line x1="60" y1="60" x2="60" y2="80" stroke="#00AEEF" strokeWidth="2"/>
                  <line x1="40" y1="70" x2="60" y2="75" stroke="#00AEEF" strokeWidth="1.5"/>
                  <line x1="80" y1="70" x2="60" y2="75" stroke="#00AEEF" strokeWidth="1.5"/>
                </svg>
              </div>
              <div className="absolute bottom-4 right-4 bg-nk-cyan rounded-xl px-3 py-1">
                <p className="text-white text-xs font-bold">Bhavnagar</p>
              </div>
            </div>
          </motion.div>
          {/* Founder text */}
          <motion.div
            initial={{ opacity:0, x:20 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }}
          >
            <p className="text-nk-cyan text-xs font-semibold tracking-widest uppercase mb-4 font-mono">Founder</p>
            <h2 className="text-2xl font-extrabold text-nk-navy mb-3">Utpal Upadhyay</h2>
            <p className="text-nk-secondary mb-3 text-sm leading-relaxed">
              From Bhavnagar. Built his path through curiosity, hands-on learning, and entrepreneurship.
              Focused on drone education and future drone technology.
            </p>
            <p className="text-nk-navy font-medium text-sm leading-relaxed border-l-2 border-nk-cyan pl-4">
              His journey is proof that curiosity, action, and root-level understanding
              can build real technical confidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-extrabold text-nk-navy text-center mb-10">What Nakshatr stands for</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {aboutValues.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity:0, y:20 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-5 border border-nk-border hover:border-nk-cyan/40 transition-all"
              >
                <h3 className="font-bold text-nk-navy mb-2">{val.title}</h3>
                <p className="text-nk-secondary text-sm">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 px-4 bg-nk-navy">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-nk-cyan text-xs font-semibold tracking-widest uppercase mb-4 font-mono">Future Vision</p>
          <p className="text-white text-xl leading-relaxed">
            Nakshatr is building toward a future where drone education, drone labs,
            and drone research become accessible to students across India.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-extrabold text-nk-navy mb-3">Join the journey</h2>
          <p className="text-nk-secondary mb-6">Be part of India's growing drone education movement.</p>
          <Button href="/connect">Pre-Register</Button>
        </div>
      </section>
    </div>
  );
}
