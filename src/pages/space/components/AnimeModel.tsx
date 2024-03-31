import { useLoader } from '@react-three/fiber';
import React from 'react';
import { MMDLoader } from 'three/examples/jsm/Addons.js';

export const AnimeModel = () => {
  const model = useLoader(MMDLoader, 'public/models/miku_v2.pmd');

  console.log(model)
  return <div>AnimeModel</div>;
};
