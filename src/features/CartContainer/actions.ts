import { createAction } from '@reduxjs/toolkit';
import { IDish } from '../../types/menu';

export const addDishInCart = createAction<IDish>('@@cart/addDish');
export const removeDishFromCart = createAction<IDish>('@@cart/removeDish');