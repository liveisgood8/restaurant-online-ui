import { createAction } from '@reduxjs/toolkit';
import { IDish } from '../../types/menu';
import { createApiRequestThunk } from '../../helpers/fetch';

export const setDishes = createAction<IDish[]>('@@menu/setDishes');

export const [getDishesThunk, getDishesStatusSelector] = createApiRequestThunk<IDish[]>({
  actions: {
    success: setDishes.toString(),
  },
  endpoint: '/dishes',
  method: 'GET',
});
