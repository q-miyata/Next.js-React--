import React, { createContext, useContext, useState } from 'react';

// Contextの作成
export const GameContext = createContext(false);

// カスタムフックを作成してコンテキストを利用
export const useGameContext = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <GameContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </GameContext.Provider>
  );
};
