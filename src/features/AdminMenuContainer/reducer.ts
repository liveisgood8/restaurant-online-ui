import { combineReducers, createReducer } from '@reduxjs/toolkit';
import { setDishImageUpdating, setDishPropertiesUpdating } from './actions';

interface IDishUpdateState {
  isImageUpdating: boolean;
  isPropertiesUpdating?: boolean;
}

const dishUpdateReducer = createReducer<IDishUpdateState>({
  isImageUpdating: false,
  isPropertiesUpdating: false,
}, (builder) => {
  builder
    .addCase(setDishImageUpdating, (state, action) => ({
      ...state,
      isImageUpdating: action.payload,
    }))
    .addCase(setDishPropertiesUpdating, (state, action) => ({
      ...state,
      isPropertiesUpdating: action.payload,
    }));
});

export const adminMenuReducer = combineReducers({
  dishUpdate: dishUpdateReducer,
});
