
var Pusher = require('pusher');

// Pusher
var pusher = new Pusher({
  appId: '149248',
  key: 'b6780dee2b18b6b295d7',
  secret: 'bef0896270b5ae7d73ce',
  encrypted: true
});
pusher.port = 443;

console.log('about to push');
pusher.trigger('private-party_channel','client-send_to_midi', {"midi_data": [255,255,255]});
