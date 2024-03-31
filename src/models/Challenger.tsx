import * as THREE from 'three';

import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { RigidBody } from '@react-three/rapier';

type GLTFResult = GLTF & {
  nodes: {
    Challenger: THREE.Mesh;
  };
  materials: {
    Texture: THREE.MeshStandardMaterial;
  };
};

export function ChallengerModel(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/Challenger.glb') as GLTFResult;
  return (
    <RigidBody>
      <group rotation={[3, 3, 10]} {...props} dispose={null}>
        <mesh castShadow receiveShadow geometry={nodes.Challenger.geometry} material={materials.Texture} />
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/models/Challenger.glb');
