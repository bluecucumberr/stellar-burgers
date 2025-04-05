import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { fetchOrders } from '../../thunks';

type FeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  requestStatus: 'idle' | 'loading' | 'success' | 'failed';
};

export const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  requestStatus: 'idle'
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.requestStatus = 'loading';
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.requestStatus = 'success';
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
        }
      )
      .addCase(fetchOrders.rejected, (state) => {
        state.requestStatus = 'failed';
      });
  }
});

export const feedSelectors = {
  getOrders: (state: { feed: FeedState }) => state.feed.orders,
  getTotal: (state: { feed: FeedState }) => state.feed.total,
  getTotalToday: (state: { feed: FeedState }) => state.feed.totalToday
};

export const feedActions = { ...feedSlice.actions, fetchOrders };
export default feedSlice.reducer;
