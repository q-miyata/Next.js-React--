import { styles } from './_app.styles';
import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
  memo,
} from 'react';
import Square from './Square';
import { BoardProps } from './Board';
import TouryouButton from './TouryouButton';
import { useCountDownInterval, Timer } from './Timer';
import { useGameContext } from './GameContext';

export default memo(function YonmokuBoard({
  xIsNext,
  squares,
  onPlay,
  setWinner,
  winner,
  size,
}: // countTime,
// setCountTime,
BoardProps): JSX.Element {
  //const [countTime, setCountTime] = useState<number>(5);
  const { countTime, setCountTime } = useGameContext();
  //手番が変わった時に起こる処理　コンポーネント外に出したかったけど挫折
  useEffect(() => {
    setCountTime(60);
  }, [xIsNext]);
  //useStateをparameterに渡すことでuseEffectをrunする
  useCountDownInterval(countTime, setCountTime, setWinner, xIsNext);

  const handleClick = useCallback(
    (i: number) => {
      const filledSquares = squares[i];

      if (winner || filledSquares || isDraw) {
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
  }: WinnerLine = calculateWinner(squares, size);

  //挿入　もし勝者が配列によって決まったならそっちを出す（すぐに実行しないで、依存値が変わるまで待つ）
  useEffect(() => {
    if (calcWinner) {
      setWinner(calcWinner);
    }
  }, [calcWinner]);
  const status = useMemo(() => {
    if (winner) {
      setCountTime(0);
      return 'Winner: ' + winner;
    } else if (isDraw) {
      setCountTime(0);
      return 'Draw';
    } else {
      return 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
  }, [winner, isDraw, xIsNext]);

  //{/* <div css={styles.status}>{status}</div> */}
  const Status = () => {
    return <div css={styles.status}>{status}</div>;
  };

  const Annotation = () => {
    return <h4 css={styles.h4}>注：行:1,2,3 列:A,B,C</h4>;
  };

  const renderSquare = (i: number) => {
    return (
      <Square
        value={squares[i]}
        onSquareClick={() => handleClick(i)}
        bingoSquare={Boolean(line?.includes(i))}
      />
    );
  };

  const boardRows = useMemo(() => {
    //行を作っている Array.fromメソッドで指定された長さの配列を作っている。
    //最初のreturnでネストされた配列を返している
    return Array.from({ length: size }).map((_, row) => {
      //列を作ってる
      //各列ごとにrendersquare()を呼び出している
      const squaresInRow = Array.from({ length: size }).map((_, col) =>
        //指定された位置に関数を呼び出している。
        renderSquare(row * size + col)
      );
      return (
        <div key={row} style={{ display: 'flex' }}>
          {squaresInRow}
        </div>
      );
    });
  }, [size, squares, handleClick]);

  return (
    <>
      <Timer countTime={countTime} />
      <Status />
      <TouryouButton
        setWinner={setWinner}
        xIsNext={xIsNext}
        setCountTime={setCountTime}
      />
      <div>{boardRows}</div>
      <Annotation />
    </>
  );
});

type Bingo = ('X' | 'O' | null)[];

function calculateWinner(squares: Bingo, size: number) {
  const findWinningLines = (squares: Bingo) => {
    //const size = Math.sqrt(squares.length);

    const range = [...Array(size).keys()];

    const rows = range.map((i) => range.map((j) => i * size + j));
    const columns = range.map((i) => range.map((j) => j * size + i));
    const taikakusen = [
      range.map((i) => i * size + i),
      range.map((i) => (i + 1) * size - (i + 1)),
    ];
    return [...rows, ...columns, ...taikakusen];
  };

  let lines = findWinningLines(squares);

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

    if (!(hasX && hasO)) {
      isDraw = false;
    }
  }
  if (isDraw) {
    return { winner: null, line: null, isDraw: true };
  }
  return { winner: null, line: null, isDraw: false };
}
