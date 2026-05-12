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
const WHITE = '#FFFFFF';

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

function pointAt(points, value) {
  const t = clamp(value);
  const scaled = t * (points.length - 1);
  const index = Math.min(Math.floor(scaled), points.length - 2);
  const local = scaled - index;
  return vectorFrom(points[index]).lerp(vectorFrom(points[index + 1]), smooth(local));
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
      return pointAt([
        [-4.7 * xScale, 0.24, -1.25 * zScale],
        [-1.6 * xScale, 0.18, -1.05 * zScale],
        [2.25 * xScale, 0.23, -0.64 * zScale],
        [4.55 * xScale, 0.42, -0.2 * zScale],
      ], phase);
    case 'inspection': {
      const pausedT = phase > 0.42 && phase < 0.58 ? 0.5 : t;
      const a = -0.35 + pausedT * Math.PI * 1.55;
      return new THREE.Vector3(Math.cos(a) * 2.35 * xScale - 0.35, 0.55 + Math.sin(t * Math.PI) * 0.25, Math.sin(a) * 1.2 * zScale);
    }
    case 'response':
      return pointAt([
        [-3.7 * xScale, 0.44, -1.25 * zScale],
        [-1.4 * xScale, 0.56, 0.95 * zScale],
        [1.2 * xScale, 0.48, -0.8 * zScale],
        [3.7 * xScale, 0.58, 0.72 * zScale],
      ], phase);
    case 'logistics':
      return pointAt([
        [-4.35 * xScale, 0.78, 1.1 * zScale],
        [-1.7 * xScale, 1.02, 0.22 * zScale],
        [1.4 * xScale, 0.88, -0.38 * zScale],
        [4.35 * xScale, 0.72, -1.45 * zScale],
      ], phase);
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
      const bank =
        scene.id === 'agriculture' ? Math.sin(phase * Math.PI * 2.4) * 0.12 :
        scene.id === 'logistics' ? -0.11 :
        scene.id === 'security' ? Math.sin(phase * Math.PI * 4) * 0.08 :
        Math.sin(phase * Math.PI * 2) * 0.055;
      const pitch = scene.id === 'logistics' ? -0.08 : scene.id === 'response' ? -0.04 : 0;

      groupRef.current.position.lerp(target, 0.09);
      groupRef.current.rotation.y = scene.modelRotation[1] + Math.sin(state.clock.elapsedTime * 0.55) * 0.08;
      groupRef.current.rotation.x = pitch;
      groupRef.current.rotation.z = bank;
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
  const haze = isMobile ? 3 : 5;

  return (
    <group>
      {Array.from({ length: haze }).map((_, index) => (
        <mesh key={index} position={[(index - haze / 2) * 2.2, 1.9 - index * 0.16, -4.2 - index * 0.7]}>
          <planeGeometry args={[isMobile ? 4.5 : 7.5, 1.1]} />
          <meshBasicMaterial color={WHITE} transparent opacity={0.18} depthWrite={false} />
        </mesh>
      ))}
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
      <mesh position={[1.8, 1.7, -4.8]} rotation={[0, -0.16, 0]}>
        <planeGeometry args={[isMobile ? 4 : 8.5, isMobile ? 1.8 : 2.4]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.06} depthWrite={false} />
      </mesh>
      <Line points={[[-width, 0.3, -1.8], [width, 0.3, -2.25]]} color={CYAN} transparent opacity={0.22} lineWidth={1.2} />
      <Line points={[[-width * 0.65, -0.45, -0.7], [width * 0.8, -0.25, -1.35]]} color={MID_NAVY} transparent opacity={0.18} lineWidth={1} />
      <Line points={[[-width * 0.45, 1.15, -3.25], [width * 0.55, 1.45, -4.1]]} color={BORDER} transparent opacity={0.5} lineWidth={1} />
      <mesh position={[0, -0.88, -1.3]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2 + phase * 1.4, 1.23 + phase * 1.4, 96]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.2 * (1 - phase)} />
      </mesh>
    </group>
  );
}

