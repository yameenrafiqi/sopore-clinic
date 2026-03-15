'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

/* ── Shared materials ─────────────────────────────────────── */
const BLUE  = '#0A84FF';
const CYAN  = '#00d4ff';
const WHITE = '#e8f4ff';

/* ── Spine Vertebra — stacked disc + cylinder ─────────────── */
function Vertebra({ position }: { position: [number, number, number] }) {
  const grp = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (grp.current) {
      grp.current.rotation.y = s.clock.elapsedTime * 0.18;
      grp.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.3) * 0.15;
    }
  });
  return (
    <Float speed={1.2} floatIntensity={1.4} rotationIntensity={0.3}>
      <group ref={grp} position={position}>
        {/* Main vertebra body */}
        <mesh>
          <cylinderGeometry args={[0.55, 0.55, 0.28, 28]} />
          <meshStandardMaterial color={WHITE} transparent opacity={0.22} wireframe emissive={BLUE} emissiveIntensity={0.5} />
        </mesh>
        {/* Spinous process (back spike) */}
        <mesh position={[0.7, 0, 0]}>
          <boxGeometry args={[0.6, 0.16, 0.16]} />
          <meshStandardMaterial color={CYAN} transparent opacity={0.3} wireframe emissive={CYAN} emissiveIntensity={0.6} />
        </mesh>
        {/* Transverse processes */}
        <mesh position={[0, 0, 0.65]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.05, 0.5, 8]} />
          <meshStandardMaterial color={CYAN} transparent opacity={0.35} wireframe emissive={CYAN} emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0, 0, -0.65]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.05, 0.5, 8]} />
          <meshStandardMaterial color={CYAN} transparent opacity={0.35} wireframe emissive={CYAN} emissiveIntensity={0.5} />
        </mesh>
        {/* Intervertebral disc */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.1, 28]} />
          <meshStandardMaterial color={BLUE} transparent opacity={0.18} wireframe emissive={BLUE} emissiveIntensity={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

/* ── Medical Cross ────────────────────────────────────────── */
function MedicalCross({ position }: { position: [number, number, number] }) {
  const grp = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (grp.current) {
      grp.current.rotation.z = s.clock.elapsedTime * 0.22;
      grp.current.rotation.y = s.clock.elapsedTime * 0.1;
    }
  });
  return (
    <Float speed={1.8} floatIntensity={2} rotationIntensity={0.2}>
      <group ref={grp} position={position}>
        {/* Horizontal bar */}
        <mesh>
          <boxGeometry args={[2.2, 0.55, 0.22]} />
          <meshStandardMaterial color={BLUE} transparent opacity={0.35} emissive={BLUE} emissiveIntensity={0.7} />
        </mesh>
        {/* Vertical bar */}
        <mesh>
          <boxGeometry args={[0.55, 2.2, 0.22]} />
          <meshStandardMaterial color={BLUE} transparent opacity={0.35} emissive={BLUE} emissiveIntensity={0.7} />
        </mesh>
        {/* Glow ring around cross */}
        <mesh>
          <torusGeometry args={[1.3, 0.04, 8, 60]} />
          <meshStandardMaterial color={CYAN} transparent opacity={0.5} emissive={CYAN} emissiveIntensity={1.2} />
        </mesh>
      </group>
    </Float>
  );
}

