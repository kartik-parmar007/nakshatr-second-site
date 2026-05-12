'use client';

import { Component, Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { industryScenes } from './industryScenes';

// ─── Utilities ────────────────────────────────────────────────────────────────

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

// ─── Drone position per scene ─────────────────────────────────────────────────
// Each path reflects the real drone job — slow, deliberate, physically grounded.

function getDronePosition(id, phase, isMobile) {
  const t = smooth(phase);
  const xs = isMobile ? 0.58 : 1;
  const zs = isMobile ? 0.72 : 1;

  switch (id) {
    case 'intro':
      // Gentle reveal glide from left to centre
      return new THREE.Vector3(
        (-2.2 + t * 2.4) * xs,
        0.15 + Math.sin(t * Math.PI) * 0.28,
        (0.4 - t * 0.55) * zs
      );

    case 'agriculture':
      // Steady low-altitude scanning lane — crops below
      return pointAt([
        [-3.4 * xs,  0.14, -0.85 * zs],
        [-1.1 * xs,  0.10, -0.72 * zs],
        [ 1.4 * xs,  0.12, -0.44 * zs],
        [ 3.2 * xs,  0.22, -0.08 * zs],
      ], phase);

    case 'inspection': {
      // Slow arc with a natural pause mid-orbit for sensor read
      const pausedT = phase > 0.38 && phase < 0.62 ? 0.5 : t;
      const a = -0.28 + pausedT * Math.PI * 1.3;
      return new THREE.Vector3(
        Math.cos(a) * 1.9 * xs - 0.2,
        0.44 + Math.sin(t * Math.PI) * 0.15,
        Math.sin(a) * 0.95 * zs
      );
    }

    case 'response':
      // Methodical search grid — terrain sweep
      return pointAt([
        [-2.8 * xs, 0.35, -0.85 * zs],
        [-0.9 * xs, 0.40,  0.65 * zs],
        [ 0.9 * xs, 0.36, -0.55 * zs],
        [ 2.8 * xs, 0.42,  0.48 * zs],
      ], phase);

    case 'logistics':
      // Purposeful elevated route between delivery points
      return pointAt([
        [-3.2 * xs, 0.68,  0.75 * zs],
        [-1.1 * xs, 0.82,  0.15 * zs],
        [ 1.0 * xs, 0.70, -0.22 * zs],
        [ 3.2 * xs, 0.58, -0.95 * zs],
      ], phase);

    case 'mapping':
      // Slow survey sine pass — narrower amplitude for realism
      return new THREE.Vector3(
        Math.sin(t * Math.PI * 2.2) * 1.6 * xs,
        0.50,
        (-1.1 + t * 2.2) * zs
      );

    case 'security': {
      // Controlled perimeter patrol with smooth eased corners
      const p = t * 2.8;
      const side = Math.floor(p);
      const u = smooth(p - side);
      const pts = [
        new THREE.Vector3(-2.4 * xs, 0.40, -0.95 * zs),
        new THREE.Vector3( 2.4 * xs, 0.40, -0.95 * zs),
        new THREE.Vector3( 2.4 * xs, 0.40,  0.85 * zs),
        new THREE.Vector3(-2.4 * xs, 0.40,  0.85 * zs),
      ];
      return pts[side % 4].clone().lerp(pts[(side + 1) % 4], u);
    }

    case 'final':
      // Slow drift to centre — contemplative reveal
      return new THREE.Vector3(
        (1.0 - t * 1.0) * xs,
        0.20 + Math.sin(t * Math.PI) * 0.10,
        (-0.18 - t * 0.22) * zs
      );

    default:
      return new THREE.Vector3(0, 0.35, 0);
  }
}

// ─── Error boundary ───────────────────────────────────────────────────────────

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
    if (this.state.failed) return null;
    return this.props.children;
  }
}

// ─── Drone mesh ───────────────────────────────────────────────────────────────

function LoadedDrone({ scene }) {
  const gltf = useGLTF(scene.modelPath, false, false);

  const object = useMemo(() => {
    const clone = gltf.scene.clone(true);

    clone.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow = true;
      child.receiveShadow = false;

      if (child.material) {
        child.material = child.material.clone();
        // Slightly more metallic / less rough → cleaner cinematic look
        child.material.roughness  = Math.max(child.material.roughness  ?? 0.48, 0.38);
        child.material.metalness  = Math.max(child.material.metalness  ?? 0.32, 0.28);
        child.material.envMapIntensity = 0.6;
      }
    });

    // Centre and scale to scene.modelScale
    const box = new THREE.Box3().setFromObject(clone);
    if (!box.isEmpty()) {
      const center = new THREE.Vector3();
      const size   = new THREE.Vector3();
      box.getCenter(center);
      box.getSize(size);
      const maxAxis  = Math.max(size.x, size.y, size.z) || 1;
      const fitScale = scene.modelScale / maxAxis;
      clone.position.set(-center.x * fitScale, -center.y * fitScale, -center.z * fitScale);
      clone.scale.setScalar(fitScale);
    }

    return clone;
  }, [gltf.scene, scene.modelScale]);

  return <primitive object={object} rotation={scene.modelRotation} />;
}

