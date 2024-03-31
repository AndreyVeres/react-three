import { useLoader } from '@react-three/fiber';

import { MMDLoader } from 'three/examples/jsm/Addons.js';

export const AnimeModel = () => {
  const model = useLoader(MMDLoader, '/models/miku_v2.pmd');

  console.log(model)
  return <div>AnimeModel</div>;
};
