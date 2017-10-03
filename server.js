const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const routes = require('./controllers/grocery-controllers');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use('/', routes)

const server = app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); 
});

const io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log('a user connected');

  //notify all but caller of new save
  socket.on('save-event', function(grocery) {
    console.log('Save called');
  	socket.broadcast.emit('new-save', {grocery});
  });

  //notify all but caller of delete
  socket.on('remove-event', function(grocery) {
    console.log('Remove called');
  	socket.broadcast.emit('new-delete', {grocery});
  });

  //notify all but caller of new vote
  socket.on('vote-event', function(grocery) {
    console.log('Vote called');
    socket.broadcast.emit('new-vote', {grocery});
  })

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});