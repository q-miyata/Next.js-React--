/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { styles } from './_app.styles';
import { css } from '@emotion/react';
import Board from './Board';

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: string[], i: number) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    console.log(i);
  }

  function jumpTo(nextMove: number): void {
    setCurrentMove(nextMove);
  }
  //以下新しい履歴配列からインデックス取ろうとしたけど無理と気づいた。
  //  function findCoordinate (nextSquares){
  //     nextSquares.map((singleSquare,i) =>{
  //         let = i
  //     })
  //     return (
  // let = i
  //     )
  //  };

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      //とりあえずインデックスを表示させたい
      description = 'Go to move #' + move + 'index';
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
