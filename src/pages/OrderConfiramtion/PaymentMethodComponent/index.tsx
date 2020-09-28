import './styles.scss';

import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { PaymentMethod } from '../../../api/orders';

interface IPaymentMethodComponentProps {
  onChange: (method: PaymentMethod) => void;
}

export const PaymentMethodComponent: React.FC<IPaymentMethodComponentProps> = ({ onChange }) => {
  const [paymentMethod, setPaymentMethod] = useState(PaymentMethod.BY_CARD_ONLINE);

  return (
    <div className="payment-method p-2 mt-1">
      <fieldset id="payment-method">
        <Form.Check
          type="radio"
          id="card-to-the-courier"
          label="Наличными курьеру"
          checked={paymentMethod === PaymentMethod.BY_CASH_TO_THE_COURIER}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            if (e.currentTarget.checked) {
              setPaymentMethod(PaymentMethod.BY_CASH_TO_THE_COURIER);
              onChange(PaymentMethod.BY_CASH_TO_THE_COURIER);
            }
          }}
        />
        <Form.Check
          type="radio"
          id="cash-to-the-courier"
          label="По карте курьеру"
          checked={paymentMethod === PaymentMethod.BY_CARD_TO_THE_COURIER}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            if (e.currentTarget.checked) {
              setPaymentMethod(PaymentMethod.BY_CARD_TO_THE_COURIER);
              onChange(PaymentMethod.BY_CARD_TO_THE_COURIER);
            }
          }}
        />
        <Form.Check
          type="radio"
          id="card-online"
          label="По карте онлайн"
          checked={paymentMethod === PaymentMethod.BY_CARD_ONLINE}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            if (e.currentTarget.checked) {
              setPaymentMethod(PaymentMethod.BY_CARD_ONLINE);
              onChange(PaymentMethod.BY_CARD_ONLINE);
            }
          }}
        />
      </fieldset>
    </div>
  );
};
