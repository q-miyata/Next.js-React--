import { useState } from 'react';
import { styles } from './_app.styles';
//import { css } from '@emotion/react';
import Board from './Board';

export default function Game() {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), index: null },
  ]);
  const [currentMove, setCurrentMove] = useState(0);

  //const [pushedI, setpushedI] = useState<number | null>(null);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function handlePlay(nextSquares: string[], i: number) {
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

  //stepオブジェクトを持ってくる
  const moves = history.map((step, move) => {
    let description;

    const coordinate = indexToCoordinate(step.index);

    if (move > 0) {
      //この中で取得したインデックスを変更

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
      {/* 以下、className="game-board"を削除 */}
      <div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div css={styles.gameInfo}>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

//just for now
function indexToCoordinate(index: number): any {
  if (index <= 2) {
    return 'A' + (index + 1);
  }
  if (index <= 5) {
    return 'B' + (index - 2);
  }
  if (index <= 8) {
    return 'C' + (index - 5);
  }
}
