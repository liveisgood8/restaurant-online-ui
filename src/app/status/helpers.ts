import { createAction, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum RequestType {
  FETCH,
  ADD,
  UPDATE,
  PARTIAL_UPDATE,
  DELETE,
}


export interface IStatusActions {
  actions: {
    request: ActionCreatorWithPayload<RequestType>;
    success: ActionCreatorWithPayload<RequestType>;
    failure: ActionCreatorWithPayload<RequestType>;
  },
  selectors: {
    isFetching: (state: RootState) => boolean;
    isUpdating: (state: RootState) => boolean;
    isAdding: (state: RootState) => boolean;
    isDeleting: (state: RootState) => boolean;
  }
}


export function getActionName(actionType: string): string | null {
  if (typeof actionType !== 'string') {
    return null;
  }

  return actionType
    .split('_')
    .slice(0, -1)
    .join('_');
}

export function isRequestType(type: string): boolean {
  return type.endsWith('_REQUEST');
}

export function isSuccessType(type: string): boolean {
  return type.endsWith('_SUCCESS');
}

export function isFailureType(type: string): boolean {
  return type.endsWith('_FAILURE');
}

function createLoadingActionType(suffix: 'REQUEST' | 'SUCCESS' | 'FAILURE'): (key: string) => string {
  return (key: string): string => {
    return `${key}_${suffix}`;
  };
}

function createRequestAction(key: string): ActionCreatorWithPayload<RequestType> {
  const type = createLoadingActionType('REQUEST')(key);
  return createAction<RequestType>(type);
}

function createSuccessAction(key: string): ActionCreatorWithPayload<RequestType> {
  const type = createLoadingActionType('SUCCESS')(key);
  return createAction<RequestType>(type);
}

function createFailureAction(key: string): ActionCreatorWithPayload<RequestType> {
  const type = createLoadingActionType('FAILURE')(key);
  return createAction<RequestType>(type);
}

export function createStatusActions(key: string): IStatusActions {
  return {
    actions: {
      request: createRequestAction(key),
      success: createSuccessAction(key),
      failure: createFailureAction(key),
    },
    selectors: {
      isFetching: (state: RootState): boolean => state.status[key]?.isFetching || false,
      isUpdating: (state: RootState): boolean => state.status[key]?.isUpdating || false,
      isAdding: (state: RootState): boolean => state.status[key]?.isAdding || false,
      isDeleting: (state: RootState): boolean => state.status[key]?.isDeleting || false,
    },
  };
}
