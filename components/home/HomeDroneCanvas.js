'use client';

import { Component, Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { industryScenes } from './industryScenes';

const CYAN = '#00AEEF';
const NAVY = '#1C2B4A';
const MID_NAVY = '#2C4A6E';
const SECONDARY = '#5A7A9F';
const SURFACE = '#F0F4F8';
const BORDER = '#D0DCE8';

function clamp(value, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function smooth(value) {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
}

function vectorFrom(values) {
  return new THREE.Vector3(values[0], values[1], values[2]);
}

function getSceneState(progress) {
  const raw = clamp(progress) * (industryScenes.length - 1);
  const cameraIndex = Math.min(Math.floor(raw), industryScenes.length - 1);
  const nextIndex = Math.min(cameraIndex + 1, industryScenes.length - 1);
  const cameraT = smooth(raw - cameraIndex);
  const activeIndex = Math.min(Math.round(raw), industryScenes.length - 1);
  const phase = clamp(raw - activeIndex + 0.5);

  return { raw, cameraIndex, nextIndex, cameraT, activeIndex, phase };
}

function getDronePosition(id, phase, isMobile) {
  const t = smooth(phase);
  const xScale = isMobile ? 0.58 : 1;
  const zScale = isMobile ? 0.72 : 1;

  switch (id) {
    case 'intro':
      return new THREE.Vector3((-4.2 + t * 5.2) * xScale, 0.2 + Math.sin(t * Math.PI) * 0.65, (0.8 - t * 1.1) * zScale);
    case 'agriculture':
      return new THREE.Vector3((-4.7 + t * 9.4) * xScale, 0.2 + Math.sin(t * Math.PI * 2) * 0.08, (-0.95 + t * 0.55) * zScale);
    case 'inspection': {
      const a = -0.35 + t * Math.PI * 1.55;
      return new THREE.Vector3(Math.cos(a) * 2.35 * xScale - 0.35, 0.55 + Math.sin(t * Math.PI) * 0.25, Math.sin(a) * 1.2 * zScale);
    }
    case 'response':
      return new THREE.Vector3((-3.7 + t * 7.4) * xScale, 0.45 + Math.sin(t * Math.PI * 3) * 0.1, (-1.15 + Math.sin(t * Math.PI) * 0.9) * zScale);
    case 'logistics':
      return new THREE.Vector3((-4.4 + t * 8.8) * xScale, 0.65 + Math.sin(t * Math.PI) * 0.22, (0.95 - t * 1.55) * zScale);
    case 'mapping':
      return new THREE.Vector3((Math.sin(t * Math.PI * 4) * 2.2) * xScale, 0.58, (-1.5 + t * 3) * zScale);
    case 'security': {
      const p = t * 4;
      const side = Math.floor(p);
      const u = p - side;
      const points = [
        new THREE.Vector3(-3.2 * xScale, 0.5, -1.4 * zScale),
        new THREE.Vector3(3.2 * xScale, 0.5, -1.4 * zScale),
        new THREE.Vector3(3.2 * xScale, 0.5, 1.15 * zScale),
        new THREE.Vector3(-3.2 * xScale, 0.5, 1.15 * zScale),
      ];
      return points[side % 4].clone().lerp(points[(side + 1) % 4], u);
    }
    case 'final':
      return new THREE.Vector3((1.6 - t * 1.6) * xScale, 0.28 + Math.sin(t * Math.PI) * 0.18, (-0.25 - t * 0.35) * zScale);
    default:
      return new THREE.Vector3(0, 0.4, 0);
  }
}

class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.warn(`Drone model could not be loaded: ${this.props.path}`, error);
  }

  render() {
    if (this.state.failed) {
      return <MissingModelMarker />;
    }

    return this.props.children;
  }
}

function LoadedDrone({ scene }) {
  const gltf = useGLTF(scene.modelPath, false, false);
  const object = useMemo(() => {
    const clone = gltf.scene.clone(true);

    clone.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow = false;
      child.receiveShadow = false;

      if (child.material) {
        child.material = child.material.clone();
        child.material.roughness = Math.max(child.material.roughness ?? 0.55, 0.42);
        child.material.metalness = child.material.metalness ?? 0.28;
      }
    });

    const box = new THREE.Box3().setFromObject(clone);
    if (!box.isEmpty()) {
      const center = new THREE.Vector3();
      const size = new THREE.Vector3();
      box.getCenter(center);
      box.getSize(size);

      const maxAxis = Math.max(size.x, size.y, size.z) || 1;
      const fitScale = scene.modelScale / maxAxis;
      clone.position.set(-center.x * fitScale, -center.y * fitScale, -center.z * fitScale);
      clone.scale.setScalar(fitScale);
    }

    return clone;
  }, [gltf.scene, scene.modelScale]);

  return <primitive object={object} rotation={scene.modelRotation} />;
}

