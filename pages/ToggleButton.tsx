import { DarkModeSwitch } from 'react-toggle-dark-mode';

//Type Alias　を使用。 引数に直接定義しても良い。

type Props = {
  isDarkMode: boolean;
  setIsDarkMode: (checked: boolean) => void;
};

//今回はreact.fcを使わなかった
const ToggleButton = ({ isDarkMode, setIsDarkMode }: Props) => {
  const toggleDarkMode = (checked: boolean) => {
    setIsDarkMode(checked);
  };

  return (
    <DarkModeSwitch
      style={{ marginBottom: '2rem' }}
      checked={isDarkMode}
      onChange={toggleDarkMode}
      size={50}
    />
  );
};

export default ToggleButton;