function AgricultureEnv({ phase, isMobile }) {
  const rows = Array.from({ length: isMobile ? 11 : 20 });
  const width = isMobile ? 4.6 : 9.4;
  const activeZ = -2.85 + phase * 5.15;

  return (
    <group>
      <mesh position={[-2.9, 1.1, -5.6]} rotation={[0, 0.08, 0]}>
        <planeGeometry args={[isMobile ? 5 : 9, 2.8]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.055} depthWrite={false} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.04, -0.25]}>
        <planeGeometry args={[width * 1.15, 5.4, 14, 8]} />
        <meshStandardMaterial color="#E7F2EE" transparent opacity={0.74} roughness={0.92} wireframe={false} />
      </mesh>
      {rows.map((_, index) => {
        const z = -2.8 + index * 0.31;
        const rowWidth = width * (0.92 - index * 0.004);
        return (
          <group key={z}>
            <Line points={[[-rowWidth, -0.93, z], [rowWidth, -0.93, z + 0.24]]} color={MID_NAVY} transparent opacity={0.21} lineWidth={1} />
            <Line points={[[-rowWidth * 0.92, -0.91, z + 0.08], [rowWidth * 0.92, -0.91, z + 0.3]]} color="#8EB7A6" transparent opacity={0.16} lineWidth={1.5} />
          </group>
        );
      })}
      <Line points={[[-width * 0.74, -0.98, activeZ], [width * 0.74, -0.98, activeZ + 0.16]]} color={CYAN} transparent opacity={0.86} lineWidth={2.4} />
      <mesh position={[0, -1.03, activeZ]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[isMobile ? 3.3 : 6.8, 0.36]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.1} depthWrite={false} />
      </mesh>
      <mesh position={[1.8 - phase * 3.6, -0.52, activeZ - 0.22]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.25 + phase * 0.1, 0.28 + phase * 0.1, 48]} />
        <meshBasicMaterial color={WHITE} transparent opacity={0.26} depthWrite={false} />
      </mesh>
    </group>
  );
}

function InspectionEnv({ phase, isMobile }) {
  const x = isMobile ? 1.25 : 2.2;
  const h = isMobile ? 2.5 : 3.3;
  const scanY = 0.65 + Math.sin(phase * Math.PI) * 1.25;

  return (
    <group position={[isMobile ? 0.15 : -0.55, -1.02, -1.25]}>
      <mesh position={[x, h / 2, -0.08]}>
        <boxGeometry args={[0.12, h, 0.12]} />
        <meshStandardMaterial color={NAVY} transparent opacity={0.48} roughness={0.74} />
      </mesh>
      <mesh position={[x - 0.95, h * 0.54, -0.16]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.055, 0.055, isMobile ? 2.2 : 3.25, 24]} />
        <meshStandardMaterial color={MID_NAVY} transparent opacity={0.38} roughness={0.8} />
      </mesh>
      <Line points={[[x - 1.6, 0.52, 0], [x + 0.75, 1.1, 0], [x - 1.3, 1.75, 0], [x + 0.85, 2.35, 0]]} color={BORDER} transparent opacity={0.72} lineWidth={1} />
      <Line points={[[x - 1.9, -0.08, 0.15], [x + 1.4, 0.15, 0.1]]} color={MID_NAVY} transparent opacity={0.25} lineWidth={3} />
      <mesh position={[x - 0.2, scanY, 0.02]} rotation={[0, Math.PI / 2, 0]}>
        <ringGeometry args={[0.26, 0.29, 48]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.52} />
      </mesh>
      <mesh position={[x - 0.2, scanY, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[1.35, 0.78]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.07} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function ResponseEnv({ phase, isMobile }) {
  const width = isMobile ? 4 : 7.4;
  const contours = Array.from({ length: isMobile ? 6 : 9 });
  const beaconX = -2.25 + phase * 4.5;

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.03, -0.1]}>
        <planeGeometry args={[width * 1.25, 4.9]} />
        <meshStandardMaterial color="#DDECF5" transparent opacity={0.64} roughness={0.42} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1.85, -0.97, 0.9]}>
        <circleGeometry args={[0.75, 36]} />
        <meshBasicMaterial color={SURFACE} transparent opacity={0.62} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2.05, -0.965, -0.65]}>
        <circleGeometry args={[0.92, 42]} />
        <meshBasicMaterial color={SURFACE} transparent opacity={0.5} />
      </mesh>
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
      <Line points={[[-3.25, -0.86, 1.2], [-1.55, -0.8, 0.38], [0.35, -0.82, 0.54], [2.65, -0.8, -0.9]]} color={CYAN} transparent opacity={0.52} lineWidth={2.2} />
      <mesh position={[beaconX, -0.93, -0.25]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.55, 0.58, 64]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.48} />
      </mesh>
      <mesh position={[beaconX, -0.82, -0.25]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.12, 0.16, 40]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.58} />
      </mesh>
      <Line points={[[beaconX, -0.9, -1.65], [beaconX, -0.9, 1.65]]} color={CYAN} transparent opacity={0.28} lineWidth={1.5} />
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
      <mesh position={[0.6, 1.25, -5.15]}>
        <planeGeometry args={[isMobile ? 5 : 9.5, 2.8]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.045} depthWrite={false} />
      </mesh>
      {blocks.map(([x, y, z, w, h]) => (
        <mesh key={`${x}-${z}`} position={[x, y + h / 2, z]}>
          <boxGeometry args={[w, h, w * 0.82]} />
          <meshStandardMaterial color={SURFACE} transparent opacity={0.92} roughness={0.9} />
        </mesh>
      ))}
      {(isMobile ? [-2.2, 0, 2.1] : [-4.2, -2.7, -0.4, 1.9, 3.5]).map((x, index) => (
        <mesh key={x} position={[x, -0.58 + index * 0.04, -3.15 - index * 0.18]}>
          <boxGeometry args={[0.54, 1.28 + index * 0.13, 0.38]} />
          <meshStandardMaterial color={index % 2 ? '#E8EEF5' : SURFACE} transparent opacity={0.58} roughness={0.82} />
        </mesh>
      ))}
      <Line points={route} color={CYAN} transparent opacity={0.72} lineWidth={2} />
      <Line points={route.map(([x, y, z]) => [x, y + 0.06, z])} color={WHITE} transparent opacity={0.44} lineWidth={0.8} />
      <mesh position={route[Math.min(Math.floor(phase * route.length), route.length - 1)]}>
        <boxGeometry args={[0.22, 0.14, 0.22]} />
        <meshStandardMaterial color={CYAN} transparent opacity={0.72} roughness={0.55} />
      </mesh>
    </group>
  );
}

