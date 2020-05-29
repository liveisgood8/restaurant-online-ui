import { Action } from '@reduxjs/toolkit';
import { getActionName, isRequestType, isSuccessType, isFailureType } from './helpers';

export interface IStatusState {
  [actionName: string]: {
    isLoading: boolean;
  }
}

export const statusReducer = (state: IStatusState = {}, action: Action<string>): IStatusState => {
  const { type } = action;
  const actionName = getActionName(type);

  if (!actionName) {
    return state;
  }

  if (isRequestType(type)) {
    return {
      ...state,
      [actionName]: {
        isLoading: true,
      },
    };
  }

  if (isSuccessType(type) || isFailureType(type)) {
    return {
      ...state,
      [actionName]: {
        isLoading: false,
      },
    };
  }

  return state;
};
