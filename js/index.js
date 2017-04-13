'use strict';

function playSound(e) {

  var audio = document.querySelector('audio[data-key="' + e.keyCode + '"]');
  var key = document.querySelector('.keyButton[data-key="' + e.keyCode + '"]');

  var display = document.querySelector('#display-box');

  if (!audio) return; // stop from running when no key is set
  audio.currentTime = 0; // rewind to start for multiple presses
  audio.play();

  var sound = key.querySelector('.sound');
  display.innerText = sound.innerText;

  display.classList.add('playing-display');
  key.classList.add('playing');
}

function removeTransition(e) {
  if (e.propertyName !== 'transform') return; // skip if not a transform

  this.classList.remove('playing');
}

var keys = document.querySelectorAll('.keyButton');
keys.forEach(function (key) {
  key.addEventListener('transitionend', removeTransition);

  key.addEventListener('click', function (e) {
    //console.log(e.path[1].dataset.key);
    e.keyCode = e.path[1].dataset.key;
    playSound(e);
  });
});

var display = document.querySelector('#display-box');
display.addEventListener('transitionend', function (e) {
  if (e.propertyName !== 'transform') return;
  this.classList.remove('playing-display');
});

window.addEventListener('keydown', playSound);