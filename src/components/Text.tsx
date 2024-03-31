import { Text3D } from '@react-three/drei';
export const Text = () => {
  return (
    <mesh >
      <Text3D font={'public/fonts/Roboto_Regular.json'} size={3} height={1}>
        ANY TEXT
      </Text3D>
      <meshBasicMaterial attach='material' color='#d30606' />
    </mesh>
  );
};
