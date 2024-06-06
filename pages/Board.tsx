import { styles } from './_app.styles';

import Square from './Square';

type BoardProps = {
  xIsNext: boolean;
  squares: ('X' | 'O' | null)[];
  onPlay: (nextSquares: ('X' | 'O' | null)[], i: number) => void;
};

export default function Board({
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
    console.log(nextSquares);
  }

  type WinnerLine = {
    winner: 'X' | 'O' | null;
    line: number[] | null;
  };

  const { winner, line }: WinnerLine = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return { winner: null, line: null };
}
