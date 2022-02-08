import { data } from './data';
import { Card } from './cards';
import { ClassName, IdName, LocalState } from '../models/response.model';
import { isAudio } from './settings';
import { arrayOfCount } from './favorites';
import { hideElement, showElement } from './utils';

const startPage = <HTMLElement>document.querySelector(ClassName.START_PAGE);
const switchStartPage = <HTMLElement>document.querySelector(ClassName.SWITCH_START_PAGE);
const toyPage = <HTMLElement>document.getElementById(IdName.TOY_PAGE);
const startToyGame = <HTMLElement>document.getElementById(IdName.START_TOY_GAME);
const switchToyPage = <HTMLElement>document.getElementById(IdName.SWITCH_TOY_PAGE);
const startTreeGame = <HTMLElement>document.getElementById(IdName.START_TREE_GAME);
const treePage = <HTMLElement>document.querySelector(ClassName.FAVORITES_PAGE);

function onStartToyGameClick() {
  hideElement(startPage);
  showElement(toyPage);
  hideElement(treePage);

  const cardContainer = <HTMLElement>document.querySelector(ClassName.CARD_CONTAINER);
  cardContainer.innerHTML = '';

  data.forEach((item): void => {
    const card = new Card(item);
    card.init();
  });

  const cards = Array.from(cardContainer.querySelectorAll(ClassName.CARD));

  arrayOfCount.forEach((element): void => {
    cards[Number(element) - 1].classList.add(ClassName.ACTIVE);
  });
}

export const goToGame = (): void => {
  startToyGame.addEventListener('click', onStartToyGameClick);
  switchStartPage.addEventListener('click', onStartToyGameClick);
};

export const goToHome = (): void => {
  (switchToyPage as HTMLElement).addEventListener('click', () => {
    showElement(startPage);
    hideElement(toyPage);
    hideElement(treePage);
  });
};

export const goToTree = (): void => {
  startTreeGame.addEventListener('click', () => {
    hideElement(startPage);
    hideElement(toyPage);
    showElement(treePage);
    if (localStorage.getItem(LocalState.audio) === LocalState.yes) {
      isAudio();
    }
  });
};
