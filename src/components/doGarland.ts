import { Garland } from './garland';
import { ClassName } from '../models/response.model';

const garlandButtons = <Element>document.querySelector(ClassName.GARLAND_BTNS);

const turnOnGarland = document.querySelector(ClassName.ONOFFSWITCH_CHECKBOX) as HTMLInputElement;

export function garlandOn(): void {
  garlandButtons.addEventListener('click', (event): void => {
    const colorGarland = (event.target as HTMLElement).dataset.color as string;
    const grlnd = new Garland(colorGarland);
    turnOnGarland.checked = false;
    grlnd.doHTML();
  });
}

export function switchGarlnd(): void {
  turnOnGarland.addEventListener('click', (): void => {
    if (turnOnGarland.checked) {
      (document.querySelector(ClassName.GARLAND_TREE_CONTAINER) as HTMLElement).innerHTML = '';
    } else if (!turnOnGarland.checked) {
      const grlnd = new Garland(ClassName.MULTICOLOR);
      turnOnGarland.checked = false;
      grlnd.doHTML();
    }
  });
}
