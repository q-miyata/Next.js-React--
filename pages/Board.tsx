import { styles } from './_app.styles';

import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
} from 'react';
import Square from './Square';

const useCountDownInterval = (
  countTime: number | null,
  setCountTime: (arg0: number) => void,
  setWinner: (winner: 'X' | 'O' | null) => void,
  xIsNext: boolean
) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (countTime === null) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCountTime((prevCountTime) => {
        if (prevCountTime === 0) {
          clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
          setWinner(xIsNext ? 'X' : 'O');
          return prevCountTime;
        }
        return prevCountTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
    };
  }, [countTime, setCountTime, setWinner, xIsNext]);
};

export const Timer = ({ countTime }: { countTime: number }) => {
  return <p>ゲーム残り時間: {countTime % 60}秒 </p>;
};

export type BoardProps = {
  xIsNext: boolean;
  squares: ('X' | 'O' | null)[];
  onPlay: (nextSquares: ('X' | 'O' | null)[], i: number) => void;
};

export default function Board({
  xIsNext,
  squares,
  onPlay,
}: BoardProps): JSX.Element {
  const [countTime, setCountTime] = useState<number>(10);
  const [winner, setWinner] = useState<'X' | 'O' | null>(null);
  //手番が変わった時に起こる処理　コンポーネント外に出したかったけど挫折
  useEffect(() => {
    setCountTime(10);
  }, [xIsNext]);
  //useStateをparameterに渡すことでuseEffectをrunする
  useCountDownInterval(countTime, setCountTime, setWinner, xIsNext);

  const handleClick = useCallback(
    (i: number) => {
      if (winner || squares[i] || isDraw) {
        return;
      }
      const nextSquares = squares.slice();
      if (xIsNext) {
        nextSquares[i] = 'X';
      } else {
        nextSquares[i] = 'O';
      }
      //This just put arguments to handlePlay function
      onPlay(nextSquares, i);
      //dependancyの値が変わらない限り新しい関数インスタンスが生成されない
    },

    [squares, xIsNext, onPlay, winner]
  );

  console.log('Board called');
  type WinnerLine = {
    winner: 'X' | 'O' | null;
    line: number[] | null;
    isDraw: boolean;
  };

  const {
    winner: calcWinner,
    line,
    isDraw,
  }: WinnerLine = useMemo(() => calculateWinner(squares), [squares]);

  //挿入
  useEffect(() => {
    if (calcWinner) {
      setWinner(calcWinner);
    }
  }, [calcWinner]);

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (isDraw) {
    status = 'Draw';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <Timer countTime={countTime} />
      <div css={styles.status}>{status}</div>
      <div css={styles.boardRow}>
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
          bingoSquare={Boolean(line?.includes(0))}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
          bingoSquare={Boolean(line?.includes(1))}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
          bingoSquare={Boolean(line?.includes(2))}
        />
      </div>
      <div css={styles.boardRow}>
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
          bingoSquare={Boolean(line?.includes(3))}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
          bingoSquare={Boolean(line?.includes(4))}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
          bingoSquare={Boolean(line?.includes(5))}
        />
      </div>
      <div css={styles.boardRow}>
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
          bingoSquare={Boolean(line?.includes(6))}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
          bingoSquare={Boolean(line?.includes(7))}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
          bingoSquare={Boolean(line?.includes(8))}
        />
      </div>
      <h4 css={styles.h4}>注：行:1,2,3 列:A,B,C</h4>
    </>
  );
}

type Bingo = ('X' | 'O' | null)[];

function calculateWinner(squares: Bingo) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let isDraw = true;

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i], isDraw: false };
    }
    console.log([squares[a], squares[b], squares[c]]);
    const hasX = [squares[a], squares[b], squares[c]].includes('X');
    const hasO = [squares[a], squares[b], squares[c]].includes('O');

    if (!(hasX && hasO)) {
      isDraw = false;
    }
  }

  if (isDraw) {
    return { winner: null, line: null, isDraw: true };
  }

  return { winner: null, line: null, isDraw: false };
}
