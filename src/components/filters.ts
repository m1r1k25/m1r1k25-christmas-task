import { target, API } from '../../node_modules/nouislider/dist/nouislider';
import { data } from './data';
import { Card } from './cards';
import { arrayOfCount } from './favorites';
import {
  ICard,
  ForArrayOfDiffQualities,
  IArr,
  ClassName,
  IdName,
} from '../models/response.model';

export let actualArray: ICard[] = [...data];

const limitSlider = <target>document.getElementById(IdName.RANGE_SLIDER);
const yearSlider = <target>document.getElementById(IdName.YEAR_SLIDER);
const output0: HTMLInputElement = <HTMLInputElement>document.getElementById(IdName.OUTPUT_0);
const output1: HTMLInputElement = <HTMLInputElement>document.getElementById(IdName.OUTPUT_1);
const output2: HTMLInputElement = <HTMLInputElement>document.getElementById(IdName.OUTPUT_2);
const output3: HTMLInputElement = <HTMLInputElement>document.getElementById(IdName.OUTPUT_3);
const minToys = 0;
const maxToys = 12;
const oldestToy = 1940;
const youngestToy = 2021;

let arrayOfShapes: ForArrayOfDiffQualities = [];
let arrayOfColors: ForArrayOfDiffQualities = [];
let arrayOfSizes: ForArrayOfDiffQualities = [];

const filters = document.querySelector(ClassName.FILTERS);
const resetButton = <Element>document.querySelector(ClassName.RESET);

function checkWhichFilter(currentValue: string | undefined) {
  if (currentValue === 'шар'
    || currentValue === 'колокольчик'
    || currentValue === 'шишка'
    || currentValue === 'снежинка'
    || currentValue === 'фигурка') {
    arrayOfShapes.push(currentValue);
  } else if (currentValue === 'белый'
    || currentValue === 'желтый'
    || currentValue === 'красный'
    || currentValue === 'синий'
    || currentValue === 'зелёный') {
    arrayOfColors.push(currentValue);
  } else if (currentValue === 'большой'
    || currentValue === 'средний'
    || currentValue === 'малый') {
    arrayOfSizes.push(currentValue);
  }
}

export const filter = (): void => {
  (filters as Element).addEventListener('click', (event): void => {
    const currentTarget = <HTMLElement>event.target;
    const currentValue = currentTarget.dataset.filter;
    if (!currentTarget.classList.contains(ClassName.ACTIVE)) {
      currentTarget.classList.add(ClassName.ACTIVE);
      checkWhichFilter(currentValue);
      data.forEach((item): void => {
        if (currentValue === item.shape
          || currentValue === item.color
          || currentValue === item.size) {
          actualArray.push(item);
        }
      });
    } else if (currentTarget.classList.contains(ClassName.ACTIVE)) {
      currentTarget.classList.remove(ClassName.ACTIVE);
      checkWhichFilter(currentValue);

      actualArray.forEach((item): void => {
        if (currentValue === item.shape) {
          actualArray.filter((item1): boolean => item1.shape !== currentValue);
        }
        if (currentValue === item.color) {
          actualArray.filter((item1): boolean => item1.color !== currentValue);
        }
        if (currentValue === item.size) {
          actualArray.filter((item1): boolean => item1.size !== currentValue);
        }
      });
    }

    const out: ICard[] = Object.values(
      actualArray.reduce((arr: IArr, e): IArr => {
        if (!arr[e.num]) {
          arr[e.num] = e;
        }
        return arr;
      }, {}),
    );

    actualArray = [...out];

    const output = actualArray.filter(({ shape, color, size }): boolean => (arrayOfShapes.length === 0
      || arrayOfShapes.includes(shape)) && (arrayOfColors.length === 0
        || arrayOfColors.includes(color)) && (arrayOfSizes.length === 0
          || arrayOfSizes.includes(size)));

    actualArray = [...output];

    actualArray.sort((a, b): number => +a.num - +b.num);

    const cardContainer = <HTMLElement>document.querySelector(ClassName.CARD_CONTAINER);
    cardContainer.innerHTML = '';
    actualArray.forEach((item): void => {
      const card = new Card(item);
      card.init();
    });
  });
};

resetButton.addEventListener('click', (): void => {
  output0.value = (minToys).toString();
  output1.value = (maxToys).toString();
  output2.value = (oldestToy).toString();
  output3.value = (youngestToy).toString();

  (<API>limitSlider.noUiSlider).updateOptions({ start: [minToys, maxToys] }, false);
  (<API>yearSlider.noUiSlider).updateOptions({ start: [oldestToy, youngestToy] }, false);

  const cardContainer = <Element>document.querySelector(ClassName.CARD_CONTAINER);

  const buttons = Array.from(document.querySelectorAll(ClassName.BUTTON));

  cardContainer.innerHTML = '';

  data.forEach((item) => {
    const card = new Card(item);
    card.init();
  });

  const cards = Array.from(cardContainer.querySelectorAll(ClassName.CARD));

  arrayOfCount.forEach((element): void => {
    cards[Number(element) - 1].classList.add(ClassName.ACTIVE);
  });

  buttons.forEach((element) => {
    if (element.classList.contains(ClassName.ACTIVE)) {
      element.classList.remove(ClassName.ACTIVE);
    }
  });

  arrayOfShapes = [];
  arrayOfColors = [];
  arrayOfSizes = [];
});

const favor: ICard[] = [];

data.forEach((item): void => {
  if (item.favorite === 'да') {
    favor.push(item);
  }
});

const check = <Element>document.querySelector(ClassName.FAVORITE_INPUT);

check.addEventListener('change', (event): void => {
  if ((event.target as HTMLInputElement).checked) {
    const cardContainer = <Element>document.querySelector(ClassName.CARD_CONTAINER);
    cardContainer.innerHTML = '';
    favor.forEach((element): void => {
      const card = new Card(element);
      card.init();
    });
  }
});
