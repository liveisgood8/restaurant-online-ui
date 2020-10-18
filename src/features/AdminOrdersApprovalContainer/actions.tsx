import { createAction } from '@reduxjs/toolkit';
import { IOrderDto, OrdersApi } from '../../api/orders';
import { createStatusActions, RequestType } from '../../app/status/helpers';
import { AppDispatch, AppThunk } from '../../app/store';
import { handleError } from '../../errors/handler';
import { emojify } from '../../helpers/emoji/emoji-messages';
import { EmojiType } from '../../helpers/emoji/emoji-type';

export const ordersApprovalStatus = createStatusActions('@@adminApprovals/ordersApproval');
export const setNonApprovedOrders = createAction<IOrderDto[]>('@@adminApprovals/setNonApprovedOrders');
export const deleteNonApprovedOrder = createAction<number>('@@adminApprovals/deleteNonApprovedOrder');

export const getNonApprovedOrders = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(ordersApprovalStatus.actions.request(RequestType.FETCH));
    const nonApprovedOrders = await OrdersApi.get(false);
    dispatch(setNonApprovedOrders(nonApprovedOrders));
    dispatch(ordersApprovalStatus.actions.success(RequestType.FETCH));
  } catch (err) {
    dispatch(ordersApprovalStatus.actions.failure(RequestType.FETCH));
    handleError(err, emojify('Упс, не удалось загрузить список заказов ожидающих подтверждения', EmojiType.SAD));
  }
};

export const approveOrder = (id: number): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(ordersApprovalStatus.actions.request(RequestType.PARTIAL_UPDATE));
    await OrdersApi.approveOrder(id);
    dispatch(deleteNonApprovedOrder(id));
    dispatch(ordersApprovalStatus.actions.success(RequestType.PARTIAL_UPDATE));
  } catch (err) {
    dispatch(ordersApprovalStatus.actions.failure(RequestType.PARTIAL_UPDATE));
    handleError(err, emojify('Упс, не удалось подтвердить заказ', EmojiType.SAD));
  }
};
