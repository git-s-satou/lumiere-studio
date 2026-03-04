"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Particles mesh ───────────────────────────────────────── */
function Particles({ count }: { count: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  // Generate particle positions
  const [positions, basePositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 6;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;
    }
    return [pos, base];
  }, [count]);

  // Randomized sizes for variation
  const sizes = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      s[i] = Math.random() * 2 + 0.5;
    }
    return s;
  }, [count]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const geometry = meshRef.current.geometry;
    const posAttr = geometry.attributes.position;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Gentle floating motion
      posAttr.array[i3]     = basePositions[i3]     + Math.sin(time * 0.3 + i * 0.1) * 0.15;
      posAttr.array[i3 + 1] = basePositions[i3 + 1] + Math.cos(time * 0.2 + i * 0.15) * 0.15;
      posAttr.array[i3 + 2] = basePositions[i3 + 2] + Math.sin(time * 0.15 + i * 0.05) * 0.1;

      // Mouse influence (subtle)
      const dx = mouseRef.current.x * viewport.width * 0.5 - posAttr.array[i3];
      const dy = mouseRef.current.y * viewport.height * 0.5 - posAttr.array[i3 + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3) {
        const force = (1 - dist / 3) * 0.03;
        posAttr.array[i3]     += dx * force;
        posAttr.array[i3 + 1] += dy * force;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={2}
        sizeAttenuation
        transparent
        opacity={0.4}
        color="#c8a45c"
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Canvas wrapper ───────────────────────────────────────── */
export default function ParticleBackground() {
  const [count, setCount] = useState(600);

  useEffect(() => {
    // Reduce particles on mobile
    if (window.innerWidth < 768) {
      setCount(300);
    }
  }, []);

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Particles count={count} />
      </Canvas>
    </div>
  );
}
