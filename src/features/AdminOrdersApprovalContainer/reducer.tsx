import { createReducer } from '@reduxjs/toolkit';
import { IOrderDto } from '../../api/orders';
import { deleteNonApprovedOrder, setNonApprovedOrders } from './actions';


export const adminNonApprovedOrdersReducer = createReducer<IOrderDto[]>([], (builder) => {
  builder
    .addCase(setNonApprovedOrders, (state, action) => action.payload)
    .addCase(deleteNonApprovedOrder, (state, action) => state.filter((e) => e.id !== action.payload));
});
