'use client';
import { motion } from 'framer-motion';
import { centerWalkthrough, centerHappenings } from '@/data/mockData';
import PageHeader from '@/components/ui/PageHeader';
import Button from '@/components/ui/Button';

export default function CenterPage() {
  return (
    <div>
      <PageHeader
        label="The Center"
        title="The Center of Excellence"
        subtitle="A space designed for hands-on drone learning, team exploration, and real technical confidence."
      />

      {/* Blueprint Walkthrough */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 nk-grid-bg">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-nk-cyan text-xs font-mono tracking-widest uppercase mb-12">
            Walk the space
          </p>

          <div className="relative">
            {/* Vertical cyan line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-nk-cyan/20 hidden sm:block"/>

            <div className="space-y-6">
              {centerWalkthrough.map((zone, i) => (
                <motion.div
                  key={zone.id}
                  initial={{ opacity:0, x:-24 }}
                  whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex gap-6"
                >
                  {/* Step marker */}
                  <div className="hidden sm:flex flex-col items-center shrink-0">
                    <div className="w-12 h-12 rounded-full bg-nk-navy text-white flex items-center justify-center font-mono text-xs font-bold border-2 border-nk-cyan z-10">
                      {zone.number}
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex-1 bg-white rounded-2xl p-6 border border-nk-border hover:border-nk-cyan/40 transition-all">
                    <span className="sm:hidden text-nk-cyan font-mono text-xs">{zone.number} · </span>
                    <h3 className="text-nk-navy font-bold text-lg mb-2">{zone.title}</h3>
                    <p className="text-nk-secondary text-sm">{zone.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What Happens Inside */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-nk-navy text-center mb-12">What happens inside</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {centerHappenings.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity:0, y:20 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ delay: i * 0.1 }}
                className="bg-nk-surface rounded-2xl p-5 border border-nk-border flex items-start gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-nk-cyan shrink-0 mt-1.5"/>
                <p className="text-nk-navy font-medium text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Floor Plan Visual */}
      <section className="py-16 px-4 bg-nk-surface">
        <div className="max-w-3xl mx-auto text-center">
          <svg viewBox="0 0 600 320" className="w-full max-w-2xl mx-auto" fill="none">
            {/* Outer walls */}
            <rect x="20" y="20" width="560" height="280" rx="8" stroke="#1C2B4A" strokeWidth="2" fill="white"/>
            {/* Zones */}
            <rect x="40" y="40" width="120" height="100" rx="4" fill="#F0F4F8" stroke="#D0DCE8" strokeWidth="1"/>
            <text x="100" y="90" textAnchor="middle" fontSize="9" fill="#5A7A9F" fontFamily="monospace">Workbench</text>
            <rect x="180" y="40" width="120" height="100" rx="4" fill="#F0F4F8" stroke="#D0DCE8" strokeWidth="1"/>
            <text x="240" y="90" textAnchor="middle" fontSize="9" fill="#5A7A9F" fontFamily="monospace">Assembly</text>
            <rect x="320" y="40" width="120" height="100" rx="4" fill="#F0F4F8" stroke="#D0DCE8" strokeWidth="1"/>
            <text x="380" y="90" textAnchor="middle" fontSize="9" fill="#5A7A9F" fontFamily="monospace">Electronics</text>
            <rect x="460" y="40" width="100" height="100" rx="4" fill="#E8F7FD" stroke="#00AEEF" strokeWidth="1.5"/>
            <text x="510" y="90" textAnchor="middle" fontSize="9" fill="#00AEEF" fontFamily="monospace">Software</text>
            <rect x="40" y="160" width="180" height="120" rx="4" fill="#F0F4F8" stroke="#D0DCE8" strokeWidth="1"/>
            <text x="130" y="220" textAnchor="middle" fontSize="9" fill="#5A7A9F" fontFamily="monospace">Team Area</text>
            <rect x="240" y="160" width="320" height="120" rx="4" fill="#E8F7FD" stroke="#00AEEF" strokeWidth="1.5"/>
            <text x="400" y="220" textAnchor="middle" fontSize="9" fill="#00AEEF" fontFamily="monospace">Flight Practice Zone</text>
            {/* Cyan route line */}
            <path d="M100,40 L240,40 L380,40 L510,40 L510,160 L400,160 L130,160" stroke="#00AEEF" strokeWidth="2" strokeDasharray="6 4" fill="none"/>
            {/* Entry arrow */}
            <path d="M20 155 L40 155" stroke="#00AEEF" strokeWidth="2"/>
            <polygon points="38,151 46,155 38,159" fill="#00AEEF"/>
            <text x="10" y="152" fontSize="8" fill="#00AEEF" fontFamily="monospace">IN</text>
          </svg>
          <p className="text-nk-secondary text-xs mt-4 font-mono">Blueprint · Center of Excellence · Bhavnagar</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-extrabold text-nk-navy mb-3">
            Want to learn inside this environment?
          </h2>
          <p className="text-nk-secondary mb-6">Join the first batch and experience hands-on drone education.</p>
          <Button href="/connect">Pre-Register</Button>
        </div>
      </section>
    </div>
  );
}
