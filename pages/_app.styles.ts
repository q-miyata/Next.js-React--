/** @jsxImportSource @emotion/react */
//このディレクティブをファイルの先頭に追加することで、そのファイル内で使用されるJSX要素に対して、特定のEmotionの設定を適用することができます。
import { css } from "@emotion/react";

export const styles = {
  square: css`
    background: #fff;
    border: 1px solid #999;
    float: left;
    font-size: 50px;
    font-weight: bold;
    line-height: 34px;
    height: 80px;
    margin-right: -1px;
    margin-top: -1px;
    padding: 0;
    text-align: center;
    width: 80px;
    
  `,
  emptySquare: css`
  :hover{
    background-color: #c0c0c0; 
  }`,
  board_row: css`
    &::after {
      clear: both;
      content: "";
      display: table;
    }
  `,
  game: css`
    display: flex;
    flex-direction: row;
  `,
  game_info: css`
    margin-left: 20px;
  `,
  status: css`
    margin-bottom: 10px;
    font: italic small-caps bold 16px/2 cursive;
    font-weight: bold;
    font-size:30px;
  `,
  description: css`
  font: italic small-caps bold 16px/2 cursive;
    margin:2px;
    font-size: 16px;
    color: white;
    background-color: black;
    cursor: default;
    :hover {
      background-color: white;
      color:black;

    }
  `,
  pageContainer: css
  `display:flex; 
  justify-content: center;
   align-items:center;
   height:100vh;
   background-color: pink;
   `
};
