'use client';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function ThreeCanvasWrapper({ children, height = '400px', controls = false, className = '' }) {
  return (
    <div style={{ height }} className={'w-full ' + className}>
      <Suspense fallback={<DroneIllustrationFallback />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
          <pointLight position={[-3, 3, 3]} intensity={0.4} color="#00AEEF" />
          {children}
          {controls && <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.2} />}
        </Canvas>
      </Suspense>
    </div>
  );
}

function DroneIllustrationFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-nk-surface rounded-2xl">
      <svg viewBox="0 0 200 200" className="w-40 h-40 opacity-40">
        <line x1="100" y1="20" x2="100" y2="180" stroke="#00AEEF" strokeWidth="2"/>
        <line x1="20" y1="100" x2="180" y2="100" stroke="#00AEEF" strokeWidth="2"/>
        <circle cx="100" cy="100" r="20" fill="none" stroke="#1C2B4A" strokeWidth="2"/>
        <circle cx="35" cy="35" r="12" fill="none" stroke="#00AEEF" strokeWidth="2"/>
        <circle cx="165" cy="35" r="12" fill="none" stroke="#00AEEF" strokeWidth="2"/>
        <circle cx="35" cy="165" r="12" fill="none" stroke="#00AEEF" strokeWidth="2"/>
        <circle cx="165" cy="165" r="12" fill="none" stroke="#00AEEF" strokeWidth="2"/>
      </svg>
    </div>
  );
}
