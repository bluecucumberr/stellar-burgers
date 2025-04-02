import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { ingredientsActions } from '../../services/slice/ingredientsSlice';
import {
  getOrders,
  ordersUserActions
} from '../../services/slice/profileOrdersSlice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state['profile-orders']?.orders || []);

  useEffect(() => {
    if (orders.length === 0) {
      dispatch(ingredientsActions.fetchIngredients());
      dispatch(ordersUserActions.fetchUserOrders());
    }
  }, [orders, dispatch]);
  return <ProfileOrdersUI orders={orders} />;
};
