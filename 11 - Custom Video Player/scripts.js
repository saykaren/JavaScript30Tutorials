const player = document.querySelector('.player');
const video = player.querySelector('.viewer');

const playerControls = document.querySelector('.player__controls');
const progress = player.querySelector('.progress');
const progressBar = playerControls.querySelector('.progress__filled');

const toggle =  playerControls.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullButton = player.querySelector('[data-size]');

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

function openFullScreen(){
    if(video.requestFullscreen){
        video.requestFullscreen();
    }else if(video.mozRequestFullScreen){
        video.mozRequestFullScreen();
        //FireFox
    } else if(video.webkitRequestFullScreen){
        video.webkitRequestFullScreen();
        //Chrome, Safari & Opera
    } else if(video.msRequestFullscreen){
        video.msRequestFullscreen();
        //IE/Edge
    }
}

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('play', upDateButton);
video.addEventListener('pause', upDateButton);
video.addEventListener('timeupdate', handleProgress);

ranges.forEach(range=>range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range=>range.addEventListener('mousemove', handleRangeUpdate))

skipButtons.forEach(button=> button.addEventListener('click', skip));

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e)=>{mouseDown && scrub(e)});
progress.addEventListener('mousedown', ()=>mouseDown=true);
progress.addEventListener('mouseup', ()=>mouseDown=false);

fullButton.addEventListener('click', ()=>openFullScreen());
