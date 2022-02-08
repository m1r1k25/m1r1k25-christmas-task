import '@fortawesome/fontawesome-free/js/all';
import { ClassName, LocalState } from '../models/response.model';

const audioButton = <Element>document.querySelector(ClassName.AUDIO_CONTROL);
const audio = <HTMLAudioElement>document.querySelector(ClassName.AUDIO);
const snowButton = <Element>document.querySelector(ClassName.SNOW_CONTROL);
const treeContainer = <Element>document.querySelector(ClassName.TREE_CONTAINER);
const bgContainer = document.querySelector(ClassName.BG_CONTAINER);
const resetls = <Element>document.querySelector(ClassName.RESETLS);
const urlForBG = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/bg/';
const justThree = 3;
const justTwo = 2;
const justTen = 10;

let snow: string = LocalState.nosnow;
let audioLS: string = LocalState.no;
let currentValue = '1';
let currentValueTree = '1';
let localSt = LocalState.yes;

export function isAudio(): void {
  if (!audioButton.classList.contains(ClassName.ACTIVE)) {
    audioButton.classList.add(ClassName.ACTIVE);
    audioLS = LocalState.yes;
    audio.play();
    return;
  }
  audioButton.classList.remove(ClassName.ACTIVE);
  audioLS = LocalState.no;
  audio.pause();
}

export const audioPlay = (): void => {
  audioButton.addEventListener('click', isAudio);
};

export const createSnowFlake = (): void => {
  const snowFlake = document.createElement('i');
  snowFlake.classList.add(ClassName.FAS);
  snowFlake.classList.add(ClassName.FA_SNOWFLAKE);
  snowFlake.style.left = Math.random() * window.innerWidth + 'px';
  snowFlake.style.animationDuration = Math.random() * justThree + justTwo + 's';
  snowFlake.style.opacity = String(Math.random());
  snowFlake.style.fontSize = Math.random() * justTen + justTen + 'px';
  document.body.appendChild(snowFlake);

  setTimeout(() => {
    snowFlake.remove();
  }, 5000);
};

export const snowOn = (): void => {
  snowButton.addEventListener('click', isSnow);
};

let snowTimer: number | undefined;

export default function isSnow(): void {
  if (!snowButton.classList.contains(ClassName.ACTIVE)) {
    snowButton.classList.add(ClassName.ACTIVE);
    snow = LocalState.yessnow;
    snowTimer = Number(setInterval((): void => {
      createSnowFlake();
    }, 50));
  } else {
    snowButton.classList.remove(ClassName.ACTIVE);
    snow = LocalState.nosnow;
    clearInterval(snowTimer);
  }
}

function isChangeTree(): void {
  const mainTree = <HTMLImageElement>document.querySelector(ClassName.MAIN_TREE);
  mainTree.src = require(`../assets/tree/${currentValueTree}.png`);
}

export const changeTree = (): void => {
  treeContainer.addEventListener('click', (event: Event): void => {
    currentValueTree = (event.target as HTMLElement).dataset.tree as string;
    isChangeTree();
  });
};

export function isChangeBG(): void {
  const mainTreeContainer = <HTMLElement>document.querySelector(ClassName.MAIN_TREE_CONTAINER);
  mainTreeContainer.style.backgroundImage = `url('${urlForBG}${currentValue}.jpg')`;
}

export const changeBG = (): void => {
  (bgContainer as HTMLElement).addEventListener('click', (event): void => {
    currentValue = (event.target as HTMLElement).dataset.bg as string;
    isChangeBG();
  });
};

resetls.addEventListener('click', (): void => {
  localSt = LocalState.no;
  snow = LocalState.nosnow;
  audioLS = LocalState.no;
  currentValue = '0';
  currentValueTree = '1';
  isChangeBG();
  isChangeTree();
  snowButton.classList.remove(ClassName.ACTIVE);
  snow = LocalState.nosnow;
  clearInterval(snowTimer);
  audioButton.classList.remove(ClassName.ACTIVE);
  audioLS = LocalState.no;
  audio.pause();
  localStorage.clear();
});

export function setLocalStorage(): void {
  if (localSt === LocalState.yes) {
    localStorage.setItem(LocalState.snow, snow);
    localStorage.setItem(LocalState.audio, audioLS);
    localStorage.setItem(LocalState.currentValue, currentValue);
    localStorage.setItem(LocalState.currentValueTree, currentValueTree);
  }
}

window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage(): void {
  snow = localStorage.getItem(LocalState.snow) as string;
  currentValue = localStorage.getItem(LocalState.currentValue) as string;
  currentValueTree = localStorage.getItem(LocalState.currentValueTree) as string;
  if (snow === LocalState.yessnow) {
    isSnow();
  }
  isChangeBG();
  isChangeTree();
}
window.addEventListener('load', getLocalStorage);
