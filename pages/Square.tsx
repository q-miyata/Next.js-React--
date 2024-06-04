import { styles } from './_app.styles';
import { css } from '@emotion/react';

export default function Square({
  value,
  onSquareClick,
  bingoSquare,
}: {
  value: string;
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
