import { PayloadAction } from '@reduxjs/toolkit';
import { getActionName, isRequestType, isSuccessType, isFailureType, RequestType } from './helpers';

interface IStatus {
  isFetching?: boolean;
  isAdding?: boolean;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

export interface IRequestStatusState {
  [actionName: string]: IStatus;
}

function getPropertyNameFromRequestType(type: RequestType): keyof IStatus {
  switch (type) {
    case RequestType.FETCH: return 'isFetching';
    case RequestType.ADD: return 'isAdding';
    case RequestType.UPDATE: return 'isUpdating';
    case RequestType.PARTIAL_UPDATE: return 'isUpdating';
    case RequestType.DELETE: return 'isDeleting';
  }
}

export const statusReducer = (
  state: IRequestStatusState = {},
  action: PayloadAction<RequestType, string>,
): IRequestStatusState => {
  const { type, payload } = action;
  const actionName = getActionName(type);
  const statePropertyName = getPropertyNameFromRequestType(payload);

  if (!actionName) {
    return state;
  }

  if (isRequestType(type)) {
    return {
      ...state,
      [actionName]: {
        [statePropertyName]: true,
      },
    };
  }

  if (isSuccessType(type) || isFailureType(type)) {
    return {
      ...state,
      [actionName]: {
        [statePropertyName]: false,
      },
    };
  }

  return state;
};
