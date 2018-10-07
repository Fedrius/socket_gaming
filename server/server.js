console.log('--SERVER STARTED--');
//part of node
const fs = require('fs');
const os = require('os');
const path = require('path');
//dependencies
const _ = require('lodash');
var cors = require('cors');
const express = require('express');

const port = process.env.PORT || 3000;
var app = express();
app.use(cors());

// middleware is like a 3rd party addon...
// for express static middleware 
const publicPath = path.join(__dirname, '../public');
console.log(__dirname + '/../public');
console.log(publicPath);

// must call next() to complete middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  // fs.appendFile('server.log', log + '\n', (err) => {
  //   if (err) {
  //     console.log('Unable to append to server.log');
  //   }
  // });
  next();
});

//serves up the html in public folder. static
//public path is the path to the index.html
app.use(express.static(publicPath));

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
app.listen(port, ()=> {
  console.log(`server is up on ${port}`);
});


/*
The order of the method calls determines what is rendered first..
*/