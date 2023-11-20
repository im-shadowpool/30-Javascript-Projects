let song = document.getElementById('song');
let progressbar = document.getElementById('progressbar');
let PlayPause = document.getElementById('PlayPause');

song.onloadedmetadata = function(){
    progressbar.max = song.duration;
    progressbar.value = song.currentTime;
    console.log(song.duration);
    console.log(song.currentTime);
}

function PlayFun(){
    if(PlayPause.classList.contains('fa-pause')){
        song.pause();
        PlayPause.classList.remove("fa-pause")
        PlayPause.classList.add("fa-play")
    } else{
        song.play();
        PlayPause.classList.remove("fa-play")
        PlayPause.classList.add("fa-pause")
    }
}

if(song.play()){
   let tim = setInterval(() =>{
        progressbar.value = song.currentTime;
       console.log(progressbar.value);

    }, 1000)
}

progressbar.onchange = function(){
    song.play();
    song.currentTime = progressbar.value;
    PlayPause.classList.remove("fa-play")
     PlayPause.classList.add("fa-pause")
}