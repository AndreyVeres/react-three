import * as THREE from 'three';
import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { RigidBody } from '@react-three/rapier';
type GLTFResult = GLTF & {
  nodes: {
    Blackhole_core_Blackhole_core_0: THREE.Mesh;
    Blackhole_ring_Blackhole_ring_0: THREE.Mesh;
    Blackhole_skin_001_Blackhole_skin_0: THREE.Mesh;
    Blackhole_skin_002_Blackhole_core_0: THREE.Mesh;
    Blackhole_skin_003_Blackhole_skin_0: THREE.Mesh;
    Blackhole_skin_004_Blackhole_core_0: THREE.Mesh;
    Blackhole_skin_005_Blackhole_skin_0: THREE.Mesh;
    Blackhole_skin_006_Blackhole_skin_inner_0: THREE.Mesh;
    Blackhole_skin_007_Blackhole_core_0: THREE.Mesh;
    Blackhole_core001_Blackhole_core_0: THREE.Mesh;
    Blackhole_skin_008_Blackhole_skin_inner_0: THREE.Mesh;
    Blackhole_skin_009_Blackhole_skin_0: THREE.Mesh;
    Blackhole_skin_010_Blackhole_skin_0: THREE.Mesh;
    Blackhole_skin_011_Blackhole_core_0: THREE.Mesh;
    Blackhole_skin_012_Blackhole_skin_inner_0: THREE.Mesh;
    Blackhole_skin_013_Blackhole_ring2_0: THREE.Mesh;
    Blackhole_core002_Blackhole_ring2_0: THREE.Mesh;
  };
  materials: {
    Blackhole_core: THREE.MeshStandardMaterial;
    Blackhole_ring: THREE.MeshStandardMaterial;
    Blackhole_skin: THREE.MeshStandardMaterial;
    Blackhole_skin_inner: THREE.MeshStandardMaterial;
    Blackhole_ring2: THREE.MeshStandardMaterial;
  };
};

// type ActionName = 'Take 001';
// interface GLTFAction extends THREE.AnimationClip {
//   name: ActionName;
// }

