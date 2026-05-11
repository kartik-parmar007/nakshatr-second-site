export default function ComponentIcon({ type, size = 64 }) {
  const s = size;
  if (type === 'motor') return (
    <svg viewBox="0 0 64 64" width={s} height={s} fill="none">
      <circle cx="32" cy="32" r="28" stroke="#1C2B4A" strokeWidth="2" fill="#F0F4F8"/>
      <circle cx="32" cy="32" r="14" stroke="#00AEEF" strokeWidth="2"/>
      <circle cx="32" cy="32" r="5" fill="#00AEEF"/>
      <line x1="32" y1="32" x2="46" y2="32" stroke="#00AEEF" strokeWidth="1.5" opacity="0.5"/>
      <line x1="32" y1="32" x2="39" y2="20" stroke="#00AEEF" strokeWidth="1.5" opacity="0.5"/>
      <line x1="32" y1="32" x2="25" y2="20" stroke="#00AEEF" strokeWidth="1.5" opacity="0.5"/>
      <line x1="32" y1="32" x2="18" y2="32" stroke="#00AEEF" strokeWidth="1.5" opacity="0.5"/>
      <line x1="32" y1="32" x2="25" y2="44" stroke="#00AEEF" strokeWidth="1.5" opacity="0.5"/>
      <line x1="32" y1="32" x2="39" y2="44" stroke="#00AEEF" strokeWidth="1.5" opacity="0.5"/>
    </svg>
  );
  if (type === 'esc') return (
    <svg viewBox="0 0 64 64" width={s} height={s} fill="none">
      <rect x="8" y="20" width="48" height="24" rx="4" fill="#F0F4F8" stroke="#1C2B4A" strokeWidth="2"/>
      <rect x="12" y="26" width="8" height="12" rx="1" fill="#5A7A9F" opacity="0.6"/>
      <rect x="20" y="26" width="8" height="12" rx="1" fill="#5A7A9F" opacity="0.6"/>
      <rect x="28" y="26" width="8" height="12" rx="1" fill="#00AEEF"/>
      <rect x="36" y="26" width="8" height="12" rx="1" fill="#5A7A9F" opacity="0.6"/>
      <rect x="44" y="26" width="8" height="12" rx="1" fill="#5A7A9F" opacity="0.6"/>
      <line x1="8" y1="32" x2="2" y2="32" stroke="#00AEEF" strokeWidth="2"/>
      <line x1="56" y1="32" x2="62" y2="32" stroke="#00AEEF" strokeWidth="2"/>
    </svg>
  );
  if (type === 'fc') return (
    <svg viewBox="0 0 64 64" width={s} height={s} fill="none">
      <rect x="12" y="12" width="40" height="40" rx="6" fill="#F0F4F8" stroke="#1C2B4A" strokeWidth="2"/>
      <circle cx="32" cy="32" r="8" fill="#00AEEF" opacity="0.8"/>
      <line x1="32" y1="12" x2="32" y2="20" stroke="#00AEEF" strokeWidth="1.5"/>
      <line x1="32" y1="44" x2="32" y2="52" stroke="#00AEEF" strokeWidth="1.5"/>
      <line x1="12" y1="32" x2="20" y2="32" stroke="#00AEEF" strokeWidth="1.5"/>
      <line x1="44" y1="32" x2="52" y2="32" stroke="#00AEEF" strokeWidth="1.5"/>
      <circle cx="32" cy="32" r="3" fill="white"/>
    </svg>
  );
  if (type === 'gps') return (
    <svg viewBox="0 0 64 64" width={s} height={s} fill="none">
      <path d="M32 8 C20 8 12 18 12 28 C12 42 32 58 32 58 C32 58 52 42 52 28 C52 18 44 8 32 8Z" fill="#F0F4F8" stroke="#1C2B4A" strokeWidth="2"/>
      <circle cx="32" cy="28" r="8" fill="#00AEEF"/>
      <circle cx="32" cy="28" r="3" fill="white"/>
    </svg>
  );
  if (type === 'propeller') return (
    <svg viewBox="0 0 64 64" width={s} height={s} fill="none">
      <circle cx="32" cy="32" r="5" fill="#1C2B4A"/>
      <ellipse cx="32" cy="18" rx="7" ry="14" fill="#00AEEF" opacity="0.7"/>
      <ellipse cx="46" cy="32" rx="14" ry="7" fill="#00AEEF" opacity="0.7"/>
      <ellipse cx="32" cy="46" rx="7" ry="14" fill="#00AEEF" opacity="0.7"/>
      <ellipse cx="18" cy="32" rx="14" ry="7" fill="#00AEEF" opacity="0.7"/>
    </svg>
  );
  if (type === 'battery') return (
    <svg viewBox="0 0 64 64" width={s} height={s} fill="none">
      <rect x="8" y="20" width="44" height="24" rx="4" fill="#F0F4F8" stroke="#1C2B4A" strokeWidth="2"/>
      <rect x="52" y="27" width="5" height="10" rx="2" fill="#1C2B4A"/>
      <rect x="12" y="24" width="20" height="16" rx="2" fill="#00AEEF"/>
      <line x1="22" y1="28" x2="22" y2="36" stroke="white" strokeWidth="2"/>
      <line x1="18" y1="32" x2="26" y2="32" stroke="white" strokeWidth="2"/>
    </svg>
  );
  // Default
  return (
    <svg viewBox="0 0 64 64" width={s} height={s} fill="none">
      <rect x="12" y="12" width="40" height="40" rx="6" fill="#F0F4F8" stroke="#00AEEF" strokeWidth="2"/>
      <circle cx="32" cy="32" r="8" fill="#00AEEF" opacity="0.5"/>
    </svg>
  );
}
