import { Scene } from '../../components/Scene';
import { LandModel } from './models/Land';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';

import { SphereEnv } from './components/Sphere';
import { AirPlaneModel } from './models/AirPlane';
import { Torus } from './components/Torus';

export const Land = () => {
  return (
    <Scene>
      <OrbitControls target={[0, 0, 0]} />
      <Environment background={false} files={'/textures/envmap.hdr'} />
      <SphereEnv />
      <PerspectiveCamera makeDefault position={[0, 10, 10]} />
      {/* <Light /> */}
      <Torus />
      <LandModel />
      <AirPlaneModel />
      <directionalLight
        castShadow
        color={'#f3d29a'}
        intensity={2}
        position={[10, 5, 4]}
        shadow-bias={-0.0005}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.01}
        shadow-camera-far={20}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-camera-left={-6.2}
        shadow-camera-right={6.4}
      />
    </Scene>
  );
};
