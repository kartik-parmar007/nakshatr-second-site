'use client';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { philosophyRhythmBlocks, rootChain } from '@/data/mockData';
import PageHeader from '@/components/ui/PageHeader';
import Button from '@/components/ui/Button';
import CTA from '@/components/ui/CTA';

const ThreeCanvasWrapper = dynamic(() => import('@/components/three/ThreeCanvasWrapper'), { ssr:false });
const ESCScene = dynamic(() => import('@/components/three/ESCScene'), { ssr:false });

export default function PhilosophyPage() {
  return (
    <div className="overflow-x-hidden">
      <PageHeader
        label="Our Philosophy"
        title="Day 1 in 60 seconds."
        subtitle="Before the lesson, there is a question. Before the answer, there is an encounter."
      />

      {/* OBJECT ENCOUNTER */}
      <section className="py-16 px-4 bg-nk-surface">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity:0 }}
            whileInView={{ opacity:1 }}
            viewport={{ once:true }}
            className="text-nk-secondary text-xs font-mono tracking-widest uppercase mb-6"
          >
            Section 01 · Object Encounter
          </motion.p>
          <motion.h2
            initial={{ opacity:0, y:20 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            className="text-4xl sm:text-5xl font-extrabold text-nk-navy mb-10"
          >
            What is this?
          </motion.h2>
          <div className="relative">
            <ThreeCanvasWrapper height="320px" controls>
              <ESCScene/>
            </ThreeCanvasWrapper>
            <motion.div
              initial={{ opacity:0 }}
              whileInView={{ opacity:1 }}
              viewport={{ once:true }}
              transition={{ delay:0.5 }}
              className="mt-6 text-nk-secondary text-sm"
            >
              No label. No theory. Just the object.
            </motion.div>
          </div>
        </div>
      </section>

      {/* INVESTIGATION */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity:0 }}
            whileInView={{ opacity:1 }}
            viewport={{ once:true }}
            className="text-center text-nk-secondary text-xs font-mono tracking-widest uppercase mb-8"
          >
            Section 02 · Investigation
          </motion.p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label:'Wire', desc:'Where does it go?' },
              { label:'Signal Line', desc:'What does it carry?' },
              { label:'Motor Connection', desc:'How does it connect?' },
              { label:'Power Flow', desc:'Which direction?' },
            ].map((clue, i) => (
              <motion.div
                key={clue.label}
                initial={{ opacity:0, x: i%2===0 ? -20 : 20 }}
                whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }}
                transition={{ delay: i * 0.12 }}
                className="flex items-center gap-4 bg-nk-surface rounded-2xl p-4 border border-nk-border"
              >
                <div className="w-2 h-2 rounded-full bg-nk-cyan shrink-0"/>
                <div>
                  <p className="font-bold text-nk-navy text-sm">{clue.label}</p>
                  <p className="text-nk-secondary text-xs">{clue.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SYSTEM CONNECTION */}
      <section className="py-16 px-4 bg-nk-navy">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity:0 }}
            whileInView={{ opacity:1 }}
            viewport={{ once:true }}
            className="text-nk-cyan text-xs font-mono tracking-widest uppercase mb-6"
          >
            Section 03 · Revealed
          </motion.p>
          <motion.h2
            initial={{ opacity:0, scale:0.9 }}
            whileInView={{ opacity:1, scale:1 }}
            viewport={{ once:true }}
            className="text-5xl font-extrabold text-white mb-4"
          >
            ESC
          </motion.h2>
          <motion.p
            initial={{ opacity:0, y:10 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ delay:0.2 }}
            className="text-nk-border text-lg"
          >
            It controls how fast each motor spins.
          </motion.p>
        </div>
      </section>

      {/* ROOT CHAIN */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity:0 }}
            whileInView={{ opacity:1 }}
            viewport={{ once:true }}
            className="text-center text-nk-secondary text-xs font-mono tracking-widest uppercase mb-8"
          >
            Section 04 · Root Chain
          </motion.p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {rootChain.map((node, i) => (
              <div key={node.label} className="flex items-center gap-2">
                <motion.div
                  initial={{ opacity:0, scale:0.8 }}
                  whileInView={{ opacity:1, scale:1 }}
                  viewport={{ once:true }}
                  transition={{ delay: i * 0.12 }}
                  className="px-4 py-2 rounded-xl bg-nk-navy text-white text-sm font-semibold"
                >
                  {node.label}
                </motion.div>
                {i < rootChain.length - 1 && (
                  <motion.div
                    initial={{ opacity:0 }}
                    whileInView={{ opacity:1 }}
                    viewport={{ once:true }}
                    transition={{ delay: i * 0.12 + 0.1 }}
                    className="w-6 h-0.5 bg-nk-cyan"
                  />
                )}
              </div>
            ))}
          </div>
          <motion.p
            initial={{ opacity:0, y:10 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ delay:0.6 }}
            className="text-center text-nk-secondary mt-8 text-base max-w-md mx-auto"
          >
            Learning starts when the invisible connection becomes visible.
          </motion.p>
        </div>
      </section>

      {/* CLASSROOM VERSION */}
      <section className="py-16 px-4 bg-nk-surface">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-nk-secondary text-xs font-mono tracking-widest uppercase mb-6">Section 05 · The Classroom</p>
          <div className="bg-white rounded-3xl p-8 border border-nk-border mb-6">
            <svg viewBox="0 0 300 160" className="w-full max-w-xs mx-auto mb-4" fill="none">
              <rect x="10" y="90" width="280" height="60" rx="8" fill="#F0F4F8" stroke="#D0DCE8" strokeWidth="1.5"/>
              <rect x="30" y="70" width="60" height="30" rx="4" fill="#E2EAF4" stroke="#D0DCE8" strokeWidth="1"/>
              <rect x="120" y="60" width="60" height="40" rx="4" fill="#E2EAF4" stroke="#D0DCE8" strokeWidth="1"/>
              <rect x="210" y="75" width="60" height="25" rx="4" fill="#E2EAF4" stroke="#D0DCE8" strokeWidth="1"/>
              <rect x="120" y="65" width="60" height="30" rx="3" fill="#F0F4F8" stroke="#00AEEF" strokeWidth="1.5"/>
              <circle cx="150" cy="80" r="8" fill="#00AEEF" opacity="0.8"/>
              <line x1="80" y1="100" x2="85" y2="85" stroke="#5A7A9F" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <h3 className="text-2xl font-extrabold text-nk-navy mb-2">This is how Day 1 begins.</h3>
            <p className="text-nk-secondary text-sm">First encounter. Then investigation. Then root. Then branches.</p>
          </div>
        </div>
      </section>

      {/* DAILY RHYTHM */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-nk-secondary text-xs font-mono tracking-widest uppercase mb-4">Section 06</p>
          <h2 className="text-center text-3xl font-extrabold text-nk-navy mb-12">The Learning Rhythm</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {philosophyRhythmBlocks.map((block, i) => (
              <motion.div
                key={block.id}
                initial={{ opacity:0, y:24 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-nk-border hover:border-nk-cyan/40 transition-all group"
              >
                <span className="text-nk-cyan font-mono text-xs font-semibold">{block.step}</span>
                <h3 className="text-nk-navy font-bold text-lg mt-2 mb-1">{block.title}</h3>
                <p className="text-nk-secondary text-sm">{block.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY CTA */}
      <section className="py-16 px-4 bg-nk-surface text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-nk-navy mb-6">
            Take it. Break it.<br/>Understand it. It&apos;s Yours.
          </h2>
          <Button href="/programs">Explore Programs</Button>
        </div>
      </section>
    </div>
  );
}
