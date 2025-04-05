import { createOrder, fetchOrderByNumber } from '../../thunks';
import { orderSlice, initialState } from './orderSlice';
import { orderData } from '../mockData';

describe('orderSlice reducer', () => {
  it('should set requestStatus to "loading" when createOrder.pending', () => {
    const nextState = orderSlice.reducer(initialState, {
      type: createOrder.pending.type
    });

    expect(nextState.requestStatus).toBe('loading');
    expect(nextState.newOrder).toEqual({});
    expect(nextState.infoOrder).toBeNull();
  });

  it('should set requestStatus to "success" and save newOrder when createOrder.fulfilled', () => {
    const nextState = orderSlice.reducer(initialState, {
      type: createOrder.fulfilled.type,
      payload: orderData.order
    });

    expect(nextState.requestStatus).toBe('success');
    expect(nextState.newOrder).toEqual(orderData.order);
  });

  it('should set requestStatus to "failed" when createOrder.rejected', () => {
    const nextState = orderSlice.reducer(initialState, {
      type: createOrder.rejected.type,
      error: { message: 'Failed to create order' }
    });

    expect(nextState.requestStatus).toBe('failed');
    expect(nextState.newOrder).toEqual({});
  });

  it('should set requestStatus to "loading" when fetchOrderByNumber.pending', () => {
    const nextState = orderSlice.reducer(initialState, {
      type: fetchOrderByNumber.pending.type
    });

    expect(nextState.requestStatus).toBe('loading');
    expect(nextState.infoOrder).toBeNull();
  });

  it('should set requestStatus to "success" and save infoOrder when fetchOrderByNumber.fulfilled', () => {
    const nextState = orderSlice.reducer(initialState, {
      type: fetchOrderByNumber.fulfilled.type,
      payload: orderData.order
    });

    expect(nextState.requestStatus).toBe('success');
    expect(nextState.infoOrder).toEqual(orderData.order);
  });

  it('should set requestStatus to "failed" when fetchOrderByNumber.rejected', () => {
    const nextState = orderSlice.reducer(initialState, {
      type: fetchOrderByNumber.rejected.type,
      error: { message: 'Failed to fetch order' }
    });

    expect(nextState.requestStatus).toBe('failed');
    expect(nextState.infoOrder).toBeNull();
  });
});
