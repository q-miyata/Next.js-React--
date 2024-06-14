import { useContext } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { GameProvider, useGameContext } from './GameContext';
import User from './user';

//Type Alias　を使用。 引数に直接定義しても良い。
type Props = {
  isDarkMode: boolean;
  setIsDarkMode: (checked: boolean) => void;
};

//今回はreact.fcを使わなかった
// const ToggleButton = ({ isDarkMode, setIsDarkMode }: Props) => {
const ToggleButton = () => {
  const { isDarkMode, setIsDarkMode } = useGameContext();
  const toggleDarkMode = (checked: boolean) => {
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
        // style={{ marginBottom: '2rem' }}
        checked={isDarkMode}
        onChange={toggleDarkMode}
        size={50}
      />
      <User />
    </div>
  );
};

export default ToggleButton;
