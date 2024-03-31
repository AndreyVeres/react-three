import { useMemo, useState } from 'react';
import { Quaternion, TorusGeometry, Vector3 } from 'three';
import { V3 } from '../../../V';
import { mergeBufferGeometries } from 'three-stdlib';
import { useFrame } from '@react-three/fiber';
import { planePosition } from '../models/AirPlane';
function randomPoint(scale?: Vector3) {
  return V3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).multiply(scale || V3(1, 1, 1));
}

const TARGET_RAD = 0.125;

export function Torus() {
  const [targets, setTargets] = useState(() => {
    const arr = [];
    for (let i = 0; i < 25; i++) {
      arr.push({
        center: randomPoint(V3(4, 1, 4)).add(V3(0, 2 + Math.random() * 2, 0)),
        direction: randomPoint().normalize(),
        hit: false,
      });
    }

    return arr;
  });

  const geometry = useMemo(() => {
    let geo: any;

    targets.forEach((target) => {
      const torusGeo = new TorusGeometry(TARGET_RAD, 0.02, 8, 25);
      torusGeo.applyQuaternion(new Quaternion().setFromUnitVectors(new Vector3(0, 0, 1), target.direction));
      torusGeo.translate(target.center.x, target.center.y, target.center.z);

      if (!geo) geo = torusGeo;
      else geo = mergeBufferGeometries([geo, torusGeo]);
    });

    return geo;
  }, [targets]);

  useFrame(() => {
    targets.forEach((target) => {
      const v = planePosition.clone().sub(target.center);
      const dist = target.direction.dot(v);
      const projected = planePosition.clone().sub(target.direction.clone().multiplyScalar(dist));

      const hitDist = projected.distanceTo(target.center);
      if (hitDist < TARGET_RAD) {
        target.hit = true;
      }
    });

    const atLeastOneHit = targets.find((target) => target.hit);
    if (atLeastOneHit) {
      setTargets(targets.filter((target) => !target.hit));
    }
  });
  return (
    <>
      {targets.map((_, i) => (
        <mesh key={i} geometry={geometry}>
          {/* <torusGeometry args={[TARGET_RAD, 0.02, 8, 25]} /> */}
          <meshStandardMaterial roughness={0.5} metalness={0.5} />
        </mesh>
      ))}
    </>
  );
}
