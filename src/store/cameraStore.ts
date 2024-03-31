import { create } from 'zustand';

export enum CameraPerson {
  third = 3,
  free = 2,
  first = 1,
}

export interface ICameraStore {
  cameraState: CameraPerson;
  setCamera: (newCameraState: CameraPerson) => void;
}

export const useCameraStore = create<ICameraStore>()((set) => ({
  cameraState: CameraPerson.first,
  setCamera: (newCameraState) => set(() => ({ cameraState: newCameraState })),
}));