function MappingEnv({ phase, isMobile }) {
  const count = isMobile ? 5 : 9;
  const width = isMobile ? 3.7 : 7.2;

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.02, -0.05]}>
        <planeGeometry args={[isMobile ? 5.2 : 8.4, 4.8, isMobile ? 10 : 18, isMobile ? 8 : 14]} />
        <meshStandardMaterial color="#E8F1F7" transparent opacity={0.55} wireframe roughness={0.8} />
      </mesh>
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
      {Array.from({ length: isMobile ? 4 : 7 }).map((_, index) => {
        const x = -width / 2 + index * (width / (isMobile ? 3 : 6));
        return <Line key={x} points={[[x, -0.88, -2.15], [x + 0.15, -0.88, 2.1]]} color={BORDER} transparent opacity={0.34} lineWidth={0.8} />;
      })}
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
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.03, z]}>
        <planeGeometry args={[w * 1.25, d * 1.4]} />
        <meshStandardMaterial color="#E9EEF4" transparent opacity={0.5} roughness={0.82} />
      </mesh>
      <Line points={[[-w / 2, -0.95, -d / 2 + z], [w / 2, -0.95, -d / 2 + z], [w / 2, -0.95, d / 2 + z], [-w / 2, -0.95, d / 2 + z], [-w / 2, -0.95, -d / 2 + z]]} color={MID_NAVY} transparent opacity={0.48} lineWidth={1.5} />
      {[-1, 0, 1].map((side) => (
        <group key={side}>
          <Line points={[[-w / 2, -0.5, side * 0.54 + z], [w / 2, -0.5, side * 0.54 + z]]} color={MID_NAVY} transparent opacity={0.16} lineWidth={1} />
          <Line points={[[side * 1.35, -0.5, -d / 2 + z], [side * 1.35, -0.5, d / 2 + z]]} color={MID_NAVY} transparent opacity={0.14} lineWidth={1} />
        </group>
      ))}
      {[-w / 2, -w / 6, w / 6, w / 2].map((x) => (
        <mesh key={x} position={[x, -0.54, -d / 2 + z]}>
          <boxGeometry args={[0.06, 0.72, 0.06]} />
          <meshStandardMaterial color={NAVY} transparent opacity={0.34} roughness={0.8} />
        </mesh>
      ))}
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
  const height = id === 'agriculture' ? 1.25 : id === 'mapping' ? 1.75 : 1.9;

  return (
    <group position={[0, -0.35, 0]}>
      {id !== 'logistics' && (
        <mesh position={[0, -height / 2, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.58 + Math.sin(phase * Math.PI) * 0.2, height, 42, 1, true]} />
          <meshBasicMaterial color={CYAN} transparent opacity={coneOpacity} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      )}
      {id === 'agriculture' && (
        <>
          <Line points={[[-0.32, -0.48, -0.12], [-0.72, -1.26, -0.22]]} color={WHITE} transparent opacity={0.32} lineWidth={1} />
          <Line points={[[0.32, -0.48, 0.12], [0.72, -1.26, 0.22]]} color={WHITE} transparent opacity={0.32} lineWidth={1} />
        </>
      )}
      {id === 'inspection' && (
        <mesh position={[0.34, -0.28, -0.18]} rotation={[0, Math.PI / 2, 0]}>
          <ringGeometry args={[0.42 + Math.sin(phase * Math.PI) * 0.18, 0.45 + Math.sin(phase * Math.PI) * 0.18, 56]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.45} depthWrite={false} />
        </mesh>
      )}
      {id === 'logistics' && (
        <Line points={[[0, -0.08, 0], [-0.72, -0.46, 0.2], [-1.3, -0.62, 0.38]]} color={CYAN} transparent opacity={0.28} lineWidth={1.2} />
      )}
      {id === 'mapping' && (
        <mesh position={[0, -1.62, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.45 + phase * 0.8, 0.48 + phase * 0.8, 72]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.36 * (1 - phase * 0.4)} depthWrite={false} />
        </mesh>
      )}
      {id === 'security' && (
        <mesh position={[0.34, -1.02, -0.05]} rotation={[-Math.PI / 2, 0, phase * Math.PI * 2]}>
          <planeGeometry args={[1.35, 0.34]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.12} depthWrite={false} side={THREE.DoubleSide} />
        </mesh>
      )}
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
