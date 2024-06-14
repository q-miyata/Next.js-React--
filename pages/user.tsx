import { GameProvider, useGameContext } from './GameContext';
import { styles } from './_app.styles';

export default function User() {
  //型エラー直せなかった
  const { user, icon } = useGameContext();
  return (
    <>
      <div css={styles.container}>
        <img src={icon} alt="User Icon" width={50} height={50} />
        <h3 css={styles.username}>Player: {user}</h3>
      </div>
    </>
  );
}
