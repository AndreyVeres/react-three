import { useCubesStore } from '../../../store/cubesStore';
import { Cube } from './Cube';

export const Cubes = () => {
  const cubes = useCubesStore((state) => state.cubes);

  return (
    <>
      {cubes.map((cube, i) => (
        <Cube id={cube.id} key={i} position={cube.pos} texture={cube.texture} />
      ))}
    </>
  );
};
