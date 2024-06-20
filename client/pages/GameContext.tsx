import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import io, { Socket } from 'socket.io-client';
import { SOCKET_URL } from '@/default';
//import EVENTS from '';

type GameContext = {
  isDarkMode?: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  user: string;
  icon: string;
  boardSize: null | number;
  setBoardSize: React.Dispatch<React.SetStateAction<number | null>>;
  countTime: number;
  setCountTime: React.Dispatch<React.SetStateAction<number>>;
  // icon: HTMLImageElement;
};

//socket i.o
interface Context {
  socket: Socket;
  setUsername: Function;
  messages?: { message: string; username: string; time: string }[];
  setMessages: Function;
}

//SOCKET_URLの中身のところに接続を要求
const socket = io(SOCKET_URL);

const SocketContext = createContext<Context>({
  socket,
  setUsername: () => false,
  setMessages: () => false,
});

export const SocketsProvier = (props: any) => {
  const [messages, setMessages] = useState([]);

  return (
    <SocketContext.Provider
      value={{ socket, messages, setMessages }}
      {...props}
    />
  );
};

export const useSockets = () => useContext(SocketContext);

// Contextの作成
//export const GameContext = createContext(false);
//ここの初期値と型定義のせいで被害を被っている
export const GameContext = createContext<GameContext | null>(null);

//カスタムフックを作成してコンテキストを利用
export const useGameContext = () => {
  const context = useContext(GameContext);
  //ここでタイプエラーnull対策をしている
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }

  return context;
};

//children の型タイプがわからない
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect((): void => {
    const darkModeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );
    setIsDarkMode(darkModeMediaQuery.matches);
  }, []);

  const user = 'bubu';
  const icon = '/images/user.icon.png';
  const [countTime, setCountTime] = useState<number>(7);
  const [boardSize, setBoardSize] = useState<number | null>(null);

  return (
    <GameContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
        user,
        icon,
        boardSize,
        countTime,
        setCountTime,
        setBoardSize,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
