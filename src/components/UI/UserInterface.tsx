import './UI.css';

import cubeImg from '../../../public/textures/wood.jpg';
import brick from '../../../public/textures/brick.jpg';
import { useCubesStore } from '../../store/cubesStore';
import { useEffect } from 'react';
export const UserInterface = () => {
  const { setSelectedTexture, selectedTexture } = useCubesStore();

  useEffect(() => {
    document.addEventListener('keydown', (e: any) => {
      if (e.code === 'Digit1') {
        setSelectedTexture('wood');
      }
      if (e.code === 'Digit2') {
        setSelectedTexture('brick');
      }
    });
  }, []);
  return (
    <>
      <div className='help'>
        <span>E = ADD CUBE</span>
        <span>ctrl+mouse = REMOVE CUBE</span>
        <span>Move = WASD</span>
        <span>Shift = sprint</span>
      </div>
      <div className="aim"></div>
      <div className='UI'>
        <div>
          <button className={selectedTexture === 'wood' ? 'active' : ''} style={{ width: '50px', height: '50px', position: 'relative' }}>
            <img style={{ width: '100%', height: '100%' }} src={cubeImg} />
            <span style={{ position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'cenmter', zIndex: '99' }}>1</span>
          </button>

          <button className={selectedTexture === 'brick' ? 'active' : ''} style={{ width: '50px', height: '50px', position: 'relative' }}>
            <img style={{ width: '100%', height: '100%' }} src={brick} />
            <span style={{ position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'cenmter', zIndex: '99' }}>2</span>
          </button>
        </div>
      </div>
    </>
  );
};
