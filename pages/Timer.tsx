import { useAtom } from 'jotai';
import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
  memo,
} from 'react';
import { currentTurnAtom } from './atoms';

export const useCountDownInterval = (
  countTime: number | null,
  //関数型の引数  返り値もここで定義？
  //useState の状態更新関数を受け取っている
  setCountTime: (arg0: number | ((prevCountTime: number) => number)) => void,
  setWinner: (winner: 'X' | 'O' | null) => void,
  winner: 'X' | 'O' | null
  //xIsNext: boolean
  //isDraw: boolean
) => {
  //setIntervalの型定義はこれになる
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [currentTurn, setCurrentTurn] = useAtom(currentTurnAtom); //サーバーでターン管理始めたのでxIsNextがなくなった

  useEffect(() => {
    if (countTime === null) return;
    //intervalRef.currentが存在していたら消す
    // if (isDraw) return;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      //1秒ごとにsetCountTime()を実行
      setCountTime((prevCountTime: number) => {
        if (prevCountTime === 0) {
          // 型アサーションを使用することで、TypeScriptコンパイラに対してintervalRef.currentの型がsetIntervalの戻り値の型であることを保証し、clearIntervalが適切に動作することを示しています
          clearInterval(intervalRef.current as ReturnType<typeof setInterval>);

          if (!winner) {
            setWinner(currentTurn ? 'O' : 'X');
            return prevCountTime;
          } else {
            return prevCountTime;
          }
        }
        return prevCountTime - 1;
      });
      //1秒後は1000
    }, 1000);

    return () => {
      clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
    };
    //依存配列のどれかが変わったら関数がrunする
  }, [countTime, currentTurn]);
};
//countTimeはプロパティで、プロパティの型指定をしている
export const Timer = memo(({ countTime }: { countTime: number }) => {
  return <p>ゲーム残り時間: {countTime % 60}秒 </p>;
});
