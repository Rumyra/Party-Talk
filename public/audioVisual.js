// Shared audio & Visual functions both talk & client use
/*
1. Audio notes
2.
*/

//1. Audio notes Taken inspiration from Dave Mackintosh (way neater than mine :) )
var AUDIO_CONTEXT = new (window.AudioContext || window.webkitAudioContext)();

var effectAmount = 60;

var Note = function () {

  function Note(note, velocity) {
    this.NOTE = note * 10;
    this.VELOCITY = velocity / 127;
    this.AMOUNT = effectAmount*100;
    // this.AMOUNT = 6000;

    this.OSC = AUDIO_CONTEXT.createOscillator();

    this.HIGHPASS = AUDIO_CONTEXT.createBiquadFilter();
    this.HIGHPASS.type = "highpass";
    this.HIGHPASS.frequency.value = this.AMOUNT;
    this.HIGHPASS.Q.value = 28;

    this.GAIN = AUDIO_CONTEXT.createGain();
    
    this.OSC.connect(this.HIGHPASS);
    this.HIGHPASS.connect(this.GAIN);
    this.GAIN.connect(AUDIO_CONTEXT.destination);

    // this.OSC.connect(this.GAIN);
    // this.GAIN.connect(AUDIO_CONTEXT.destination);

    console.log('NOTE %s @ %s', this.NOTE, this.VELOCITY);
    this.GAIN.gain.value = this.VELOCITY;
    this.OSC.type = 'square';
    this.OSC.frequency.value = this.NOTE;
  }
  Note.prototype.play = function play() {
    this.OSC.start(0);
  };
  Note.prototype.stop = function stop() {
    this.OSC.stop(0);
  };
  Note.prototype.osc = this.OSC;
  Note.prototype.effect = 1;
  return Note;

}();

var Effect = function() {

  function Effect(source, amount) {
    this.AMOUNT = amount*100;
    this.HIGHPASS = AUDIO_CONTEXT.createBiquadFilter();
    this.HIGHPASS.type = "highpass";
    this.HIGHPASS.frequency.value = this.AMOUNT;
    this.HIGHPASS.Q.value = 28;
    source.connect(this.HIGHPASS);
    this.HIGHPASS.connect(AUDIO_CONTEXT.destination);
    console.log('AMOUNT:'+this.AMOUNT);
  }
  return Effect;

}();


// DIAL~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function dial() {
  d = document,
  // $dial = d.getElementsByClassName('dial'),
  $dial = d.getElementsByClassName('dial')[0],
  // $knob = d.getElementsByClassName('knob'),
  $knob = d.getElementsByClassName('knob')[0],
  // $active = d.getElementsByClassName('dial-active'),
  $active = d.getElementsByClassName('dial-active')[0],
  big = 0,
  threshold = 0.05,
  rotation = 0, //avoid negative arc rotation
  ns = 'http://www.w3.org/2000/svg';
  
  mask = d.createElementNS(ns, 'svg');
  mask.setAttribute('width','180');
  mask.setAttribute('height','180');
  
  path = d.createElementNS(ns, 'path');
  path.setAttribute('stroke','#ff940a');
  path.setAttribute('fill-opacity','0');
  path.setAttribute('stroke-width','6');
  path.setAttribute('fill', '#FFF');
  mask.setAttribute('id','cp');

  mask.appendChild(path);
  $dial.appendChild(mask);
  path.appendChild($active);

  updateArc = function(dAngle, fromDial){
  
    rAngle = dAngle*(Math.PI / 180);
    
    x = 87 - 87 * Math.cos(rAngle) ;
    y = - 87 * Math.sin(rAngle);
    var big = (rAngle > Math.PI)? 1:0;
    var d = 'M0,87 a87,87 0 ' + big + ',1 ' + x + ',' + y;
    path.setAttribute('d', d);
    
    $knob.style.webkitTransform = 'rotate('+(dAngle)+'deg)'; 
    $knob.style.mozTransform = 'rotate('+(dAngle)+'deg)'; 
      
  };
  
  //work out centre of dial
  var bodyRect = d.body.getBoundingClientRect(),
    elemRect = $dial.getBoundingClientRect(),
    topOffset = elemRect.top - bodyRect.top,
    leftOffset = elemRect.left - bodyRect.left;

  refPoint = {},
  sPoint = {},
  quad = 0,
  centerX = leftOffset+90,
  centerY = topOffset+90,
  _piOver180 = Math.PI / 180,
  _180OverPi = 180 / Math.PI;
  
  updateArc(rotation);
  
  $dial.addEventListener('mousedown',function(){
      sPoint = {q: 'active'};
  });
  
  $dial.addEventListener('mousemove', function(ev){
  
    if(sPoint.q){
      dX = -(ev.pageX - centerX);
      dY = -(ev.pageY - centerY);
      console.log(dX+','+dY);
       
      ang = Math.atan2(dY,dX);
      if(ang<0){ang = ang + 2*Math.PI;}
      
      if( Math.abs(refPoint.angle - ang) < 5 || !refPoint.angle){
        refPoint = {x: ev.pageX, y: ev.pageY, angle: ang};
        //console.log(dX+", "+dY+" | r: "+refPoint.angle+" | d: "+refPoint.angle * (180/Math.PI));
        updateArc(refPoint.angle * (180/Math.PI), true);
      }
    }
  });
  
  $dial.addEventListener('mouseup', function(){
    sPoint = {};
  });
  
  $dial.addEventListener('touchstart', function(ev){
    sPoint = {q: 'active'};
  });
  
  $dial.addEventListener('touchmove', function(ev){
      
    if(sPoint.q){
      dX = -(ev.touches[0].pageX - centerX);
      dY = -(ev.touches[0].pageY - centerY);
       
      ang = Math.atan2(dY,dX);
      if(ang<0){ang = ang + 2*Math.PI;}
      
      if( Math.abs(refPoint.angle - ang) < 5 || !refPoint.angle){
        refPoint = {x: ev.pageX, y: ev.pageY, angle: ang};
        //console.log(dX+", "+dY+" | r: "+refPoint.angle+" | d: "+refPoint.angle * (180/Math.PI));
        updateArc(refPoint.angle * (180/Math.PI), true);
      }
    }        
  });
  $dial.addEventListener('touchend', function(ev){
    refPoint = {};
  });

  //Gesture Events
  $dial.addEventListener('gesturechange', function(g){
    rotation = (rotation + g.rotation % 360);
    $knob.style.webkitTransform = 'rotate('+(rotation)+'deg)'; 
    updateArc(rotation*_piOver180, true);
  });
  
  $dial.addEventListener('gestureend', function(g){
    rotation = rotation;
  });
}



