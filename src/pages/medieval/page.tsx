import {  OrbitControls } from '@react-three/drei';
import { Scene } from '../../components/Scene';

import { CarGround } from '../car/components/CarGround';

export const MedievalPage = () => {
  return (
    <Scene>
      {/* <Environment background={'only'} files={'/textures/bg.hdr'} /> */}
      {/* <Environment background={false} files={'/textures/envmap (1).hdr'} /> */}
      <OrbitControls />
      <CarGround />
      <directionalLight intensity={2} castShadow shadow-bias={-0.0004} position={[-20, 20, 20]}>
        <orthographicCamera attach='shadow-camera' args={[-20, 20, 20, -20]} />
      </directionalLight>
    </Scene>
  );
};
