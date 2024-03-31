import {  RepeatWrapping } from 'three';

import { MeshReflectorMaterial, useTexture } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import moonIng from '../../../../public/textures/moon.jpg';
export const Ground = () => {
  const texture = useTexture(moonIng);

  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(111, 111);

  return (
    <RigidBody>
      <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          envMapIntensity={0}
          normalMap={texture}
          roughnessMap={texture}
          dithering={true}
          color={[0.015, 0.015, 0.015]}
          roughness={0.3}
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
    </RigidBody>
  );
};
