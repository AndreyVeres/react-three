import { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { RigidBody } from '@react-three/rapier';
import { AnimationClip, Bone, Group, MeshStandardMaterial, SkinnedMesh } from 'three';

type GLTFResult = GLTF & {
  nodes: {
    ArmL: SkinnedMesh;
    ArmR: SkinnedMesh;
    FootL_1: SkinnedMesh;
    FootR_1: SkinnedMesh;
    Cylinder022: SkinnedMesh;
    Cylinder022_1: SkinnedMesh;
    Cylinder015: SkinnedMesh;
    Cylinder015_1: SkinnedMesh;
    Cylinder: SkinnedMesh;
    Cylinder_1: SkinnedMesh;
    Cylinder_2: SkinnedMesh;
    LegL: SkinnedMesh;
    LegR: SkinnedMesh;
    LowerLegL_1: SkinnedMesh;
    LowerLegR_1: SkinnedMesh;
    ShoulderL_1: SkinnedMesh;
    ShoulderR_1: SkinnedMesh;
    Cube001: SkinnedMesh;
    Cube001_1: SkinnedMesh;
    Bone: Bone;
  };
  materials: {
    Main: MeshStandardMaterial;
    Grey: MeshStandardMaterial;
    Black: MeshStandardMaterial;
  };
};

type ActionName =
  | 'Robot_Dance'
  | 'Robot_Death'
  | 'Robot_Idle'
  | 'Robot_Jump'
  | 'Robot_No'
  | 'Robot_Punch'
  | 'Robot_Running'
  | 'Robot_Sitting'
  | 'Robot_Standing'
  | 'Robot_ThumbsUp'
  | 'Robot_Walking'
  | 'Robot_WalkJump'
  | 'Robot_Wave'
  | 'Robot_Yes';
interface GLTFAction extends AnimationClip {
  name: ActionName;
}

export function RobotModel(props: JSX.IntrinsicElements['group']) {
  const group = useRef<Group>(null!);
  const { nodes, materials, animations } = useGLTF('public/models/robot.glb') as GLTFResult;
  const { actions } = useAnimations<GLTFAction>(animations as any, group);

  useEffect(() => {
    actions.Robot_Dance?.play()
  }, []);
  return (
    <RigidBody lockRotations>
      <group  ref={group} {...props} dispose={null}>
        <group name='Scene'>
          <group name='RobotArmature'>
            <skinnedMesh name='ArmL' geometry={nodes.ArmL.geometry} material={materials.Main} skeleton={nodes.ArmL.skeleton} />
            <skinnedMesh name='ArmR' geometry={nodes.ArmR.geometry} material={materials.Main} skeleton={nodes.ArmR.skeleton} />
            <skinnedMesh name='FootL_1' geometry={nodes.FootL_1.geometry} material={materials.Grey} skeleton={nodes.FootL_1.skeleton} />
            <skinnedMesh name='FootR_1' geometry={nodes.FootR_1.geometry} material={materials.Grey} skeleton={nodes.FootR_1.skeleton} />
            <group name='HandL'>
              <skinnedMesh
                castShadow
                receiveShadow
                name='Cylinder022'
                geometry={nodes.Cylinder022.geometry}
                material={materials.Main}
                skeleton={nodes.Cylinder022.skeleton}
              />
              <skinnedMesh
                castShadow
                receiveShadow
                name='Cylinder022_1'
                geometry={nodes.Cylinder022_1.geometry}
                material={materials.Grey}
                skeleton={nodes.Cylinder022_1.skeleton}
              />
            </group>
            <group name='HandR'>
              <skinnedMesh
                castShadow
                receiveShadow
                name='Cylinder015'
                geometry={nodes.Cylinder015.geometry}
                material={materials.Main}
                skeleton={nodes.Cylinder015.skeleton}
              />
              <skinnedMesh
                castShadow
                receiveShadow
                name='Cylinder015_1'
                geometry={nodes.Cylinder015_1.geometry}
                material={materials.Grey}
                skeleton={nodes.Cylinder015_1.skeleton}
              />
            </group>
            <group name='Head_1'>
              <skinnedMesh
                castShadow
                receiveShadow
                name='Cylinder'
                geometry={nodes.Cylinder.geometry}
                material={materials.Main}
                skeleton={nodes.Cylinder.skeleton}
              />
              <skinnedMesh
                castShadow
                receiveShadow
                name='Cylinder_1'
                geometry={nodes.Cylinder_1.geometry}
                material={materials.Grey}
                skeleton={nodes.Cylinder_1.skeleton}
              />
              <skinnedMesh
                castShadow
                receiveShadow
                name='Cylinder_2'
                geometry={nodes.Cylinder_2.geometry}
                material={materials.Black}
                skeleton={nodes.Cylinder_2.skeleton}
              />
            </group>
            <skinnedMesh
              castShadow
              receiveShadow
              name='LegL'
              geometry={nodes.LegL.geometry}
              material={materials.Main}
              skeleton={nodes.LegL.skeleton}
            />
            <skinnedMesh
              castShadow
              receiveShadow
              name='LegR'
              geometry={nodes.LegR.geometry}
              material={materials.Main}
              skeleton={nodes.LegR.skeleton}
            />
            <skinnedMesh
              castShadow
              receiveShadow
              name='LowerLegL_1'
              geometry={nodes.LowerLegL_1.geometry}
              material={materials.Main}
              skeleton={nodes.LowerLegL_1.skeleton}
            />
            <skinnedMesh
              castShadow
              receiveShadow
              name='LowerLegR_1'
              geometry={nodes.LowerLegR_1.geometry}
              material={materials.Main}
              skeleton={nodes.LowerLegR_1.skeleton}
            />
            <skinnedMesh
              castShadow
              receiveShadow
              name='ShoulderL_1'
              geometry={nodes.ShoulderL_1.geometry}
              material={materials.Main}
              skeleton={nodes.ShoulderL_1.skeleton}
            />
            <skinnedMesh
              castShadow
              receiveShadow
              name='ShoulderR_1'
              geometry={nodes.ShoulderR_1.geometry}
              material={materials.Main}
              skeleton={nodes.ShoulderR_1.skeleton}
            />
            <group name='Torso_1'>
              <skinnedMesh
                castShadow
                receiveShadow
                name='Cube001'
                geometry={nodes.Cube001.geometry}
                material={materials.Main}
                skeleton={nodes.Cube001.skeleton}
              />
              <skinnedMesh
                castShadow
                receiveShadow
                name='Cube001_1'
                geometry={nodes.Cube001_1.geometry}
                material={materials.Grey}
                skeleton={nodes.Cube001_1.skeleton}
              />
            </group>
            <primitive object={nodes.Bone} />
          </group>
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload('public/models/robot.glb');
