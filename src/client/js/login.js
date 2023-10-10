const email = document.getElementById('email');
const senha = document.getElementById('password');
const login = document.getElementById('login');

login.addEventListener('click', function() {
  const userLogin = JSON.stringify({
    email: email.value,
    password: senha.value
  });
  fetch('http://localhost:3000/user/login', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: userLogin
  })
  .then(response => {
    return response.json();
  })
  .then(data => {
    alert(data.message);
    if (data.success === true) {
      localStorage.setItem('userid', `${data.UID}`);
      window.location.href = 'http://localhost:3000/users'
    }
  })
  .catch(error => {
    alert(error.message);
  })
})