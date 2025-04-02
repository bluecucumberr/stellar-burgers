import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { orderActions, orderSelectors } from '../../services/slice/orderSlice';
import { ingredientsSelectors } from '../../services/slice/ingredientsSlice';
import { useParams } from 'react-router-dom';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const dispatch = useDispatch();

  const orderData = useSelector(orderSelectors.selectInfoOrder);
  const ingredients = useSelector(ingredientsSelectors.getIngredients);

  useEffect(() => {
    if (!orderData || orderData.number !== Number(number)) {
      dispatch(orderActions.fetchOrderByNumber(Number(number)));
    }
  }, [number, orderData, dispatch]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length || !orderData.ingredients)
      return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {} as TIngredientsWithCount
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
