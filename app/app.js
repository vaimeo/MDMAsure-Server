var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors')
var session = require('express-session')
const http = require('http');



var indexRouter = require('./controllers/index');
var usersRouter = require('./controllers/users');
var policiesRouter = require('./controllers/policies');
var devicesRouter = require('./controllers/devices');
var enterpriseRouter =  require('./controllers/enterprise');
var pubsubRouter  =  require('./controllers/pubsub');
const config = require('./config');
var app = express();
app.use(session({
  secret: 'keyboard cat',
  resave:true,
  cookie: {maxAge:300000},
  saveUninitialized: false
}));
 app.use(express.json({limit: '50mb'}));
 //app.use(express.urlencoded({limit: '50mb'})); //Parse URL-encoded bodies

 app.use(cors())
//setting up the routes
//app.options('/user/auth', cors()) // enable pre-flight request for DELETE request
app.use('/', indexRouter);
app.use('/policy', policiesRouter);
app.use('/user', usersRouter);
app.use('/device', devicesRouter);
app.use('/enterprise', enterpriseRouter);
app.use('/pubsub', pubsubRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({message:'no page found'});
});


const server = http.createServer(app);
var io = require('./io').initialize(server);

io.on('connection', (socket) => {
  console.log('a user connected');
});

//io.listen(9013);

server.listen(config.port, () => {
  console.log(`listening on *: ${config.port}`);
});

// var io = socket.listen(server);


// // Handle connection
// io.on('connection', function (socket) {
//   console.log("Connected succesfully to the socket ...");

//   var news = [
//       { title: 'The cure of the Sadness is to play Videogames',date:'04.10.2016'},
//       { title: 'Batman saves Racoon City, the Joker is infected once again',date:'05.10.2016'},
//       { title: "Deadpool doesn't want to do a third part of the franchise",date:'05.10.2016'},
//       { title: 'Quicksilver demand Warner Bros. due to plagiarism with Speedy Gonzales',date:'04.10.2016'},
//   ];

//   // Send news on the socket
//   socket.emit('news', news);

//   socket.on('my other event', function (data) {
//       console.log(data);
//   });
// });
module.exports = {server,io};
