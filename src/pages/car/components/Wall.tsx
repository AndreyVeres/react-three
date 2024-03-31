import { FC, useEffect, useState } from 'react';
import { DoubleSide } from 'three';
import { useBuildStore } from '../../../store/buildStore';
import { ThreeEvent } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import uuid from 'react-uuid';
interface WallProps {
  pos: { x: number; y: number; z: number };
  rotation?: boolean;
  id:string
}
export const Wall: FC<WallProps> = ({ pos, rotation , id }) => {
  const [hover, setHover] = useState(false);
  const addFloor = useBuildStore((state) => state.addFloor);
  const removeWall = useBuildStore(state => state.removeWall)
  const [faceIndex, setFaceIndex] = useState(0);
  const handlePoinerEnter = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setFaceIndex(e.faceIndex || 0);
    setHover(true);
  };

  const isWall = useBuildStore(state => state.activeElement)==='wall'

  useEffect(() => {
    console.log(faceIndex);
  }, [faceIndex]);
  const handleClick = () => {
    let chords: any;

    if(isWall){
      removeWall(id)
    }

    if (rotation) {
      chords = {
        y: pos.y + 0.5,
        x: faceIndex === 1 ? pos.x + 0.5 : pos.x - 0.5,
        z: pos.z,
      };
    } else {
      chords = {
        y: pos.y + 0.5,
        x: pos.x,
        z: faceIndex === 1 ? pos.z + 0.5 : pos.z - 0.5,
      };
    }

    addFloor({
      id: uuid(),
      pos: chords,
    });
  };

  const handleRibHover = (e: ThreeEvent<PointerEvent>) => {
    setFaceIndex(e.faceIndex || 0);
  };

  return (
    <RigidBody>
      <mesh
        onClick={handleClick}
        rotation-y={rotation ? Math.PI / 2 : 0}
        onPointerEnter={(e) => handlePoinerEnter(e)}
        onPointerLeave={() => setHover(false)}
        position={[pos.x, pos.y, pos.z]}
        castShadow
        receiveShadow
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color={hover ? 'blue' : 'orange'} side={DoubleSide} />
      </mesh>

      <mesh
        onPointerEnter={(e) => handleRibHover(e)}
        rotation-y={rotation ? Math.PI / 2 : 0}
        position={[pos.x, pos.y + 0.5, pos.z]}
        receiveShadow={false}
      >
        <planeGeometry args={[1, 0.01]} />
        <meshBasicMaterial color={hover ? 'red' : 'transparent'} side={DoubleSide} transparent={true} />
      </mesh>
    </RigidBody>
  );
};

export const Walls = () => {
  const walls = useBuildStore((state) => state.walls);

  return (
    <>
      {walls.map((wall) => (
        <Wall pos={wall.pos} rotation={wall.rotation} id={wall.id} />
      ))}
    </>
  );
};
