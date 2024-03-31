import { OrbitControls, PerspectiveCamera, Environment, Sparkles } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { Suspense } from 'react';

export function SceneContainer() {
  return (
    <Suspense fallback={null}>
      <Environment background={'only'} files={'public/textures/bg.hdr'} />
      <Environment background={false} files={'public/textures/envmap (1).hdr'} />
      <FloatingIsland />
      <Portal />
      <Rocks />
      <FloatingRocks />
      <PerspectiveCamera makeDefault fov={50} position={[-1.75, 10.85, 20.35]} />
      <OrbitControls target={[1, 5, 0]} maxPolarAngle={Math.PI * 0.5} />
      <SceneParticles />
    </Suspense>
  );
}
export const PortalPage = () => {
  return (
    <Canvas>
      <SceneContainer />
    </Canvas>
  );
};

export function SceneParticles() {
  return (
    <>
      <object3D position={[1, 8, -4]}>
        <Sparkles count={50} scale={[5, 3.5, 2.5]} color={'#ffaacc'} size={6} speed={0.2} noise={0.1} />
      </object3D>

      <object3D position={[0, 6, 0]}>
        <Sparkles count={50} scale={[12, 2, 12]} color={'#ffe6a8'} size={10} speed={0.2} noise={0.2} />
      </object3D>

      <object3D position={[-5, 9, -5]}>
        <Sparkles count={50} scale={[4, 4, 4]} color={'#ffe6a8'} size={6} speed={0.2} noise={0.2} />
      </object3D>

      <object3D position={[5.5, 9, -8]}>
        <Sparkles count={50} scale={[5, 5, 5]} color={'#ffe6a8'} size={6} speed={0.2} noise={0.2} />
      </object3D>
    </>
  );
}

import { useLoader } from '@react-three/fiber';
import { useEffect } from 'react';
import { BufferAttribute, Color } from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

export function FloatingIsland() {
  const gltf: any = useLoader(GLTFLoader, 'public/models/floating_island.glb');

  useEffect(() => {
    if (!gltf) return;

    let mesh = gltf.scene.children[0];
    console.log(mesh);

    var uvs = mesh.geometry.attributes.uv.array;
    mesh.geometry.setAttribute('uv2', new BufferAttribute(uvs, 2));

    mesh.material.lightMap = mesh.material.map;
    mesh.material.lightMapIntensity = 400;
    mesh.material.color = new Color(0.04, 0.06, 0.1);
  }, [gltf]);

  return <primitive object={gltf.scene} />;
}

export function Rocks() {
  const gltf = useLoader(GLTFLoader, 'public/models/rocks.glb');

  return <primitive object={gltf.scene} />;
}

import { useFrame } from '@react-three/fiber';

import { Scene, WebGLRenderTarget, TextureLoader, EquirectangularReflectionMapping, AlwaysStencilFunc, ReplaceStencilOp, DoubleSide } from 'three';
import { LinearEncoding } from '@react-three/drei/helpers/deprecated';

const scene = new Scene();
scene.background = new TextureLoader().load(
  // thanks to https://www.creativeshrimp.com/midjourney-text-to-images.html
  'public/textures/galaxy.jpg',
  (texture: any) => {
    texture.encoding = LinearEncoding;
    texture.mapping = EquirectangularReflectionMapping;
  }
);

const target = new WebGLRenderTarget(window.innerWidth, window.innerHeight, {
  stencilBuffer: false,
});

window.addEventListener('resize', () => {
  target.setSize(window.innerWidth, window.innerHeight);
});

export function Portal() {
  // thanks to https://sketchfab.com/3d-models/portal-frame-da34b37a224e4e49b307c0b17a50af2c
  const model = useLoader(GLTFLoader, 'public/models/portal.glb');
  const mask = useLoader(GLTFLoader, 'public/models/portal_mask.glb');

  useFrame((state) => {
    state.gl.setRenderTarget(target);
    state.gl.render(scene, state.camera);
    state.gl.setRenderTarget(null);
  });

  useEffect(() => {
    if (!model) return;

    let mesh: any = model.scene.children[0];
    mesh.material.envMapIntensity = 3.5;

    let maskMesh: any = mask.scene.children[0];
    maskMesh.material.transparent = false;
    maskMesh.material.side = DoubleSide;
    maskMesh.material.stencilFunc = AlwaysStencilFunc;
    maskMesh.material.stencilWrite = true;
    maskMesh.material.stencilRef = 1;
    maskMesh.material.stencilZPass = ReplaceStencilOp;
  }, [model, mask]);

  return (
    <>
      <primitive object={model.scene} />
      <primitive object={mask.scene} />
      {/* <FillQuad map={target.texture} maskId={1} /> */}
    </>
  );
}

import { Float } from '@react-three/drei';

export function FloatingRocks() {
  const rock1 = useLoader(GLTFLoader, 'public/models/floating_rock_1.glb');
  const rock2 = useLoader(GLTFLoader, 'public/models/floating_rock_2.glb');
  const rock3 = useLoader(GLTFLoader, 'public/models/floating_rock_3.glb');

  return (
    <>
      <Float speed={1.5} rotationIntensity={3.6} floatIntensity={200} position={[-20.5, -7, -19]}>
        <primitive object={rock2.scene} />
      </Float>

      <Float speed={1.5} rotationIntensity={1.6} floatIntensity={0} position={[-5, 10, -33]}>
        <primitive object={rock1.scene} />
      </Float>

      <Float speed={1.5} rotationIntensity={1.1} floatIntensity={0} position={[20, 3.5, -9]}>
        <primitive object={rock3.scene} />
      </Float>
    </>
  );
}
