/** @jsxImportSource @emotion/react */
//このディレクティブをファイルの先頭に追加することで、そのファイル内で使用されるJSX要素に対して、特定のEmotionの設定を適用することができます。
import { styles } from "./_app.styles"
import { css } from "@emotion/react"
import { useState } from 'react';

//board から受け取る ({引数/props}:{引数/propsの型定義})
function Square({ value, onSquareClick, bingoSquare }:{ value: string; onSquareClick: () => void; bingoSquare: any} ) {
  const squareStyle = [styles.square]
//配列の後ろの要素がoverrideする。
  if(!value){
    squareStyle.push(styles.emptySquare);
  }
//true判定だったらビンゴの列に色をつける
 if(bingoSquare){
    squareStyle.push(styles.winLine);
 }
　//if(winner){}winner とlineを渡さないといけない
  return (
    <button css={squareStyle} onClick={onSquareClick}>
      {value}
    </button>
  );
};
// bingoSquare の型で怒られたので修正
type BoardProps = {
  xIsNext: boolean;
  squares: string[];
  onPlay: (nextSquares: string[]) => void;
};



function Board({ xIsNext, squares, onPlay }:BoardProps): JSX.Element {
  function handleClick(i: number) {
    if (calculateWinner(squares).winner || squares[i]) { //ここでスタックしてた
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }
  //オブジェクトにアクセス
  //const winner = calculateWinner(squares);
  //caluculatewinner関数でオブジェクトを返しているから
  const  {winner, line}=  calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
 console.log(winner, line);

  return (
    <>
   
      <div css={styles.status}>{status}</div>
     {/* squaresという配列をレンダリングしている 　インデックスで管理しているのはBoardコンポーネントだから
     bingoLine, "| null" を入れたら直った何で？*/}
      <div css={styles.boardRow}>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} bingoSquare={line?.includes(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} bingoSquare={line?.includes(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} bingoSquare={line?.includes(2)}/>
      </div>
      <div css={styles.boardRow}>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} bingoSquare={line?.includes(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} bingoSquare={line?.includes(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} bingoSquare={line?.includes(5)}/>
      </div>
      <div css={styles.boardRow}>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} bingoSquare={line?.includes(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} bingoSquare={line?.includes(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} bingoSquare={line?.includes(8)}/>
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares:string[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }


  function jumpTo(nextMove:number) :void{


    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button css={styles.description}onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div css={styles.pageContainer}>
{/* 以下、className="game-board"を削除 */}
      <div > 
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      {/* gameInfoを縦に並べたい */}
      <div css={styles.gameInfo}>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

//(引数の型)：{返り値の型}
function calculateWinner(squares: string[]) {
  //どのラインが色つくべきなのか情報を取得したい
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
      console.log({ winner: squares[a], line: lines[i] });
      return   { winner: squares[a], line: lines[i] }; //オブジェクトを返す
    }
  }
  return { winner: null, line: null };
    };