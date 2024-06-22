import { atom } from 'jotai';

export const isDarkModeAtom = atom(false);
export const userAtom = atom('bubu');
export const iconAtom = atom('/images/user.icon.png');
export const countTimeAtom = atom(60);
export const boardSizeAtom = atom<number | null>(null);

//socketAtom socket.IOの接続を管理するため
export const socketAtom = atom(null);

//この状態をSocket.IOを通じて他のクライアントと共有する。変更をSocketIOが他クライエントに送信する
export const gameStateAtom = atom(Array(9).fill(null));
export const isXNextAtom = atom(true);
