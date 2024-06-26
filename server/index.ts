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

const initialSquare = Array(9).fill(null);
let globalState = {
  playerX: '',
  playerO: '',
  boardSize: 3,
  squares: initialSquare,
  currentTurn: 'X'
}


//let currentSquares = Array(9).fill(null);

//io.onはサーバー全体に対してイベントリスナーを設定
io.on('connection', (socket) => {
  console.log('a user connected', socket.conn.id);

  console.log('socket.conn ', socket.id);
  // console.log(socket.conn);
  console.log(socket.conn.server.clientsCount);
  if (globalState.playerX  === '') {
    globalState.playerX = socket.id;
    console.log(globalState);
  } else if (globalState.playerO === '') {
    globalState.playerO = socket.id;
    console.log(globalState);
  } else {
    console.info(`the room is full`);
  }

  // console.log(socket.conn.server.clients);


  socket.on('selectboard', (data) => {
    console.log('selectboard 2223333', data);
    globalState.boardSize = data.boardSize;
    io.emit('setboard', { boardSize: globalState.boardSize });
    io.to(globalState.playerX).emit('setplayer', { playerSymbol: 'X'})
    io.to(globalState.playerO).emit('setplayer', { playerSymbol: 'O' })
    io.emit('setturn', { turn: globalState.currentTurn})
  })

  socket.on('move', ({coordinate, player}) => {
    console.log('11server move ', coordinate, player);
    const nextTurn = player === 'X' ? 'O' : 'X';
    globalState.currentTurn = nextTurn;
    console.log(globalState);

    io.emit('setturn', { turn: globalState.currentTurn});
  })

  socket.on('resetplayers', () => {
    globalState.playerX = '';
    globalState.playerO = '';
    console.log(globalState);
  });


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
