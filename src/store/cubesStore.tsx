import { create } from 'zustand';

interface CubeObject {
  pos: any;
  texture: 'wood' | 'brick';
  id: number;
}

export interface ICameraStore {
  cubes: CubeObject[];
  selectedTexture: 'wood' | 'brick';
  addCube: (cube: CubeObject) => void;
  setSelectedTexture: (texture: 'wood' | 'brick') => void;
  removeCube: (pos: any) => void;

  updateCubePosition: (oldPos: any, newPosition: any) => void;
}

export const useCubesStore = create<ICameraStore>()((set) => ({
  cubes: [],
  selectedTexture: 'wood',
  setSelectedTexture: (texture: 'wood' | 'brick') => set((state) => ({ selectedTexture: texture })),
  addCube: (cube) => set((state) => ({ cubes: [...state.cubes, cube] })),
  removeCube: (id) => set((state) => ({ cubes: state.cubes.filter((cube) => cube.id !== id) })),

  updateCubePosition: (oldpos, newPosition) =>
    set((state) => ({
      cubes: state.cubes.map((c) => (c.pos.x === oldpos.x && c.pos.z === oldpos.z ? { ...c, pos: newPosition } : c)),
    })),
}));
