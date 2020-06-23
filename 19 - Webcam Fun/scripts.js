const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio:false})
        .then(localMediaStream =>{
        // console.log(localMediaStream);
        // video.src = window.URL.createObjectURL(localMediaStream);
           video.srcObject = localMediaStream;
        video.play();
    })
        .catch(err => {
            console.error(`OH NO!!`, err);
    });
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    // console.log(width, height);
    canvas.width = width;
    canvas.height = height;

    return setInterval(()=>{
        ctx.drawImage(video, 0, 0, width, height);
        // removing pixels
        let pixels = ctx.getImageData(0, 0, width, height);
        // Change pixels
       // pixels = redEffect(pixels); // Adjust colors effect
            // pixels = rgbSplit(pixels); // 3D looking effect
            // ctx.globalAlpha = 0.1; //ghosting effect
         // pixels = greenScreen(pixels);
        // pixels = karenPink(pixels);
        pixels = karenBlue(pixels);
        //put them back
        ctx.putImageData(pixels, 0, 0);
    }, 16)
}

function takePhoto() {
    snap.currentTime = 0;
    snap.play();


    const data = canvas.toDataURL('image/jpeg');

    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'beautiful');
    link.textContent = 'Download Image';
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels){
    for(let i=0; i<pixels.data.length; i +=4){
        pixels.data[i+0] = pixels.data[i+0] + 25 //red
        pixels.data[i+1] = pixels.data[i+1] - 25 //green
        pixels.data[i+2] = pixels.data[i+2] *0.5// blue
    }
    return pixels;
};

function rgbSplit(pixels){
    for(let i=0; i<pixels.data.length; i +=4){
        pixels.data[i-200] = pixels.data[i+0] //red
        pixels.data[i+200] = pixels.data[i+1] //green
        pixels.data[i-200] = pixels.data[i+2] // blue
    }
    return pixels;
}

function karenPink(pixels){
    for(let i=0; i<pixels.data.length; i +=4){
        pixels.data[i+0] = pixels.data[i+0] + 231 //red
        pixels.data[i+1] = pixels.data[i+1] + 111 //green
        pixels.data[i+2] = pixels.data[i+2] + 184// blue
    }
    return pixels;
}

function karenBlue(pixels){
    for(let i=0; i<pixels.data.length; i +=4){
        pixels.data[i+0] = pixels.data[i+0] + 77 //red
        pixels.data[i+1] = pixels.data[i+1] + 161 //green
        pixels.data[i+2] = pixels.data[i+2] + 228// blue
    }
    return pixels;
}

function greenScreen(pixels){
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });

    for (i = 0; i< pixels.data.length; i= i +4 ){
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];

        if(red>= levels.rmin
        && green >=levels.gmin
            && blue >= levels.bmin
            && red<= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax){
            // takes it out
            pixels.data[i+3]=0;
        }
            }
    return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);

///stopped at 16 min need to do npm start to run now copy path