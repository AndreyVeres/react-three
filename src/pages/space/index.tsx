import { Scene } from '../../components/Scene';
import { Float, Sparkles, Stars } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { Ground } from './components/Ground';
import { FirstPerson } from './components/FirstPerson';
import { Light } from '../../components/Light';
import { RobotModel } from '../../models/Robot';

import { UserInterface } from '../../components/UI/UserInterface';

import { Keyboard } from './components/Keyboard';
import { BlackHoleModel } from '../../models/BlackHole';
import { ChallengerModel } from '../../models/Challenger';
import { Cubes } from './components/Cubes';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

const randPos: any = () => [Math.random() * 111, Math.random() * 111, Math.random() * 111];
const Rocks = () => {
  const rock1 = useLoader(GLTFLoader, '/models/floating_rock_1.glb');
  const rock2 = useLoader(GLTFLoader, '/models/floating_rock_2.glb');
  const rock3 = useLoader(GLTFLoader, '/models/floating_rock_3.glb');

  const pos = randPos();
  console.log(pos);
  return (
    <>
      <group>
        <Float speed={1.5} rotationIntensity={3.6} floatIntensity={200} position={pos}>
          <primitive object={rock2.scene} />
        </Float>

        <Float speed={1.5} rotationIntensity={1.6} floatIntensity={0} position={pos}>
          <primitive object={rock1.scene} />
        </Float>

        <Float speed={1.5} rotationIntensity={1.1} floatIntensity={0} position={pos}>
          <primitive object={rock3.scene} />
        </Float>
      </group>
    </>
  );
};

export const Space = () => {
  return (
    <>
      <Keyboard>
        <Scene>
          <Light />
          <spotLight color={[1, 0.25, 0.7]} intensity={22.5} angle={2.6} penumbra={0.4} position={[5, 5, 0]} castShadow shadow-bias={-0.0001} />
          <spotLight color={[0.14, 0.5, 1]} intensity={33} angle={2.6} penumbra={0.8} position={[-5, 5, 0]} castShadow shadow-bias={-0.0001} />
          <Physics gravity={[0, -30, 0]}>
            <Stars radius={160} depth={50} count={5000} factor={4} saturation={0} fade />
            <Ground />
            <Cubes />
            <RobotModel position={[5, 5, 5]} />
            <FirstPerson />
            <BlackHoleModel scale={[15, 15, 15]} rotation={[-22.5, 15, 10]} position={[60, 15, 60]} />
            <ChallengerModel position={[10, 5, 5]} />
          </Physics>

          <Rocks />
          <Rocks />
          <Rocks />
          <SceneParticles />
          {/* <AnimeModel/> */}
        </Scene>
      </Keyboard>
      <UserInterface />
    </>
  );
};
export function SceneParticles() {
  return (
    <>
      <object3D position={[1, 8, 10]}>
        <Sparkles count={555} scale={[53, 10, 33]} color={'#ff0066'} size={10} speed={0.2} noise={0.1} />
      </object3D>

      <object3D position={[0, 6, 0]}>
        <Sparkles count={500} scale={[53, 10, 33]} color={'#21ad38bb'} size={10} speed={0.2} noise={0.2} />
      </object3D>

      <object3D position={[-5, 9, -5]}>
        <Sparkles count={555}scale={[53, 10, 33]} color={'#cca23a'} size={6} speed={0.5} noise={0.2} />
      </object3D>

      <object3D position={[5.5, 9, -8]}>
        <Sparkles count={555} scale={[53, 10, 33]} color={'#00eb33'} size={6} speed={1} noise={0.3} />
      </object3D>
    </>
  );
}
