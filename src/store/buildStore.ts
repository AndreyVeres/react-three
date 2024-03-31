import uuid from 'react-uuid';
import { create } from 'zustand';

// const initialFloors = [
//   [
//     {
//       pos: { x: -1, y: 0, z: 1 },
//       id: uuid(),
//     },
//     {
//       pos: { x: 0, y: 0, z: 1 },
//       id: uuid(),
//     },
//     { pos: { x: 1, y: 0, z: 1 }, id: uuid() },
//   ],
//   [
//     {
//       pos: { x: -1, y: 0, z: 0 },
//       id: uuid(),
//     },
//     {
//       pos: { x: 0, y: 0, z: 0 },
//       id: uuid(),
//     },
//     {
//       pos: { x: 1, y: 0, z: 0 },
//       id: uuid(),
//     },
//   ],
//   [
//     {
//       pos: { x: 1, y: 0, z: -1 },
//       id: uuid(),
//     },
//     {
//       pos: { x: 0, y: 0, z: -1 },
//       id: uuid(),
//     },
//     {
//       pos: { x: -1, y: 0, z: -1 },
//       id: uuid(),
//     },
//   ],
// ];

const initialFloors2 = [
  {
    pos: { x: -1, y: 0, z: 1 },
    id: uuid(),
  },
  {
    pos: { x: 0, y: 0, z: 1 },
    id: uuid(),
  },
  { pos: { x: 1, y: 0, z: 1 }, id: uuid() },

  {
    pos: { x: -1, y: 0, z: 0 },
    id: uuid(),
  },
  {
    pos: { x: 0, y: 0, z: 0 },
    id: uuid(),
  },
  {
    pos: { x: 1, y: 0, z: 0 },
    id: uuid(),
  },

  {
    pos: { x: 1, y: 0, z: -1 },
    id: uuid(),
  },
  {
    pos: { x: 0, y: 0, z: -1 },
    id: uuid(),
  },
  {
    pos: { x: -1, y: 0, z: -1 },
    id: uuid(),
  },
];

const initialWalls = [{ pos: { x: 0, y: 0.5, z: 0.5 }, id: uuid() }];

type Position = { x: number; y: number; z: number };

export interface IFloor {
  pos: Position;
  id: string;
}

interface Wall {
  pos: Position;
  id: string;
  rotation?: boolean;
}

export type BuildElement = 'floor' | 'wall';

interface BuildStore {
  floors: IFloor[];
  walls: Wall[];
  activeElement: BuildElement;
  FCV: boolean;
  addFloor: (floor: IFloor) => void;
  removeFloor: (id: string) => void;
  setActiveElement: (element: BuildElement) => void;
  setFCV: () => void;
  addWall: (wall: Wall) => void;
  removeWall: (id:string) => void
}

export const useBuildStore = create<BuildStore>()((set) => ({
  floors: initialFloors2,
  walls: initialWalls,
  activeElement: 'wall',
  FCV: false,
  addFloor: (floor) => set((state) => ({ floors: [...state.floors, floor] })),
  removeFloor: (id) => set((state) => ({ floors: state.floors.filter((f) => f.id !== id) })),
  setActiveElement: (activeElement) => set(() => ({ activeElement })),
  setFCV: () => set((state) => ({ FCV: !state.FCV })),
  addWall: (wall) => set((state) => ({ walls: [...state.walls, wall] })),
  removeWall:(id) => set((state) =>({walls:state.walls.filter(w => w.id !== id)}))
}));
