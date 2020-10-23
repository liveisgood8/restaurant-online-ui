import emptyImage from './empty.png';

import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NumberParam, useQueryParam } from 'use-query-params';
import { IDish } from '../../api/dishes';
import { IOrderDto } from '../../api/orders';
import { RequestType } from '../../app/status/helpers';
import { RootState } from '../../app/store';
import { FullOrderInfo } from '../../components/FullOrderInfo';
import { ShortOrderInfo } from '../../components/ShortOrderInfo';
import { approveOrder, fetchOrder, getNonApprovedOrders, setCurrentOrderAction } from './actions';
import { orderApprovalStatusSelectors } from './selectors';
import { CenteredContainer } from '../../components/core/CenteredContainer';

export const AdminOrdersApprovalContainer: React.FC = () => {
  const [orderId, setOrderId] = useQueryParam('orderId', NumberParam);
  const dispatch = useDispatch();
  const [fetched, setFetched] = useState(false);
  const nonApprovedOrders = useSelector((state: RootState) => state.adminApprovalOrders.nonApprovedOrders);
  const currentOrder = useSelector((state: RootState) => state.adminApprovalOrders.currentOrder);
  const isFetchingNonApprovedOrdersDone = useSelector(orderApprovalStatusSelectors.isSuccess(RequestType.FETCH));
  const isApproveSuccess = useSelector(orderApprovalStatusSelectors.isSuccess(RequestType.PARTIAL_UPDATE));

  useEffect(() => {
    if (orderId != null) {
      dispatch(fetchOrder(orderId));
    } else {
      dispatch(setCurrentOrderAction(null));
    }
  }, [dispatch, orderId]);

  useEffect(() => {
    dispatch(getNonApprovedOrders());
  }, [dispatch]);

  useEffect(() => {
    if (isApproveSuccess) {
      setOrderId(undefined);
    }
  }, [setOrderId, isApproveSuccess]);

  const handleOrderDishCountIncrease = (order: IOrderDto, dish: IDish) => {

  };

  const handleOrderDishCountDecrease = (order: IOrderDto, dish: IDish) => {

  };

  const handleOrderDishRemove = (order: IOrderDto, dish: IDish) => {

  };

  const handleOrderApprove = (order: IOrderDto): void => {
    dispatch(approveOrder(order.id));
  };

  const handleOrderExpand = (order: IOrderDto): void => {
    setOrderId(order.id);
  };

  const handleOrderCollapse = (): void => {
    setOrderId(undefined);
  };

  console.log(isFetchingNonApprovedOrdersDone);
  if (isFetchingNonApprovedOrdersDone && !nonApprovedOrders.length) {
    return (
      <CenteredContainer className="text-center">
        <img className="mb-3 mw-100" src={emptyImage} alt="no-orders" />
        <span className="d-block">Пока что нет заказов</span>
      </CenteredContainer>
    );
  }

  return (
    <Container fluid={true}>
      <Row>
        <Col md={12} lg={5} xl={4}>
          {nonApprovedOrders.map((o) => (
            <div key={o.id} className="mb-3">
              <ShortOrderInfo
                order={o}
                isActive={o.id === orderId}
                onExpand={() => handleOrderExpand(o)}
                onCollapse={handleOrderCollapse}
              />
            </div>
          ))}
        </Col>
        {currentOrder && (
          <Col lg={7} xl={8}>
            <FullOrderInfo
              onApprove={() => handleOrderApprove(currentOrder)}
              onDishCountIncrease={(dish) => handleOrderDishCountIncrease(currentOrder, dish)}
              onDishCountDecrease={(dish) => handleOrderDishCountDecrease(currentOrder, dish)}
              onDishRemove={(dish) => handleOrderDishRemove(currentOrder, dish)}
              key={currentOrder.id}
              order={currentOrder}
            />
          </Col>
        )}
      </Row>
    </Container>
  );
};
