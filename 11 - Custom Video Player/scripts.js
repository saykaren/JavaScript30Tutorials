const player = document.querySelector('.player');
const video = player.querySelector('.viewer');

const playerControls = document.querySelector('.player__controls');
const progressBar = playerControls.querySelector('.progress');
const progressFilled = playerControls.querySelector('.progress_filled');

const toggle =  playerControls.querySelector('.toggle');
const skipButtons = playerControls.querySelector('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