export function BlackHoleModel(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF('/models/blackhole.glb') as GLTFResult;
  // const { actions } = useAnimations<GLTFAction>(animations as any, group);

  return (
    <RigidBody type='kinematicPosition'>
      <group ref={group} {...props} dispose={null}>
        <group name='Sketchfab_Scene'>
          <group name='Sketchfab_model' rotation={[-Math.PI / 2, 0, 0]} scale={0.016}>
            <group name='415c209837844e7b91255101a7c3eb67fbx' rotation={[Math.PI / 2, 0, 0]}>
              <group name='Object_2'>
                <group name='RootNode'>
                  <group name='Blackhole_core' rotation={[-Math.PI / 2, 0, 0]} scale={0.968}>
                    <mesh
                      name='Blackhole_core_Blackhole_core_0'
                      castShadow
                      receiveShadow
                      geometry={nodes.Blackhole_core_Blackhole_core_0.geometry}
                      material={materials.Blackhole_core}
                      scale={46.4}
                    />
                  </group>
                  <group name='Blackhole_ring' rotation={[-Math.PI / 2, 0, 0]}>
                    <mesh
                      name='Blackhole_ring_Blackhole_ring_0'
                      castShadow
                      receiveShadow
                      geometry={nodes.Blackhole_ring_Blackhole_ring_0.geometry}
                      material={materials.Blackhole_ring}
                      scale={195.369}
                    />
                  </group>
                  <group name='Blackhole_skin_001' rotation={[-Math.PI / 2, 0, 0]} scale={0.959}>
                    <mesh
                      name='Blackhole_skin_001_Blackhole_skin_0'
                      castShadow
                      receiveShadow
                      geometry={nodes.Blackhole_skin_001_Blackhole_skin_0.geometry}
                      material={materials.Blackhole_skin}
                      scale={66.308}
                    />
                  </group>
                  <group name='Blackhole_skin_002' rotation={[-Math.PI / 2, 0, 0]} scale={0.957}>
                    <mesh
                      name='Blackhole_skin_002_Blackhole_core_0'
                      castShadow
                      receiveShadow
                      geometry={nodes.Blackhole_skin_002_Blackhole_core_0.geometry}
                      material={materials.Blackhole_core}
                      scale={63.936}
                    />
                  </group>
                  <group name='Blackhole_skin_003' rotation={[-Math.PI / 2, 0, 0]} scale={0.91}>
                    <mesh
                      name='Blackhole_skin_003_Blackhole_skin_0'
                      castShadow
                      receiveShadow
                      geometry={nodes.Blackhole_skin_003_Blackhole_skin_0.geometry}
                      material={materials.Blackhole_skin}
                      scale={65.34}
                    />
                  </group>
                  <group name='Blackhole_skin_004' rotation={[-Math.PI / 2, 0, 0]} scale={0.908}>
                    <mesh
                      name='Blackhole_skin_004_Blackhole_core_0'
                      castShadow
                      receiveShadow
                      geometry={nodes.Blackhole_skin_004_Blackhole_core_0.geometry}
                      material={materials.Blackhole_core}
                      scale={63.859}
                    />
                  </group>
                  <group name='Blackhole_skin_005' rotation={[-Math.PI / 2, 0, 0.96]} scale={0.9}>
                    <mesh
                      name='Blackhole_skin_005_Blackhole_skin_0'
                      castShadow
                      receiveShadow
                      geometry={nodes.Blackhole_skin_005_Blackhole_skin_0.geometry}
                      material={materials.Blackhole_skin}
                      scale={64.281}
                    />
                  </group>
                  <group name='Blackhole_skin_006' rotation={[-Math.PI / 2, 0, -2.007]} scale={0.864}>
                    <mesh
                      name='Blackhole_skin_006_Blackhole_skin_inner_0'
                      castShadow
                      receiveShadow
                      geometry={nodes.Blackhole_skin_006_Blackhole_skin_inner_0.geometry}
                      material={materials.Blackhole_skin_inner}
                      scale={63.936}
                    />
                  </group>
                  <group name='Blackhole_skin_007' rotation={[-Math.PI / 2, 0, -2.007]} scale={0.866}>
                    <mesh
                      name='Blackhole_skin_007_Blackhole_core_0'
                      castShadow
                      receiveShadow
                      geometry={nodes.Blackhole_skin_007_Blackhole_core_0.geometry}
                      material={materials.Blackhole_core}
                      scale={63.936}
                    />
                  </group>
                  <group name='Blackhole_core001' rotation={[-Math.PI / 2, 0, 0]}>
                    <mesh
                      name='Blackhole_core001_Blackhole_core_0'
                      castShadow
                      receiveShadow
                      geometry={nodes.Blackhole_core001_Blackhole_core_0.geometry}
                      material={materials.Blackhole_core}
                      scale={49.391}
                    />
                  </group>
                  <group name='Blackhole_skin_008' rotation={[-Math.PI / 2, 0, 0.087]} scale={0.845}>
                    <mesh
                      name='Blackhole_skin_008_Blackhole_skin_inner_0'
                      castShadow
                      receiveShadow
                      geometry={nodes.Blackhole_skin_008_Blackhole_skin_inner_0.geometry}
                      material={materials.Blackhole_skin_inner}
                      scale={62.21}
                    />
                  </group>
                  <group name='Blackhole_skin_009' rotation={[-Math.PI / 2, 0, -0.611]} scale={0.887}>
                    <mesh
                      name='Blackhole_skin_009_Blackhole_skin_0'
                      castShadow
                      receiveShadow
                      geometry={nodes.Blackhole_skin_009_Blackhole_skin_0.geometry}
                      material={materials.Blackhole_skin}
                      scale={63.936}
                    />
                  </group>
                  <group name='Blackhole_skin_010' rotation={[-Math.PI / 2, 0, -2.531]} scale={0.929}>
                    <mesh
                      name='Blackhole_skin_010_Blackhole_skin_0'
                      castShadow
                      receiveShadow
                      geometry={nodes.Blackhole_skin_010_Blackhole_skin_0.geometry}
                      material={materials.Blackhole_skin}
                      scale={65.788}
                    />
                  </group>
                  <group name='Blackhole_skin_011' rotation={[-Math.PI / 2, 0, -2.531]} scale={0.928}>
                    <mesh
                      name='Blackhole_skin_011_Blackhole_core_0'
                      castShadow
                      receiveShadow
                      geometry={nodes.Blackhole_skin_011_Blackhole_core_0.geometry}
                      material={materials.Blackhole_core}
                      scale={64.243}
                    />
                  </group>
                  <group name='Blackhole_skin_012' rotation={[-Math.PI / 2, 0, 2.094]} scale={0.856}>
                    <mesh
                      name='Blackhole_skin_012_Blackhole_skin_inner_0'
                      castShadow
                      receiveShadow
                      geometry={nodes.Blackhole_skin_012_Blackhole_skin_inner_0.geometry}
                      material={materials.Blackhole_skin_inner}
                      scale={62.21}
                    />
                  </group>
                  <group name='Blackhole_skin_013' rotation={[-Math.PI / 2, 0, -2.967]} scale={0.835}>
                    <mesh
                      name='Blackhole_skin_013_Blackhole_ring2_0'
                      castShadow
                      receiveShadow
                      geometry={nodes.Blackhole_skin_013_Blackhole_ring2_0.geometry}
                      material={materials.Blackhole_ring2}
                      scale={61.101}
                    />
                  </group>
                  <group name='Blackhole_core002' rotation={[-Math.PI / 2, 0, 0]} scale={0.928}>
                    <mesh
                      name='Blackhole_core002_Blackhole_ring2_0'
                      castShadow
                      receiveShadow
                      geometry={nodes.Blackhole_core002_Blackhole_ring2_0.geometry}
                      material={materials.Blackhole_ring2}
                      scale={48.72}
                    />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/models/blackhole.glb');
