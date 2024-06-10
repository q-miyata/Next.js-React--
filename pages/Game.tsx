import { useState, memo } from 'react';
import { styles } from './_app.styles';

import Board from './Board';
import YonmokuBoard from './YonmokuBoard';

type HistoryObject = {
  squares: ('X' | 'O' | null)[];
  index: number | undefined;
};

export default memo(function Game() {
  const [history, setHistory] = useState<HistoryObject[]>([
    { squares: Array(9).fill(null), index: undefined },
  ]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  console.log('Game called');
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  //ボード選択
  const [boardSize, setBoardSize] = useState<number | null>(null);
  const handleBoardSelection = (size: number): void => {
    setBoardSize(size);
  };

  function handlePlay(nextSquares: ('X' | 'O' | null)[], i: number) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, index: i },
    ];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number): void {
    setCurrentMove(nextMove);
  }

  const moves = history.map((step, move) => {
    let description;

    const coordinate = indexToCoordinate(step.index, boardSize);

    if (move > 0) {
      description = `Go to move #${move}  ${coordinate}`;
    } else if (move === 0) {
      description = 'Go to game start';
    } else {
      description = '';
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
        <div>
          {boardSize === null ? (
            <div>
              <button
                css={styles.button}
                onClick={() => handleBoardSelection(3)}
              >
                board ３✖︎３
              </button>
              <button
                css={styles.button}
                onClick={() => handleBoardSelection(4)}
              >
                board ４✖︎４
              </button>
            </div>
          ) : boardSize === 3 ? (
            <Board
              xIsNext={xIsNext}
              squares={currentSquares}
              onPlay={handlePlay}
            />
          ) : (
            <YonmokuBoard
              xIsNext={xIsNext}
              squares={currentSquares}
              onPlay={handlePlay}
            />
          )}
        </div>
      </div>
      <div css={styles.gameInfo}>
        <ol>{moves}</ol>
      </div>
    </div>
  );
});

//index refers to step.index in Board function
//size refers to boardSize in Board function

function indexToCoordinate(
  index: number | undefined,
  size: number | null
): String {
  let horizontalLine = '';
  let verticalLine = '';
  if (index === undefined) {
    return '';
  }
  if (size === 3) {
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
  } else if (size === 4) {
    let row = ['1', '2', '3', '4'];
    let column = ['A', 'B', 'C', 'D'];
    verticalLine = column[index % 4];
    horizontalLine = row[Math.floor(index / 4)];
  } else if (size === null) {
    return '';
  }

  return verticalLine + horizontalLine;
}
