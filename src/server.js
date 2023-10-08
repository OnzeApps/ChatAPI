const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors')


const {
  database
} = require('./database/database');


const app = express()

const server = http.createServer();
const io = new socketIo.Server(server, {
  cors: {
    origin: "*"
  }
});

app.use(express.static(__dirname + '/src/client'));

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '..', 'src/client', 'index.html'));
})

const db = database();


io.on('connection', (socket) => {

  db.all('SELECT * FROM messages', [], function (err, row) {
    row.forEach((rows) => {
      io.emit('chat-message', {
        msg: rows.msg
      });
    })
  });

  socket.on('chat-message', (data) => {
    io.emit('chat-message', {
      msg: data.msg
    });
    db.run('INSERT INTO messages (msg) VALUES (?)', data.msg)
  })


  socket.on('disconnect', () => {
    console.log('User desconnected.');
  })
})

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`)
})