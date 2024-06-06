import { useState } from 'react';
import { styles } from './_app.styles';

import Board from './Board';

type historyObject = {
  squares: ('X' | 'O' | null)[];
  index: number | undefined;
};

export default function Game() {
  const [history, setHistory] = useState<historyObject[]>([
    { squares: Array(9).fill(null), index: undefined },
  ]);
  const [currentMove, setCurrentMove] = useState<number>(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function handlePlay(nextSquares: ('X' | 'O' | null)[], i: number) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, index: i },
    ];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    console.log(i);
  }

  function jumpTo(nextMove: number): void {
    setCurrentMove(nextMove);
  }

  const moves = history.map((step, move) => {
    let description;

    const coordinate = indexToCoordinate(step.index);

    if (move > 0) {
      description = `Go to move #${move}  ${coordinate}`;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button css={styles.description} onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });

  return (
    <div css={styles.pageContainer}>
      <div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div css={styles.gameInfo}>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function indexToCoordinate(index: number | undefined): String {
  let horizontalLine = '';
  let verticalLine = '';
  if (index === undefined) {
    return '';
  }

  //Determine horizontal line
  let row = ['1', '2', '3'];

  horizontalLine = row[Math.floor(index / 3)];

  //Determin vertacal line
  if (index % 3 === 0) {
    verticalLine = 'A';
  } else if (index % 3 === 1) {
    verticalLine = 'B';
  } else if (index % 3 === 2) {
    verticalLine = 'C';
  } else {
    return '';
  }

  return verticalLine + horizontalLine;
}
