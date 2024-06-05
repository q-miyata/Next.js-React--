import { styles } from './_app.styles';

export default function Square({
  value,
  onSquareClick,
  bingoSquare,
}: {
  value: 'X' | 'O' | null;
  onSquareClick: () => void;
  bingoSquare: boolean | undefined;
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
