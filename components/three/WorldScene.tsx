"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "@/lib/scrollState";

const OLIVE = new THREE.Color("#5c6b3d");
const GOLD = new THREE.Color("#c8b040");

/** A living ribbon of sound: a wide plane displaced by layered sines in a shader. */
function SoundRibbon() {
  const matRef = useRef<THREE.ShaderMaterial>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const smooth = useRef({ scale: 0.6, px: 0, py: 0 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uAmp: { value: 1 },
      uPulse: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: OLIVE.clone() },
      uColorB: { value: GOLD.clone() },
      uIntensity: { value: 1 },
    }),
    []
  );

  useFrame((_, delta) => {
    if (typeof document !== "undefined" && document.hidden) return;
    const m = matRef.current;
    const g = groupRef.current;
    if (!m || !g) return;

    // decay the now-playing pulse
    scrollState.pulse *= 0.94;

    const p = scrollState.progress;
    m.uniforms.uTime.value += delta;
    m.uniforms.uProgress.value += (p - m.uniforms.uProgress.value) * 0.08;
    m.uniforms.uPulse.value += (scrollState.pulse - m.uniforms.uPulse.value) * 0.2;
    m.uniforms.uIntensity.value += (scrollState.intensity - m.uniforms.uIntensity.value) * 0.05;

    smooth.current.px += (scrollState.pointerX - smooth.current.px) * 0.04;
    smooth.current.py += (scrollState.pointerY - smooth.current.py) * 0.04;
    m.uniforms.uPointer.value.set(smooth.current.px, smooth.current.py);

    // The ribbon is the hero object: present immediately, then calmer as the story continues.
    const targetScale = 0.86 + Math.sin(Math.min(p, 1) * Math.PI) * 0.28 + p * 0.08;
    smooth.current.scale += (targetScale - smooth.current.scale) * 0.06;
    g.scale.setScalar(smooth.current.scale);
    g.rotation.z = smooth.current.px * 0.08;
    g.rotation.x = -0.14 + smooth.current.py * 0.06;
    g.position.y = -0.25 - p * 0.45 + smooth.current.py * 0.32;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <planeGeometry args={[28, 5.6, 260, 10]} />
        <shaderMaterial
          ref={matRef}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
          vertexShader={`
            uniform float uTime;
            uniform float uProgress;
            uniform float uAmp;
            uniform float uPulse;
            uniform vec2 uPointer;
            varying vec2 vUv;
            varying float vWave;
            void main() {
              vUv = uv;
              vec3 p = position;
              float x = position.x;
              float amp = uAmp * (0.5 + uProgress * 0.75) + uPulse * 0.45;
              float w =
                  sin(x * 0.55 + uTime * 0.8) * 0.55
                + sin(x * 1.25 - uTime * 1.05) * 0.30 * (0.3 + uProgress)
                + sin(x * 2.10 + uTime * 0.62) * 0.16 * uProgress
                + sin(x * 3.40 - uTime * 0.90) * 0.08 * uProgress;
              w *= amp;
              float pointerFall = exp(-pow(x - uPointer.x * 7.0, 2.0) * 0.04);
              w += uPointer.y * 0.5 * pointerFall;
              p.y += w;
              p.z += sin(x * 0.4 - uTime * 0.5) * 0.42 * (0.45 + uProgress);
              vWave = w;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
            }
          `}
          fragmentShader={`
            uniform vec3 uColorA;
            uniform vec3 uColorB;
            uniform float uProgress;
            uniform float uPulse;
            uniform float uIntensity;
            varying vec2 vUv;
            varying float vWave;
            void main() {
              float edge = abs(vUv.y - 0.5) * 2.0;
              float core = smoothstep(1.0, 0.0, edge);
              core = pow(core, 1.6);
              vec3 col = mix(uColorA, uColorB, clamp(0.45 + vWave * 0.55, 0.0, 1.0));
              col *= 1.0 + core * 1.25;
              float alpha = core * (0.42 + uProgress * 0.32 + uPulse * 0.18) * uIntensity;
              gl_FragColor = vec4(col, alpha);
            }
          `}
        />
      </mesh>
    </group>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const smooth = useRef({ z: 9, y: 0 });
  useFrame(() => {
    if (typeof document !== "undefined" && document.hidden) return;
    const p = scrollState.progress;
    const targetZ = 9 - Math.sin(Math.min(p, 1) * Math.PI) * 1.6;
    const targetY = scrollState.pointerY * 0.5 + p * 0.4;
    smooth.current.z += (targetZ - smooth.current.z) * 0.04;
    smooth.current.y += (targetY - smooth.current.y) * 0.04;
    camera.position.z = smooth.current.z;
    camera.position.y = smooth.current.y;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export function WorldScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.6]}
    >
      <ambientLight intensity={0.8} />
      <CameraRig />
      <SoundRibbon />
    </Canvas>
  );
}
