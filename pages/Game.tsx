/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { styles } from './_app.styles';
import { css } from '@emotion/react';
import Board from './Board';

//type SquareType = string | null;

export default function Game() {
  //下記、historyにindexプロパティを持たせている（オブジェクトにしている）indexも履歴と一緒に残しておきたい
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), index: null },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  //下記インデックスを渡す試み
  //const [pushedI, setpushedI] = useState<number | null>(null);
  //moveは動いた回数
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
    if (move > 0) {
      //とりあえずインデックスを表示させたい
      description = `Go to move #${move} , index: ${step.index}`;
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
