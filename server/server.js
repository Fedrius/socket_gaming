console.log('--SERVER STARTED--');
//part of node
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
//dependencies
const _ = require('lodash');
var cors = require('cors');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 9000;
var app = express();
app.use(cors());

// middleware is like a 3rd party addon...
// for express static middleware 
const publicPath = path.join(__dirname, '../public');
console.log(__dirname + '/../public');
console.log(publicPath);

var server = http.createServer(app);
var io = socketIO(server);

// event listener..
io.on('connection', (socket) => {
  console.log('new user connected..');

  //socket is emitting to 1 connecting
  // sending data from SERVER to CLIENT
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the server',
    createdAt: new Date().toLocaleString()
  });

  // everyone but the user gets this msg
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user connected',
    createdAt: new Date().toLocaleString()
  });

  // sending data from SERVER to CLIENT
  // socket.emit('newMessage', {
  //   from: 'jonny',
  //   text: 'hi',
  //   createdAt: new Date().getTime()
  // });

  // receiving data from the client to the server
  socket.on('createMessage', (message) => {
    console.log('createMessage:', message);

    // then sending the message from server to client
    // io emits to every connection
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().toLocaleString()
    })
  })

  socket.on('disconnect', () => {
    console.log('user was disconnected');
  })
});

// must call next() to complete middleware
// app.use((req, res, next) => {
//   var now = new Date().toString();
//   var log = `${now}: ${req.method} ${req.url}`;
//   console.log(log);
//   // fs.appendFile('server.log', log + '\n', (err) => {
//   //   if (err) {
//   //     console.log('Unable to append to server.log');
//   //   }
//   // });
//   next();
// });

//serves up the html in public folder. static
//public path is the path to the index.html
app.use(express.static(publicPath));

app.get('/',(req,res) => {
  res.sendFile(path.resolve(publicPath, 'index.html'));
  console.log('test');
});

// Home route -- sending json
// app.get('/', (req, res) => {
//   res.send({
//     name: 'Paul',
//     stuff: [
//       'games',
//       'tv'
//     ]
//   });
// });
// About route.
app.get('/about', (req, res) => {
  res.send('about page');
});
// sending back JSON
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'unable to handle request'
  });
});


// listening on port 
// nodemon serves app continuously
server.listen(port, ()=> {
  console.log(`server is up on ${port}`);
});


/*
The order of the method calls determines what is rendered first..
*/