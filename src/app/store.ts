import { configureStore, ThunkAction, Action, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { statusReducer } from './status/reducer';
import { menuReducer } from '../features/MenuContainer/reducer';
import { cartReducer } from '../features/CartContainer/reducer';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { authReducer } from './auth/reducer';
import { adminMenuReducer } from '../features/AdminMenuContainer/reducer';
import { adminNonApprovedOrdersReducer } from '../features/AdminOrdersApprovalContainer/reducer';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  status: statusReducer,
  auth: authReducer,
  menu: menuReducer,
  adminMenu: adminMenuReducer,
  adminNonApprovedOrders: adminNonApprovedOrdersReducer,
  cart: cartReducer,
  router: connectRouter(history),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), routerMiddleware(history)],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