function DroneActor({ scene, phase, isMobile }) {
  const groupRef = useRef();
  const rotorRef = useRef();

  useFrame((state) => {
    const target = getDronePosition(scene.id, phase, isMobile);
    if (groupRef.current) {
      groupRef.current.position.lerp(target, 0.09);
      groupRef.current.rotation.y = scene.modelRotation[1] + Math.sin(state.clock.elapsedTime * 0.55) * 0.08;
      groupRef.current.rotation.z = Math.sin(phase * Math.PI * 2) * 0.055;
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 2.5) * 0.002;
    }

    if (rotorRef.current) {
      rotorRef.current.rotation.y = state.clock.elapsedTime * 2.8;
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={rotorRef}>
        <ModelErrorBoundary key={scene.modelPath} path={scene.modelPath}>
          <Suspense fallback={<LoadingMarker />}>
            <LoadedDrone scene={scene} />
          </Suspense>
        </ModelErrorBoundary>
      </group>
      <ActionViz id={scene.id} phase={phase} />
    </group>
  );
}

function SceneCamera({ progress }) {
  const lookRef = useRef(new THREE.Vector3());

  useFrame(({ camera }) => {
    const state = getSceneState(progress);
    const from = industryScenes[state.cameraIndex];
    const to = industryScenes[state.nextIndex];
    const cameraTarget = vectorFrom(from.camera).lerp(vectorFrom(to.camera), state.cameraT);
    const lookTarget = vectorFrom(from.lookAt).lerp(vectorFrom(to.lookAt), state.cameraT);

    camera.position.lerp(cameraTarget, 0.08);
    lookRef.current.lerp(lookTarget, 0.08);
    camera.lookAt(lookRef.current);
    camera.updateProjectionMatrix();
  });

  return null;
}

function HomeWorld({ progress, isMobile }) {
  const state = getSceneState(progress);
  const scene = industryScenes[state.activeIndex];

  return (
    <>
      <color attach="background" args={['#FFFFFF']} />
      <fog attach="fog" args={['#FFFFFF', 6, 15]} />
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 5, 5]} intensity={1.85} color="#ffffff" />
      <directionalLight position={[-4, 3, 2]} intensity={0.7} color={CYAN} />
      <SceneCamera progress={progress} />
      <GlobalStage progress={progress} isMobile={isMobile} />
      <SceneEnvironment id={scene.id} phase={state.phase} isMobile={isMobile} />
      <DroneActor scene={scene} phase={state.phase} isMobile={isMobile} />
    </>
  );
}

