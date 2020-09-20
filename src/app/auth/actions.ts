import { createAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { IAuthInfo, IUserMinimalInfo } from '../../api/auth';
import { IAuthRequestBody } from '../../api/payloads/auth';
import { AxiosInstance, getBearerAuthorizationHeader } from '../../helpers/axios-instance';
import { RoutePath } from '../../routes/paths';
import { AppDispatch, AppThunk } from '../store';
import { getAuthInfo, setAuthInfo } from './utils';

export const setAccessToken = createAction<string | null>('@@auth/set-info');
export const setUserInfo = createAction<IUserMinimalInfo | null>('@@auth/set-info');
export const addUserBonuses = createAction<number>('@@auth/add-bonuses');

export const login = (authRequestData: IAuthRequestBody): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
  const { data } = await AxiosInstance.post<IAuthInfo>('/auth', authRequestData);
  setAuthInfo(data);
  AxiosInstance.defaults.headers = {
    ...AxiosInstance.defaults.headers,
    ...getBearerAuthorizationHeader(),
  };

  dispatch(setAccessToken(data.accessToken));
  dispatch(setUserInfo(data.userInfo));
  dispatch(push(RoutePath.HOME));
};

export const logout = (): AppThunk => (dispatch: AppDispatch): void => {
  setAuthInfo(null);
  dispatch(setAccessToken(null));
  dispatch(setUserInfo(null));
  dispatch(push(RoutePath.HOME));
};

export const addUserBonusesThunk = (additionalBonuses: number): AppThunk => (dispatch: AppDispatch): void => {
  const authInfo = getAuthInfo();
  if (!authInfo) {
    throw new Error('Bonuses could not be added when auth info is null');
  }

  setAuthInfo({
    ...authInfo,
    userInfo: {
      ...authInfo.userInfo,
      bonuses: authInfo.userInfo.bonuses + additionalBonuses,
    },
  });
  dispatch(addUserBonuses(additionalBonuses));
};
