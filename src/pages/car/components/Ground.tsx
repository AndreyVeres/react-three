// import React, { useState } from 'react';
// import { DoubleSide } from 'three';

// export const Grounds = () => {
//   //   const [hover, setHover] = useState(false);
//   const groundSize = [10, 10 , 10];

//   const grid = [];
//   for (let i = 0; i < groundSize[0]; i++) {
//     for (let j = 0; j < groundSize[1]; j++) {
//       for (let k = 0; k < groundSize[2]; k++) {
//         grid.push(
//           <Ground key={`${i}-${j}-${k}`} />
//         );
//       }
//     }
//   }


//   return (
//     <>
//       <group>{grid}</group>
//     </>
//   );
// };

// const Ground = () => {
//   const [hover, setHover] = useState(false);
//   return (
//     <mesh
//       onPointerEnter={() => setHover(true)}
//       onPointerLeave={() => setHover(false)}
//       position={[0, -0.01, 0]}
//       rotation-x={-Math.PI * 0.5}
//       castShadow
//       receiveShadow
//     >
//       <planeGeometry args={[1, 1]} />
//       <meshBasicMaterial color={'gray'} side={DoubleSide} />
//     </mesh>
//   );
// };
