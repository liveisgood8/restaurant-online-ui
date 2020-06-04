import { IDish } from '../../api/dishes';

export interface ICartDish {
  dish: IDish;
  count: number;
}

export type ICartDishes = { [id: string]: ICartDish }; 
export interface ICart {
  dishes: ICartDishes;
}