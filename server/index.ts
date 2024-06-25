import { Socket } from 'socket.io-client';

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);

//ioインスタンス作成（サーバーを渡す）
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

let initialSquares = Array(9).fill(null);
let gameState = { test: '', player1: '', player2: '', squares: initialSquares };

//io.onはサーバー全体に対してイベントリスナーを設定
io.on('connection', (socket) => {
  console.log('a user connected');
  console.log(socket.client.conn.id);

  io.emit('init', gameState.squares);

  //socket.onは個々のクライアント接続に使われる。
  //onは受信
  //通常io.on内で使用される。

  //クライアントから受信
  socket.on('send_squares', (squares) => {
    // console.log('sqquares received: ', squares);

    //クライアントにデータを送信 ioかsocketどっち？
    io.emit('received_squares', squares);
  });

  socket.on('send_xIsNextCurrentMove', ({ xIsNext, currentMove }) => {
    console.log('I got data', { xIsNext, currentMove });

    io.emit('send_xIsNextCurrentMove', {
      receivedMove: currentMove,
      receivedXIsNext: xIsNext,
    });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});
