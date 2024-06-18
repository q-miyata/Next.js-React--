import { useContext, useState } from 'react';
import ToggleButton from './ToggleButton';
import { lightTheme, darkTheme } from './_app.styles';
import { ThemeProvider, Global } from '@emotion/react';
import Game from './Game';
import { GameContext, GameProvider } from './GameContext';
import User from './user';

const AppContent = () => {
  const context = useContext(GameContext);
  //const [isDarkMode, setIsDarkMode] = useState(false);
  // const { isDarkMode, setIsDarkMode } = useGameContext();
  const theme = context?.isDarkMode ? darkTheme : lightTheme;
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
        <ToggleButton />

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
