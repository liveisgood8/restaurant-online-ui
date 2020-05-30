import { ICart } from './types';

export function getCartFromLocalStorage(): ICart | undefined {
  const localStorageCart = localStorage.getItem('cart');
  if (!localStorageCart) {
    return;
  } else {
    return JSON.parse(localStorageCart);
  }
}

export function saveCartInLocalStorage(cart: ICart): void {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function cleanCartInLocalStorage(): void {
  localStorage.removeItem('cart');
}
