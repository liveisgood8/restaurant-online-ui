import { createAction } from '@reduxjs/toolkit';
import { IOrderDto, OrdersApi } from '../../api/orders';
import { createStatusActions, RequestType } from '../../app/status/helpers';
import { AppDispatch, AppThunk } from '../../app/store';
import { handleError } from '../../errors/handler';
import { emojify } from '../../helpers/emoji/emoji-messages';
import { EmojiType } from '../../helpers/emoji/emoji-type';
import { notifications } from '../../helpers/notifications';

export const ordersApprovalStatus = createStatusActions('@@adminApprovals/ordersApproval');
export const setNonApprovedOrders = createAction<IOrderDto[]>('@@adminApprovals/setNonApprovedOrders');
export const deleteNonApprovedOrder = createAction<number>('@@adminApprovals/deleteNonApprovedOrder');

export const orderStatus = createStatusActions('@@adminApprovals/order');
export const setCurrentOrderAction = createAction<IOrderDto | null>('@@adminApprovals/setCurrentOrderAction');

export const getNonApprovedOrders = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(ordersApprovalStatus.actions.request(RequestType.FETCH));
    const nonApprovedOrders = await OrdersApi.getAll(false);
    dispatch(setNonApprovedOrders(nonApprovedOrders));
    dispatch(ordersApprovalStatus.actions.success(RequestType.FETCH));
  } catch (err) {
    dispatch(ordersApprovalStatus.actions.failure(RequestType.FETCH));
    handleError(err, emojify('Упс, не удалось загрузить список заказов ожидающих подтверждения', EmojiType.SAD));
  }
};

export const approveOrder = (order: IOrderDto): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(ordersApprovalStatus.actions.request(RequestType.PARTIAL_UPDATE));
    await OrdersApi.putOrder(order.id, {
      ...order,
      isApproved: true,
    });
    dispatch(deleteNonApprovedOrder(order.id));
    dispatch(ordersApprovalStatus.actions.success(RequestType.PARTIAL_UPDATE));

    notifications.success(emojify(`Заказ №${order.id} успешно подтвержден`, EmojiType.OK));
  } catch (err) {
    dispatch(ordersApprovalStatus.actions.failure(RequestType.PARTIAL_UPDATE));
    handleError(err, emojify('Упс, не удалось подтвердить заказ', EmojiType.SAD));
  }
};

export const fetchOrder = (id: number): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(orderStatus.actions.request(RequestType.FETCH));
    const order = await OrdersApi.get(id);
    dispatch(setCurrentOrderAction(order));
    dispatch(orderStatus.actions.success(RequestType.FETCH));
  } catch (err) {
    dispatch(orderStatus.actions.failure(RequestType.FETCH));
    handleError(err, emojify('Упс, не удалось получить полную информацию о заказе', EmojiType.SAD));
  }
};
