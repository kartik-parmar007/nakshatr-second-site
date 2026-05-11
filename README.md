# Nakshatr Technologies — Website

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Tech Stack
- Next.js 14 (App Router)
- JavaScript only (no TypeScript)
- Tailwind CSS
- Framer Motion
- Lucide React
- Three.js + React Three Fiber + Drei (3D)

## Pages
- `/` — Home (Hero + Drone Disassembly Journey)
- `/philosophy` — Learning Philosophy
- `/programs` — Programs & Pricing
- `/center` — The Center of Excellence
- `/universities` — University Partnerships
- `/about` — About Nakshatr
- `/connect` — Pre-Register & Contact

## Project Structure
```
/app          → Next.js App Router pages
/components
  /layout     → Navbar, Footer
  /ui         → Button, Card, Section, PageHeader, CTA, DroneSVG, ComponentIcon
  /three      → ThreeCanvasWrapper, DroneModelScene, FloatingTechObject, ESCScene
/data
  mockData.js → All content, no hardcoding in pages
```

## Notes
- 3D components use `dynamic(() => import(...), { ssr: false })` for safe SSR
- All repeated content is imported from `/data/mockData.js`
- Color palette: Navy #1C2B4A, Cyan #00AEEF, Surface #F0F4F8
- Fonts: Syne (display), JetBrains Mono (technical labels)
- Forms show success message on submit (no backend required)
