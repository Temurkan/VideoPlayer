const videoPlayer = document.querySelector('.video-player')
const video = document.querySelector('video')
const mainVideo = document.querySelector('#main-video')
const progressArea = document.querySelector('.progress-area')
const progressBar = document.querySelector('.progress-bar')
const play = document.querySelector('.fa-play')
const pause = document.querySelector('.fa-pause')
const stope = document.querySelector('.fa-stop')
const nextBtn = document.querySelector('.fa-step-forward')
const prevBtn = document.querySelector('.fa-step-backward')
const inputVol = document.querySelector('input[type="range"]')
const set = document.querySelector('.fa-cog')
const setting = document.querySelector('.setting')
const fullScreen = document.querySelector('.fa-expand')
const exitFullScreen = document.querySelector('.fa-compress')
const themeBtn = document.querySelector('.theme')
const themes = document.querySelector('.themes')
const speedBtn = document.querySelector('.speed')
const speedSpan = document.querySelector('.speed span')
const speeds = document.querySelector('.speeds')
const title = document.querySelectorAll('.title')
const label = document.querySelectorAll('label')
const labelText = document.querySelectorAll('label p')
const checkedSpeed = document.querySelector('.checked-speed')
const videoControls = document.querySelector('.video-controls')
const text = document.querySelector('.text')
const volMute = document.querySelector('.fa-volume-mute')
const volUp = document.querySelector('.fa-volume-up')
const volDown = document.querySelector('.fa-volume-down')
const volIndicator = document.querySelector('.vol')
const volume = document.querySelector('.volume')
const playlist = document.querySelector('.playlist')
const list = document.querySelector('.list')

let mask = document.querySelector('.lds-spinner')

let videoIndex = 1

let inpValue = inputVol.value

let timer = null

window.addEventListener('load', () => {
    mask.classList.add('hide')
    loadVideo(videoIndex)
    progressBar.style.width = '0'
    videoControls.style.transform = 'translateY(0)'
    text.style.transform = 'translateY(0)'
    playingNow()
})

function controlsHide() {
    videoControls.style.transform = 'translateY(150%)'
    text.style.transform = 'translateY(-100%)'
}

window.addEventListener('keydown', (event) => {
    if (event.key === ' ' && play.classList.contains('active')) {
        video.play()
        play.classList.remove('active')
        pause.classList.add('active')
        { clearTimeout(timer) }
        timer = setTimeout(controlsHide, 5000)
    } else {
        video.pause()
        pause.classList.remove('active')
        play.classList.add('active')
        videoControls.style.transform = 'translateY(0)'
        text.style.transform = 'translateY(0)'
        videoPlayer.style.cursor = 'default'
    }
})

function mouseMove() {
    timer = setTimeout(mouseHide, 5000)
}

videoPlayer.addEventListener('pointermove', () => {
    { clearTimeout(timer) }
    mouseMove()
    videoPlayer.style.cursor = 'default'
})

videoPlayer.addEventListener('click', () => {
    { clearTimeout(timer) }
    mouseMove()
    videoPlayer.style.cursor = 'default'
    videoControls.style.transform = 'translateY(0)'
    text.style.transform = 'translateY(0)'
})

function mouseHide() {
    videoPlayer.style.cursor = 'none'
    videoControls.style.transform = 'translateY(150%)'
    text.style.transform = 'translateY(-100%)'
    if (play.classList.contains('active')) {
        videoControls.style.transform = 'translateY(0)'
        text.style.transform = 'translateY(0)'
        videoPlayer.style.cursor = 'default'
    }
}

// Load video
function loadVideo(indexNum) {
    text.innerText = allVideos[indexNum - 1].name
    video.src = `videos/${allVideos[indexNum - 1].src}.mp4`
}

// Video player mouseover
videoPlayer.addEventListener('mousemove', () => {
    videoControls.style.transform = 'translateY(0)'
    text.style.transform = 'translateY(0)'
})

// Click video to play or pause
video.addEventListener('click', () => {
    play.classList.toggle('active')
    pause.classList.toggle('active')

    if (play.classList.contains('active')) {
        video.pause()
    } else {
        video.play()
    }

    setting.classList.remove('active')
    themes.classList.remove('active')
    speeds.classList.remove('active')

    playingNow()
})

// Play button
play.addEventListener('click', () => {
    play.classList.remove('active')
    pause.classList.add('active')
    video.play()
    setting.classList.remove('active')
    themes.classList.remove('active')
    speeds.classList.remove('active')
    playingNow()
})

// Pause button
pause.addEventListener('click', () => {
    pause.classList.remove('active')
    play.classList.add('active')
    video.pause()
    setting.classList.remove('active')
    themes.classList.remove('active')
    speeds.classList.remove('active')
    playingNow()
})

// Stop button
stope.addEventListener('click', () => {
    pause.classList.remove('active')
    play.classList.add('active')
    video.pause()
    video.currentTime = 0
    setting.classList.remove('active')
    themes.classList.remove('active')
    speeds.classList.remove('active')
})

