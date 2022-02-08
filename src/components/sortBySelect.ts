import { Card } from './cards';
import { actualArray } from './filters';
import { data } from './data';
import { ICard, ClassName } from '../models/response.model';

function sortLessMore(temp: ICard[]) {
  temp.sort((a, b) => +a.year - +b.year);
}

function sortMoreLess(temp: ICard[]) {
  temp.sort((a, b) => +b.year - +a.year);
}

function sortAB(temp: ICard[]) {
  temp.sort((a, b) => a.name.localeCompare(b.name));
}

function sortBA(temp: ICard[]) {
  temp.sort((a, b) => b.name.localeCompare(a.name));
}

function sortBy(temp: ICard[], select: HTMLSelectElement) {
  if (select.value === ClassName.SORT_COUNT_MAX) {
    sortLessMore(temp);
  }
  if (select.value === ClassName.SORT_COUNT_MIN) {
    sortMoreLess(temp);
  }
  if (select.value === ClassName.SORT_NAME_MAX) {
    sortAB(temp);
  }
  if (select.value === ClassName.SORT_NAME_MIN) {
    sortBA(temp);
  }
}

export function sortBySelect(): void {
  const select = <HTMLSelectElement>document.querySelector(ClassName.SELECT);
  let temp = [];

  select.addEventListener('change', (): void => {
    if (actualArray.length === 0 || actualArray.length === 60) {
      temp = [...data];
      sortBy(temp, select);
    } else {
      temp = [...actualArray];
      sortBy(temp, select);
    }

    const cardContainer = <HTMLElement>document.querySelector(ClassName.CARD_CONTAINER);
    cardContainer.innerHTML = '';
    temp.forEach((item): void => {
      const card = new Card(item);
      card.init();
    });
  });
}
