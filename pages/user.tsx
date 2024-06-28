import { useContext } from 'react';
//import { GameContext, GameProvider } from './GameContext';
import { styles } from './_app.styles';
import { useAtom } from 'jotai';
import { userAtom, iconAtom } from './atoms';

export default function User() {
  // const { user, icon } = useGameContext();
  //const context = useContext(GameContext);
  const [user] = useAtom(userAtom);
  const [icon] = useAtom(iconAtom);
  return (
    <>
      <div css={styles.container}>
        <img src={icon} alt="User Icon" width={50} height={50} />
        <h3>Player: {user}</h3>
        {/* // <img src={context?.icon} alt="User Icon" width={50} height={50} />
       // <h3 css={styles.username}>Player: {context?.user}</h3> */}
      </div>
    </>
  );
}
