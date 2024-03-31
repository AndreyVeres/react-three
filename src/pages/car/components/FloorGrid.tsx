
import { FC, useState } from 'react';
import { DoubleSide } from 'three';
import { useBuildStore } from '../../../store/buildStore';
import uuid from 'react-uuid';

export const FloorGrid = () => {
  const gridSize = [14, 14];

  const elements = [];

  const centerOffsetX = gridSize[0] / 2; // Смещение по X для выравнивания по центру
  const centerOffsetZ = gridSize[1] / 2; // Смещение по Z для выравнивания по центру

  for (let i = 0; i < gridSize[0]; i++) {
    for (let j = 0; j < gridSize[1]; j++) {
      elements.push(<GridItem key={`${i}-${j}`} pos={{ x: i - centerOffsetX, y: 0, z: j - centerOffsetZ }} />);
    }
  }

  return (
    <>
      <group position={[0, -0.001, 0]}>{elements}</group>
    </>
  );
};

interface GridItemProps {
  pos: { x: number; y: number; z: number };
}

const GridItem: FC<GridItemProps> = ({ pos }) => {
  const [hover, setHover] = useState(false);
  const addFloor = useBuildStore((state) => state.addFloor);

  const handleClick = () => {
    addFloor({
      pos,
      id: uuid(),
    });
  };

  return (
    <mesh
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onClick={handleClick}
      position={[pos.x, pos.y, pos.z]}
      rotation-x={-Math.PI * 0.5}
      castShadow
      receiveShadow
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color={hover ? 'blue' : 'gray'} side={DoubleSide} />
    </mesh>
  );
};
