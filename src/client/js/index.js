fetch('http://localhost:3000/user/usuarios')
.then(response => {
  return response.json();
})
.then(data => {

  for (let i = 0; i < data.length; i++) {
    const listUsers = document.querySelector('.usuarios');
    const card = document.createElement('div');
    const image = document.createElement('img');
    const name = document.createElement('h3');
    
    image.src = 'assets/user.png'
    name.textContent = data[i].name;
    
    card.appendChild(image);
    card.appendChild(name);
    
    listUsers.appendChild(card)
    
    card.addEventListener('click', function() {
      const userid = localStorage.getItem('userid');
      const chatid = `${data[i].id}${userid}`;
      window.location.href = `http://localhost:3000/chat?chatid=${chatid}&me=${userid}&from=${data[i].id}`;
    })
  }

})
.catch(error => {
  console.log(error.message);
});

/* CONVERSAS API */

const userChat = {
  
}

fetch('http://localhost:3000/user/conversas', {
  method: 'POST',
  body: JSON.stringify({ userid : localStorage.getItem('userid') })
})
.then(response => {
  return response.json();
})
.then(data => {
  
  const listChats = document.querySelector('.chats');
  for (let i = 0; i < data.length; i++) {
    const card = document.createElement('div');
    const image = document.createElement('img');
    const name = document.createElement('h3');
    
    image.src = 'assets/user.png'
    name.textContent = data[i].id;
    
    card.appendChild(image);
    card.appendChild(name);
    
    listChats.appendChild(card)
  }
  const p = document.createElement('p');
  p.textContent = data.message;
  listChats.appendChild(p)

})
.catch(error => {
  console.log(error.message);
});