// All the specific stuff for the talk
/*
1. MIDI
2. STREAMING VID
*/

var flashImages = function flashImages() {
  requestAnimationFrame(flashImages);
  //constantly getting feedback from data
  analyserNode.getByteFrequencyData(frequencyData);

  var imageEls = avatarWall.getElementsByTagName('img');
  var totalElements = imageEls.length;

  for (var i=0; i<totalElements; i++) {
    //set light colours
    // var elementColour = i*10;
    // lightEls[i].style.backgroundColor = 'hsla('+elementColour+',  80%, 50%, 0.8)';
    // lightEls[i].style.borderColor = 'hsla('+elementColour+',  80%, 50%, 1)';
    //flash on frequency
    var freqDataKey = i*8;
    if (frequencyData[freqDataKey] > 140){
      //start animation on element
      imageEls[i].style.opacity = "1";
    } else {
      imageEls[i].style.opacity = "0.2";
    }
  }
}

function animateLights() {
  requestAnimationFrame(animateLights);
  analyserNode.getByteFrequencyData(frequencyData);
  
  // Animation stuff--------------------------------
  var allRepeatedEls = document.getElementsByTagName('i');
  var totalEls = allRepeatedEls.length;

  // Simple example of changing opacity & colour -> EDIT THIS!
  for (var i=0; i<totalEls; i++) {
    // set colours
    var lightColour = i*10;
    allRepeatedEls[i].style.backgroundColor = 'hsla('+lightColour+',  80%, 50%, 0.8)';
    allRepeatedEls[i].style.borderColor = 'hsla('+lightColour+',  80%, 50%, 1)';
    // flash on frequency
    var freqDataKey = i*2;
    if (frequencyData[freqDataKey] > 100){
      // frequency played - make opache
      allRepeatedEls[i].style.opacity = "1";
    } else {
      // frequency not played - fade out
      allRepeatedEls[i].style.opacity = "0.2";
    }
  }
}

// //1. MIDI~~~~~~~~~~~~~~~~~~~~~~~~~~
// // request MIDI access
// if (navigator.requestMIDIAccess) {
//   navigator.requestMIDIAccess({ sysex: false }).then(onMIDISuccess, onMIDIFailure);
// } else {
//     alert("No MIDI support in your browser.");
// }
// // midi functions
// function onMIDISuccess(midiControl) {
//   var MIDI = midiControl;
//   var notes = [];
//   var effects = [];
//   MIDI.inputs.forEach(function (input) {
//     input.onmidimessage = function (message) {
//       var data = message.data;
//       var type = data[0];
//       // note stuff
//       var note = 440 * Math.pow(2, (data[1] - 69) / 12);
//       var velocity = data[2];
//       var noteId = notes.length - 1;
//       // effects stuff
//       var effectType = data[1];
//       var amount = data[2];
//       var effectId = effects.length - 1;
//       var source;
//       switch (type) {
//       case 144:
//         notes.push(new Note(note, velocity));
//         noteId = notes.length - 1;
//         notes[noteId].play();
//         break;
//       case 128:
//         notes[noteId].stop();
//         notes.splice(noteId, 1);
//         break;
      
//       }
//     };
//   });
// }

