import { FC, useCallback, useMemo, useState } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { AppDispatch, useSelector } from '../../services/store';
import {
  burgerConstructorActions,
  constructorSelectors
} from '../../services/slice/burgerConstructorSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { orderActions, orderSelectors } from '../../services/slice/orderSlice';
import { getCookie } from '../../utils/cookie';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const ingredients = useSelector(constructorSelectors.getIngredients);
  const bun = useSelector(constructorSelectors.getBun);

  const requestStatus = useSelector(orderSelectors.selectOrderStatus);
  const newOrder = useSelector(orderSelectors.selectNewOrder);

  const [isOrderModalOpen, setOrderModalOpen] = useState(false);

  const isLoading = requestStatus === 'loading';

  const constructorItems = { bun, ingredients };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  const onOrderClick = useCallback(() => {
    if (!bun || isLoading) return;

    const accessToken = getCookie('accessToken');
    if (!accessToken) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    const ingredientIds = [
      bun._id,
      ...ingredients.map((ingredient) => ingredient._id),
      bun._id
    ];

    dispatch(orderActions.createOrder(ingredientIds));
    setOrderModalOpen(true);
  }, [bun, ingredients, isLoading, navigate, location.pathname, dispatch]);

  const closeOrderModal = useCallback(() => {
    setOrderModalOpen(false);
    dispatch(orderActions.resetOrderState());
    dispatch(burgerConstructorActions.clearConstructor());
  }, [dispatch]);

  return (
    <BurgerConstructorUI
      price={price}
      constructorItems={constructorItems}
      orderRequest={isLoading}
      orderModalData={isOrderModalOpen ? newOrder : null}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
