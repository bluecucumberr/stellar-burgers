import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchUserOrders } from '../../thunks';

type profileOrderState = {
  orders: TOrder[];
  requestStatus: 'idle' | 'loading' | 'success' | 'failed';
};

export const initialState: profileOrderState = {
  orders: [],
  requestStatus: 'idle'
};

export const profileOrderSlice = createSlice({
  name: 'profile-orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.requestStatus = 'loading';
      })
      .addCase(
        fetchUserOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.requestStatus = 'success';
          state.orders = action.payload;
        }
      )
      .addCase(fetchUserOrders.rejected, (state) => {
        state.requestStatus = 'failed';
      });
  }
});

export const ordersUserActions = {
  ...profileOrderSlice.actions,
  fetchUserOrders
};

export default profileOrderSlice.reducer;
export const getOrders = (state: { profileOrders: profileOrderState }) =>
  state.profileOrders.orders;
export const getRequestStatus = (state: { profileOrders: profileOrderState }) =>
  state.profileOrders.requestStatus;