var iDJcontrols = {
  left: {
    bal: {
      dial: [176, 30, 0],
      top: [144, 22, 127]
    },
    hi: {
      dial: [176, 20, 0],
      top: [144, 14, 127]
    },
    mid: {
      dial: [176, 21, 0],
      top: [144, 15, 127]
    },
    low: {
      dial: [176, 23, 0],
      top: [144, 17, 127]
    },
    gain: {
      dial: [176, 28, 0],
      top: [144, 24, 127]
    },
    top: {
      dial: [176, 84, 0],
      top: [144, 1, 127] 
    },
    bottom: {
      dial: [176, 85, 0],
      top: [144, 2, 127]
    },
    tempo: {
      slide: [176, 14, 0],
      mid: [144, 12, 127]
    },
    sync: {
      onPress: [144, 101, 127],
      onRelease: [144, 101, 0]
    },
    lloop: {
      onPress: [144, 102, 127],
      onRelease: [144, 102, 0]
    },
    rloop: {
      onPress: [144, 66, 127],
      onRelease: [144, 66, 0]
    },
    butOut: {
      onPress: [144, 50, 127],
      onRelease: [144, 50, 0]
    },
    butIn: {
      onPress: [144, 52, 127],
      onRelease: [144, 52, 0]
    },
    cue: {
      onPress: [144, 51, 127],
      onRelease: [144, 51, 0]
    },
    play: {
      onPress: [144, 70, 127],
      onRelease: [144, 70, 0]
    },
    pgm: [176, 12, 0],
    midButs: {
      topLeft: {
        onPress: [144, 85, 127],
        onRelease: [144, 85, 0]
      },
      topRight: {
        onPress: [144, 88, 127],
        onRelease: [144, 88, 0]
      },
      botRight: {
        onPress: [144, 79, 127],
        onRelease: [144, 79, 0]
      },
      botLeft: {
        onPress: [144, 78, 127],
        onRelease: [144, 78, 0]
      }
    },
    dial: {
      value: [144, 107, 0],
      tapOne: [144, 48, 0],
      tapTwo: [144, 46, 0],
      forward: [144, 58, 0],
      back: [144, 59, 0],
      onPress: {
        forward: [176, 16, 65],
        backward: [176, 16, 63]
      }
    }
  },
  right: {
    bal: {
      dial: [176, 31, 0],
      top: [144, 23, 127]
    },
    hi: {
      dial: [176, 27, 0],
      top: [144, 21, 127]
    },
    mid: {
      dial: [176, 25, 0],
      top: [144, 19, 127]
    },
    low: {
      dial: [176, 24, 0],
      top: [144, 18, 127]
    },
    gain: {
      dial: [176, 29, 0],
      top: [144, 25, 127]
    },
    top: {
      dial: [176, 86, 0],
      top: [144, 3, 127] 
    },
    bottom: {
      dial: [176, 87, 0],
      top: [144, 4, 127]
    },
    tempo: {
      slide: [176, 15, 0],
      mid: [144, 13, 127]
    },
    sync: {
      onPress: [144, 103, 127],
      onRelease: [144, 103, 0]
    },
    lloop: {
      onPress: [144, 104, 127],
      onRelease: [144, 104, 0]
    },
    rloop: {
      onPress: [144, 67, 127],
      onRelease: [144, 67, 0]
    },
    butOut: {
      onPress: [144, 56, 127],
      onRelease: [144, 56, 0]
    },
    butIn: {
      onPress: [144, 54, 127],
      onRelease: [144, 54, 0]
    },
    cue: {
      onPress: [144, 71, 127],
      onRelease: [144, 71, 0]
    },
    play: {
      onPress: [144, 55, 127],
      onRelease: [144, 55, 0]
    },
    pgm: [176, 13, 0],
    midButs: {
      topLeft: {
        onPress: [144, 91, 127],
        onRelease: [144, 91, 0]
      },
      topRight: {
        onPress: [144, 76, 127],
        onRelease: [144, 76, 0]
      },
      botRight: {
        onPress: [144, 83, 127],
        onRelease: [144, 83, 0]
      },
      botLeft: {
        onPress: [144, 82, 127],
        onRelease: [144, 82, 0]
      }
    },
    dial: {
      value: [144, 108, 0],
      tapOne: [144, 49, 0],
      tapTwo: [144, 47, 0],
      forward: [144, 58, 0],
      back: [144, 59, 0],
      onPress: {
        forward: [176, 17, 65],
        backward: [176, 17, 63]
      }
    }
  },
  cross: [176, 8, 0]
};

var midi, data;
// request MIDI access
if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    alert("No MIDI support in your browser.");
}

