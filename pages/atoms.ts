import { atom } from 'jotai';
import { Bingo } from './Board';

export const isDarkModeAtom = atom(false);
export const userAtom = atom('bubu');
export const iconAtom = atom('/images/user.icon.png');
export const countTimeAtom = atom(15);
export const boardSizeAtom = atom<number | null>(null);
export const playerSymbolAtom = atom<'X' | 'O' | null>(null);
export const currentTurnAtom = atom<'X' | 'O'>('X');

//socketAtom socket.IOの接続を管理するため
export const socketAtom = atom(null);

//この状態をSocket.IOを通じて他のクライアントと共有する。変更をSocketIOが他クライエントに送信する
export const gameStateAtom = atom(Array(9).fill(null));
//export const isXNextAtom = atom(true);
