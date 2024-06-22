import { atom } from 'jotai';

export const isDarkModeAtom = atom(false);
export const userAtom = atom('bubu');
export const iconAtom = atom('/images/user.icon.png');
export const countTimeAtom = atom(60);
export const boardSizeAtom = atom<number | null>(null);

//socket
export const socketAtom = atom(null);
//共有したいデータ
export const gameStateAtom = atom(Array(9).fill(null));
export const isXNextAtom = atom(true);
