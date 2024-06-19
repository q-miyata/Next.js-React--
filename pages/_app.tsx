import { useContext, useState, memo } from 'react';
import ToggleButton from './ToggleButton';
import { lightTheme, darkTheme } from './_app.styles';
import { ThemeProvider, Global } from '@emotion/react';
import Game from './Game';

import User from './user';
import { useAtom } from 'jotai';
import { isDarkModeAtom } from './atoms';

const AppContent = memo(() => {
  const [isDarkMode] = useAtom(isDarkModeAtom);
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
        <ToggleButton />

        <Game />
      </div>
    </ThemeProvider>
  );
});

const App = () => {
  return (
    // <GameProvider>
    <AppContent />
    //</GameProvider>
  );
};

export default App;
