var socket = io();

socket.on('connect', () => {
  console.log('connected to server');

  //emits after user connected.
  // sending email from client to server
  // socket.emit('createMessage', {
  //   from: 'pauly',
  //   text: 'memarwaadawdawdaw'
  // });
});

socket.on('disconnect', () => {
  console.log('disconnected from server');
});

//receiving data from server to client
socket.on('newMessage', (message) => {
  console.log('newMessage:', message);

  let div = document.createElement("div");
  div.classList.add('notification');
  let text = document.createTextNode(`${message.createdAt} - ${message.from}: ${message.text}`);
  div.appendChild(text);
  document.getElementById('notificationContainer').prepend(div);
});

document.getElementById('testBtn').addEventListener('click', () => {
    socket.emit('createMessage', {
    from: 'nobody1',
    text: 'its a test'
  });
})

document.getElementById('testBtn2').addEventListener('click', () => {
    socket.emit('createMessage', {
    from: 'nobody2',
    text: 'this a test again'
  });
})