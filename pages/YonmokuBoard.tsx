//四目並べ、特に履歴変えなくても問題ないっぽい？
import { styles } from './_app.styles';

import Square from './Square';

type BoardProps = {
  xIsNext: boolean;
  squares: ('X' | 'O' | null)[];
  //オブジェクトを受け取る
  onPlay: (nextSquares: ('X' | 'O' | null)[], i: number) => void;
};

export default function YonmokuBoard({
  xIsNext,
  squares,
  onPlay,
}: BoardProps): JSX.Element {
  function handleClick(i: number) {
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    onPlay(nextSquares, i);
  }

  const { winner, line }: { winner: 'X' | 'O' | null; line: number[] | null } =
    calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
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

// type line = number[] | null;　後で削除する

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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c] &&
      squares[a] === squares[d]
    ) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return { winner: null, line: null };
}
