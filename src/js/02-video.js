import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const STORAGE_KEY = `videoplayer-current-time`;
let timeStamp = 0;
const storedTime = localStorage.getItem(STORAGE_KEY);
if (storedTime) {
  player.setCurrentTime(storedTime);
}
player.on(
  'timeupdate',
  throttle(data => {
    timeStamp = data[`seconds`];
    localStorage.setItem(STORAGE_KEY, timeStamp);
    console.log(timeStamp);
  }, 1000)
);
