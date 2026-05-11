export default function DroneSVG({ className = '' }) {
  return (
    <svg viewBox="0 0 300 220" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Arms */}
      <line x1="150" y1="110" x2="60" y2="60" stroke="#1C2B4A" strokeWidth="3" strokeLinecap="round"/>
      <line x1="150" y1="110" x2="240" y2="60" stroke="#1C2B4A" strokeWidth="3" strokeLinecap="round"/>
      <line x1="150" y1="110" x2="60" y2="160" stroke="#1C2B4A" strokeWidth="3" strokeLinecap="round"/>
      <line x1="150" y1="110" x2="240" y2="160" stroke="#1C2B4A" strokeWidth="3" strokeLinecap="round"/>
      {/* Motor hubs */}
      <circle cx="60" cy="60" r="18" fill="#F0F4F8" stroke="#1C2B4A" strokeWidth="2"/>
      <circle cx="240" cy="60" r="18" fill="#F0F4F8" stroke="#1C2B4A" strokeWidth="2"/>
      <circle cx="60" cy="160" r="18" fill="#F0F4F8" stroke="#1C2B4A" strokeWidth="2"/>
      <circle cx="240" cy="160" r="18" fill="#F0F4F8" stroke="#1C2B4A" strokeWidth="2"/>
      {/* Propellers */}
      <ellipse cx="60" cy="60" rx="30" ry="5" fill="#00AEEF" opacity="0.35" transform="rotate(-30 60 60)"/>
      <ellipse cx="240" cy="60" rx="30" ry="5" fill="#00AEEF" opacity="0.35" transform="rotate(30 240 60)"/>
      <ellipse cx="60" cy="160" rx="30" ry="5" fill="#00AEEF" opacity="0.35" transform="rotate(30 60 160)"/>
      <ellipse cx="240" cy="160" rx="30" ry="5" fill="#00AEEF" opacity="0.35" transform="rotate(-30 240 160)"/>
      {/* Body */}
      <rect x="125" y="90" width="50" height="40" rx="8" fill="#1C2B4A"/>
      {/* Center sensor */}
      <circle cx="150" cy="110" r="10" fill="#00AEEF" opacity="0.9"/>
      <circle cx="150" cy="110" r="5" fill="white" opacity="0.8"/>
      {/* Landing gear */}
      <line x1="138" y1="130" x2="138" y2="145" stroke="#5A7A9F" strokeWidth="2"/>
      <line x1="162" y1="130" x2="162" y2="145" stroke="#5A7A9F" strokeWidth="2"/>
      <line x1="130" y1="145" x2="146" y2="145" stroke="#5A7A9F" strokeWidth="2"/>
      <line x1="154" y1="145" x2="170" y2="145" stroke="#5A7A9F" strokeWidth="2"/>
      {/* Technical annotation lines */}
      <line x1="60" y1="60" x2="20" y2="30" stroke="#00AEEF" strokeWidth="1" strokeDasharray="4 3" opacity="0.5"/>
      <line x1="240" y1="60" x2="280" y2="30" stroke="#00AEEF" strokeWidth="1" strokeDasharray="4 3" opacity="0.5"/>
    </svg>
  );
}
