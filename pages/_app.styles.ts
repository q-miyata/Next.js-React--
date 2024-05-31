/** @jsxImportSource @emotion/react */
//このディレクティブをファイルの先頭に追加することで、そのファイル内で使用されるJSX要素に対して、特定のEmotionの設定を適用することができます。
import { css } from "@emotion/react";

export const lightTheme = css`
  body {
    color: black;
    background-color: white;
  }
`;

export const darkTheme = css`
  body {
    color: white;
    background-color: black;
  }
`;

//  export const global = 
//    css`
//   body{
//     color: black !important;
//   }
  
// `;


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
　winLine: css`
  background-color: yellow;
`,

  //boardRowの中身を消しても支障ない（たぶん）
    boardRow:css`
    //display: flex;
    //flex-direction: row; rowにすると横に並ぶ
    display: grid;
    grid-template-rows: 80px;
    grid-template-columns: 80px 80px 80px; this seems to work right
   
  `,
  game: css`
 
  `,
  gameInfo: css`
    margin-left: 20px;
    @media (max-width: 767px){
      padding-top: 30px;
    }
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
  pageContainer: css`

  @media (min-width:768px){
    height:100vh;
    display: grid;
    grid-template-columns: auto auto; 
    justify-content: center; 
    align-items: center; 
  }
   
   @media (max-width: 767px) {
    height:100vh;
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-rows: auto auto;
   }
   `
};
