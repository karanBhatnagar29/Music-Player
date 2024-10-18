let playBtn = document.getElementById("play");
let music = document.querySelector("audio");
let musicPlayer = document.querySelector(".music-player");
let artistName = document.querySelector(".artist");
let musicName = document.querySelector(".music");
let prevBtn = document.getElementById("previous");
let nextBtn = document.getElementById("new");
let cover = document.querySelector("img");
let audioDetail = document.querySelector(".audioDetail");
let timerStart = document.querySelector(".start");
let progressBar = document.getElementById("progressBar");
let endTime = document.querySelector(".end");
let isPlaying = false;

// Songs Array
const songs = [
  {
    song: "audio/Agar Tu Hota.mp3",
    songName: "Agar Tu Hota to",
    artistName: "Anikt Tiwari",
    covers: "covers/1.jpg",
  },
  {
    song: "audio/Husn.mp3",
    songName: "Husn",
    artistName: "Anuv Jain",
    covers: "covers/1.jpg",
  },
  {
    song: "audio/Ishq.mp3",
    songName: "Ishq",
    artistName: "Amir Ameer",
    covers: "covers/cover4.jpg",
  },
];

// Functions definitions
const playMusic = () => {
  isPlaying = true;
  music.play();
  playBtn.classList.replace("fa-play", "fa-pause");
  musicPlayer.classList.add("anime");
};

const pauseMusic = () => {
  isPlaying = false;
  music.pause();
  playBtn.classList.replace("fa-pause", "fa-play");
  musicPlayer.classList.remove("anime");
};

const musicFunction = () => {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
};

const loadSong = (songs) => {
  artistName.textContent = songs.artistName;
  musicName.textContent = songs.songName;
  music.src = songs.song;
  cover.src = songs.covers;
};
// EventListeners
playBtn.addEventListener("click", musicFunction);
// Play next song
let nextIndex = 0;
const playNextSong = () => {
  nextIndex = (nextIndex + 1) % songs.length;
  loadSong(songs[nextIndex]);
  playMusic();
};
nextBtn.addEventListener("click", playNextSong);

// Play previous song

const playPrevSong = () => {
  nextIndex = (nextIndex - 1 + songs.length) % songs.length;

  loadSong(songs[nextIndex]);
  playMusic();
};

prevBtn.addEventListener("click", playPrevSong);
// Timeupdate event

music.addEventListener("timeupdate", (event) => {
  const { currentTime, duration } = event.srcElement;
  let barRealTimeProg = (currentTime / duration) * 100;
  progressBar.value = barRealTimeProg;
  // end time
  let min_duration = Math.floor(duration / 60);
  let sec_duration = Math.floor(duration % 60);
  if (duration) {
    endTime.textContent = `${min_duration}:${sec_duration}`;
  }
  // currentTime
  let min_currentTime = Math.floor(currentTime / 60);
  let sec_currentTime = Math.floor(currentTime % 60);
  if (sec_currentTime < 10) {
    sec_currentTime = `0${sec_currentTime}`;
  }
  timerStart.textContent = `${min_currentTime}:${sec_currentTime}`;
  //   Removing anime class after the song is over
});

// Playing new song after ending the current song
music.addEventListener("ended", playNextSong);
progressBar.addEventListener("click", (event) => {
  const { clientWidth, currentTime } = event.srcElement;
  const { offsetX } = event;
  let progress = (offsetX / clientWidth) * 100;
  music.currentTime = progress;
});
