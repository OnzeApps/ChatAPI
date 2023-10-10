<<<<<<< HEAD
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const { router } = require('./router/router');
const { database } = require('./database/database');

const app = express()
const server = http.createServer(app);
const io = new socketIo.Server(server, {
  cors: {
    origin: "*"
  }
});
app.use(express.static(path.join(__dirname, 'client')));
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "'unsafe-inline'", "media.gettyimages.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      styleSrcElem: ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"],
      fontSrc: ["'self'"],
      connectSrc: ["'self'"],
      mediaSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameSrc: ["'none'"],
      workerSrc: ["'self'"],
      childSrc: ["'self'"],
      frameAncestors: ["'none'"],
      formAction: ["'self'", "'unsafe-inline'"],
      upgradeInsecureRequests: [],
    },
  }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors({ origin: '*' }));
app.use(router);

app.get('/users', (_, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});
app.get('/home', (_, res) => {
  res.sendFile(path.join(__dirname, 'client', 'conversas.html'));
});
app.get('/login', (_, res) => {
  res.sendFile(path.join(__dirname, 'client', 'login.html'));
});
app.get('/register', (_, res) => {
  res.sendFile(path.join(__dirname, 'client', 'register.html'));
});
app.get('/chat', (_, res) => {
  res.sendFile(path.join(__dirname, 'client', 'chat.html'));
})

io.on('connection', (socket) => {
  console.log('usuário conectado');

  const db = database();

  socket.on('Room', (ChatID) => {
    socket.join(ChatID);
  });
  
  socket.on('storage', (ChatID) => {
    console.log(ChatID)
    db.all('SELECT * FROM messages WHERE chatID = ?', [ChatID], function(err, row) {
      row.forEach((rows) => {
        const msg = rows.msg;
        const hora = rows.hora;
        const uid = rows.userID;
        
        io.to(ChatID).emit('chat-message', {
          msg, hora, uid
        });
      });
    });
  });
  
  socket.on('chat-message', (data) => {
    let hora = `${new Date().getHours()}:${new Date().getMinutes()}`
    const msg = data.msg;
    const uid = data.uid;
    io.to(data.ChatID).emit('chat-message', { msg, hora, uid });
    db.run('INSERT INTO messages (userID, msg, hora, chatID) VALUES (?, ?, ?, ?)', [data.uid, data.msg, hora, data.ChatID])
  });
  
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`)
=======
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
>>>>>>> 880909271118ae4afd854307ed190a83b3a99003
})