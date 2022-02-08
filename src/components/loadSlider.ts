import noUiSlider from 'nouislider';
import { target, API } from '../../node_modules/nouislider/dist/nouislider';
import { data } from './data';
import { Card } from './cards';
import {
  ICard,
  ClassName,
  IdName,
  LocalState,
} from '../models/response.model';

const limitSlider = <target>document.getElementById(IdName.RANGE_SLIDER);
const yearSlider = <target>document.getElementById(IdName.YEAR_SLIDER);
const minToys = 0;
const maxToys = 12;
const oldestToy = 1940;
const youngestToy = 2021;
const output0 = <HTMLInputElement>document.getElementById(IdName.OUTPUT_0);
const output1 = <HTMLInputElement>document.getElementById(IdName.OUTPUT_1);
const outputs = [output0, output1];
const output2 = <HTMLInputElement>document.getElementById(IdName.OUTPUT_2);
const output3 = <HTMLInputElement>document.getElementById(IdName.OUTPUT_3);
const outputs1: HTMLInputElement[] = [output2, output3];
const cardContainer = <Element>document.querySelector(ClassName.CARD_CONTAINER);

function sliderRange(): void {
  (<API>limitSlider.noUiSlider).on('update', (values, handle): void => {
    outputs[handle].value = Math.round(+values[handle]).toString();
    const newArr: ICard[] = [];
    data.forEach((element): void => {
      if (+element.count >= +outputs[handle].value) {
        newArr.push(element);
      }
    });
    cardContainer.innerHTML = '';
    newArr.forEach((item: ICard): void => {
      const card = new Card(item);
      card.init();
    });
  });
}

function sliderYear(): void {
  (<API>yearSlider.noUiSlider).on('update', (values, handle): void => {
    outputs1[handle].value = Math.round(+values[handle]).toString();

    const newArr: ICard[] = [];

    data.forEach((element): void => {
      if (+element.year >= +outputs1[handle].value) {
        newArr.push(element);
      }
    });

    cardContainer.innerHTML = '';

    newArr.forEach((item): void => {
      const card = new Card(item);
      card.init();
    });
  });
}

export function loadSlider(): void {
  document.addEventListener('DOMContentLoaded', (): void => {
    noUiSlider.create(limitSlider, {
      start: [minToys, maxToys],
      limit: maxToys,
      step: 1,
      behaviour: LocalState.DRAG,
      connect: true,
      range: {
        min: minToys,
        max: maxToys,
      },
    });
    sliderRange();

    noUiSlider.create(yearSlider, {
      start: [oldestToy, youngestToy],
      limit: 100,
      step: 10,
      behaviour: LocalState.DRAG,
      connect: true,
      range: {
        min: oldestToy,
        max: youngestToy,
      },
    });
    sliderYear();
  });
}
