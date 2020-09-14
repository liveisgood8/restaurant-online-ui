import { combineReducers, createReducer } from '@reduxjs/toolkit';
import { IUserMinimalInfo } from '../../api/auth';
import { addUserBonuses, setAccessToken, setUserInfo } from './actions';

interface IAuthInfoState {
  accessToken: string | null;
  isAuthenticated: boolean;
}

const authInfoReducer = createReducer<IAuthInfoState>({
  accessToken: null,
  isAuthenticated: false,
}, (builder) => {
  builder
    .addCase(setAccessToken, (state, action) => ({
      accessToken: action.payload,
      isAuthenticated: action.payload != null,
    }));
});

const userInfoReducer = createReducer<IUserMinimalInfo | null>(null, (builder) => {
  builder
    .addCase(setUserInfo, (state, action) => action.payload)
    .addCase(addUserBonuses, (state, action) => {
      if (!state) {
        return state;
      }
      return {
        ...state,
        bonuses: state.bonuses + action.payload,
      };
    })
});

export const authReducer = combineReducers({
  authInfo: authInfoReducer,
  userInfo: userInfoReducer,
});