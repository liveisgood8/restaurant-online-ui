import { combineReducers, createReducer } from '@reduxjs/toolkit';
import { setDishUpdating } from './actions';

interface IDishUpdateState {
  isUpdating: boolean;
}

const dishUpdateReducer = createReducer<IDishUpdateState>({
  isUpdating: false,
}, (builder) => {
  builder
    .addCase(setDishUpdating, (state, action) => ({
      ...state,
      isUpdating: action.payload,
    }));
});

export const adminMenuReducer = combineReducers({
  dishUpdate: dishUpdateReducer,
});
