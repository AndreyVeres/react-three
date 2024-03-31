import { CapsuleCollider, RigidBody } from '@react-three/rapier';
import { Vector3 } from 'three';
import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls, useKeyboardControls } from '@react-three/drei';
import { useCubesStore } from '../../../store/cubesStore';

const MOVE_SPEED = 5;
const JUMP_FORCE = 10;
const direction = new Vector3();
const frontVector = new Vector3();
const sideVector = new Vector3();
const INTERACT_CUBE_DISTANCE = 2;

export const FirstPerson = () => {
  const [sub, get] = useKeyboardControls();
  const bodyRef = useRef<any>();
  const [moveSpeed, setMoveSpeed] = useState(MOVE_SPEED);
  const { addCube, removeCube, cubes, selectedTexture } = useCubesStore((state) => state);
  const { camera } = useThree();

  const isLookingAtCube = (cubePosition: Vector3, cameraPosition: Vector3, cameraDirection: Vector3): boolean => {
    const directionToCube = new Vector3().copy(cubePosition).sub(cameraPosition).normalize();

    // Если куб находится впереди камеры (по направлению взгляда) и на расстоянии менее пороговой дистанции, то считаем, что вы смотрите на куб
    return cubePosition.distanceTo(cameraPosition) < INTERACT_CUBE_DISTANCE && directionToCube.dot(cameraDirection) > 0.9; // dot product близок к 1, если вектора близки по направлению
  };

  const getCubeSpawnPos = () => {
    const cameraPosition = new Vector3();
    camera.getWorldPosition(cameraPosition);

    // Получение направления взгляда
    const cameraDirection = new Vector3();
    camera.getWorldDirection(cameraDirection);

    // console.log(cameraDirection);
    // Вычисление позиции перед камерой
    const spawnPosition = cameraPosition.clone().add(cameraDirection.clone().multiplyScalar(INTERACT_CUBE_DISTANCE));
    return spawnPosition;
  };

  useEffect(() => {
    return sub(
      (state) => {
        return state.addCube;
      },
      (pressed) => {
        if (pressed) {
          addCube({
            pos: [...getCubeSpawnPos()],
            texture: selectedTexture,
            id: Date.now(),
          });
        }
      }
    );
  }, [selectedTexture]);

  useFrame(() => {
    if (!bodyRef.current) return;
    const { forward, backward, left, right, jump, moveSpeed: move, drag, remove } = get();

    if (move) {
      setMoveSpeed(MOVE_SPEED * 2.5);
    } else {
      setMoveSpeed(MOVE_SPEED);
    }
    const velocity = bodyRef.current.linvel();

    frontVector.set(0, 0, +backward - +forward);
    sideVector.set(+left - +right, 0, 0);
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(moveSpeed).applyEuler(camera.rotation);
    bodyRef.current.wakeUp();
    bodyRef.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });
    const grounded = Math.floor(bodyRef.current.translation().y) <= 1.2;

    if (jump && grounded) {
      bodyRef.current.setLinvel({ x: 0, y: JUMP_FORCE, z: 0 });
    }
    const { x, y, z } = bodyRef.current.translation();
    camera.position.set(x, y, z);
  });

  return (
    <>
      <PointerLockControls makeDefault />
      <RigidBody rotation={[0, 0, 0]} ref={bodyRef} mass={1} lockRotations position={[0, 15, 0]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.5, 0.5]} />
          <CapsuleCollider args={[0.75, 0.5]} />
        </mesh>
      </RigidBody>
    </>
  );
};
