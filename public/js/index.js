document.addEventListener('DOMContentLoaded', initialize);
var socket = io();

socket.on('connect', () => {
  console.log('connected to server');
});
socket.on('disconnect', () => {
  console.log('disconnected from server');
});
// Notifications
socket.on('newMessage', (message) => {
  console.log('newMessage:', message);

  let div = document.createElement("div");
  div.classList.add('notification');
  let text = document.createTextNode(`${message.createdAt} - ${message.from}: ${message.text}`);
  div.appendChild(text);
  document.getElementById('notificationContainer').prepend(div);
});
document.getElementById('testBtn3').addEventListener('click', () => {
    socket.emit('clicky', {
      clicky: 7
  });
});

function initialize() {
  document.getElementById('submitter').addEventListener('submit', sendData);
}

function sendData(e) {
  e.preventDefault();
  // console.log(e);
  axios.post('/secret', {
    pass: document.getElementById('thePass').value,
    id: 12,
    geo: 'us',
    token: 1233
  })
  .then(function (response) {
    console.log(response);

    if (response.data.result === 'correct') {
      location.href = `/${response.data.secret}`;
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}
