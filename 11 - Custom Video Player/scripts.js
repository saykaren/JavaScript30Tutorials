const player = document.querySelector('.player');
const video = player.querySelector('.viewer');

const playerControls = document.querySelector('.player__controls');
const progress = player.querySelector('.progress');
const progressBar = playerControls.querySelector('.progress__filled');

const toggle =  playerControls.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
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
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    video[this.name] = this.value;
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('play', upDateButton);
video.addEventListener('pause', upDateButton);
video.addEventListener('timeupdate', handleProgress);

ranges.forEach(range=>range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range=>range.addEventListener('mousemove', handleRangeUpdate))

skipButtons.forEach(button=> button.addEventListener('click', skip));

progress.addEventListener('click', scrub);

//stopped at 21 min