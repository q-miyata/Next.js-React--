// import React, {
//   ReactNode,
//   createContext,
//   useContext,
//   useState,
//   useEffect,
// } from 'react';

// type GameContext = {
//   isDarkMode?: boolean;
//   setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
//   user: string;
//   icon: string;
//   boardSize: null | number;
//   setBoardSize: React.Dispatch<React.SetStateAction<number | null>>;
//   countTime: number;
//   setCountTime: React.Dispatch<React.SetStateAction<number>>;
//   // icon: HTMLImageElement;
// };

// // Contextの作成
// //export const GameContext = createContext(false);
// //ここの初期値と型定義のせいで被害を被っている
// export const GameContext = createContext<GameContext | null>(null);

// //カスタムフックを作成してコンテキストを利用
// export const useGameContext = () => {
//   const context = useContext(GameContext);
//   //ここでタイプエラーnull対策をしている
//   if (!context) {
//     throw new Error('useGameContext must be used within a GameProvider');
//   }

//   return context;
// };

// //children の型タイプがわからない
// export const GameProvider = ({ children }: { children: ReactNode }) => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect((): void => {
//     const darkModeMediaQuery = window.matchMedia(
//       '(prefers-color-scheme: dark)'
//     );
//     setIsDarkMode(darkModeMediaQuery.matches);
//   }, []);

//   const user = 'bubu';
//   const icon = '/images/user.icon.png';
//   const [countTime, setCountTime] = useState<number>(7);
//   const [boardSize, setBoardSize] = useState<number | null>(null);

//   return (
//     <GameContext.Provider
//       value={{
//         isDarkMode,
//         setIsDarkMode,
//         user,
//         icon,
//         boardSize,
//         countTime,
//         setCountTime,
//         setBoardSize,
//       }}
//     >
//       {children}
//     </GameContext.Provider>
//   );
// };
