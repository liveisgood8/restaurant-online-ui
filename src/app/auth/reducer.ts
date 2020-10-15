import { combineReducers, createReducer } from '@reduxjs/toolkit';
import { IUser } from '../../api/auth';
import { addUserBonuses, setAccessToken, setUserInfo, updateUserInfo } from './actions';
import { getAuthInfo } from './utils';

interface IAuthInfoState {
  accessToken: string | null;
  isAuthenticated: boolean;
}

const authInfo = getAuthInfo();

const authInfoReducer = createReducer<IAuthInfoState>({
  accessToken: authInfo?.accessToken || null,
  isAuthenticated: authInfo?.accessToken != null,
}, (builder) => {
  builder
    .addCase(setAccessToken, (state, action) => ({
      accessToken: action.payload,
      isAuthenticated: action.payload != null,
    }));
});

const userInfoReducer = createReducer<IUser | null>(authInfo?.userInfo || null, (builder) => {
  builder
    .addCase(setUserInfo, (state, action) => action.payload)
    .addCase(updateUserInfo, (state, action) => {
      if (!state) {
        return state;
      }
      return {
        ...state,
        ...action.payload,
      };
    })
    .addCase(addUserBonuses, (state, action) => {
      if (!state) {
        return state;
      }
      return {
        ...state,
        bonuses: state.bonuses + action.payload,
      };
    });
});

export const authReducer = combineReducers({
  authInfo: authInfoReducer,
  userInfo: userInfoReducer,
});
