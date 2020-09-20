import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { PaymentMethod } from '../../../api/orders';

interface IPaymentMethodComponentProps {
  onChange: (method: PaymentMethod) => void;
}

export const PaymentMethodComponent: React.FC<IPaymentMethodComponentProps> = ({ onChange }) => {
  const [paymentMethod, setPaymentMethod] = useState(PaymentMethod.ONLINE);

  return (
    <Form>
      <fieldset id="payment-method">
        <Form.Check
          type="radio"
          id="offline"
          label="Наличными"
          name="offline-name"
          checked={paymentMethod === PaymentMethod.OFFLINE}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            if (e.currentTarget.checked) {
              setPaymentMethod(PaymentMethod.OFFLINE);
              onChange(PaymentMethod.OFFLINE);
            }
          }}
        />
        <Form.Check
          type="radio"
          id="online"
          label="По карте"
          name="online-name"
          checked={paymentMethod === PaymentMethod.ONLINE}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            if (e.currentTarget.checked) {
              setPaymentMethod(PaymentMethod.ONLINE);
              onChange(PaymentMethod.OFFLINE);
            }
          }}
        />
      </fieldset>
    </Form>
  );
};