function GlobalStage({ progress, isMobile }) {
  const sweep = (progress * 12) % 1;
  const width = isMobile ? 3.8 : 7.8;

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.22, 0]}>
        <planeGeometry args={[isMobile ? 8 : 14, 8]} />
        <meshStandardMaterial color={SURFACE} transparent opacity={0.58} roughness={0.82} />
      </mesh>
      <Line points={[[-width, -1.19, -2.9], [width, -1.19, -2.9]]} color={BORDER} transparent opacity={0.8} lineWidth={1} />
      <Line points={[[-width, -1.17, -2.1 + sweep * 4.2], [width, -1.17, -2.1 + sweep * 4.2]]} color={CYAN} transparent opacity={0.32} lineWidth={1.35} />
      <mesh position={[0, -1.1, -3.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[isMobile ? 2.2 : 3.7, isMobile ? 2.24 : 3.75, 96]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

function SceneEnvironment({ id, phase, isMobile }) {
  switch (id) {
    case 'agriculture':
      return <AgricultureEnv phase={phase} isMobile={isMobile} />;
    case 'inspection':
      return <InspectionEnv phase={phase} isMobile={isMobile} />;
    case 'response':
      return <ResponseEnv phase={phase} isMobile={isMobile} />;
    case 'logistics':
      return <LogisticsEnv phase={phase} isMobile={isMobile} />;
    case 'mapping':
      return <MappingEnv phase={phase} isMobile={isMobile} />;
    case 'security':
      return <SecurityEnv phase={phase} isMobile={isMobile} />;
    case 'final':
      return <FinalEnv phase={phase} isMobile={isMobile} />;
    default:
      return <IntroEnv phase={phase} isMobile={isMobile} />;
  }
}

function IntroEnv({ phase, isMobile }) {
  const width = isMobile ? 3.6 : 7.2;
  return (
    <group>
      <Line points={[[-width, 0.3, -1.8], [width, 0.3, -2.25]]} color={CYAN} transparent opacity={0.22} lineWidth={1.2} />
      <Line points={[[-width * 0.65, -0.45, -0.7], [width * 0.8, -0.25, -1.35]]} color={MID_NAVY} transparent opacity={0.18} lineWidth={1} />
      <mesh position={[0, -0.88, -1.3]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2 + phase * 1.4, 1.23 + phase * 1.4, 96]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.2 * (1 - phase)} />
      </mesh>
    </group>
  );
}

function AgricultureEnv({ phase, isMobile }) {
  const rows = Array.from({ length: isMobile ? 8 : 14 });
  const width = isMobile ? 4.2 : 8.4;
  const activeZ = -2.7 + phase * 4.8;

  return (
    <group>
      {rows.map((_, index) => {
        const z = -2.7 + index * 0.42;
        return (
          <Line key={z} points={[[-width, -1.05, z], [width, -1.05, z + 0.18]]} color={MID_NAVY} transparent opacity={0.2} lineWidth={1} />
        );
      })}
      <Line points={[[-width * 0.74, -0.98, activeZ], [width * 0.74, -0.98, activeZ + 0.16]]} color={CYAN} transparent opacity={0.86} lineWidth={2.4} />
      <mesh position={[0, -1.03, activeZ]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[isMobile ? 3.2 : 6.4, 0.32]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

function InspectionEnv({ phase, isMobile }) {
  const x = isMobile ? 1.45 : 2.25;
  const h = isMobile ? 2.2 : 3;

  return (
    <group position={[isMobile ? 0.2 : -0.4, -1.02, -1.05]}>
      <Line points={[[x, 0, 0], [x, h, 0]]} color={NAVY} transparent opacity={0.36} lineWidth={1.35} />
      <Line points={[[x - 0.75, 0.6, 0], [x + 0.75, 0.6, 0]]} color={MID_NAVY} transparent opacity={0.28} lineWidth={1} />
      <Line points={[[x - 0.95, 1.25, 0], [x + 0.95, 1.25, 0]]} color={MID_NAVY} transparent opacity={0.28} lineWidth={1} />
      <Line points={[[x - 0.7, 0.6, 0], [x + 0.7, 1.25, 0], [x - 0.7, 1.85, 0]]} color={BORDER} transparent opacity={0.95} lineWidth={1} />
      <mesh position={[x, 0.75 + Math.sin(phase * Math.PI) * 1.2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <ringGeometry args={[0.26, 0.29, 48]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.52} />
      </mesh>
    </group>
  );
}

function ResponseEnv({ phase, isMobile }) {
  const width = isMobile ? 4 : 7.4;
  const contours = Array.from({ length: 6 });

  return (
    <group>
      {contours.map((_, index) => {
        const z = -2.25 + index * 0.65;
        const offset = Math.sin(index * 1.7) * 0.36;
        return (
          <Line
            key={z}
            points={[[-width / 2, -1.02, z], [-1.1 + offset, -0.96, z + 0.22], [0.7 - offset, -1.02, z - 0.16], [width / 2, -0.98, z + 0.12]]}
            color={index % 2 ? SECONDARY : MID_NAVY}
            transparent
            opacity={0.24}
            lineWidth={1}
          />
        );
      })}
      <mesh position={[-2.25 + phase * 4.5, -0.93, -0.25]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.55, 0.58, 64]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.48} />
      </mesh>
      <Line points={[[-2.25 + phase * 4.5, -0.9, -1.65], [-2.25 + phase * 4.5, -0.9, 1.65]]} color={CYAN} transparent opacity={0.28} lineWidth={1.5} />
    </group>
  );
}

function LogisticsEnv({ phase, isMobile }) {
  const blocks = isMobile
    ? [[-1.6, -0.95, -1.1, 0.38, 0.6], [1.35, -0.95, -0.45, 0.34, 0.78], [0.15, -0.95, 1.05, 0.42, 0.54]]
    : [[-3.1, -0.95, -1.4, 0.48, 0.8], [-1.25, -0.95, 0.8, 0.38, 0.58], [1.15, -0.95, -0.55, 0.42, 0.92], [3, -0.95, 1.1, 0.5, 0.68]];
  const route = isMobile
    ? [[-2.2, -0.82, 1.6], [-0.7, -0.82, 0.7], [0.9, -0.82, 0.05], [2.15, -0.82, -1.25]]
    : [[-4.4, -0.82, 1.9], [-2.5, -0.82, 0.7], [-0.5, -0.82, 0.95], [1.65, -0.82, -0.15], [4.15, -0.82, -1.65]];

  return (
    <group>
      {blocks.map(([x, y, z, w, h]) => (
        <mesh key={`${x}-${z}`} position={[x, y + h / 2, z]}>
          <boxGeometry args={[w, h, w]} />
          <meshStandardMaterial color={SURFACE} transparent opacity={0.92} roughness={0.9} />
        </mesh>
      ))}
      <Line points={route} color={CYAN} transparent opacity={0.72} lineWidth={2} />
      <mesh position={route[Math.min(Math.floor(phase * route.length), route.length - 1)]}>
        <boxGeometry args={[0.22, 0.14, 0.22]} />
        <meshStandardMaterial color={CYAN} transparent opacity={0.72} roughness={0.55} />
      </mesh>
    </group>
  );
}

function MappingEnv({ phase, isMobile }) {
  const count = isMobile ? 5 : 8;
  const width = isMobile ? 3.7 : 7.2;

  return (
    <group>
      {Array.from({ length: count }).map((_, index) => {
        const radius = 0.72 + index * 0.34;
        return (
          <mesh key={radius} position={[Math.sin(index) * 0.25, -0.98 + index * 0.01, -0.2 + Math.cos(index * 0.8) * 0.24]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius, radius + 0.012, 96]} />
            <meshBasicMaterial color={index % 2 ? SECONDARY : MID_NAVY} transparent opacity={0.2} />
          </mesh>
        );
      })}
      <Line points={[[-width / 2, -0.74, -1.7 + phase * 3.4], [width / 2, -0.74, -1.7 + phase * 3.4]]} color={CYAN} transparent opacity={0.8} lineWidth={1.8} />
      <mesh position={[0, -0.92, -0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.55 + phase * 2.2, 0.58 + phase * 2.2, 96]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.38 * (1 - phase)} />
      </mesh>
    </group>
  );
}

function SecurityEnv({ phase, isMobile }) {
  const w = isMobile ? 3.8 : 6.6;
  const d = isMobile ? 2.3 : 3.2;
  const z = -0.25;
  const pulse = 0.6 + Math.sin(phase * Math.PI) * 0.34;

  return (
    <group>
      <Line points={[[-w / 2, -0.95, -d / 2 + z], [w / 2, -0.95, -d / 2 + z], [w / 2, -0.95, d / 2 + z], [-w / 2, -0.95, d / 2 + z], [-w / 2, -0.95, -d / 2 + z]]} color={MID_NAVY} transparent opacity={0.48} lineWidth={1.5} />
      <Line points={[[-w / 2, -0.88, -d / 2 + z], [w / 2, -0.88, d / 2 + z]]} color={CYAN} transparent opacity={0.24} lineWidth={1} />
      <Line points={[[-w / 2, -0.88, d / 2 + z], [w / 2, -0.88, -d / 2 + z]]} color={CYAN} transparent opacity={0.24} lineWidth={1} />
      <mesh position={[0, -0.9, z]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[pulse * 1.25, pulse * 1.28, 96]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.32} />
      </mesh>
    </group>
  );
}

function FinalEnv({ phase, isMobile }) {
  const width = isMobile ? 3.4 : 6.6;
  return (
    <group>
      <Line points={[[-width / 2, -0.92, -0.45], [0, -0.72 + phase * 0.18, -0.85], [width / 2, -0.92, -0.45]]} color={CYAN} transparent opacity={0.56} lineWidth={2} />
      <mesh position={[0, -0.96, -0.3]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.75 + phase * 1.6, 0.78 + phase * 1.6, 96]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.22 * (1 - phase * 0.45)} />
      </mesh>
    </group>
  );
}

function ActionViz({ id, phase }) {
  if (id === 'intro' || id === 'final') return null;

  const coneOpacity = id === 'inspection' || id === 'security' || id === 'response' ? 0.16 : 0.1;
  const height = id === 'agriculture' ? 1.4 : 1.9;

  return (
    <group position={[0, -0.35, 0]}>
      <mesh position={[0, -height / 2, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.58 + Math.sin(phase * Math.PI) * 0.2, height, 42, 1, true]} />
        <meshBasicMaterial color={CYAN} transparent opacity={coneOpacity} side={THREE.DoubleSide} />
      </mesh>
      <Line points={[[0, -0.08, 0], [0, -height, 0]]} color={CYAN} transparent opacity={0.34} lineWidth={1} />
    </group>
  );
}

function LoadingMarker() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.7, 0.74, 64]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.35} />
      </mesh>
      <Line points={[[-0.9, 0, 0], [0.9, 0, 0]]} color={CYAN} transparent opacity={0.35} lineWidth={1} />
    </group>
  );
}

function MissingModelMarker() {
  return (
    <group>
      <LoadingMarker />
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.06, 24, 24]} />
        <meshBasicMaterial color={NAVY} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

export default function HomeDroneCanvas({ progress, isMobile }) {
  return (
    <Canvas
      camera={{ position: [0, 1.6, 5.5], fov: isMobile ? 46 : 42, near: 0.1, far: 60 }}
      dpr={isMobile ? [1, 1.2] : [1, 1.65]}
      gl={{ antialias: !isMobile, alpha: false, powerPreference: 'high-performance' }}
    >
      <Suspense fallback={<LoadingMarker />}>
        <HomeWorld progress={progress} isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
}