/* ── Pill / Capsule ───────────────────────────────────────── */
function Pill({ position }: { position: [number, number, number] }) {
  const grp = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (grp.current) {
      grp.current.rotation.z = s.clock.elapsedTime * 0.3;
      grp.current.rotation.x = Math.cos(s.clock.elapsedTime * 0.4) * 0.4;
    }
  });
  return (
    <Float speed={2.2} floatIntensity={1.8} rotationIntensity={0.6}>
      <group ref={grp} position={position}>
        {/* Capsule body */}
        <mesh>
          <capsuleGeometry args={[0.28, 0.9, 8, 16]} />
          <meshStandardMaterial color={CYAN} transparent opacity={0.28} wireframe emissive={CYAN} emissiveIntensity={0.6} />
        </mesh>
        {/* Center band */}
        <mesh>
          <cylinderGeometry args={[0.3, 0.3, 0.06, 20]} />
          <meshStandardMaterial color={WHITE} transparent opacity={0.5} emissive={WHITE} emissiveIntensity={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

/* ── Bone (femur-like) ────────────────────────────────────── */
function Bone({ position, rotation = [0, 0, 0] as [number, number, number] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  const grp = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (grp.current) {
      grp.current.rotation.y = rotation[1] + s.clock.elapsedTime * 0.14;
      grp.current.rotation.z = Math.sin(s.clock.elapsedTime * 0.25 + rotation[2]) * 0.12;
    }
  });
  return (
    <Float speed={1.4} floatIntensity={1.6} rotationIntensity={0.4}>
      <group ref={grp} position={position} rotation={rotation}>
        {/* Shaft */}
        <mesh>
          <cylinderGeometry args={[0.14, 0.14, 2.0, 14]} />
          <meshStandardMaterial color={WHITE} transparent opacity={0.25} wireframe emissive={BLUE} emissiveIntensity={0.45} />
        </mesh>
        {/* Top knob */}
        <mesh position={[0, 1.1, 0]}>
          <sphereGeometry args={[0.35, 14, 14]} />
          <meshStandardMaterial color={WHITE} transparent opacity={0.25} wireframe emissive={CYAN} emissiveIntensity={0.5} />
        </mesh>
        {/* Bottom knob */}
        <mesh position={[0, -1.1, 0]}>
          <sphereGeometry args={[0.3, 14, 14]} />
          <meshStandardMaterial color={WHITE} transparent opacity={0.25} wireframe emissive={CYAN} emissiveIntensity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

/* ── Stethoscope ring ─────────────────────────────────────── */
function StethoscopeRing({ position }: { position: [number, number, number] }) {
  const grp = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (grp.current) {
      grp.current.rotation.x = s.clock.elapsedTime * 0.15;
      grp.current.rotation.y = s.clock.elapsedTime * 0.2;
    }
  });
  return (
    <Float speed={1.6} floatIntensity={1.3} rotationIntensity={0.5}>
      <group ref={grp} position={position}>
        {/* Main tube loop */}
        <mesh>
          <torusGeometry args={[1.1, 0.08, 10, 60]} />
          <meshStandardMaterial color={CYAN} transparent opacity={0.4} emissive={CYAN} emissiveIntensity={0.7} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Chest piece disc */}
        <mesh position={[0, -1.1, 0]}>
          <cylinderGeometry args={[0.32, 0.32, 0.1, 24]} />
          <meshStandardMaterial color={BLUE} transparent opacity={0.5} emissive={BLUE} emissiveIntensity={0.8} metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Earpiece left */}
        <mesh position={[-0.7, 1.0, 0]} rotation={[0, 0, 0.5]}>
          <capsuleGeometry args={[0.07, 0.35, 6, 10]} />
          <meshStandardMaterial color={CYAN} transparent opacity={0.5} emissive={CYAN} emissiveIntensity={0.5} />
        </mesh>
        {/* Earpiece right */}
        <mesh position={[0.7, 1.0, 0]} rotation={[0, 0, -0.5]}>
          <capsuleGeometry args={[0.07, 0.35, 6, 10]} />
          <meshStandardMaterial color={CYAN} transparent opacity={0.5} emissive={CYAN} emissiveIntensity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

/* ── Floating particles ───────────────────────────────────── */
function ParticleField() {
  const count = 300;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 22;
    }
    return arr;
  }, []);
  const ref = useRef<THREE.Points>(null);
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.elapsedTime * 0.018;
      ref.current.rotation.x = s.clock.elapsedTime * 0.009;
    }
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color={CYAN} transparent opacity={0.45} sizeAttenuation />
    </points>
  );
}

/* ── Scene ────────────────────────────────────────────────── */
export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 52 }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance', stencil: false, depth: true }}
      frameloop="always"
      performance={{ min: 0.5 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[6, 6, 6]}   intensity={2}   color={BLUE} />
      <pointLight position={[-6, -4, -4]} intensity={1.2} color={CYAN} />
      <directionalLight position={[0, 8, 4]} intensity={0.6} color={WHITE} />

      <Stars radius={70} depth={40} count={600} factor={3} fade speed={0.4} />
      <ParticleField />

      {/* Medical Cross — hero centrepiece */}
      <MedicalCross position={[0, 0.5, -1]} />

      {/* Spine vertebrae — physiotherapy core */}
      <Vertebra position={[-5.5, 2.5, -3]} />
      <Vertebra position={[5.2, -1.5, -2]} />
      <Vertebra position={[-4.0, -2.8, -4]} />

      {/* Bones — relevant to physio */}
      <Bone position={[4.5, 2.8, -3]}  rotation={[0.3, 0, 0.5]} />
      <Bone position={[-3.5, 1.5, -5]} rotation={[0.1, 0.5, -0.3]} />
      <Bone position={[3.0, -3.2, -3]} rotation={[-0.2, 0.3, 0.8]} />

      {/* Stethoscope */}
      <StethoscopeRing position={[-5.0, -0.5, -2]} />
      <StethoscopeRing position={[4.8, 1.0, -5]} />

      {/* Pills */}
      <Pill position={[2.5, 3.5, -4]} />
      <Pill position={[-2.8, -3.2, -3]} />
    </Canvas>
  );
}
