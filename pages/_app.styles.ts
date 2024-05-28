/** @jsxImportSource @emotion/react */
//このディレクティブをファイルの先頭に追加することで、そのファイル内で使用されるJSX要素に対して、特定のEmotionの設定を適用することができます。
import { Global, css } from "@emotion/react";

//global の使い方がわからない

// export const global = css`
//         body{
//             height: 100%;
//         }`

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
    :hover{
        background-color: #efc;
    }
  `,
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
