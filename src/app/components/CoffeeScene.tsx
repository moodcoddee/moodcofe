'use client';

import * as THREE from 'three';
import { useRef, useState, Suspense } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import {
  EffectComposer,
  DepthOfField,
  ToneMapping,
} from '@react-three/postprocessing';

type BeanProps = {
  index: number;
  z: number;
  speed: number;
};

function CoffeeBean({ index, z, speed }: BeanProps) {
  const ref = useRef<THREE.Group>(null!);
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z]);
  const { scene } = useGLTF('/coffee_bean.glb');

  const [data] = useState({
    y: THREE.MathUtils.randFloatSpread(height * 2),
    x: THREE.MathUtils.randFloatSpread(2),
    spin: THREE.MathUtils.randFloat(8, 12),
    rX: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  useFrame((state, dt) => {
    if (dt >= 0.1 || !ref.current) return;
    ref.current.position.set(
      index === 0 ? 0 : data.x * width,
      (data.y += dt * speed),
      -z
    );
    ref.current.rotation.set(
      (data.rX += dt / data.spin),
      Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI,
      (data.rZ += dt / data.spin)
    );
    if (data.y > height * (index === 0 ? 4 : 1)) {
      data.y = -(height * (index === 0 ? 4 : 1));
    }
  });

  return (
    <group ref={ref} scale={1 / 8}>
      <primitive object={scene.clone()} />
    </group>
  );
}

const easing = (x: number) => Math.sqrt(1 - Math.pow(x - 1, 2));

function Scene({
  speed,
  count,
  depth,
}: {
  speed: number;
  count: number;
  depth: number;
}) {
  // Preload inside Canvas so Suspense can catch it
  useGLTF('/coffee_bean.glb');

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <CoffeeBean
          key={i}
          index={i}
          z={Math.round(easing(i / count) * depth)}
          speed={speed}
        />
      ))}
      <EffectComposer enableNormalPass={false} multisampling={0}>
        <DepthOfField
          target={[0, 0, 60]}
          focalLength={1.7}
          bokehScale={12}
          height={800}
        />
        <ToneMapping />
      </EffectComposer>
    </>
  );
}

export default function CoffeeScene({
  speed = 0.6,
  count = 80,
  depth = 80,
}: {
  speed?: number;
  count?: number;
  depth?: number;
}) {
  return (
    <Canvas
      flat
      gl={{ antialias: false }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 10], fov: 10, near: 0.4, far: depth + 5 }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      frameloop="always"
    >
      <color attach="background" args={['#feae25']} />
      <Suspense fallback={null}>
        <Scene speed={speed} count={count} depth={depth} />
        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload('/coffee_bean.glb');
