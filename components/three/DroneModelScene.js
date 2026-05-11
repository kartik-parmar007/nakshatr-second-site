'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function DroneArm({ rotation }) {
  return (
    <group rotation={rotation}>
      <mesh position={[0.8, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.6, 8]}/>
        <meshStandardMaterial color="#1C2B4A"/>
      </mesh>
      <mesh position={[1.6, 0.1, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.08, 16]}/>
        <meshStandardMaterial color="#1C2B4A"/>
      </mesh>
      <mesh position={[1.6, 0.2, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.04, 16]}/>
        <meshStandardMaterial color="#00AEEF" emissive="#00AEEF" emissiveIntensity={0.3}/>
      </mesh>
    </group>
  );
}

export default function DroneModelScene({ rotate = true }) {
  const droneRef = useRef();
  useFrame((state) => {
    if (droneRef.current && rotate) {
      droneRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      droneRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
    }
  });

  return (
    <group ref={droneRef} scale={0.8}>
      {/* Body */}
      <mesh>
        <boxGeometry args={[0.5, 0.1, 0.5]}/>
        <meshStandardMaterial color="#1C2B4A"/>
      </mesh>
      {/* Center sensor */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.06, 16]}/>
        <meshStandardMaterial color="#00AEEF" emissive="#00AEEF" emissiveIntensity={0.5}/>
      </mesh>
      {/* Arms */}
      <DroneArm rotation={[0, Math.PI * 0.25, 0]}/>
      <DroneArm rotation={[0, Math.PI * 0.75, 0]}/>
      <DroneArm rotation={[0, Math.PI * 1.25, 0]}/>
      <DroneArm rotation={[0, Math.PI * 1.75, 0]}/>
      {/* Landing gear */}
      <mesh position={[0.2, -0.12, 0.2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 6]}/>
        <meshStandardMaterial color="#5A7A9F"/>
      </mesh>
      <mesh position={[-0.2, -0.12, 0.2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 6]}/>
        <meshStandardMaterial color="#5A7A9F"/>
      </mesh>
      <mesh position={[0.2, -0.12, -0.2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 6]}/>
        <meshStandardMaterial color="#5A7A9F"/>
      </mesh>
      <mesh position={[-0.2, -0.12, -0.2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 6]}/>
        <meshStandardMaterial color="#5A7A9F"/>
      </mesh>
    </group>
  );
}
