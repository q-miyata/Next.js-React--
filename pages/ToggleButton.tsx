import { useContext } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
//import { GameContext, GameProvider } from './GameContext';
import { useAtom } from 'jotai';
import { isDarkModeAtom } from './atoms';
import User from './user';

//Type Alias　を使用。 引数に直接定義しても良い。
type Props = {
  isDarkMode: boolean;
  setIsDarkMode: (checked: boolean) => void;
};

//今回はreact.fcを使わなかった
// const ToggleButton = ({ isDarkMode, setIsDarkMode }: Props) => {
const ToggleButton = () => {
  //const context = useContext(GameContext);
  const [isDarkMode, setIsDarkMode] = useAtom(isDarkModeAtom);
  const toggleDarkMode = (checked: boolean) => {
    //context?.setIsDarkMode(checked);
    setIsDarkMode(checked);
  };

  return (
    <div
      css={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <DarkModeSwitch
        //checked={context?.isDarkMode as boolean}
        checked={isDarkMode}
        onChange={toggleDarkMode}
        size={50}
      />
      <User />
    </div>
  );
};

export default ToggleButton;
