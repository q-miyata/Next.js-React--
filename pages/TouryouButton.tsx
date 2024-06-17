type TouryouButtonProps = {
  setWinner: (winner: 'X' | 'O' | null) => void;
  xIsNext: boolean;
  //setCountTimeの関数として受け取る型定義を消した
  setCountTime: (valiue: number) => void;
};

const TouryouButton: React.FC<TouryouButtonProps> = ({
  setWinner,
  xIsNext,
  setCountTime,
}) => {
  const surrender = () => {
    //xIsNext の中身を逆にした
    setWinner(xIsNext ? 'O' : 'X');
    setCountTime(0);
  };

  return <button onClick={surrender}>降参します</button>;
};

export default TouryouButton;
