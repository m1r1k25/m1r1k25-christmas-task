import { ClassName } from '../models/response.model';

export function hideElement(element: HTMLElement): void {
  element.classList.add(ClassName.HIDE);
}

export function showElement(element: HTMLElement): void {
  element.classList.remove(ClassName.HIDE);
}
