import { Scene } from '../../components/Scene';
import { Stars } from '@react-three/drei';
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
        </Scene>
      </Keyboard>
      <UserInterface />
    </>
  );
};
