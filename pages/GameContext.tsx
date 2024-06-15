import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

type GameContext = {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  user: string;
  icon: string;
  // icon: HTMLImageElement;
};

// Contextの作成
//export const GameContext = createContext(false);
export const GameContext = createContext<GameContext | undefined>(undefined);

// カスタムフックを作成してコンテキストを利用
export const useGameContext = (): GameContext | undefined => {
  // return useContext(GameContext);
  const context = useContext(GameContext);
  return context;
};

//children の型タイプがわからない
export const GameProvider = ({ children }: any) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect((): void => {
    const darkModeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );
    setIsDarkMode(darkModeMediaQuery.matches);
  }, []);

  const user = 'bubu';
  const icon = '/images/user.icon.png';
  return (
    <GameContext.Provider value={{ isDarkMode, setIsDarkMode, user, icon }}>
      {children}
    </GameContext.Provider>
  );
};
