var express = require('express');
var app = express();
var http = require('http').Server(app);
var Pusher = require('pusher');
var bodyParser = require('body-parser');


app.use(express.static(__dirname + '/public'));
//app.use( bodyParser() );
app.use(bodyParser.urlencoded());
//app.use(bodyParser.json());

// main view index.html
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/talk', function(req, res){
  res.sendFile(__dirname + '/public/talk.html');
});

app.get('/miniMidi', function(req, res){
  res.header('SECRETSTUFF',process.env.PUSH_KEY);
  res.sendFile(__dirname + '/public/miniMidi.html');
  // req.PUSH_KEY = process.env.PUSH_KEY;
});

// Pusher ~~~~~~~~~~~~~~~~~~~~~~~~~~~
var pusher = new Pusher({
  appId: process.env.PUSH_APPID,
  key: process.env.PUSH_KEY,
  secret: process.env.PUSH_SECRET
  // encrypted: true
});
pusher.port = 443;

// pusher.trigger(
//   'party_channel',
//   'send_to_midi',
//     {
//       "midi_data": [144,47,127]
//     }
// );

app.post('/pusher/auth', function(req, res) {
  console.log('auth called', req.body);
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  var auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});


// listen on port 3000
http.listen(3000, function(){
  console.log('listening on *:3000');
});