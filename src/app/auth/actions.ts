import { createAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { AuthApi, IAuthInfo, IUser } from '../../api/auth';
import { IAuthRequestBody } from '../../api/payloads/auth';
import { handleError } from '../../errors/handler';
import { cleanPersistentCart } from '../../features/CartContainer/actions';
import { AxiosInstance, getBearerAuthorizationHeader } from '../../helpers/axios-instance';
import { emojify } from '../../helpers/emoji/emoji-messages';
import { EmojiType } from '../../helpers/emoji/emoji-type';
import { parseJwt } from '../../helpers/jwt';
import { notifications } from '../../helpers/notifications';
import { RoutePath } from '../../routes/paths';
import { PartialWithoutId } from '../../types/utils';
import { AppDispatch, AppThunk, AppThunkDispatch } from '../store';
import { getAuthInfo, setAuthInfo } from './utils';

export const setAccessToken = createAction<string | null>('@@auth/set-info');
export const setUserInfo = createAction<IUser | null>('@@auth/set-user-info');
export const updateUserInfo = createAction<PartialWithoutId<IUser>>('@@auth/update-user-info');
export const addUserBonuses = createAction<number>('@@auth/add-bonuses');

function getUserInfoFromToken(token: string): IUser {
  const tokenData = parseJwt(token);
  if (!tokenData.user) {
    throw new Error('User info is not founded in auth token');
  }
  return tokenData.user as IUser;
}

function updateAxiosAndStorageAuthInfo(token: string, userInfo: IUser) {
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
    const parsedUserInfo = getUserInfoFromToken(data.accessToken);

    updateAxiosAndStorageAuthInfo(data.accessToken, parsedUserInfo);

    dispatch(setAccessToken(data.accessToken));
    dispatch(setUserInfo(parsedUserInfo));
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
      notifications.info('Нужно установить личный пароль 🔑', {
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
  AxiosInstance.defaults.headers = {
    ...AxiosInstance.defaults.headers,
    'Authorization': undefined,
  };
  (dispatch as AppThunkDispatch)(cleanPersistentCart());
  setAuthInfo(null);
  dispatch(setAccessToken(null));
  dispatch(setUserInfo(null));
  dispatch(push(RoutePath.HOME));
};

export const updateUserInfoThunk = (
  info: IUser,
): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const newUser = await AuthApi.updateInfo(info);
    const authInfo = getAuthInfo();
    if (!authInfo) {
      throw new Error('Could not update user info because user is not authorized');
    }

    setAuthInfo({
      ...authInfo,
      userInfo: newUser,
    });

    dispatch(updateUserInfo({
      ...newUser,
    }));
    notifications.success('Данные учетной записи успешно обновлены 👌');
  } catch (err) {
    handleError(err);
  }
};

export const addUserBonusesThunk = (bonuses: number): AppThunk => (dispatch: AppDispatch): void => {
  const authInfo = getAuthInfo();
  if (!authInfo) {
    throw new Error('Bonuses could not be added when auth info is null');
  }

  setAuthInfo({
    ...authInfo,
    userInfo: {
      ...authInfo.userInfo,
      bonusesBalance: authInfo.userInfo.bonusesBalance + bonuses,
    },
  });
  dispatch(addUserBonuses(bonuses));
};
