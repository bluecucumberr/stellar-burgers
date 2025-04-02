import { FC, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { feedActions, feedSelectors } from '../../services/slice/feedSlice';
import { fetchIngredients } from '../../services/thunks';
import { orderSelectors } from '../../services/slice/orderSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { fetchOrders } = feedActions;
  const orders = useSelector(feedSelectors.getOrders);
  const requestStatus = useSelector(orderSelectors.selectOrderStatus);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (orders.length === 0) {
      dispatch(fetchIngredients());
      dispatch(fetchOrders());
    }
  }, [orders.length, dispatch]);

  const handleGetFeeds = useCallback(
    async (e?: SyntheticEvent) => {
      e?.preventDefault();
      setIsFetching(true);
      try {
        await dispatch(fetchOrders());
      } finally {
        setIsFetching(false);
      }
    },
    [dispatch, fetchOrders]
  );

  if (requestStatus === 'loading' || isFetching) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
