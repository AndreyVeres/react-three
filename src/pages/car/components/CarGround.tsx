import { MeshReflectorMaterial } from '@react-three/drei';
import { LinearEncoding } from '@react-three/drei/helpers/deprecated';
import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect } from 'react';
import { RepeatWrapping, TextureLoader } from 'three';

export const CarGround = () => {
  const [normal, roughness] = useLoader(TextureLoader, ['/textures/terrain-normal.jpg', '/textures/terrain-roughness.jpg']);
  useEffect(() => {
    [normal, roughness].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(5, 5);
      t.offset.set(0, 0);
    });

    (normal as any).encoding = LinearEncoding;
  }, [normal, roughness]);

  useFrame((state) => {
    let t = -state.clock.getElapsedTime() * 0.128;
    roughness.offset.set(0, t % 1);
    normal.offset.set(0, t % 1);
  });
  return (
    <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
      <planeGeometry args={[50, 50]} />
      <MeshReflectorMaterial
        envMapIntensity={0}
        normalMap={normal}
        roughnessMap={roughness}
        dithering={true}
        color={[0.015, 0.015, 0.015]}
        roughness={0.7}
        blur={[1000, 400]}
        mixBlur={30}
        mixStrength={80}
        mixContrast={1}
        resolution={1024}
        mirror={0}
        depthScale={0.01}
        minDepthThreshold={0.9}
        maxDepthThreshold={1}
        depthToBlurRatioBias={0.25}
      />
    </mesh>
  );
};
