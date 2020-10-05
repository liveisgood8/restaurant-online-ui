import { IDish } from '../../api/dishes';
import { RootState } from '../../app/store';

export const selectedDishSelector = (state: RootState): IDish | undefined => {
  if (state.menu.selectedDishId) {
    return state.menu.dishes.find((e) => e.id === state.menu.selectedDishId);
  }
};
