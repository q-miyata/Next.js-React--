import { styles } from './_app.styles';
// import { css } from '@emotion/react';

export default function Square({
  value,
  onSquareClick,
  bingoSquare,
}: {
  //下記、null を足すべき？
  value: 'X' | 'O';
  onSquareClick: () => void;
  bingoSquare: any;
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
}
