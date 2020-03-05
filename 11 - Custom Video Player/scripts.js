const player = document.querySelector('.player');
const video = player.querySelector('.viewer');

const playerControls = document.querySelector('.player__controls');
const progressBar = playerControls.querySelector('.progress');
const progressFilled = playerControls.querySelector('.progress_filled');

const toggle =  playerControls.querySelector('.toggle');
const skipButtons = player.querySelector('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


function togglePlay(){
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }

}

function upDateButton(){

    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip(){
    console.log('skipping!');
}

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('play', upDateButton);
video.addEventListener('pause', upDateButton);

skipButtons.forEach(button=> button.addEventListener('click', skip));

//stopped at 12 skipButtons for each not working giving error 