const socket = io();

const query = new URLSearchParams(window.location.search);

socket.emit('Room', query.get('chatid'));
socket.emit('storage', query.get('chatid'))

function sendMessage() {
  const inputMsg = document.getElementById('messageInput');
  const message = inputMsg.value;
  if (message !== '') {
    socket.emit('chat-message', { uid: query.get('me'), msg: message, ChatID: query.get('chatid')});
    inputMsg.value = '';
  }
}

const send = document.getElementById('send');
send.addEventListener('click', function(){
  sendMessage();
})

socket.on('chat-message', (msg) => {

  const msgList = document.querySelector('.messages');
  const mensagem = document.createElement('p');
  const hora = document.createElement('p');
  const msgBalao = document.createElement('div');
  
  mensagem.textContent = msg.msg;
  hora.textContent = msg.hora; hora.id = 'hora';
  
  msgBalao.appendChild(mensagem);
  msgBalao.appendChild(hora)

  if (msg.uid == query.get(me)) {
    msgBalao.className = 'divDireita';
  } else {
    msgBalao.className = 'divEsquerda'
  }

  msgList.appendChild(msgBalao);
})