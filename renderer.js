// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const audioCtx = new window.AudioContext();
const audioElement = document.querySelector('audio');

const streamNode = audioCtx.createMediaStreamDestination();
const gainNode = audioCtx.createGain();

const pannerOptions = { pan: 0 };
const panner = new StereoPannerNode(audioCtx, pannerOptions);

const { getAudioBuffer } = require('electron-webaudio-decode');


function play(audiobuf) {
    var source = audioCtx.createBufferSource();
    source.buffer = audiobuf;

    source.connect(gainNode).connect(panner).connect(streamNode);
    audioElement.controls = true;
    audioElement.srcObject = streamNode.stream;

    source.start(0);
}

const volumeControl = document.querySelector('#volume');

const pannerControl = document.querySelector('#panner');

pannerControl.addEventListener('input', function() {
    panner.pan.value = this.value;
}, false);

volumeControl.addEventListener('input', function() {
    gainNode.gain.value = this.value;
}, false);

getAudioBuffer("./6771641_Sun_Is_Shining_Extended.aiff").then(function(audioBuffer) {
    play(audioBuffer);
});
