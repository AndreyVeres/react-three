import * as THREE from 'three';

import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

type GLTFResult = GLTF & {
  nodes: {
    supports: THREE.Mesh;
    chassis: THREE.Mesh;
    helix: THREE.Mesh;
  };
  materials: {
    ['Material.004']: THREE.MeshPhysicalMaterial;
    ['Material.005']: THREE.MeshStandardMaterial;
  };
};

function easeOutQuad(x: any) {
  return 1 - (1 - x) * (1 - x);
}
export let turbo = 0;
export let controls: any = {};

window.addEventListener('keydown', (e) => {
  controls[e.key.toLowerCase()] = true;
});
window.addEventListener('keyup', (e) => {
  controls[e.key.toLowerCase()] = false;
});
let maxVelocity = 0.04;
let jawVelocity = 0;
let pitchVelocity = 0;
let planeSpeed = 0.006;
export const planePosition = new THREE.Vector3(0, 3, 7);
export function updatePlaneAxis(x: any, y: any, z: any, planePosition: any, camera: any) {
  jawVelocity *= 0.95;
  pitchVelocity *= 0.95;

  if (Math.abs(jawVelocity) > maxVelocity) jawVelocity = Math.sign(jawVelocity) * maxVelocity;

  if (Math.abs(pitchVelocity) > maxVelocity) pitchVelocity = Math.sign(pitchVelocity) * maxVelocity;

  if (controls['a']) {
    jawVelocity += 0.00025;
  }

  if (controls['d']) {
    jawVelocity -= 0.00025;
  }

  if (controls['w']) {
    pitchVelocity -= 0.00025;
  }

  if (controls['s']) {
    pitchVelocity += 0.00025;
  }

  if (controls['r']) {
    jawVelocity = 0;
    pitchVelocity = 0;
    turbo = 0;
    x.set(1, 0, 0);
    y.set(0, 1, 0);
    z.set(0, 0, 1);
    planePosition.set(0, 3, 7);
  }

  x.applyAxisAngle(z, jawVelocity);
  y.applyAxisAngle(z, jawVelocity);

  y.applyAxisAngle(x, pitchVelocity);
  z.applyAxisAngle(x, pitchVelocity);

  x.normalize();
  y.normalize();
  z.normalize();

  // plane position & velocity
  if (controls.shift) {
    turbo += 0.025;
  } else {
    turbo *= 0.95;
  }
  turbo = Math.min(Math.max(turbo, 0), 1);

  let turboSpeed = easeOutQuad(turbo) * 0.02;

  camera.fov = 45 + turboSpeed * 900;
  camera.updateProjectionMatrix();

  planePosition.add(z.clone().multiplyScalar(-planeSpeed - turboSpeed));
}
const x = new THREE.Vector3(1, 0, 0);
const y = new THREE.Vector3(0, 1, 0);
const z = new THREE.Vector3(0, 0, 1);

export function AirPlaneModel(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('public/models/airplane.glb') as GLTFResult;
  const groupRef = useRef<any>();
  const helixMeshRef = useRef<any>();

  useFrame(({ camera }) => {
    // planePosition.add(new THREE.Vector3(0, 0, -0.005));
    // console.log(planePosition)
    updatePlaneAxis(x, y, z, planePosition, camera);
    const rootMatrix = new THREE.Matrix4().makeBasis(x, y, z);
    const matrix = new THREE.Matrix4()
      .multiply(new THREE.Matrix4().makeTranslation(planePosition.x, planePosition.y, planePosition.z))
      .multiply(rootMatrix);

    groupRef.current.matrixAutoUpdate = false;
    groupRef.current.matrix.copy(matrix);
    groupRef.current.matrixWorldNeedsUpdate = true;

    const cameraMatrix = new THREE.Matrix4()
      .multiply(new THREE.Matrix4().makeTranslation(planePosition.x, planePosition.y, planePosition.z))
      .multiply(rootMatrix)
      .multiply(new THREE.Matrix4().makeRotationX(-0.3))
      .multiply(new THREE.Matrix4().makeTranslation(0, 0.015, 0.5));

    camera.matrixAutoUpdate = false;
    camera.matrix.copy(cameraMatrix);
    camera.matrixWorldNeedsUpdate = true;
    helixMeshRef.current.rotation.z -= 1.0;
  });
  return (
    <group ref={groupRef}>
      <group scale={0.01} {...props} dispose={null} rotation-y={Math.PI}>
        <mesh castShadow receiveShadow geometry={nodes.supports.geometry} material={materials['Material.004']} />
        <mesh castShadow receiveShadow geometry={nodes.chassis.geometry} material={materials['Material.005']} />
        <mesh castShadow receiveShadow geometry={nodes.helix.geometry} material={materials['Material.005']} ref={helixMeshRef} />
      </group>
    </group>
  );
}

useGLTF.preload('public/models/airplane.glb');
