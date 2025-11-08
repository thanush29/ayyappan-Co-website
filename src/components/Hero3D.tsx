import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function Building() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[2, 4, 2]} />
        <meshStandardMaterial color="#0047FF" metalness={0.6} roughness={0.4} />
      </mesh>

      <mesh position={[2.5, 0.8, 0]} castShadow>
        <boxGeometry args={[1.5, 3, 1.5]} />
        <meshStandardMaterial color="#7A00FF" metalness={0.6} roughness={0.4} />
      </mesh>

      <mesh position={[-2.5, 0.6, 0]} castShadow>
        <boxGeometry args={[1.2, 2.5, 1.2]} />
        <meshStandardMaterial color="#00C853" metalness={0.6} roughness={0.4} />
      </mesh>

      <mesh position={[0, 3.5, 0]}>
        <boxGeometry args={[0.1, 2, 0.1]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} />
      </mesh>

      <mesh position={[0, 5, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={1} />
      </mesh>

      {[-1, 1].map((x) =>
        [-0.8, 0.8].map((z) => (
          <mesh key={`${x}-${z}`} position={[x * 0.7, 1.5, z]} castShadow>
            <boxGeometry args={[0.3, 0.4, 0.3]} />
            <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
          </mesh>
        ))
      )}

      <mesh position={[0, -1, 0]} receiveShadow>
        <cylinderGeometry args={[4, 4, 0.2, 32]} />
        <meshStandardMaterial color="#333333" metalness={0.3} roughness={0.7} />
      </mesh>
    </group>
  );
}

function PowerLines() {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          child.position.y = Math.sin(state.clock.elapsedTime + i) * 0.05;
        }
      });
    }
  });

  return (
    <group ref={linesRef}>
      {[
        [-3, 0, -3],
        [3, 0, -3],
        [-3, 0, 3],
        [3, 0, 3],
      ].map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh position={[0, 1.5, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 3, 8]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          <mesh position={[0, 3, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.1, 8]} />
            <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.3} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function Hero3D() {
  return (
    <div className="w-full h-full">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 3, 10]} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />

        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#7A00FF" />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#00C853" />

        <Building />
        <PowerLines />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </Canvas>
    </div>
  );
}
