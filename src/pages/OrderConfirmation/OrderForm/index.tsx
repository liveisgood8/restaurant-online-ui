import React, { useState } from 'react';
import { IBaseOrderDto, PaymentMethod } from '../../../api/orders';
import { Button } from '../../../components/core/Button';
import { NumberInput } from '../../../components/core/NumberInput';
import { TextInput } from '../../../components/core/TextInput';
import { notifications } from '../../../helpers/notifications';
import { isTelephoneNumberValid } from '../../../helpers/telephone-number';
import { PaymentMethodComponent } from '../PaymentMethodComponent';

interface IOrderFormProps {
  currentBonuses?: number;
  onSubmit: (baseOrderDto: IBaseOrderDto) => void;
}

export const OrderForm: React.FC<IOrderFormProps> = ({ currentBonuses, onSubmit }) => {
  const [paymentMethod, setPaymentMethod] = useState(PaymentMethod.BY_CARD_ONLINE);
  const [street, setStreet] = useState('');
  const [homeNumber, setHomeNumber] = useState<number>();
  const [entranceNumber, setEntranceNumber] = useState<number>();
  const [floorNumber, setFloorNumber] = useState<number>();
  const [apartmentNumber, setApartmentNumber] = useState<number>();
  const [phone, setPhone] = useState('');
  const [spentBonuses, setSpentBonuses] = useState<number>();
  const [isPhoneInvalid, setPhoneInvalid] = useState(false);

  const onRealFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    onSubmit({
      paymentMethod,
      phone,
      spentBonuses,
      address: {
        street,
        homeNumber: homeNumber as number,
        entranceNumber: entranceNumber as number,
        floorNumber: floorNumber as number,
        apartmentNumber: apartmentNumber as number,
      },
    });
  };

  const validate = (): boolean => {
    if (!homeNumber) {
      notifications.warning('Необходимо заполнить номер дома');
      return false;
    }
    if (!entranceNumber) {
      notifications.warning('Необходимо заполнить номер подъезда');
      return false;
    }
    if (!floorNumber) {
      notifications.warning('Необходимо заполнить номер этажа');
      return false;
    }
    if (!apartmentNumber) {
      notifications.warning('Необходимо заполнить номер квартиры');
      return false;
    }
    if (!isTelephoneNumberValid(phone)) {
      setPhoneInvalid(true);
      notifications.warning('Необходимо проверить правильность указанного номер телефона');
      return false;
    }
    return true;
  };

  return (
    <form className="d-flex flex-column" onSubmit={onRealFormSubmit}>
      <div>
        <span className="ro-font-light-base">Выберите способ оплаты</span>
        <PaymentMethodComponent
          onChange={setPaymentMethod}
        />
        {(currentBonuses != null) && (
          <NumberInput
            className="mt-2"
            placeholder="Использовать бонусы при оплате"
            warningText={spentBonuses && spentBonuses > currentBonuses ? 'Недостаточно бонусов' : undefined}
            showWarning={(spentBonuses && spentBonuses > currentBonuses) || false}
            value={spentBonuses}
            onChange={setSpentBonuses}
          />
        )}
      </div>
      <div className="mt-4">
        <div>
          <span className="ro-font-light-base">Введите адрес доставки</span>
          <span className="ro-font-light-base ro-text-error ml-1">*</span>
        </div>
        <div className="mt-1">
          <TextInput
            required
            className="mb-2"
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
      <div className="mt-4">
        <div>
          <span className="ro-font-light-base">Введите информацию о себе</span>
          <span className="ro-font-light-base ro-text-error ml-1">*</span>
        </div>
        <div className="mt-1">
          <TextInput
            required
            className="w-100 mb-2"
            placeholder="Номер телефона"
            showWarning={isPhoneInvalid}
            warningText={isPhoneInvalid ? 'Некорректный номер' : undefined}
            onChange={(value) => {
              setPhoneInvalid(value.length > 11 && !isTelephoneNumberValid(value));
              setPhone(value);
            }}
          />
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
