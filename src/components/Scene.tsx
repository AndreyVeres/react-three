import { Canvas } from '@react-three/fiber';
import { FC, PropsWithChildren, Suspense } from 'react';
import { Stats } from '@react-three/drei';
export const Scene: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Canvas className='myCanvs' camera={{ fov: 90, position: [0, 10, 10] }} shadows>
        <Stats />
        {children}
      </Canvas>
    </Suspense>
  );
};
