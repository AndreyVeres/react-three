import { ThreeEvent } from '@react-three/fiber';
import { FC, useEffect, useState } from 'react';
import { DoubleSide } from 'three';

export const BuildGrid = () => {
  const rows = 10;
  const cols = 10;
  const layers = 10;

  const elements = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      for (let k = 0; k < layers; k++) {
        const x = i - rows / 2;
        const y = j - cols / 2;
        const z = k;

        elements.push(<GridItem pos={[x, y, z]} />);
      }
    }
  }
  return (
    <>
      <>{elements}</>
    </>
  );
};

interface GridProps {
  pos: number[];
}

export const GridItem: FC<GridProps> = ({ pos }) => {
  const [hover, setHover] = useState(false);

  const handleHover = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHover(true);
  };

  useEffect(() => {
    console.log(hover);
  }, [hover]);
  return (
    <mesh onPointerEnter={(e) => handleHover(e)} onPointerLeave={() => setHover(false)} position={[pos[0] - 0.5, pos[1] - 0.5, pos[2] - 0.5]}>
      <boxGeometry args={[1, 1]} />
      <meshStandardMaterial transparent opacity={hover ? 1 : 0} side={DoubleSide} />
    </mesh>
  );
};


