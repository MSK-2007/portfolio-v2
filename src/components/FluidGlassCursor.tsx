/* eslint-disable react/no-unknown-property */
"use client";

import * as THREE from 'three';
import { useRef, useState, useEffect, memo } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import { useFBO, useGLTF, MeshTransmissionMaterial } from '@react-three/drei';
import { easing } from 'maath';

// ── Preload the model so there's no stutter on first render ──
useGLTF.preload('/assets/3d/lens.glb');

/**
 * Inner 3D lens that follows the pointer.
 * Uses an FBO (frame-buffer object) to capture a dark scene,
 * which gives the MeshTransmissionMaterial something to refract
 * (prevents the solid-black-disc problem from a plain transparent canvas).
 */
const LensMesh = memo(function LensMesh({
  scale       = 0.8,
  ior         = 1.18,
  thickness   = 6,
  anisotropy  = 0.05,
  chromaticAberration = 0.12,
}: {
  scale?: number;
  ior?: number;
  thickness?: number;
  anisotropy?: number;
  chromaticAberration?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { nodes }   = useGLTF('/assets/3d/lens.glb') as any;
  const buffer      = useFBO();
  const { viewport } = useThree();

  // Off-screen scene: a dark plane that matches our site bg
  const [bgScene] = useState(() => {
    const s    = new THREE.Scene();
    const geo  = new THREE.PlaneGeometry(200, 200);
    const mat  = new THREE.MeshBasicMaterial({ color: '#080808' });
    s.add(new THREE.Mesh(geo, mat));
    return s;
  });

  useFrame((state, delta) => {
    const { gl, viewport: vp, pointer, camera } = state;
    const v = vp.getCurrentViewport(camera, [0, 0, 15]);

    // Smooth pointer follow
    easing.damp3(
      meshRef.current.position,
      [(pointer.x * v.width) / 2, (pointer.y * v.height) / 2, 15],
      0.13,
      delta,
    );

    // Render bg scene into FBO so the glass has something to refract
    gl.setRenderTarget(buffer);
    gl.render(bgScene, camera);
    gl.setRenderTarget(null);
  });

  return (
    <>
      {/* Full-screen plane showing the FBO texture (the dark bg) */}
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>

      {/* The glass lens mesh */}
      <mesh
        ref={meshRef}
        scale={scale}
        rotation-x={Math.PI / 2}
        geometry={nodes?.Cylinder?.geometry}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior}
          thickness={thickness}
          anisotropy={anisotropy}
          chromaticAberration={chromaticAberration}
          transmission={1}
          roughness={0.04}
          transparent
        />
      </mesh>
    </>
  );
});

/**
 * FluidGlassCursor — drop-in replacement for the old FluidCursor.
 * Renders a fixed full-viewport WebGL canvas (pointer-events: none)
 * with the lens glass effect following the mouse.
 */
export default function FluidGlassCursor() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Keep the native cursor hidden site-wide
    document.body.style.cursor = 'none';
    return () => { document.body.style.cursor = ''; };
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 20], fov: 15 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 10]} intensity={1.5} />
        <LensMesh
          scale={0.8}
          ior={1.18}
          thickness={6}
          anisotropy={0.05}
          chromaticAberration={0.12}
        />
      </Canvas>
    </div>
  );
}
