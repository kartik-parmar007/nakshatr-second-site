import Link from 'next/link';
import { footerLinks } from '@/data/mockData';

export default function Footer() {
  return (
    <footer className="bg-nk-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6">
                <rect x="12" y="2" width="4" height="24" rx="2" fill="white"/>
                <rect x="2" y="12" width="24" height="4" rx="2" fill="white"/>
                <circle cx="14" cy="14" r="4" fill="#00AEEF"/>
                <circle cx="5" cy="5" r="2.5" fill="#00AEEF" opacity="0.6"/>
                <circle cx="23" cy="5" r="2.5" fill="#00AEEF" opacity="0.6"/>
                <circle cx="5" cy="23" r="2.5" fill="#00AEEF" opacity="0.6"/>
                <circle cx="23" cy="23" r="2.5" fill="#00AEEF" opacity="0.6"/>
              </svg>
              <span className="font-bold text-sm tracking-wide">NAKSHATR <span className="text-nk-cyan">TECHNOLOGIES</span></span>
            </div>
            <p className="text-nk-border text-sm leading-relaxed">Drone education built from the root.</p>
            <p className="text-nk-secondary text-xs mt-4">Bhavnagar, Gujarat, India</p>
            <p className="text-nk-secondary text-xs">hello@nakshatr.in</p>
            <p className="text-nk-secondary text-xs">+91 XXXXX XXXXX</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-nk-cyan uppercase mb-4">Navigation</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-nk-border text-sm hover:text-nk-cyan transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-nk-cyan uppercase mb-4">Follow Us</h4>
            <div className="space-y-2">
              <a href="#" className="block text-nk-border text-sm hover:text-nk-cyan transition-colors">Instagram</a>
              <a href="#" className="block text-nk-border text-sm hover:text-nk-cyan transition-colors">LinkedIn</a>
              <a href="#" className="block text-nk-border text-sm hover:text-nk-cyan transition-colors">YouTube</a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-nk-secondary text-xs">© {new Date().getFullYear()} Nakshatr Technologies. All rights reserved.</p>
          <p className="text-nk-secondary text-xs">Bhavnagar · Gujarat · India</p>
        </div>
      </div>
    </footer>
  );
}
