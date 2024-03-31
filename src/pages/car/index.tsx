import { OrbitControls, PerspectiveCamera, Sky } from '@react-three/drei';

import { Scene } from '../../components/Scene';
import { Floors } from './components/Floor';
import { Walls } from './components/Wall';

import { FloorGrid } from './components/FloorGrid';

import './components/index.css';
import { Physics } from '@react-three/rapier';
import { Viewer } from './components/Viewer';
import { useBuildStore } from '../../store/buildStore';
import { useEffect } from 'react';

export const BuildPage = () => {
  const { FCV, setFCV, setActiveElement , activeElement} = useBuildStore((state) => state);

  useEffect(() => {
    const handleKeyPress = (e: any) => {
      if (e.code === 'Digit1') {
        setActiveElement('wall');
      }
      if (e.code === 'Digit2') {
        setActiveElement('floor');
      }

      if (e.code === 'Digit3') {
        setFCV();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => document.removeEventListener('keydown', handleKeyPress);
  });

  return (
    <>
      <div className='build-ui'>
        <button className={activeElement === 'wall' ? 'active' : ''} onClick={() => setActiveElement('wall')}>wall 1</button>
        <button className={activeElement === 'floor' ? 'active' : ''} onClick={() => setActiveElement('floor')}>floor 2</button>
        <button className={FCV ? 'active' : ''} onClick={setFCV}>first person 3</button>
      </div>
      <div className='aim'></div>
      <Scene>
        <Sky />
        {!FCV && <PerspectiveCamera makeDefault fov={90} position={[0, 5, 5]} />}
        {!FCV && <OrbitControls target={[0, 0.35, 0]} />}
        <ambientLight intensity={3} color={'orange'} />
        <FloorGrid />

        <Physics>
          <Floors />
          <Walls />
          {FCV && <Viewer />}
        </Physics>
      </Scene>
    </>
  );
};
