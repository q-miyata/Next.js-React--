import { styles } from './_app.styles';
import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
} from 'react';
import Square from './Square';
import { BoardProps } from './Board';
const useCountDownInterval = (
  countTime: number | null,
  //関数型の引数  返り値もここで定義？
  //useState の状態更新関数を受け取っている
  setCountTime: (arg0: number | ((prevCountTime: number) => number)) => void,
  setWinner: (winner: 'X' | 'O' | null) => void,
  xIsNext: boolean
) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    //インターバルをまだスタートさせないため
    if (countTime === null) return;
    //以前に設定したインターバルがあるなら消去する
    if (intervalRef.current) {
      //プロパティに格納されているため
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      //1秒ごとにsetCountTime()を実行
      setCountTime((prevCountTime: number) => {
        if (prevCountTime === 0) {
          // 型アサーションを使用することで、TypeScriptコンパイラに対してintervalRef.currentの型がsetIntervalの戻り値の型であることを保証し、clearIntervalが適切に動作することを示しています
          clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
          //次のプレーヤーにするためXとOの順番入れ替えた。
          setWinner(xIsNext ? 'O' : 'X');
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
//countTimeはプロパティで、プロパティの型指定をしている
export const Timer = ({ countTime }: { countTime: number }) => {
  return <p>ゲーム残り時間: {countTime % 60}秒 </p>;
};

// type YonmokuProps = {
//   xIsNext: boolean;
//   squares: ('X' | 'O' | null)[];

//   onPlay: (nextSquares: ('X' | 'O' | null)[], i: number) => void;
// };

export default function YonmokuBoard({
  xIsNext,
  squares,
  onPlay,
  setWinner,
  winner,
}: BoardProps): JSX.Element {
  const [countTime, setCountTime] = useState<number>(5);

  //手番が変わった時に起こる処理　コンポーネント外に出したかったけど挫折
  useEffect(() => {
    setCountTime(5);
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

      onPlay(nextSquares, i);
    },
    [squares, xIsNext, onPlay, winner]
  );

  type WinnerLine = {
    winner: 'X' | 'O' | null;
    line: number[] | null;
    isDraw: boolean;
  };

  const {
    winner: calcWinner,
    line,
    isDraw,
  }: WinnerLine = calculateWinner(squares);

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
    status = 'Drawww';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <Timer countTime={countTime} />
      <div css={styles.status}>{status}</div>

      <div css={styles.yonmokuBoardRow}>
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
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
          bingoSquare={Boolean(line?.includes(3))}
        />
      </div>
      <div css={styles.yonmokuBoardRow}>
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
      </div>
      <div css={styles.yonmokuBoardRow}>
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
          bingoSquare={Boolean(line?.includes(8))}
        />
        <Square
          value={squares[9]}
          onSquareClick={() => handleClick(9)}
          bingoSquare={Boolean(line?.includes(9))}
        />
        <Square
          value={squares[10]}
          onSquareClick={() => handleClick(10)}
          bingoSquare={Boolean(line?.includes(10))}
        />
        <Square
          value={squares[11]}
          onSquareClick={() => handleClick(11)}
          bingoSquare={Boolean(line?.includes(11))}
        />
      </div>
      <div css={styles.yonmokuBoardRow}>
        <Square
          value={squares[12]}
          onSquareClick={() => handleClick(12)}
          bingoSquare={Boolean(line?.includes(12))}
        />
        <Square
          value={squares[13]}
          onSquareClick={() => handleClick(13)}
          bingoSquare={Boolean(line?.includes(13))}
        />
        <Square
          value={squares[14]}
          onSquareClick={() => handleClick(14)}
          bingoSquare={Boolean(line?.includes(14))}
        />
        <Square
          value={squares[15]}
          onSquareClick={() => handleClick(15)}
          bingoSquare={Boolean(line?.includes(15))}
        />
      </div>
      <h4 css={styles.h4}>注：行:1,2,3,4 列:A,B,C,D</h4>
    </>
  );
}

type bingo = ('X' | 'O' | null)[];

function calculateWinner(squares: bingo) {
  const lines = [
    // 横のライン
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],

    // 縦のライン
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],

    // 斜めのライン
    [0, 5, 10, 15],
    [3, 6, 9, 12],
  ];
  let isDraw = true;
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];

    const hasO = [squares[a], squares[b], squares[c], squares[d]].includes('O');
    const hasX = [squares[a], squares[b], squares[c], squares[d]].includes('X');

    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c] &&
      squares[a] === squares[d]
    ) {
      return { winner: squares[a], line: lines[i], isDraw: false };
    }
    if (!(hasO && hasX)) {
      isDraw = false;
    }
  }
  if (isDraw) {
    return { winner: null, line: null, isDraw: true };
  }
  return { winner: null, line: null, isDraw: false };
}
