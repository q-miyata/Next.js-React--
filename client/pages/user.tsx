import { useContext } from 'react';
import { GameContext, GameProvider } from './GameContext';
import { styles } from './_app.styles';

export default function User() {
  // const { user, icon } = useGameContext();
  const context = useContext(GameContext);
  return (
    <>
      <div css={styles.container}>
        <img src={context?.icon} alt="User Icon" width={50} height={50} />
        <h3 css={styles.username}>Player: {context?.user}</h3>
      </div>
    </>
  );
}
