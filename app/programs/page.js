'use client';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { programCards, programComparisonTable } from '@/data/mockData';
import PageHeader from '@/components/ui/PageHeader';
import Button from '@/components/ui/Button';

export default function ProgramsPage() {
  return (
    <div>
      <PageHeader
        label="Programs"
        title="Drone courses built from the root."
        subtitle="Hands-on programs for students who want to understand, build, repair, fly, and work with drones."
      />

      {/* Program Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programCards.map((prog, i) => (
            <motion.div
              key={prog.id}
              initial={{ opacity:0, y:30 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y:-5 }}
              className={`rounded-3xl p-6 border flex flex-col transition-all duration-200 ${
                prog.highlight
                  ? 'bg-nk-navy text-white border-nk-cyan shadow-xl shadow-nk-cyan/15 relative'
                  : 'bg-white border-nk-border hover:border-nk-cyan/40'
              }`}
            >
              {prog.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-nk-cyan text-white text-xs font-bold px-3 py-1 rounded-full">
                  {prog.badge}
                </div>
              )}
              {!prog.highlight && (
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg w-fit mb-4 bg-nk-cyan/10 text-nk-cyan`}>
                  {prog.badge}
                </span>
              )}

              <h3 className={`text-xl font-extrabold mb-2 ${prog.highlight ? 'text-white mt-3' : 'text-nk-navy'}`}>
                {prog.title}
              </h3>

              <div className="flex items-baseline gap-2 mb-4">
                <span className={`text-2xl font-extrabold ${prog.highlight ? 'text-nk-cyan' : 'text-nk-navy'}`}>
                  {prog.fee}
                </span>
                <span className={`text-xs ${prog.highlight ? 'text-nk-border' : 'text-nk-secondary'}`}>
                  · {prog.duration}
                </span>
              </div>

              <p className={`text-sm mb-3 ${prog.highlight ? 'text-nk-border' : 'text-nk-secondary'}`}>
                {prog.focus}
              </p>

              <div className={`flex items-start gap-2 mb-6 mt-auto pt-4 border-t ${prog.highlight ? 'border-white/10' : 'border-nk-border'}`}>
                <Check size={14} className="text-nk-cyan shrink-0 mt-0.5"/>
                <p className={`text-xs ${prog.highlight ? 'text-nk-border' : 'text-nk-secondary'}`}>{prog.outcome}</p>
              </div>

              <Button
                href="/connect"
                variant={prog.highlight ? 'primary' : 'secondary'}
                className="w-full"
              >
                Pre-Register
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-nk-surface">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-extrabold text-nk-navy mb-8 text-center">Compare Programs</h2>
          <div className="overflow-x-auto rounded-2xl border border-nk-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-nk-navy text-white">
                  {['Program','Best For','Duration','Fee','Outcome'].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {programComparisonTable.map((row, i) => (
                  <tr key={row.program} className={`border-t border-nk-border ${i%2===0?'bg-white':'bg-nk-surface'}`}>
                    <td className="px-4 py-3 font-semibold text-nk-navy">{row.program}</td>
                    <td className="px-4 py-3 text-nk-secondary">{row.bestFor}</td>
                    <td className="px-4 py-3 text-nk-secondary font-mono text-xs">{row.duration}</td>
                    <td className="px-4 py-3 font-bold text-nk-cyan">{row.fee}</td>
                    <td className="px-4 py-3 text-nk-secondary">{row.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-extrabold text-nk-navy mb-3">Not sure which path fits you?</h2>
          <p className="text-nk-secondary mb-6">Talk to our team. We will help you choose.</p>
          <Button href="/connect">Talk to Nakshatr</Button>
        </div>
      </section>
    </div>
  );
}
