'use client';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { droneComponents } from '@/data/mockData';
import DroneSVG from '@/components/ui/DroneSVG';
import ComponentIcon from '@/components/ui/ComponentIcon';
import Button from '@/components/ui/Button';
import CTA from '@/components/ui/CTA';

const ThreeCanvasWrapper = dynamic(() => import('@/components/three/ThreeCanvasWrapper'), { ssr:false });
const DroneModelScene = dynamic(() => import('@/components/three/DroneModelScene'), { ssr:false });

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center nk-grid-bg pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center py-20">
          {/* Text */}
          <div className="order-2 lg:order-1">
            <motion.p
              initial={{ opacity:0, y:10 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.2 }}
              className="text-nk-cyan text-xs font-semibold tracking-widest uppercase mb-5 font-mono"
            >
              Nakshatr Technologies · Bhavnagar
            </motion.p>
            <motion.h1
              initial={{ opacity:0, y:30 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.3, duration:0.7 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-nk-navy leading-[1.05] mb-6"
            >
              Every drone<br/>
              <span className="text-nk-cyan">runs on one</span><br/>
              principle.
            </motion.h1>
            <motion.p
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.5 }}
              className="text-nk-secondary text-lg mb-8 max-w-md"
            >
              Take it apart. Find the root. Build the future.
            </motion.p>
            <motion.div
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.6 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button href="/connect">Pre-Register</Button>
              <Button href="/programs" variant="secondary">Explore Programs</Button>
            </motion.div>
          </div>

          {/* 3D Drone */}
          <motion.div
            initial={{ opacity:0, scale:0.9 }}
            animate={{ opacity:1, scale:1 }}
            transition={{ delay:0.4, duration:0.8 }}
            className="order-1 lg:order-2"
          >
            <ThreeCanvasWrapper height="420px" controls>
              <DroneModelScene/>
            </ThreeCanvasWrapper>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y:[0,8,0] }}
          transition={{ repeat:Infinity, duration:1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <span className="text-nk-secondary text-xs font-mono">scroll</span>
          <ChevronDown className="text-nk-cyan" size={20}/>
        </motion.div>
      </section>

      {/* DRONE DISASSEMBLY JOURNEY */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-nk-surface">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity:0, y:20 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            className="text-center mb-16"
          >
            <p className="text-nk-cyan text-xs font-semibold tracking-widest uppercase mb-4 font-mono">Disassembly Journey</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-nk-navy mb-4">What makes a drone fly?</h2>
            <p className="text-nk-secondary max-w-xl mx-auto">Six components. Six industries. One root.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {droneComponents.map((comp, i) => (
              <motion.div
                key={comp.id}
                initial={{ opacity:0, y:30 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y:-4, boxShadow:'0 12px 40px rgba(0,174,239,0.12)' }}
                className="bg-white rounded-3xl p-6 border border-nk-border hover:border-nk-cyan/40 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <ComponentIcon type={comp.id} size={48}/>
                  <span className="text-nk-cyan font-mono text-xs font-semibold">{comp.number}</span>
                </div>
                <h3 className="text-xl font-bold text-nk-navy mb-1">{comp.name}</h3>
                <p className="text-nk-cyan text-xs font-semibold tracking-wider uppercase mb-3 font-mono">{comp.industry}</p>
                <p className="text-nk-navy font-semibold text-sm mb-2">{comp.simpleTruth}</p>
                <p className="text-nk-secondary text-xs leading-relaxed mb-3">{comp.industryFact}</p>
                <div className="pt-3 border-t border-nk-border">
                  <p className="text-nk-secondary text-xs">{comp.skill}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REASSEMBLY */}
      <section className="py-24 px-4 text-center bg-white">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity:0 }}
            whileInView={{ opacity:1 }}
            viewport={{ once:true }}
            className="mb-8"
          >
            <DroneSVG className="w-56 h-44 mx-auto opacity-80"/>
          </motion.div>
          <motion.h2
            initial={{ opacity:0, y:20 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            className="text-3xl sm:text-4xl font-extrabold text-nk-navy mb-4"
          >
            A power source moving air<br/>in controlled directions.
          </motion.h2>
          <motion.p
            initial={{ opacity:0, y:10 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ delay:0.2 }}
            className="text-nk-secondary text-lg"
          >
            That is the root. Everything else is a branch.
          </motion.p>
        </div>
      </section>

      {/* PROGRAM LINK */}
      <section className="py-20 px-4 bg-nk-surface">
        <div className="max-w-xl mx-auto text-center">
          <motion.p
            initial={{ opacity:0, y:10 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            className="text-nk-secondary text-sm mb-3 font-mono uppercase tracking-widest"
          >
            Next step
          </motion.p>
          <motion.h2
            initial={{ opacity:0, y:20 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            className="text-3xl font-extrabold text-nk-navy mb-6"
          >
            See what we teach
          </motion.h2>
          <motion.div
            initial={{ opacity:0 }}
            whileInView={{ opacity:1 }}
            viewport={{ once:true }}
            transition={{ delay:0.2 }}
          >
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-nk-cyan font-semibold group"
            >
              Explore Programs
              <motion.span
                animate={{ x:[0,6,0] }}
                transition={{ repeat:Infinity, duration:1.5 }}
              >
                <ArrowRight size={18}/>
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <CTA
        title="Start before the industry becomes crowded."
        primaryLabel="Pre-Register Now"
        primaryHref="/connect"
        secondaryLabel="Learn More"
        secondaryHref="/philosophy"
      />
    </div>
  );
}
