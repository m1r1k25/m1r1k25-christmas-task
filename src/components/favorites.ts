import {
  ClassName,
  IdName,
  LocalState,
  ICard,
} from '../models/response.model';
import { data } from './data';

const messageMoreTwenty = 'Извините, все слоты заполнены';
export const arrayOfCount: (string | undefined)[] = [];
const totalFavToys = 20;
const container: Element = <Element>document.querySelector(ClassName.CARD_CONTAINER);
const counter = document.getElementById(IdName.COUNTER);

function addToyToFavorites(event: Event): void {
  const target = <HTMLElement>event.target;
  if (!target.classList.contains(ClassName.ACTIVE)) {
    target.classList.add(ClassName.ACTIVE);
    arrayOfCount.push(target.dataset.num);
  } else if ((target as HTMLElement).classList.contains(ClassName.ACTIVE)) {
    (target as HTMLElement).classList.remove(ClassName.ACTIVE);
    const newArr = arrayOfCount.indexOf(target.dataset.num);
    if (newArr !== -1) {
      arrayOfCount.splice(newArr, 1);
    }
  }
  (counter as HTMLElement).innerHTML = String(arrayOfCount.length);
}

function informAllSlotsAreFull(event: Event): void {
  const target = event.target;
  if ((target as HTMLElement).classList.contains(ClassName.ACTIVE)) {
    (target as HTMLElement).classList.remove(ClassName.ACTIVE);
    arrayOfCount.pop();
    return;
  }
  alert(messageMoreTwenty);
}

function renderFavToys(arr: ICard[]): void {
  arr.forEach((item): void => {
    let img = '';
    for (let i = 1; i <= +item.count; i++) {
      img += `<img class="favorites-card-img" src =
      ${require(`../assets/toys/${item.num}.png`)} alt = "toy" id = "${item.num}-${i}" draggable="true"
      data-imgnum="${item.num}">`;
    }

    (document.querySelector(ClassName.FAVORITES_CONTAINER) as HTMLElement).innerHTML += `
      <div class="favorites-card" data-num="${item.num}">
        <p class="favorites-count">${item.count}</p>
        ${img}
      </div>
      `;
  });
}

export const favorites = (): void => {
  container.addEventListener('click', (event: Event): void => {
    if (arrayOfCount.length < totalFavToys) {
      addToyToFavorites(event);
    } else if (arrayOfCount.length === totalFavToys) {
      informAllSlotsAreFull(event);
    }
    (document.querySelector(ClassName.FAVORITES_CONTAINER) as HTMLElement).innerHTML = '';

    const newArr: ICard[] = [];

    data.forEach((element): void => {
      arrayOfCount.filter((item): void => {
        if (String(item) === element.num) {
          newArr.push(element);
        }
      });
    });

    if (newArr.length === 0) {
      const firstTwenty: ICard[] = [];
      data.forEach((element): void => {
        if (+element.num <= totalFavToys) {
          firstTwenty.push(element);
        }
      });
      renderFavToys(firstTwenty);
    } else {
      renderFavToys(newArr);
    }
  });
};

const zone1 = <HTMLElement>document.querySelector(ClassName.AREA);
const zone2 = <HTMLElement>document.querySelector(ClassName.FAVORITES_CONTAINER);

zone2.addEventListener(LocalState.DRAGSTART, (event: DragEvent): void => {
  (event.dataTransfer as DataTransfer).setData(LocalState.text, (event.target as HTMLElement).id);

  function handleDragEnterLeave(this: HTMLElement, e: { type: string; }): void {
    if (e.type === LocalState.DRAGENTER) {
      this.className = ClassName.DRAG_ENTER;
    } else {
      this.className = '';
    }
  }

  function handleOverDrop(this: HTMLElement, e: DragEvent): void {
    e.preventDefault();
    if (e.type !== LocalState.DROP) {
      return;
    }

    const draggedId = (e.dataTransfer as DataTransfer).getData(LocalState.text);
    const draggedEl = <HTMLElement>document.getElementById(draggedId);

    if (draggedEl.parentNode === this) {
      this.className = '';
      return;
    }

    const num = draggedEl.dataset.imgnum;
    const block = <HTMLElement>zone2.querySelector(`div[data-num='${num}']`);
    const count = <HTMLParagraphElement>block.querySelector('p');
    const actualNum = String(Number(count.textContent) - 1);

    count.innerHTML = actualNum;

    (draggedEl.parentNode as HTMLElement).removeChild(draggedEl);
    this.appendChild(draggedEl);
    draggedEl.style.left = e.offsetX - draggedEl.offsetWidth / 2 + 'px';
    draggedEl.style.top = e.offsetY - draggedEl.offsetHeight / 2 + 'px';
    this.className = '';
  }

  (zone1 as HTMLElement).addEventListener(LocalState.DRAGOVER, handleOverDrop);
  (zone1 as HTMLElement).addEventListener(LocalState.DROP, handleOverDrop);
  zone1.addEventListener(LocalState.DRAGENTER, handleDragEnterLeave);
  zone1.addEventListener(LocalState.DRAGLEAVE, handleDragEnterLeave);
});

zone1.addEventListener(LocalState.DRAGSTART, (event: DragEvent): void => {
  (event.dataTransfer as DataTransfer).setData(LocalState.text, (event.target as HTMLElement).id);

  function handleDragEnterLeave(this: HTMLElement): void {
    this.className = '';
  }

  function handleOverDrop(this: HTMLElement, e: DragEvent): void {
    e.preventDefault();

    const draggedId = (e.dataTransfer as DataTransfer).getData(LocalState.text);

    const draggedEl = <HTMLElement>document.getElementById(String(draggedId));

    (draggedEl.parentNode as HTMLElement).removeChild(draggedEl);
    this.appendChild(draggedEl);
    draggedEl.style.left = e.offsetX - draggedEl.offsetWidth / 2 + 'px';
    draggedEl.style.top = e.offsetY - draggedEl.offsetHeight / 2 + 'px';
    this.className = '';
  }

  (zone1 as HTMLElement).addEventListener(LocalState.DRAGOVER, handleOverDrop);
  (zone1 as HTMLElement).addEventListener(LocalState.DROP, handleOverDrop);
  zone1.addEventListener(LocalState.DRAGENTER, handleDragEnterLeave);
  zone1.addEventListener(LocalState.DRAGLEAVE, handleDragEnterLeave);
});

zone1.addEventListener(LocalState.DRAGSTART, (event: DragEvent): void => {
  (event.dataTransfer as DataTransfer).setData(LocalState.text, (event.target as HTMLElement).id);

  function allowDrop(ev: DragEvent) {
    ev.preventDefault();
  }

  (zone2 as HTMLElement).ondragover = allowDrop;

  function drop(this: GlobalEventHandlers, e: DragEvent): void {
    e.preventDefault();
    const draggedId = (e.dataTransfer as DataTransfer).getData(LocalState.text);
    const draggedEl = <HTMLElement>document.getElementById(draggedId);
    const num = draggedEl.dataset.imgnum;
    const block = <HTMLElement>zone2.querySelector(`div[data-num='${num}']`);

    block.appendChild(draggedEl);

    draggedEl.style.left = '';
    draggedEl.style.top = '';

    const count = <HTMLParagraphElement>block.querySelector('p');

    const actualNum = String(Number(count.textContent) + 1);

    count.innerHTML = actualNum;
  }

  zone2.ondrop = drop;
});
