// All the specific stuff for the talk
/*
1. MIDI
2. STREAMING VID
*/

//1. MIDI~~~~~~~~~~~~~~~~~~~~~~~~~~
// request MIDI access
if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess({ sysex: false }).then(onMIDISuccess, onMIDIFailure);
} else {
    alert("No MIDI support in your browser.");
}
// midi functions
function onMIDISuccess(midiControl) {
  var MIDI = midiControl;
  var notes = [];
  var effects = [];
  MIDI.inputs.forEach(function (input) {
    input.onmidimessage = function (message) {
      var data = message.data;
      var type = data[0];
      // note stuff
      var note = 440 * Math.pow(2, (data[1] - 69) / 12);
      var velocity = data[2];
      var noteId = notes.length - 1;
      // effects stuff
      var effectType = data[1];
      var amount = data[2];
      var effectId = effects.length - 1;
      var source;
      switch (type) {
      case 144:
        notes.push(new Note(note, velocity));
        noteId = notes.length - 1;
        notes[noteId].play();
        source = notes[noteId].osc;
        console.log(notes[noteId].effect);
      case 176:
        new Effect(source, amount);
        break;
      case 128:
        notes[noteId].stop();
        notes.splice(noteId, 1);
        break;
      
      }
    };
  });
}

function onMIDIFailure(e) {
    // when we get a failed response, run this code
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
}

//2. STREAMING VID~~~~~~~~~~~~~~~~~~~~
// stream video of me playing
function showVideo(vidEl) {
  var vid = navigator.mediaDevices.getUserMedia({ audio: false, video: true });
  vid.then(function(mediaStream) {
    // var video = document.querySelector('video');
    vidEl.src = window.URL.createObjectURL(mediaStream);
    vidEl.onloadedmetadata = function(e) {
      vidEl.play();
    };
  });

  vid.catch(function(e) { console.log(e.name); });
}