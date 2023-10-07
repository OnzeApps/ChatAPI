const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const {
  database
} = require('./database/database');


const app = express()
const server = http.createServer(app);

const io = socketIo(server);

app.use(express.static(__dirname + '/src/client'));

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '..', 'src/client', 'index.html'));
})


io.on('connection', (socket) => {

  const db = database();

  db.all('SELECT * FROM messages', [], function(err, row) {
    row.forEach((rows) => {
      io.emit('chat message', rows.msg);
    })
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    db.run('INSERT INTO messages (msg) VALUES (?)', msg)
  })


  socket.on('disconnect', () => {
    console.log('User desconnected.');
  })
})

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`)
})