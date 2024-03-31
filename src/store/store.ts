import { createSlice, combineReducers, createStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export enum CameraPerson {
  third = 3,
  free = 2,
  first = 1,
}

interface state {
  camera: CameraPerson;
}
const initialState: state = {
  camera: CameraPerson.first,
};

const state = createSlice({
  name: 'state',
  initialState,
  reducers: {
    setCameraPerson: (state, action) => {
      state.camera = action.payload;
    },
  },
});

export const { actions: stateActions } = state;

export const store = createStore(
  combineReducers({
    state: state.reducer,
  })
);

export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<state> = useSelector;
