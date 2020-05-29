import { createAction, ActionCreatorWithPayload } from '@reduxjs/toolkit';

export interface IStatusActions {
  request: ActionCreatorWithPayload<void>;
  success: ActionCreatorWithPayload<void>;
  failure: ActionCreatorWithPayload<void>;
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

function createRequestAction(key: string): ActionCreatorWithPayload<void> {
  const type = createLoadingActionType('REQUEST')(key);
  return createAction<void>(type);
}

function createSuccessAction(key: string): ActionCreatorWithPayload<void> {
  const type = createLoadingActionType('SUCCESS')(key);
  return createAction<void>(type);
}

function createFailureAction(key: string): ActionCreatorWithPayload<void> {
  const type = createLoadingActionType('FAILURE')(key);
  return createAction<void>(type);
}

export function createStatusActions(key: string): IStatusActions {
  return {
    request: createRequestAction(key),
    success: createSuccessAction(key),
    failure: createFailureAction(key),
  };
}
