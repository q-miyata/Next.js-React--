/** @jsxImportSource @emotion/react */
//このディレクティブをファイルの先頭に追加することで、そのファイル内で使用されるJSX要素に対して、特定のEmotionの設定を適用することができます。
import { Global, css } from "@emotion/react";

// export const global = css`
//         body{
            
//         }`

export const styles = {
    square:css`
    background: #fff;
    border: 1px solid #999;
    float: left;
    font-size: 24px;
    font-weight: bold;
    line-height: 34px;
    height: 34px;
    margin-right: -1px;
    margin-top: -1px;
    padding: 0;
    text-align: center;
    width: 34px;
        `,
    board_row:css`
    &::after {
        clear: both;
        content: '';
        display: table;
      }
    `,
    game:css`
    display: flex;
    flex-direction: row;
    `,
    game_info:css`
    margin-left: 20px;
    `,
    status:css`
    margin-bottom: 10px;`
};

