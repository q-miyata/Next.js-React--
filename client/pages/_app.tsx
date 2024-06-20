import { useContext, useState, memo, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import ToggleButton from './ToggleButton';
import { lightTheme, darkTheme } from './_app.styles';
import { ThemeProvider, Global } from '@emotion/react';
import Game from './Game';
import {
  GameContext,
  GameProvider,
  SocketsProvier,
  useSockets,
} from './GameContext';

const Messages = () => {
  const { messages } = useSockets();
  return (
    <>
      {messages && (
        <div>
          {messages.map(({ message }, index) => (
            <li key={index}>{message}</li>
          ))}
        </div>
      )}
    </>
  );
};

const AppContent = memo(() => {
  const { socket, messages, setMessages } = useSockets();
  const messageRef = useRef(null);

  useEffect(() => {
    const handleResponseMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on('responseMessage', handleResponseMessage);

    return () => {
      socket.off('responseMessage', handleResponseMessage);
    };
  }, [socket, setMessages]);

  const handleClick = () => {
    const message = messageRef.current.value;
    if (!String(message).trim()) return;

    socket.emit('sendMessage', message);
    messageRef.current.value = '';
  };

  const context = useContext(GameContext);
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
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          ...theme,
        }}
      >
        <div
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <ToggleButton />
          <input type="text" ref={messageRef} placeholder="write message" />
          <button onClick={handleClick}>Send</button>
        </div>
        <Messages />
        <Game />
      </div>
    </ThemeProvider>
  );
});

const App = () => {
  return (
    <SocketsProvier>
      <GameProvider>
        <AppContent />
      </GameProvider>
    </SocketsProvier>
  );
};

export default App;
