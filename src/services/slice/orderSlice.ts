import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { createOrder, fetchOrderByNumber } from '../thunks';

type OrderState = {
  infoOrder: TOrder | null;
  newOrder: TOrder | null;
  requestStatus: 'idle' | 'loading' | 'success' | 'failed';
};

const initialState: OrderState = {
  infoOrder: null,
  newOrder: {} as TOrder,
  requestStatus: 'idle'
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.requestStatus = 'loading';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.requestStatus = 'success';
        state.newOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state) => {
        state.requestStatus = 'failed';
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.requestStatus = 'loading';
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.requestStatus = 'success';
        state.infoOrder = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state) => {
        state.requestStatus = 'failed';
      });
  }
});

export const orderSelectors = {
  selectNewOrder: (state: { order: OrderState }) => state.order.newOrder,
  selectOrderStatus: (state: { order: OrderState }) =>
    state.order.requestStatus,
  selectInfoOrder: (state: { order: OrderState }) => state.order.infoOrder
};

export const orderActions = {
  ...orderSlice.actions,
  createOrder,
  fetchOrderByNumber
};

export default orderSlice.reducer;
