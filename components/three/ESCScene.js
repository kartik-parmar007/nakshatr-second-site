'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function ESCScene() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={ref}>
      {/* PCB base */}
      <mesh>
        <boxGeometry args={[1.4, 0.08, 1]}/>
        <meshStandardMaterial color="#1C2B4A"/>
      </mesh>
      {/* Components */}
      {[[-0.4,0.1,0],[0,0.14,0],[0.4,0.1,0]].map(([x,y,z], i) => (
        <mesh key={i} position={[x,y,z]}>
          <boxGeometry args={[0.2, 0.1+i*0.04, 0.2]}/>
          <meshStandardMaterial color={i===1?"#00AEEF":"#5A7A9F"} emissive={i===1?"#00AEEF":"#000"} emissiveIntensity={i===1?0.4:0}/>
        </mesh>
      ))}
      {/* Connection pads */}
      {[-0.5,-0.3,-0.1,0.1,0.3,0.5].map((x,i) => (
        <mesh key={i} position={[x, 0.05, 0.55]}>
          <cylinderGeometry args={[0.04,0.04,0.02,8]}/>
          <meshStandardMaterial color="#00AEEF" emissive="#00AEEF" emissiveIntensity={0.6}/>
        </mesh>
      ))}
    </group>
  );
}