// midi functions
function onMIDISuccess(midiAccess) {
    // when we get a succesful response, run this code
    midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status

    var inputs = midi.inputs.values();
    // loop over all available inputs and listen for any MIDI input
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        // each time there is a midi message call the onMIDIMessage function
        input.value.onmidimessage = onMIDIMessage;
    }


}

function onMIDIFailure(error) {
    // when we get a failed response, run this code
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
}

var vidFile = 'he-manSUB01';
function onMIDIMessage(message) {
    data = message.data; // this gives us our [command/channel, note, velocity] data.
    console.log('MIDI data', data); // MIDI data [144, 63, 73]

    // Threshold for mixing - this show/hides screens
    if ( (data[0] === iDJcontrols.cross[0]) && (data[1] === iDJcontrols.cross[1]) ) {
      threshold = (data[2]*2)+50;
      // console.log('threshold:'+threshold);
    }
    // if top left middle buttons show avatarWall
    if ( (data[0] === iDJcontrols.left.midButs.topLeft.onPress[0]) && (data[1] === iDJcontrols.left.midButs.topLeft.onPress[1]) ) {

      document.getElementsByClassName('chris')[0].style.display = 'none';
      avatarWall.style.display = 'block';

      set = 'pics';
      console.log(set);
    }
    // if top left right middle buttons show random
    if ( (data[0] === iDJcontrols.left.midButs.topRight.onPress[0]) && (data[1] === iDJcontrols.left.midButs.topRight.onPress[1]) ) {

      avatarWall.style.display = 'none';
      leftRand.style.display = 'block';
      set = 'random';
    }
    // if bot left middle buttons show video
    if ( (data[0] === iDJcontrols.left.midButs.botLeft.onPress[0]) && (data[1] === iDJcontrols.left.midButs.botLeft.onPress[1]) ) {

      leftRand.style.display = 'none';
      leftScreen.getElementsByClassName('video')[0].style.display = 'block';
      set = 'video';
    }
    // if bot left right middle buttons show chris
    if ( (data[0] === iDJcontrols.left.midButs.botRight.onPress[0]) && (data[1] === iDJcontrols.left.midButs.botRight.onPress[1]) ) {

      leftScreen.getElementsByClassName('video')[0].style.display = 'none';
      document.getElementsByClassName('chris')[0].style.display = 'block';
      set = 'abstract';
    }
    // if top right middle buttons show cartoons
    if ( (data[0] === iDJcontrols.right.midButs.topLeft.onPress[0]) && (data[1] === iDJcontrols.right.midButs.topLeft.onPress[1]) ) {

      showVideo(rightVidEl, rightCssEl);
      set = 'cartoons';

    }
    // if top right right middle buttons show random
    if ( (data[0] === iDJcontrols.right.midButs.topRight.onPress[0]) && (data[1] === iDJcontrols.right.midButs.topRight.onPress[1]) ) {

      rightRand.style.display = 'block';
      document.getElementById('abstract').style.display = 'none';
      set = 'random';
    }
    // if bot right left middle buttons show random
    if ( (data[0] === iDJcontrols.right.midButs.botLeft.onPress[0]) && (data[1] === iDJcontrols.right.midButs.botLeft.onPress[1]) ) {

      rightRand.style.display = 'none';
      rightScreen.getElementsByClassName('video')[0].style.display = 'block';
      set = 'video';
    }
    // if bot right right middle buttons show random
    if ( (data[0] === iDJcontrols.right.midButs.botRight.onPress[0]) && (data[1] === iDJcontrols.right.midButs.botRight.onPress[1]) ) {

      document.getElementById('abstract').style.display = '-webkit-flex';
      rightScreen.getElementsByClassName('video')[0].style.display = 'none';
      set = 'abstract';
    }

    if (set === "random") {
      switch (data[0], data[1]) {
        case iDJcontrols.left.sync.onPress[0], iDJcontrols.left.sync.onPress[1]:
          loadRandomAvatar(allUsers, leftRand.getElementsByTagName('img')[0]);
        break;
        case iDJcontrols.left.lloop.onPress[0], iDJcontrols.left.lloop.onPress[1]:
          loadRandomAvatar(allUsers, leftRand.getElementsByTagName('img')[0]);
        break;
        case iDJcontrols.left.rloop.onPress[0], iDJcontrols.left.rloop.onPress[1]:
          loadRandomAvatar(allUsers, leftRand.getElementsByTagName('img')[0]);
        break;

        case iDJcontrols.right.sync.onPress[0], iDJcontrols.right.sync.onPress[1]:
          loadRandomAvatar(allUsers, rightRand.getElementsByTagName('img')[0]);
        break;
        case iDJcontrols.right.lloop.onPress[0], iDJcontrols.right.lloop.onPress[1]:
          loadRandomAvatar(allUsers, rightRand.getElementsByTagName('img')[0]);
        break;
        case iDJcontrols.right.rloop.onPress[0], iDJcontrols.right.rloop.onPress[1]:
          loadRandomAvatar(allUsers, rightRand.getElementsByTagName('img')[0]);
        break;
      }
    }

    if (set === 'video') {
      switch (data[0],data[1]) {
        case iDJcontrols.right.sync.onPress[0], iDJcontrols.right.sync.onPress[1]:
          changeVidSrc(rightScreen.getElementsByTagName('video')[0], 'video/he-man.mp4');
        break;
        case iDJcontrols.right.lloop.onPress[0], iDJcontrols.right.lloop.onPress[1]:
          changeVidSrc(rightScreen.getElementsByTagName('video')[0], 'video/thundercats.mp4');
        break;
      }
    }


    function itsJustMaths(input, range) {
      return ( (64-input)/64 )*range;
    }
    // ADD TOP - STRING EFFECTS - ABSTRACT ALTS
    // effects for left screen
    // hue on bal
    if ( (data[0] === iDJcontrols.left.bal.dial[0]) && (data[1] === iDJcontrols.left.bal.dial[1]) ) {
      var degreeVal;
      if (data[2] > 64) {
        degreeVal = (data[2]-64)*3;
      } else {
        degreeVal = itsJustMaths(data[2], 180);
      }
      videoElOne.style.webkitFilter = "hue-rotate("+degreeVal+"deg)";
    }

    // brightness on hi
    if ( (data[0] === iDJcontrols.left.hi.dial[0]) && (data[1] === iDJcontrols.left.hi.dial[1]) ) {
      var brightVal;
      if (data[2] > 64) {
        brightVal = data[2]*1.6;
      } else {
        brightVal = data[2]+(data[2]/2);
      }
      videoElOne.style.webkitFilter = "brightness("+brightVal+"%)";
    }

    // zoom on mid
    if ( (data[0] === iDJcontrols.left.mid.dial[0]) && (data[1] === iDJcontrols.left.mid.dial[1]) ) {
      var zoomVal;
      if (data[2] > 64) {
        zoomVal = ( (data[2]-64)*0.1 )+1;
      } else {
        zoomVal = (data[2]/64);
      }
      leftScreen.style.transform = 'scale('+zoomVal+')';
    }

    // contrast on low
    if ( (data[0] === iDJcontrols.left.low.dial[0]) && (data[1] === iDJcontrols.left.low.dial[1]) ) {
      var contrastVal;
      if (data[2] > 64) {
        contrastVal = data[2]*1.6;
      } else {
        contrastVal = data[2]+(data[2]/2);
      }
      videoElOne.style.webkitFilter = "contrast("+contrastVal+"%)";
    }

    // gray & saturate on gain
    if ( (data[0] === iDJcontrols.left.gain.dial[0]) && (data[1] === iDJcontrols.left.gain.dial[1]) ) {
      var satVal;
      if (data[2] > 64) {
        satVal = data[2]*1.6;
      } else {
        satVal = data[2]+(data[2]/2);
      }
      videoElOne.style.webkitFilter = "saturate("+satVal+"%)";
    }

    // invert & blur on top
    if ( (data[0] === iDJcontrols.left.top.dial[0]) && (data[1] === iDJcontrols.left.top.dial[1]) ) {
      var amountVal;
      if (data[2] > 64) {
        amountVal = ( (data[2]-63) );
        videoElOne.style.webkitFilter = "blur("+amountVal+"px)";
      } else {
        amountVal = itsJustMaths(data[2], 100);
        videoElOne.style.webkitFilter = "invert("+amountVal+"%)";
      }
    }



    // effects for right screen
    //zoom on mid
    if ( (data[0] === iDJcontrols.right.mid.dial[0]) && (data[1] === iDJcontrols.right.mid.dial[1]) ) {
      var zoomVal;
      if (data[2] > 64) {
        zoomVal = ( (data[2]-64)*0.1 )+1;
      } else {
        zoomVal = (data[2]/64);
      }
      rightScreen.style.transform = 'scale('+zoomVal+')';
    }

    // dial for black & white
    // if ( (data[0] === 176) && (data[1] === 5) ) {
    //  var opacityVal = data[2]/100;
    //  blackEl.style.opacity = opacityVal;
    // }
    // if ( (data[0] === 176) && (data[1] === 6) ) {
    //  var opacityVal = data[2]/100;
    //  whiteEl.style.opacity = opacityVal;
    // }
    // if ( (data[0] === 176) && (data[1] === 7) ) {
    //  var zoomVal = (data[2]*0.1)+1;
    //  cssCont.style.transform = 'scale('+zoomVal+')';
    //  videoCont.style.transform = 'scale('+zoomVal+')';
    // }
    // if ( (data[0] === 176) && (data[1] === 8) ) {
    //  if (data[2] > 4) {
    //    var zoomVal = (4/data[2]);
    //  } else {var zoomVal = 1};
      
    //  cssCont.style.transform = 'scale('+zoomVal+')';
    //  videoCont.style.transform = 'scale('+zoomVal+')';
    // }
    // if ( (data[0] === 176) && (data[1] === 1) ) {
    //  if (data[2] === 0) {
    //    cssCont.style.backgroundColor = 'black';
    //  } else {
     //   var colourVal = data[2]*3;
     //   cssCont.style.backgroundColor = 'hsla('+colourVal+',50%,20%,1)';
     //  }
    // }
    // if ( (data[0] === 176) && (data[1] === 2) ) {
    //   elColour = data[2];
    // }


    return data;
}

