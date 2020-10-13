import { ActionCreatorWithPayload, combineReducers, createReducer } from '@reduxjs/toolkit';
import {
  setCategoryAdded,
  setCategoryAdding,
  setCategoryUpdating,
  setDishAdded,
  setDishAdding,
  setDishUpdating,
} from './actions';

interface IEntityModificationsState {
  isUpdating: boolean;
  isAdding: boolean;
  isAdded: boolean;
}

type BooleanAction = ActionCreatorWithPayload<boolean, string>;

function createEntityReducer(updatingAction: BooleanAction,
  addingAction: BooleanAction,
  addedAction: BooleanAction,
) {
  return createReducer<IEntityModificationsState>({
    isUpdating: false,
    isAdded: false,
    isAdding: false,
  }, (builder) => {
    builder
      .addCase(updatingAction, (state, action) => ({
        ...state,
        isUpdating: action.payload,
      }))
      .addCase(addingAction, (state, action) => ({
        ...state,
        isAdding: action.payload,
      }))
      .addCase(addedAction, (state, action) => ({
        ...state,
        isAdded: action.payload,
      }));
  });
}

export const adminMenuReducer = combineReducers({
  dishes: createEntityReducer(setDishUpdating, setDishAdding, setDishAdded),
  categories: createEntityReducer(setCategoryUpdating, setCategoryAdding, setCategoryAdded),
});
