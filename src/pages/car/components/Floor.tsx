import { DoubleSide, Mesh } from 'three';
import { useBuildStore } from '../../../store/buildStore';
import { FC,  useRef, useState } from 'react';
import { ThreeEvent } from '@react-three/fiber';
import { IFloor } from '../../../store/buildStore';

import { RigidBody } from '@react-three/rapier';
import uuid from 'react-uuid';

interface GroundProps {
  floor: IFloor;
}

type FloorRib = 'front' | 'back' | 'left' | 'right' | null;

const Floor: FC<GroundProps> = ({ floor }) => {
  const { pos, id } = floor;
  const [hover, setHover] = useState(false);
  const meshRef = useRef<Mesh>(null!);
  const removeFloor = useBuildStore((state) => state.removeFloor);
  const addWall = useBuildStore((state) => state.addWall);
  const isFloor = useBuildStore((state) => state.activeElement) === 'floor';
  const isWall = !isFloor;

  const [hoveredRib, setHoveredRib] = useState<FloorRib>(null);

  const handleHover = () => {
    if (isWall) {
    }
    setHover(true);
  };

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();

    if (isFloor) {
      removeFloor(id);
    }

    if (isWall) {
      let wallPos = { y: 0.5, x: floor.pos.x, z: floor.pos.z }; // Полагаем, что стена находится на том же уровне по высоте, что и пол
      let isRotated = false;
      switch (hoveredRib) {
        case 'front':
          wallPos.z -= 0.5; // Передняя стена
          break;
        case 'back':
          wallPos.z += 0.5; // Задняя стена
          break;
        case 'left':
          wallPos.x -= 0.5;
          isRotated = true;
          break;
        case 'right':
          wallPos.x += 0.5; // Правая стена
          isRotated = true;
          break;
        default:
          return; // Если hoveredRib равно null или undefined, ничего не делаем
      }

      addWall({
        pos: wallPos,
        id: uuid(),
        rotation: isRotated,
      });
    }
  };

  const handleRibHover = (rib: FloorRib) => {
    setHoveredRib(rib);
  };

  // const handleRibClick = (e: any) => console.log(e);

  return (
    <RigidBody>
      <group>
        <mesh
          ref={meshRef}
          onPointerEnter={() => handleHover()}
          onPointerLeave={() => setHover(false)}
          onClick={(e) => handleClick(e)}
          position={[pos.x, pos.y, pos.z]}
          rotation-x={-Math.PI * 0.5}
          castShadow
          receiveShadow
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color={hover && isFloor ? 'blue' : 'green'} side={DoubleSide} />
        </mesh>
        {hover && (
          <group>
            {/* Верхнее ребро */}
            <mesh onPointerEnter={() => handleRibHover('front')} position={[pos.x, pos.y, pos.z - 0.5]} receiveShadow={false}>
              <planeGeometry args={[1, 0.01]} />
              <meshBasicMaterial color={hover ? 'red' : 'transparent'} side={DoubleSide} transparent={true} />
            </mesh>

            {/* Нижнее ребро */}
            <mesh onPointerEnter={() => handleRibHover('back')} position={[pos.x, pos.y, pos.z + 0.5]} receiveShadow={false}>
              <planeGeometry args={[1, 0.01]} />
              <meshBasicMaterial color={hover ? 'red' : 'transparent'} side={DoubleSide} transparent={true} />
            </mesh>

            {/* Левое ребро */}
            <mesh
              onPointerEnter={() => handleRibHover('left')}
              rotation-x={-Math.PI * 0.5}
              position={[pos.x - 0.5, pos.y, pos.z]}
              receiveShadow={false}
            >
              <planeGeometry args={[0.01, 1]} />
              <meshBasicMaterial color={hover ? 'red' : 'transparent'} side={DoubleSide} transparent={true} />
            </mesh>

            {/* Правое ребро */}
            <mesh
              onPointerEnter={() => handleRibHover('right')}
              rotation-x={-Math.PI * 0.5}
              position={[pos.x + 0.5, pos.y, pos.z]}
              receiveShadow={false}
            >
              <planeGeometry args={[0.01, 1]} />
              <meshBasicMaterial color={hover ? 'red' : 'transparent'} side={DoubleSide} transparent={true} />
            </mesh>
          </group>
        )}

        {hover && isWall && (
          <group>
            {/* backWall */}

            {hoveredRib === 'back' && (
              <mesh position={[pos.x, pos.y + 0.5, pos.z + 0.5]} receiveShadow={false}>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial color={'red'} side={DoubleSide} transparent={true} />
              </mesh>
            )}

            {/* frontWall */}

            {hoveredRib === 'front' && (
              <mesh position={[pos.x, pos.y + 0.5, pos.z - 0.5]} receiveShadow={false}>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial color={hover ? 'red' : 'transparent'} side={DoubleSide} transparent={true} />
              </mesh>
            )}

            {/* rigth wall */}
            {hoveredRib === 'right' && (
              <mesh position={[pos.x + 0.5, pos.y + 0.5, pos.z]} rotation-y={Math.PI * 0.5} receiveShadow={false}>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial color={hover ? 'red' : 'transparent'} side={DoubleSide} transparent={true} />
              </mesh>
            )}
            {/* left */}
            {hoveredRib === 'left' && (
              <mesh position={[pos.x - 0.5, pos.y + 0.5, pos.z]} rotation-y={Math.PI * 0.5} receiveShadow={false}>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial color={hover ? 'red' : 'transparent'} side={DoubleSide} transparent={true} />
              </mesh>
            )}
          </group>
        )}
      </group>
    </RigidBody>
  );
};

export const Floors = () => {
  const floors = useBuildStore((state) => state.floors);

  return (
    <>
      {floors.flat().map((floor) => (
        <Floor key={floor.id} floor={floor} />
      ))}
    </>
  );
};