// function onMIDIFailure(e) {
//     // when we get a failed response, run this code
//     console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
// }

function loadRandomAvatar(avatars, imgEl) {
  var randIndex = getRandomInt(0, avatars.length);
  imgEl.src = avatars[randIndex].userAvatar;
}

var changeVidSrc = function changeVidSrc(videoEl, newSrc) {
  videoEl.src = newSrc;
}

var mixScreens = function mixScreens() {
  console.log('Threshold for mix: ' + threshold);
  requestAnimationFrame(mixScreens);
  //constantly getting feedback from data
  analyserNode.getByteFrequencyData(frequencyData);

  for (var i=0; i<49; i++) {
    var freqDataKey = i*8;
    if (frequencyData[freqDataKey] > threshold){
      if (i<10) {
        rightScreen.style.opacity = '1';
      } else {
        rightScreen.style.opacity = '0';
      }
    }
  }
}

//2. STREAMING VID~~~~~~~~~~~~~~~~~~~~
// stream video of me playing
// function showVideo(vidEl) {
//   var vid = navigator.mediaDevices.getUserMedia({ audio: false, video: true });
//   vid.then(function(mediaStream) {
//     vidEl.src = window.URL.createObjectURL(mediaStream);
//     vidEl.onloadedmetadata = function(e) {
//       vidEl.play();
//     };
//   });

//   vid.catch(function(e) { console.log(e.name); });
// }

// VJ STUFF
























