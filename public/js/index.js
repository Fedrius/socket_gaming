var socket = io();

socket.on('connect', () => {
  console.log('connected to server');

  //emits after user connected.
  // sending email from client to server
  socket.emit('createMessage', {
    from: 'pauly',
    text: 'memarwaadawdawdaw'
  });
});

socket.on('disconnect', () => {
  console.log('disconnected from server');
});

//receiving data from server to client
socket.on('newMessage', (message) => {
  console.log('newMessage:', message);
});