// Next button
nextBtn.addEventListener('click', () => {
    videoIndex++
    if (videoIndex > allVideos.length) {
        videoIndex = 1
    }
    loadVideo(videoIndex)
    video.play()
    play.classList.remove('active')
    pause.classList.add('active')
    setting.classList.remove('active')
    themes.classList.remove('active')
    speeds.classList.remove('active')
    if (isNaN(checkedSpeed.innerText)) {
        video.playbackRate = 1
    } else {
        video.playbackRate = checkedSpeed.innerText
    }
    playingNow()
})

// Prev button
prevBtn.addEventListener('click', () => {
    videoIndex--
    if (videoIndex < 1) {
        videoIndex = allVideos.length
    }
    loadVideo(videoIndex)
    video.play()
    play.classList.remove('active')
    pause.classList.add('active')
    setting.classList.remove('active')
    themes.classList.remove('active')
    speeds.classList.remove('active')
    if (isNaN(checkedSpeed.innerText)) {
        video.playbackRate = 1
    } else {
        video.playbackRate = checkedSpeed.innerText
    }
    playingNow()
})

// After the video ended
mainVideo.addEventListener('ended', () => {
    videoIndex++
    if (videoIndex > allVideos.length) {
        videoIndex = 1
    }
    loadVideo(videoIndex)
    video.play()
    if (isNaN(checkedSpeed.innerText)) {
        video.playbackRate = 1
    } else {
        video.playbackRate = checkedSpeed.innerText
    }
    playingNow()
})

// Array length
for (let i = 0; i < allVideos.length; i++) {
    let listItem = `<li class="list-item" li-index="${i + 1}">
                        <i class="fas fa-play"></i>
                        <img src="img/${allVideos[i].img}.jpg" alt="" />
                        <div class="list-text">
                            <p>${allVideos[i].name}</p>
                            <span id="${allVideos[i].src}" class="max-duration"></span><br />
                            <span class="playing"></span>
                            <video class="${allVideos[i].src}" id="videohide" src="videos/${allVideos[i].src}.mp4"></video>
                        </div>                        
                    </li>`
    list.insertAdjacentHTML('beforeend', listItem)

    let listVideoDuration = list.querySelector(`#${allVideos[i].src}`)
    let listVideoTag = list.querySelector(`.${allVideos[i].src}`)

    listVideoTag.addEventListener('loadeddata', () => {
        let videoDurat = listVideoTag.duration
        let totalMin = Math.floor(videoDurat / 60)
        let totalSec = Math.floor(videoDurat % 60)
        if (totalSec < 10) {
            totalSec = `0${totalSec}`
        }
        listVideoDuration.innerText = `${totalMin}:${totalSec}`
    })
}

// Play particular video on click
const allListItemTags = list.querySelectorAll('.list-item')
function playingNow() {
    for (let j = 0; j < allListItemTags.length; j++) {

        allListItemTags[j].setAttribute('onclick', 'clicked(this)')

        if (allListItemTags[j].classList.contains('playing')) {
            allListItemTags[j].classList.remove('playing')
        }

        if (allListItemTags[j].getAttribute('li-index') == videoIndex) {
            allListItemTags[j].classList.add('playing')
        }     
    }
}

// Play video on li click 
function clicked(element) {
    // getting list index of particular clicked list tag
    let getListIndex = element.getAttribute('li-index')
    videoIndex = getListIndex
    loadVideo(videoIndex)
    video.play()
    playingNow()
    pause.classList.add('active')
    play.classList.remove('active')
    setting.classList.remove('active')
    themes.classList.remove('active')
    speeds.classList.remove('active')
    if (isNaN(checkedSpeed.innerText)) {
        video.playbackRate = 1
    } else {
        video.playbackRate = checkedSpeed.innerText
    }
}

// Volume mute
volUp.addEventListener('click', () => {
    volUp.classList.remove('active')
    volDown.classList.remove('active')
    volMute.classList.add('active')
    video.volume = 0
    inputVol.value = 0
})

// Volume unmute
volMute.addEventListener('click', () => {
    volUp.classList.add('active')
    volMute.classList.remove('active')
    volDown.classList.remove('active')
    inputVol.value = inpValue
    video.volume = inpValue / 100
    if (inpValue < 50) {
        volUp.classList.remove('active')
        volDown.classList.add('active')
        volMute.classList.remove('active')
    } else {
        volUp.classList.add('active')
        volDown.classList.remove('active')
        volMute.classList.remove('active')
    }
})

// Volume less then 50%
volDown.addEventListener('click', () => {
    volUp.classList.remove('active')
    volMute.classList.add('active')
    volDown.classList.remove('active')
    video.volume = 0
    inputVol.value = 0
})

