'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { connectFormDropdowns } from '@/data/mockData';
import PageHeader from '@/components/ui/PageHeader';

function InputField({ label, type = 'text', name, value, onChange, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-nk-navy text-sm font-medium">{label}{required && <span className="text-nk-cyan ml-1">*</span>}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="px-4 py-2.5 rounded-xl border border-nk-border bg-white text-nk-navy text-sm focus:outline-none focus:border-nk-cyan transition-colors"
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-nk-navy text-sm font-medium">{label}{required && <span className="text-nk-cyan ml-1">*</span>}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="px-4 py-2.5 rounded-xl border border-nk-border bg-white text-nk-navy text-sm focus:outline-none focus:border-nk-cyan transition-colors appearance-none"
      >
        <option value="">Select...</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function TextareaField({ label, name, value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-nk-navy text-sm font-medium">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={3}
        className="px-4 py-2.5 rounded-xl border border-nk-border bg-white text-nk-navy text-sm focus:outline-none focus:border-nk-cyan transition-colors resize-none"
      />
    </div>
  );
}

function SuccessMessage() {
  return (
    <motion.div
      initial={{ opacity:0, scale:0.9 }}
      animate={{ opacity:1, scale:1 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <CheckCircle className="text-nk-cyan mb-4" size={48}/>
      <h3 className="text-xl font-bold text-nk-navy mb-2">Thank you.</h3>
      <p className="text-nk-secondary">Nakshatr team will contact you soon.</p>
    </motion.div>
  );
}

export default function ConnectPage() {
  const [preForm, setPreForm] = useState({ name:'', mobile:'', city:'', userType:'', program:'', message:'' });
  const [contactForm, setContactForm] = useState({ name:'', contact:'', org:'', purpose:'', message:'' });
  const [preSuccess, setPreSuccess] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  const handlePre = (e) => setPreForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleContact = (e) => setContactForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submitPre = (e) => { e.preventDefault(); setPreSuccess(true); };
  const submitContact = (e) => { e.preventDefault(); setContactSuccess(true); };

  return (
    <div>
      <PageHeader
        label="Connect"
        title="Start your drone journey."
        subtitle="Whether you are a student, parent, university, or industry partner, connect with Nakshatr."
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

          {/* Pre-Register Card */}
          <motion.div
            initial={{ opacity:0, x:-24 }}
            animate={{ opacity:1, x:0 }}
            transition={{ delay:0.1 }}
            className="bg-nk-navy rounded-3xl p-8"
          >
            <p className="text-nk-cyan text-xs font-semibold tracking-widest uppercase mb-2 font-mono">Student / Parent</p>
            <h2 className="text-2xl font-extrabold text-white mb-6">Pre-Register</h2>
            <AnimatePresence mode="wait">
              {preSuccess ? (
                <SuccessMessage key="success"/>
              ) : (
                <motion.form key="form" onSubmit={submitPre} className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white text-sm font-medium">Full Name <span className="text-nk-cyan">*</span></label>
                    <input name="name" required value={preForm.name} onChange={handlePre} className="px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 text-white text-sm focus:outline-none focus:border-nk-cyan transition-colors placeholder-white/30"/>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white text-sm font-medium">Mobile Number <span className="text-nk-cyan">*</span></label>
                    <input name="mobile" type="tel" required value={preForm.mobile} onChange={handlePre} className="px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 text-white text-sm focus:outline-none focus:border-nk-cyan transition-colors"/>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white text-sm font-medium">City</label>
                    <input name="city" value={preForm.city} onChange={handlePre} className="px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 text-white text-sm focus:outline-none focus:border-nk-cyan transition-colors"/>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white text-sm font-medium">I am a</label>
                    <select name="userType" value={preForm.userType} onChange={handlePre} className="px-4 py-2.5 rounded-xl border border-white/20 bg-nk-navy text-white text-sm focus:outline-none focus:border-nk-cyan transition-colors">
                      <option value="">Select...</option>
                      {connectFormDropdowns.userType.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white text-sm font-medium">Interested Program</label>
                    <select name="program" value={preForm.program} onChange={handlePre} className="px-4 py-2.5 rounded-xl border border-white/20 bg-nk-navy text-white text-sm focus:outline-none focus:border-nk-cyan transition-colors">
                      <option value="">Select...</option>
                      {connectFormDropdowns.interestedProgram.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white text-sm font-medium">Message</label>
                    <textarea name="message" rows={2} value={preForm.message} onChange={handlePre} className="px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 text-white text-sm focus:outline-none focus:border-nk-cyan transition-colors resize-none"/>
                  </div>
                  <button type="submit" className="w-full py-3 rounded-xl bg-nk-cyan text-white font-semibold text-sm hover:bg-[#009BD8] transition-colors">
                    Submit Pre-Registration
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* General Contact Card */}
          <motion.div
            initial={{ opacity:0, x:24 }}
            animate={{ opacity:1, x:0 }}
            transition={{ delay:0.2 }}
            className="bg-white rounded-3xl p-8 border border-nk-border"
          >
            <p className="text-nk-secondary text-xs font-semibold tracking-widest uppercase mb-2 font-mono">University / Industry / Media</p>
            <h2 className="text-2xl font-extrabold text-nk-navy mb-6">General Contact</h2>
            <AnimatePresence mode="wait">
              {contactSuccess ? (
                <SuccessMessage key="success"/>
              ) : (
                <motion.form key="form" onSubmit={submitContact} className="space-y-4">
                  <InputField label="Name" name="name" required value={contactForm.name} onChange={handleContact}/>
                  <InputField label="Email / Mobile" name="contact" required value={contactForm.contact} onChange={handleContact}/>
                  <InputField label="Organization" name="org" value={contactForm.org} onChange={handleContact}/>
                  <SelectField label="Purpose" name="purpose" value={contactForm.purpose} onChange={handleContact} options={connectFormDropdowns.contactPurpose}/>
                  <TextareaField label="Message" name="message" value={contactForm.message} onChange={handleContact}/>
                  <button type="submit" className="w-full py-3 rounded-xl border border-nk-cyan text-nk-cyan font-semibold text-sm hover:bg-nk-cyan hover:text-white transition-all">
                    Send Inquiry
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Contact Info */}
        <div className="max-w-5xl mx-auto mt-10 grid sm:grid-cols-3 gap-4">
          {[
            { label:'Location', value:'Bhavnagar, Gujarat, India' },
            { label:'Email', value:'hello@nakshatr.in' },
            { label:'Phone', value:'+91 XXXXX XXXXX' },
          ].map(item => (
            <div key={item.label} className="text-center p-5 bg-nk-surface rounded-2xl border border-nk-border">
              <p className="text-nk-cyan text-xs font-semibold tracking-widest uppercase mb-1 font-mono">{item.label}</p>
              <p className="text-nk-navy text-sm font-medium">{item.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