// ─── DroneActor — motion + floating ──────────────────────────────────────────

function DroneActor({ scene, phase, isMobile }) {
  const groupRef = useRef();
  const rotorRef = useRef();

  useFrame((state) => {
    const target = getDronePosition(scene.id, phase, isMobile);

    if (groupRef.current) {
      // Cinematic inertia — 0.032 gives smooth deceleration
      groupRef.current.position.lerp(target, 0.032);

      // Scene-specific banking — very subtle, physically plausible
      const bank =
        scene.id === 'agriculture' ? Math.sin(phase * Math.PI * 1.4) * 0.055 :
        scene.id === 'logistics'   ? -0.045 :
        scene.id === 'security'    ? Math.sin(phase * Math.PI * 1.8) * 0.038 :
        Math.sin(phase * Math.PI * 1.2) * 0.032;

      const pitch =
        scene.id === 'logistics' ? -0.038 :
        scene.id === 'response'  ? -0.022 : 0;

      // Barely-perceptible yaw drift — premium idle behaviour
      groupRef.current.rotation.y = scene.modelRotation[1]
        + Math.sin(state.clock.elapsedTime * 0.22) * 0.042;
      groupRef.current.rotation.x = pitch;
      groupRef.current.rotation.z = bank;

      // Micro-hover bob — real drones stabilise, not sway wildly
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 1.2) * 0.0008;
    }

    if (rotorRef.current) {
      // Moderate spin visible but not toy-fast
      rotorRef.current.rotation.y = state.clock.elapsedTime * 2.1;
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={rotorRef}>
        <ModelErrorBoundary key={scene.modelPath} path={scene.modelPath}>
          <Suspense fallback={null}>
            <LoadedDrone scene={scene} />
          </Suspense>
        </ModelErrorBoundary>
      </group>
    </group>
  );
}

// ─── Camera ───────────────────────────────────────────────────────────────────

function SceneCamera({ progress }) {
  const lookRef = useRef(new THREE.Vector3());

  useFrame(({ camera }) => {
    const state = getSceneState(progress);
    const from  = industryScenes[state.cameraIndex];
    const to    = industryScenes[state.nextIndex];

    const cameraTarget = vectorFrom(from.camera).lerp(vectorFrom(to.camera), state.cameraT);
    const lookTarget   = vectorFrom(from.lookAt).lerp(vectorFrom(to.lookAt), state.cameraT);

    // Slow cinematic glide — 0.028 avoids any jarring snap
    camera.position.lerp(cameraTarget, 0.028);
    lookRef.current.lerp(lookTarget, 0.028);
    camera.lookAt(lookRef.current);
    camera.updateProjectionMatrix();
  });

  return null;
}

// ─── World — ONLY drone + lights + camera ─────────────────────────────────────

function HomeWorld({ progress, isMobile }) {
  const state = getSceneState(progress);
  const scene = industryScenes[state.activeIndex];

  return (
    <>
      {/* Soft key light from upper right — main illumination */}
      <ambientLight intensity={1.1} />
      <directionalLight
        position={[3.5, 4.5, 4]}
        intensity={1.55}
        color="#ffffff"
        castShadow={false}
      />
      {/* Subtle cool fill from left — rim definition */}
      <directionalLight
        position={[-3, 2.5, 1.5]}
        intensity={0.38}
        color="#e8f4ff"
      />
      {/* Warm under-bounce — lifts shadows, avoids black underside */}
      <directionalLight
        position={[0, -2, 2]}
        intensity={0.18}
        color="#fff8f0"
      />
      <SceneCamera progress={progress} />
      <DroneActor scene={scene} phase={state.phase} isMobile={isMobile} />
    </>
  );
}

// ─── Canvas ───────────────────────────────────────────────────────────────────

export default function HomeDroneCanvas({ progress, isMobile }) {
  return (
    <Canvas
      camera={{ position: [0, 1.6, 5.5], fov: isMobile ? 46 : 42, near: 0.1, far: 60 }}
      dpr={isMobile ? [1, 1.2] : [1, 1.65]}
      gl={{
        antialias: !isMobile,
        alpha: true,
        premultipliedAlpha: false,
        powerPreference: 'high-performance',
      }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <HomeWorld progress={progress} isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
}
