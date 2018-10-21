var socket2 = io('/test');

socket2.on('connect', () => {
  console.log('connected to server test 2');
});