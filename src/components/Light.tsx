import { useHelper } from '@react-three/drei';
import { useRef } from 'react';
import { DirectionalLight, DirectionalLightHelper } from 'three';
const shadowOffset = 500;

export const Light = () => {
  const lightRef = useRef<DirectionalLight>(null!);
    useHelper(lightRef, DirectionalLightHelper, 5, 'red');
  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight
        castShadow
        ref={lightRef}
        intensity={5}
        shadow-mapSize={4096}
        shadow-camera-top={shadowOffset}
        shadow-camera-bottom={-shadowOffset}
        shadow-camera-left={shadowOffset}
        shadow-camera-right={-shadowOffset}
        position={[-300, 300, 0]}
      />
    </>
  );
};
