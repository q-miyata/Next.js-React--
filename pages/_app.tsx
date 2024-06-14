import { useState } from 'react';
import ToggleButton from './ToggleButton';
import { lightTheme, darkTheme } from './_app.styles';
import { ThemeProvider, Global } from '@emotion/react';
import Game from './Game';
import { GameProvider, useGameContext } from './GameContext';
import User from './user';

const AppContent = () => {
  //const [isDarkMode, setIsDarkMode] = useState(false);
  const { isDarkMode, setIsDarkMode } = useGameContext();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const global = {
    body: {
      backgroundColor: theme.body.background,
      color: theme.body.color,
    },
  };
  return (
    <ThemeProvider theme={theme}>
      <Global styles={global} />
      <div css={theme}>
        <ToggleButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <User />
        <Game />
      </div>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
};

export default App;
