import { ICard } from '../models/response.model';

export class Card {
  item: ICard;

  constructor(item: ICard) {
    this.item = item;
  }

  init(): void {
    (document.querySelector('.card-container') as HTMLElement).innerHTML += `
    <div class="card" data-num="${this.item.num}">
      <h2 class="card-title">${this.item.name}</h2>
      <img class="card-img" src=${require(`../assets/toys/${this.item.num}.png`)} alt="toy">
      <div class="card-description">
        <p class="count">Количество:<span>${this.item.count}</span></p>
        <p class="year">Год покупки:<span>${this.item.year}</span></p>
        <p class="shape">Форма:<span>${this.item.shape}</span></p>
        <p class="color">Цвет:<span>${this.item.color}</span></p>
        <p class="size">Размер:<span>${this.item.size}</span></p>
        <p class="favorite">Любимая:<span>${this.item.favorite}</span></p>
      </div>
      <div class="ribbon"></div>
    </div>
  `;
  }
}
