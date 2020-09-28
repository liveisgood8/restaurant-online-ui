import React, { useState } from 'react';
import { PaymentMethod } from '../../../api/orders';
import { Button } from '../../../components/core/Button';
import { NumberInput } from '../../../components/core/NumberInput';
import { TextInput } from '../../../components/core/TextInput';
import { PaymentMethodComponent } from '../PaymentMethodComponent';

interface IOrderData {
  paymentMethod: PaymentMethod;
  street: string;
  homeNumber: number;
  entranceNumber: number;
  floorNumber: number;
  apartmentNumber: number;
}

interface IOrderFormProps {
  onSubmit: (orderData: IOrderData) => void;
}

export const OrderForm: React.FC<IOrderFormProps> = ({ onSubmit }) => {
  const [paymentMethod, setPaymentMethod] = useState(PaymentMethod.BY_CARD_ONLINE);
  const [street, setStreet] = useState('');
  const [homeNumber, setHomeNumber] = useState(0);
  const [entranceNumber, setEntranceNumber] = useState(0);
  const [floorNumber, setFloorNumber] = useState(0);
  const [apartmentNumber, setApartmentNumber] = useState(0);

  const onRealFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit({
      paymentMethod,
      street,
      homeNumber,
      entranceNumber,
      floorNumber,
      apartmentNumber,
    });
  };

  return (
    <form className="d-flex flex-column" onSubmit={onRealFormSubmit}>
      <div>
        <span className="ro-font-light-base">Выберите способ оплаты</span>
        <PaymentMethodComponent
          onChange={setPaymentMethod}
        />
      </div>
      <div className="mt-4">
        <span className="ro-font-light-base">Введите адрес доставки</span>
        <div className="mt-1">
          <TextInput
            required
            className="w-100 mb-2"
            placeholder="Улица"
            onChange={setStreet}
          />
          <div className="d-md-flex justify-content-md-around">
            <NumberInput
              required
              className="flex-grow-1 mb-2 mb-md-0"
              placeholder="Дом"
              onChange={setHomeNumber}
            />
            <NumberInput
              required
              className="flex-grow-1  mb-2 mb-md-0 ml-md-2"
              placeholder="Подъезд"
              onChange={setEntranceNumber}
            />
            <NumberInput
              required
              className="flex-grow-1 mb-2 mb-md-0 ml-md-2"
              placeholder="Этаж"
              onChange={setFloorNumber}
            />
            <NumberInput
              required
              className="flex-grow-1 mb-2 mb-md-0 ml-md-2"
              placeholder="Квартира"
              onChange={setApartmentNumber}
            />
          </div>
        </div>
      </div>
      <Button
        className="mt-4 align-self-center"
        text="Оформить заказ"
        type="submit"
      />
    </form>
  );
};
