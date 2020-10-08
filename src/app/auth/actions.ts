import { createAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { access } from 'fs';
import { userInfo } from 'os';
import { AuthApi, IAuthInfo, IUser, IUserMinimalInfo } from '../../api/auth';
import { IAuthRequestBody } from '../../api/payloads/auth';
import { handleError } from '../../errors/handler';
import { AxiosInstance, getBearerAuthorizationHeader } from '../../helpers/axios-instance';
import { emojify } from '../../helpers/emoji/emoji-messages';
import { EmojiType } from '../../helpers/emoji/emoji-type';
import { parseJwt } from '../../helpers/jwt';
import { showInfoNotification, showSuccessNotification } from '../../helpers/notifications';
import { RoutePath } from '../../routes/paths';
import { PartialWithoutId } from '../../types/utils';
import { AppDispatch, AppThunk } from '../store';
import { getAuthInfo, setAuthInfo } from './utils';

export const setAccessToken = createAction<string | null>('@@auth/set-info');
export const setUserInfo = createAction<IUserMinimalInfo | null>('@@auth/set-user-info');
export const updateUserInfo = createAction<PartialWithoutId<IUserMinimalInfo>>('@@auth/update-user-info');
export const addUserBonuses = createAction<number>('@@auth/add-bonuses');

function getUserInfoFromToken(token: string): IUserMinimalInfo {
  const tokenData = parseJwt(token);
  if (!tokenData.user) {
    throw new Error('User info is not founded in auth token');
  }
  return tokenData.user as IUserMinimalInfo;
}

function updateAxiosAndStorageAuthInfo(token: string, userInfo: IUserMinimalInfo) {
  setAuthInfo({
    accessToken: token,
    userInfo: userInfo,
  });
  AxiosInstance.defaults.headers = {
    ...AxiosInstance.defaults.headers,
    ...getBearerAuthorizationHeader(),
  };
}

export const login = (authRequestData: IAuthRequestBody): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const { data } = await AxiosInstance.post<IAuthInfo>('/auth', authRequestData);
    updateAxiosAndStorageAuthInfo(data.accessToken, data.userInfo);

    dispatch(setAccessToken(data.accessToken));
    dispatch(setUserInfo(getUserInfoFromToken(data.accessToken)));
    dispatch(push(RoutePath.HOME));
  } catch (err) {
    handleError(err, emojify('Упс, не удалось совершить вход', EmojiType.SAD));
  }
};

export const loginByOAuth2 = (
  token: string,
  isCredentialsExpired: boolean,
): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const parsedUserInfo = getUserInfoFromToken(token);
    updateAxiosAndStorageAuthInfo(token, parsedUserInfo);

    dispatch(setAccessToken(token));
    dispatch(setUserInfo(parsedUserInfo));
    if (isCredentialsExpired) {
      dispatch(push(RoutePath.PROFILE));
      showInfoNotification('Нужно установить личный пароль 🔑', {
        autoClose: false,
      });
    } else {
      dispatch(push(RoutePath.HOME));
    }
  } catch (err) {
    handleError(err, emojify('Упс, не удалось совершить вход', EmojiType.SAD));
  }
};

export const logout = (): AppThunk => (dispatch: AppDispatch): void => {
  setAuthInfo(null);
  dispatch(setAccessToken(null));
  dispatch(setUserInfo(null));
  dispatch(push(RoutePath.HOME));
};

export const updateUserInfoThunk = (
  info: PartialWithoutId<IUser>,
): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
  try {
    await AuthApi.updateInfo(info);
    const authInfo = getAuthInfo();
    if (authInfo) {
      setAuthInfo({
        ...authInfo,
        userInfo: {
          ...authInfo.userInfo,
          name: info.name,
        },
      });
    }
    dispatch(updateUserInfo({
      name: info.name,
    }));
    showSuccessNotification('Данные учетной записи успешно обновлены 👌');
  } catch (err) {
    handleError(err);
  }
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
