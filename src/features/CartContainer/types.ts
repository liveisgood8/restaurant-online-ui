import { IDish } from '../../types/menu';

export interface ICartDish {
  dish: IDish;
  count: number;
}

export type ICartDishes = { [id: string]: ICartDish }; 
export interface ICart {
  dishes: ICartDishes;
}