function doLine(color: string, start: number, end: number, step: number, middle: number) {
  let res = '';
  for (let i = start; i < end; i += step) {
    res += `<li class="${color}" style = "transform: rotate(${i}deg) translate(${middle}px) rotate(-${i}deg);"></li>`;
  }
  return res;
}

export class Garland {
  color: string;

  constructor(color: string) {
    this.color = color;
  }

  doHTML(): void {
    (document.querySelector('.garland-tree-container') as HTMLElement).innerHTML = `
      <ul class="lightrope" style = "width: 120px; height: 120px;" >
        ${doLine(this.color, 64, 113, 12, 60)}
      </ul>
      <ul class="lightrope" style = "width: 170px; height: 170px;">
        ${doLine(this.color, 59, 120, 10, 85)}
      </ul>
      <ul class="lightrope" style = "width: 230px; height: 230px;">
        ${doLine(this.color, 59, 116, 8, 115)}
      </ul>
      <ul class="lightrope" style = "width: 300px; height: 300px;">
        ${doLine(this.color, 59, 120, 6, 150)}
      </ul>
      <ul class="lightrope" style = "width: 380px; height: 380px;">
        ${doLine(this.color, 55, 123, 4, 190)}
      </ul>
      <ul class="lightrope" style = "width: 465px; height: 465px;">
        ${doLine(this.color, 55, 125, 3.5, 232.5)}
      </ul>
      <ul class="lightrope" style = "width: 555px; height: 555px;">
        ${doLine(this.color, 57, 127, 3, 277.5)}
      </ul>
      <ul class="lightrope" style = "width: 650px; height: 650px;">
        ${doLine(this.color, 58, 128, 2.5, 325)}
      </ul>
    `;
  }
}
