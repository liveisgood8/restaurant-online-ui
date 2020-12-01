import React from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { NumberParam, StringParam, useQueryParam } from 'use-query-params';
import { DishesApi, IDish } from '../../api/dishes';
import { Menu } from '../../components/Menu';
import { addPersistentDishInCart } from '../../features/CartContainer/actions';
import { likeDishThunk, dislikeDishThunk } from '../../features/MenuContainer/actions';
import { notifications } from '../../helpers/notifications';

export const SearchPage: React.FC = (props) => {
  const dispatch = useDispatch();
  const [selectedDishId, setSelectedDishId] = useQueryParam('dishId', NumberParam);
  const [name] = useQueryParam('name', StringParam);

  const { data } = useQuery(['menu/search', name], () => {
    if (name) {
      return DishesApi.getByName(name);
    }
  });

  const handleDishClick = (dish: IDish) => {
    setSelectedDishId(dish.id);
  };

  const handleDishLike = (dish: IDish) => {
    dispatch(likeDishThunk(dish.id));
  };

  const handleDishDislike = (dish: IDish) => {
    dispatch(dislikeDishThunk(dish.id));
  };

  const handlePutDishInCart = (dish: IDish, count: number) => {
    dispatch(addPersistentDishInCart(dish, count));
    unselectDish();
    notifications.success(`${dish.name} добавлена в корзину!`);
  };

  const unselectDish = () => {
    setSelectedDishId(undefined);
  };

  return (
    <div>
      <div className="text-center">
        <span>Результат поиска по запросу:</span>
        <span className="ml-2 ro-text-primary ro-font-medium-base">{name}</span>
      </div>
      <Menu
        categories={[]}
        dishes={data || []}
        canLikeDishes={true}
        selectedDishId={selectedDishId}
        onDishCardHide={unselectDish}
        onDishClick={handleDishClick}
        onDishLike={handleDishLike}
        onDishDislike={handleDishDislike}
        onPutDishInCart={handlePutDishInCart}
      />
    </div>
  );
};
