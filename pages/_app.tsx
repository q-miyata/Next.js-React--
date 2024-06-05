import { useState } from 'react';
import ToggleButton from './ToggleButton';
import { lightTheme, darkTheme } from './_app.styles';
import { ThemeProvider, Global } from '@emotion/react';
import Game from './Game';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

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
        <Game />
      </div>
    </ThemeProvider>
  );
};

export default App;
