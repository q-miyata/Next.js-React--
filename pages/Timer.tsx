import { useState } from 'react';
import { useCountDownInterval } from './useCountDownInterval';

export const Timer = (xIsNext) => {
  const [countTime, setCountTime] = useState<number>(30);
  useCountDownInterval(countTime, setCountTime);

  function timeRanout()=>{
    let winner;
    if(xIsNext){
         winner = "X"; 
    
  }else{
    winner = "O";
  }

  return <p>Timer: {countTime % 60}秒 </p>;
};


