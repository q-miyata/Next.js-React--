import { atom } from 'jotai';

export const isDarkModeAtom = atom(false);
export const userAtom = atom('bubu');
export const iconAtom = atom('/images/user.icon.png');
export const countTimeAtom = atom(60);
export const boardSizeAtom = atom<number | null>(null);
//atomの値はgetを用いることで参照することができ、setを用いることで値の代入ができる
//xIsNextを使うために
export const currentMoveAtom = atom(0);
export const xIsNextAtom = atom((get) => get(currentMoveAtom) % 2 === 0);
//this is wrong version: export const winnerAtom = atom (null);
export const winnerAtom = atom<'O' | 'X' | null>(null);

//export const historyAtom = atom({   squares: Array(Math.pow(boardSizeAtom || 0, 2)).fill(null),index: undefined,})
export const historyAtom = atom((get) => {
  const boardSize = get(boardSizeAtom);
  return [
    {
      squares: Array(Math.pow(boardSize || 0, 2)).fill(null),
      index: undefined,
    },
  ];
});

export const currentSquaresAtom = atom((get) => {
  const history = get(historyAtom);
  const currentMove = get(currentMoveAtom);
  return history[currentMove]?.squares || [];
});

//const currentSquares = history[currentMove].squares;
