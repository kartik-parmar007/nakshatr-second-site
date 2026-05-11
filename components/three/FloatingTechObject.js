'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function FloatingTechObject({ type = 'cube', color = '#00AEEF', speed = 1 }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3 * speed;
      ref.current.rotation.y = state.clock.elapsedTime * 0.5 * speed;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * speed) * 0.15;
    }
  });

  const geo = type === 'sphere'
    ? <sphereGeometry args={[0.6, 16, 16]}/>
    : type === 'oct'
    ? <octahedronGeometry args={[0.7]}/>
    : <boxGeometry args={[0.8, 0.8, 0.8]}/>;

  return (
    <mesh ref={ref}>
      {geo}
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.15} wireframe={type === 'cube'}/>
    </mesh>
  );
}