// Volume input 
inputVol.addEventListener('input', () => {

    volMute.classList.remove('active')
    const inpVal = inputVol.value
    inpValue = inputVol.value
    volIndicator.innerText = inpVal + ' %'
    video.volume = inpVal / 100
    if (inpVal < 50) {
        volUp.classList.remove('active')
        volDown.classList.add('active')
    } else {
        volUp.classList.add('active')
        volDown.classList.remove('active')
    }

    if (inpVal == 0) {
        volUp.classList.remove('active')
        volDown.classList.remove('active')
        volMute.classList.add('active')
    }
    setting.classList.remove('active')
    themes.classList.remove('active')
    speeds.classList.remove('active')
})

// Percantage of volume
video.addEventListener('volumechange', () => {
    const inpVal = inputVol.value
    volIndicator.innerText = inpVal + ' %'
    video.volume = inpVal / 100
    volIndicator.style.transform = 'translate(-50%, 0)'
    volIndicator.style.zIndex = '2'
})

// Update progress bar width according to video current time
mainVideo.addEventListener('timeupdate', (e) => {
    const currentTime = e.target.currentTime
    const duration = e.target.duration
    let progressWidth = (currentTime / duration) * 100
    progressBar.style.width = `${progressWidth}%`
    let videoCurrentTime = document.querySelector('.current-time')
    let videoDuration = document.querySelector('.max-duration')

    mainVideo.addEventListener('loadeddata', () => {
        // Update video total duration
        let videoDurat = mainVideo.duration
        let totalMin = Math.floor(videoDurat / 60)
        let totalSec = Math.floor(videoDurat % 60)
        if (totalSec < 10) {
            totalSec = `0${totalSec}`
        }
        videoDuration.innerText = `${totalMin}:${totalSec}`
    })

    // Update video current time
    let currentMin = Math.floor(currentTime / 60)
    let currentSec = Math.floor(currentTime % 60)
    if (currentSec < 10) {
        currentSec = `0${currentSec}`
    }
    videoCurrentTime.innerText = `${currentMin}:${currentSec} /`
})

// Update playing video current time according to progrees bar width
progressArea.addEventListener('click', (e) => {
    let progressWidthVal = progressArea.clientWidth
    let clicked = e.offsetX
    let vidDur = mainVideo.duration

    mainVideo.currentTime = (clicked / progressWidthVal) * vidDur
})

// Video player mouseout
videoPlayer.addEventListener('mousemove', () => {
    { clearTimeout(timer) }
        timer = setTimeout(volHide, 5000)
    
    // inputVol.style.width = '0'
})

// Volume indicator hide 
function volHide() {
    volIndicator.style.transform = 'translate(-50%, -300%)'
}

// volume.addEventListener('mouseover', () => {
//     inputVol.style.width = '70px' 
// })

// Theme 
themeBtn.addEventListener('click', () => {
    themes.classList.add('active')
    setting.style.transform = 'translateY(150%)'
})

// Title 
title.forEach(btn => {
    btn.addEventListener('click', () => {
        themes.classList.remove('active')
        speeds.classList.remove('active')
        setting.style.transform = 'translateY(0)'
    })
})

// Speed up 
speedBtn.addEventListener('click', () => {
    speeds.classList.add('active')
    setting.style.transform = 'translateY(150%)'
})

// Speeds 
label.forEach(lbl => {
    lbl.addEventListener('click', () => {
        checkedSpeed.innerText = lbl.innerText
        if (isNaN(lbl.innerText)) {
            video.playbackRate = 1
        }
        video.playbackRate = lbl.innerText
    })
})

// Setting button
set.addEventListener('click', () => {
    set.classList.toggle('active')
    setting.classList.toggle('active')
    themes.classList.remove('active')
    speeds.classList.remove('active')
    setting.style.transform = 'translateY(0)'
})

function getFullScreenElement() {
    return document.fullscreenElement
        || document.webkitFullscreenElement
        || document.mozFullscreenElement
        || document.msFullscreenElement
}

// Full screen toggle double click on video
video.addEventListener('dblclick', () => {
    if (videoPlayer.requestFullscreen()) {
        document.exitFullscreen()
    } else {
        videoPlayer.requestFullscreen()
            .catch(function (error) {
            })
    }

    fullScreen.classList.toggle('active')
    exitFullScreen.classList.toggle('active')

})

// Full screen button
fullScreen.addEventListener('click', () => {
    fullScreen.classList.remove('active')
    exitFullScreen.classList.add('active')
    setting.classList.remove('active')
    themes.classList.remove('active')
    speeds.classList.remove('active')
    videoPlayer.requestFullscreen()
        .catch(function (error) {
        })
})

// Exit full screen button
exitFullScreen.addEventListener('click', () => {
    fullScreen.classList.add('active')
    exitFullScreen.classList.remove('active')
    setting.classList.remove('active')
    themes.classList.remove('active')
    speeds.classList.remove('active')
    document.exitFullscreen()
})
