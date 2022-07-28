function getLocalStream() {
    navigator.mediaDevices.getUserMedia({video: false, audio: true}).then((stream) => {
        window.localStream = stream; // A
        window.localAudio.srcObject = stream; // B
        window.localAudio.autoplay = true; // C
    }).catch((err) => {
        console.error(`you got an error: ${err}`)
    });
}

// new code

var audioContext;
var mediaStreamSource = null
var meter = null

function beginDetect() {
  audioContext = new (window.AudioContext || window.webkitAudioContext)()
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
      mediaStreamSource = audioContext.createMediaStreamSource(stream)
      meter = createAudioMeter(audioContext)
      mediaStreamSource.connect(meter)
    })
  }
}

function createAudioMeter(audioContext, clipLevel, averaging, clipLag) {
  const processor = audioContext.createScriptProcessor(512)
  processor.onaudioprocess = volumeAudioProcess
  processor.clipping = false
  processor.lastClip = 0
  processor.volume = 0
  processor.clipLevel = clipLevel || 0.98
  processor.averaging = averaging || 0.95
  processor.clipLag = clipLag || 750

  // this will have no effect, since we don't copy the input to the output,
  // but works around a current Chrome bug.
  processor.connect(audioContext.destination)

  processor.checkClipping = function () {
    if (!this.clipping) {
      return false
    }
    if ((this.lastClip + this.clipLag) < window.performance.now()) {
      this.clipping = false
    }
    return this.clipping
  }

  processor.shutdown = function () {
    this.disconnect()
    this.onaudioprocess = null
  }

  return processor
}

function volumeAudioProcess(event) {
  const buf = event.inputBuffer.getChannelData(0)
  const bufLength = buf.length
  let sum = 0
  let x

  // Do a root-mean-square on the samples: sum up the squares...
  for (var i = 0; i < bufLength; i++) {
    x = buf[i]
    if (Math.abs(x) >= this.clipLevel) {
        this.clipping = true
        this.lastClip = window.performance.now()
    }
    sum += x * x
  }

  // ... then take the square root of the sum.
  const rms = Math.sqrt(sum / bufLength)

  // Now smooth this out with the averaging factor applied
  // to the previous sample - take the max here because we
  // want "fast attack, slow release."
  this.volume = Math.max(rms, this.volume * this.averaging)

  distance = this.volume;
  
  document.getElementById('audio-value').innerHTML = this.volume
  document.getElementById('move').style.paddingLeft = parseFloat(distance * Math.random() * 10000).toFixed(2) + 'px';
  document.getElementById('move1').style.paddingRight = parseFloat(distance * Math.random() * 10000).toFixed(2) + 'px';
  document.getElementById('move2').style.paddingLeft = parseFloat(distance * Math.random() * 10000).toFixed(2) + 'px';
  document.getElementById('move3').style.paddingRight = parseFloat(distance * Math.random() * 10000).toFixed(2) + 'px';
  document.getElementById('move4').style.paddingLeft = parseFloat(distance * Math.random() * 10000).toFixed(2) + 'px';
  document.getElementById('move5').style.paddingRight = parseFloat(distance * Math.random() * 10000).toFixed(2) + 'px';
  document.getElementById('move6').style.paddingLeft = parseFloat(distance * Math.random() * 10000).toFixed(2) + 'px';
  document.getElementById('move7').style.paddingRight = parseFloat(distance * Math.random() * 10000).toFixed(2) + 'px';
  document.getElementById('move8').style.paddingLeft = parseFloat(distance * Math.random() * 10000).toFixed(2) + 'px';
  document.getElementById('move9').style.paddingRight = parseFloat(distance * Math.random() * 10000).toFixed(2) + 'px';
  document.getElementById('move10').style.paddingLeft = parseFloat(distance * Math.random() * 10000).toFixed(2) + 'px';
  document.getElementById('move11').style.paddingRight = parseFloat(distance * Math.random() * 10000).toFixed(2) + 'px';
  document.getElementById('move12').style.paddingLeft = parseFloat(distance * Math.random() * 10000).toFixed(2) + 'px';
  document.getElementById('move13').style.paddingRight = parseFloat(distance * Math.random() * 10000).toFixed(2) + 'px';
  document.getElementById('move14').style.paddingLeft = parseFloat(distance * Math.random() * 10000).toFixed(2) + 'px';
  document.getElementById('move15').style.paddingRight = parseFloat(distance * Math.random() * 10000).toFixed(2) + 'px';
  document.getElementById('move16').style.paddingLeft = parseFloat(distance * Math.random() * 10000).toFixed(2) + 'px';
  document.getElementById('move17').style.paddingRight = parseFloat(distance * Math.random() * 10000).toFixed(2) + 'px';
  document.getElementById('move18').style.paddingLeft = parseFloat(distance * Math.random() * 10000).toFixed(2) + 'px';
//   Change font size with volume
//   document.getElementById('hello').style.fontSize = parseFloat(distance * Math.random() * 50).toFixed(2) + 'em';
}

