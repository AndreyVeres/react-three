import { PerspectiveCamera, PointerLockControls, useKeyboardControls } from '@react-three/drei';
import { CapsuleCollider, RigidBody } from '@react-three/rapier';
import React, { useRef } from 'react';
import { useInput } from '../../../hooks/useControls';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
const MOVE_SPEED = 5;
const JUMP_FORCE = 10;
const direction = new Vector3();
const frontVector = new Vector3();
const sideVector = new Vector3();
const INTERACT_CUBE_DISTANCE = 2;

export const Viewer = () => {
  const { forward, backward, left, right } = useInput();
  const bodyRef = useRef<any>();

  useFrame(({ camera }) => {
    if (!bodyRef.current) return;

    const velocity = bodyRef.current.linvel();

    frontVector.set(0, 0, +backward - +forward);
    sideVector.set(+left - +right, 0, 0);
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(1).applyEuler(camera.rotation);
    bodyRef.current.wakeUp();
    bodyRef.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });
    // const grounded = Math.floor(bodyRef.current.translation().y) <= 1.2;

    const { x, y, z } = bodyRef.current.translation();
    camera.position.set(x, y, z);
  });
  return (
    <>
      <PointerLockControls makeDefault />
      {/* <PerspectiveCamera/> */}
      <RigidBody ref={bodyRef} scale={0.2} rotation={[0, 0, 0]} mass={1} lockRotations position={[0, 15, 0]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.5, 0.5]} />
          <CapsuleCollider args={[0.75, 0.5]} />
        </mesh>
      </RigidBody>
    </>
  );
};
