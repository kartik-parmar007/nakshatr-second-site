import Button from './Button';

export default function CTA({ title, subtitle, primaryLabel, primaryHref, secondaryLabel, secondaryHref }) {
  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto text-center bg-nk-navy rounded-3xl p-12 sm:p-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <circle cx="50" cy="50" r="80" fill="#00AEEF"/>
            <circle cx="350" cy="250" r="80" fill="#00AEEF"/>
          </svg>
        </div>
        <p className="relative text-nk-cyan text-xs font-semibold tracking-widest uppercase mb-4 font-mono">Ready?</p>
        <h2 className="relative text-3xl sm:text-4xl font-extrabold text-white mb-4">{title}</h2>
        {subtitle && <p className="relative text-nk-border text-base mb-8">{subtitle}</p>}
        <div className="relative flex flex-col sm:flex-row gap-3 justify-center">
          {primaryLabel && <Button href={primaryHref}>{primaryLabel}</Button>}
          {secondaryLabel && <Button href={secondaryHref} variant="secondary">{secondaryLabel}</Button>}
        </div>
      </div>
    </section>
  );
}
