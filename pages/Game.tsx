import {
  useState,
  memo,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from 'react';
import { styles } from './_app.styles';

import Board from './Board';
import { Timer } from './Timer';
import YonmokuBoard from './YonmokuBoard';
import { GameContext, useGameContext } from './GameContext';

type HistoryObject = {
  squares: ('X' | 'O' | null)[];
  index: number | undefined;
};

const Game = () => {
  const context = useContext(GameContext);
  const [winner, setWinner] = useState<'O' | 'X' | null>(null);
  // const [countTime, setCountTime] = useState<number>(5);
  const { countTime, setCountTime } = useGameContext();
  //ボード選択
  //const [boardSize, setBoardSize] = useState<number | null>(null);
  const { boardSize, setBoardSize } = useGameContext();
  // const boardSize = context?.boardSize;
  //?.で存在しなければundefinedを返す
  //const setBoardSize = context?.setBoardSize;
  const handleBoardSelection = useCallback(
    (size: number) => {
      //undefinedが出たときの対策
      if (setBoardSize) {
        setBoardSize(size);
      }
    },
    [setBoardSize]
  );

  const [history, setHistory] = useState<HistoryObject[]>([
    {
      //boardSize がnull だった場合　0を返す
      squares: Array(Math.pow(boardSize || 0, 2)).fill(null),
      index: undefined,
    },
  ]);
  const [currentMove, setCurrentMove] = useState<number>(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  const handlePlay = useCallback(
    (nextSquares: ('X' | 'O' | null)[], i: number) => {
      const nextHistory = [
        ...history.slice(0, currentMove + 1),
        { squares: nextSquares, index: i },
      ];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
    },
    [history, currentMove]
  );

  const jumpTo = useCallback((nextMove: number) => {
    setWinner(null);
    setCurrentMove(nextMove);
    //これで同じプレーヤーの履歴に帰っても秒数が回復する
    if (setCountTime) {
      setCountTime(7);
    }
  }, []);

  const moves = useMemo(() => {
    return history.map((step, move) => {
      let description;
      if (boardSize) {
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
      }
    });
  }, [history, boardSize, jumpTo]);

  const Move = useMemo(() => {
    return (
      <div css={styles.gameInfo}>
        <ol>{moves}</ol>
      </div>
    );
  }, [moves]);

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
          ) : (
            <Board
              xIsNext={xIsNext}
              squares={currentSquares}
              onPlay={handlePlay}
              winner={winner}
              setWinner={setWinner}
              size={boardSize}
              // countTime={countTime}
              // setCountTime={setCountTime}
            />
          )}
        </div>
      </div>
      {Move}
      {/* <div css={styles.gameInfo}>
        <ol>{moves}</ol>
      </div> */}
    </div>
  );
};

export default memo(Game);

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
// export default memo(function Game() {
//   const [winner, setWinner] = useState<'O' | 'X' | null>(null);
//   const [countTime, setCountTime] = useState<number>(5);

//   //ボード選択
//   const [boardSize, setBoardSize] = useState<number | null>(null);
//   const handleBoardSelection = (size: number): void => {
//     setBoardSize(size);
//   };

//   const [history, setHistory] = useState<HistoryObject[]>([
//     {
//       //boardSize がnull だった場合　0を返す
//       squares: Array(Math.pow(boardSize || 0, 2)).fill(null),
//       index: undefined,
//     },
//   ]);
//   const [currentMove, setCurrentMove] = useState<number>(0);

//   const xIsNext = currentMove % 2 === 0;
//   const currentSquares = history[currentMove].squares;
//   function handlePlay(nextSquares: ('X' | 'O' | null)[], i: number) {
//     const nextHistory = [
//       ...history.slice(0, currentMove + 1),
//       { squares: nextSquares, index: i },
//     ];

//     setHistory(nextHistory);
//     setCurrentMove(nextHistory.length - 1);
//   }

//   function jumpTo(nextMove: number): void {
//     setWinner(null);
//     setCurrentMove(nextMove);
//     //これで同じプレーヤーの履歴に帰っても秒数が回復する
//     setCountTime(7);
//   }

//   const moves = history.map((step, move) => {
//     let description;

//     const coordinate = indexToCoordinate(step.index, boardSize);

//     if (move > 0) {
//       description = `Go to move #${move}  ${coordinate}`;
//     } else if (move === 0) {
//       description = 'Go to game start';
//     } else {
//       description = '';
//     }
//     //ここでsetTimeしたい
//     return (
//       <li key={move}>
//         <button css={styles.description} onClick={() => jumpTo(move)}>
//           {description}
//         </button>
//       </li>
//     );
//   });

//   return (
//     <div css={styles.pageContainer}>
//       <div>
//         <div>
//           {boardSize === null ? (
//             <div>
//               <button
//                 css={styles.button}
//                 onClick={() => handleBoardSelection(3)}
//               >
//                 board ３✖︎３
//               </button>
//               <button
//                 css={styles.button}
//                 onClick={() => handleBoardSelection(4)}
//               >
//                 board ４✖︎４
//               </button>
//             </div>
//           ) : boardSize === 3 ? (
//             <Board
//               xIsNext={xIsNext}
//               squares={currentSquares}
//               onPlay={handlePlay}
//               winner={winner}
//               setWinner={setWinner}
//               size={boardSize}
//               countTime={countTime}
//               setCountTime={setCountTime}
//             />
//           ) : (
//             <YonmokuBoard
//               xIsNext={xIsNext}
//               squares={currentSquares}
//               onPlay={handlePlay}
//               winner={winner}
//               setWinner={setWinner}
//               size={boardSize}
//               countTime={countTime}
//               setCountTime={setCountTime}
//             />
//           )}
//         </div>
//       </div>
//       <div css={styles.gameInfo}>
//         <ol>{moves}</ol>
//       </div>
//     </div>
//   );
// });

// //index refers to step.index in Board function
// //size refers to boardSize in Board function

// function indexToCoordinate(
//   index: number | undefined,
//   size: number | null
// ): String {
//   let horizontalLine = '';
//   let verticalLine = '';
//   if (index === undefined) {
//     return '';
//   }
//   if (size === 3) {
//     //Determine horizontal line
//     let row = ['1', '2', '3'];

//     horizontalLine = row[Math.floor(index / 3)];

//     //Determin vertacal line
//     if (index % 3 === 0) {
//       verticalLine = 'A';
//     } else if (index % 3 === 1) {
//       verticalLine = 'B';
//     } else if (index % 3 === 2) {
//       verticalLine = 'C';
//     } else {
//       return '';
//     }
//   } else if (size === 4) {
//     let row = ['1', '2', '3', '4'];
//     let column = ['A', 'B', 'C', 'D'];
//     verticalLine = column[index % 4];
//     horizontalLine = row[Math.floor(index / 4)];
//   } else if (size === null) {
//     return '';
//   }

//   return verticalLine + horizontalLine;
// }
