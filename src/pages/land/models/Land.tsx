import * as THREE from 'three';
import { useMemo } from 'react';
import { MeshReflectorMaterial, useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    landscape_gltf: THREE.Mesh;
    landscape_borders: THREE.Mesh;
    trees_light: THREE.Mesh;
    walls: THREE.Mesh;
    water: THREE.Mesh;
    water1: THREE.Mesh;
    water2: THREE.Mesh;
    lights: THREE.Mesh;
  };
  materials: {
    ['Material.009']: THREE.MeshStandardMaterial;
    ['Material.010']: THREE.MeshStandardMaterial;
    ['Material.008']: THREE.MeshStandardMaterial;
    Water: THREE.MeshStandardMaterial;
    ['Material.001']: THREE.MeshStandardMaterial;
  };
};

export function LandModel(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('public/models/land.glb') as GLTFResult;

  const [lightsMaterial, waterMaterial] = useMemo(() => {
    return [
      new THREE.MeshStandardMaterial({
        envMapIntensity: 0,
        color: new THREE.Color('#ea6619'),
        roughness: 0,
        metalness: 0,
        emissive: new THREE.Color('#f6390f').multiplyScalar(1),
      }),
      <MeshReflectorMaterial
        transparent={true}
        opacity={0.6}
        color={'#23281b'}
        roughness={0}
        blur={[10, 10]} // Blur ground reflections (width, height), 0 skips blur
        mixBlur={1} // How much blur mixes with surface roughness (default = 1)
        mixStrength={20} // Strength of the reflections
        mixContrast={1.2} // Contrast of the reflections
        resolution={512} // Off-buffer resolution, lower=faster, higher=better quality, slower
        mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
        depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
        minDepthThreshold={0} // Lower edge for the depthTexture interpolation (default = 0)
        maxDepthThreshold={0.1} // Upper edge for the depthTexture interpolation (default = 0)
        depthToBlurRatioBias={0.0025} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
        reflectorOffset={0.0} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
      />,

      <MeshReflectorMaterial
        transparent={true}
        opacity={0.5}
        color={'#23281b'}
        mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
      />,
    ];
  }, []);

  return (
    <group castShadow receiveShadow {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.landscape_gltf.geometry} material={materials['Material.009']}>
        {/* {myMaterial} */}
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes.landscape_borders.geometry} material={materials['Material.010']} />
      <mesh castShadow receiveShadow geometry={nodes.trees_light.geometry} material={materials['Material.008']} />

      <mesh castShadow receiveShadow geometry={nodes.water.geometry} material={materials.Water}>
        {waterMaterial}
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes.water1.geometry} material={materials.Water}>
        {waterMaterial}
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes.water2.geometry} material={materials.Water}>
        {waterMaterial}
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes.lights.geometry} material={lightsMaterial} />
    </group>
  );
}

useGLTF.preload('public/models/land.glb');
