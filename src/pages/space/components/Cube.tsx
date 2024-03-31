import { useTexture } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { FC, useRef, useState } from 'react';
import { useCubesStore } from '../../../store/cubesStore';
import { ThreeEvent } from '@react-three/fiber';

interface CubeProps {
  position: any;
  texture: 'wood' | 'brick';
  id: number;
}

export const Cube: FC<CubeProps> = ({ position, texture, id }) => {
  const textureMap = useTexture(`/textures/${texture}.jpg`);
  const { removeCube } = useCubesStore((state) => state);
  const [hover, setHover] = useState(false);
  const [_, setIsDrag] = useState(false);

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    if (e.ctrlKey) {
      removeCube(id);
    }
  };

  const handleUpdatePosition = () => {
    // console.log(cubeRef.current.parent.position);
    // const newPos = new Vector3(cubeRef.current.parent.position.x, cubeRef.current.parent.position.y + 1, cubeRef.current.parent.position.z);
    // console.log(position, newPos);
    // updateCubePosition(position, newPos);
  };

  const cubeRef = useRef<any>();

  return (
    <RigidBody onIntersectionEnter={handleUpdatePosition} onIntersectionExit={handleUpdatePosition}>
      <mesh
        onPointerUp={() => setIsDrag(false)}
        onPointerDown={() => setIsDrag(true)}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        onClick={(e) => handleClick(e)}
        position={position}
        ref={cubeRef}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hover ? 'blue' : 'red'} map={textureMap} />
      </mesh>
    </RigidBody>
  );
};
