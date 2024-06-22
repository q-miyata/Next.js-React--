import { useContext, useState, memo, useEffect } from 'react';
import ToggleButton from './ToggleButton';
import { lightTheme, darkTheme } from './_app.styles';
import { ThemeProvider, Global } from '@emotion/react';
import Game from './Game';
import { useAtom } from 'jotai';
import {
  gameStateAtom,
  isDarkModeAtom,
  isXNextAtom,
  socketAtom,
} from './atoms';
import io from 'socket.io-client';

//AppコンポーネントでSocket.ioの接続を管理
const AppContent = memo(() => {
  const [socket, setSocket] = useAtom(socketAtom);
  const [squares, setSquares] = useAtom(gameStateAtom);
  const [isNext, setIsNext] = useAtom(isXNextAtom);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('move', (data) => {
      //共有したいデータを渡す
      setSquares(data.squares);
      setIsNext(data.isNext);
    });

    return () => {
      newSocket.close();
    };
  }, [setSocket, setSquares, setIsNext]);

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
