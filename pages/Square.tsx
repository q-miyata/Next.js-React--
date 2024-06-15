import { styles } from './_app.styles';
import { memo } from 'react';
import React from 'react';

//memo化されたhandleclick関数を引数として受け取ってる
export default React.memo(function Square({
  value,
  onSquareClick,
  bingoSquare,
}: {
  value: 'X' | 'O' | null;
  onSquareClick: () => void;
  bingoSquare: boolean;
}) {
  const squareStyle = [styles.square];

  if (!value) {
    squareStyle.push(styles.emptySquare);
  }
  if (bingoSquare) {
    squareStyle.push(styles.winLine);
  }
  return (
    <button css={squareStyle} onClick={onSquareClick}>
      {value}
    </button>
  );
});
