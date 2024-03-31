import { KeyboardControls } from '@react-three/drei';
import { FC, PropsWithChildren } from 'react';

const KEYBOARD_MAP = [
  { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
  { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
  { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
  { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
  { name: 'jump', keys: ['Space'] },
  { name: 'moveSpeed', keys: ['Shift'] },
  { name: 'addCube', keys: ['E', 'e'] },
  { name: 'drag', keys: ['Q', 'q'] },
  { name: 'remove', keys: ['R', 'r'] },
];

export const Keyboard: FC<PropsWithChildren> = ({ children }) => {
  return <KeyboardControls map={KEYBOARD_MAP}>{children}</KeyboardControls>;
};
