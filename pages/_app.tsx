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
    //Socket.IOのインスタンスを作成し、サーバーに接続
    const newSocket = io('http://localhost:3001');

    // 接続が確立された後、このインスタンスをAtomにセット
    setSocket(newSocket);

    // サーバーからの受信をリッスン
    newSocket.on('connect', () => {
      console.log('connected to server');
    });

    //サーバーから受け取ったスクエアをsetするから

    newSocket.on('received_squares', (squares) => {
      console.log('received:', squares);

      // setSquares(squares);これを開けると無限ループになる
    });

    // コンポーネントがアンマウントされるときにSocketを切断
    return () => {
      newSocket.disconnect();
    };
  }, [setSocket, setSquares]);

  // squaresの変更をサーバーに送信
  useEffect(() => {
    if (socket) {
      console.log('squares has sent');
      //サーバーへ送信
      socket.emit('send_squares', squares);
    }
  }, [socket, squares]);

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
  return <AppContent />;
};

export default App;
