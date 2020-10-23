import { combineReducers, createReducer } from '@reduxjs/toolkit';
import { IOrderDto } from '../../api/orders';
import { deleteNonApprovedOrder, setCurrentOrderAction, setNonApprovedOrders } from './actions';


const adminNonApprovedOrdersReducer = createReducer<IOrderDto[]>([], (builder) => {
  builder
    .addCase(setNonApprovedOrders, (state, action) => action.payload)
    .addCase(deleteNonApprovedOrder, (state, action) => state.filter((e) => e.id !== action.payload));
});

const adminCurrentOrder = createReducer<IOrderDto | null>(null, (builder) => {
  builder
    .addCase(setCurrentOrderAction, (state, action) => action.payload);
});

export const adminApprovalOrdersReducer = combineReducers({
  nonApprovedOrders: adminNonApprovedOrdersReducer,
  currentOrder: adminCurrentOrder,
});

