import { fetchOrders } from '../../thunks';
import { feedSlice, initialState } from './feedSlice';
import { ordersData } from '../mockData';

describe('feedSlice reducer', () => {
  it('should set requestStatus to "loading" when fetchOrders.pending', () => {
    const nextState = feedSlice.reducer(initialState, {
      type: fetchOrders.pending.type
    });

    expect(nextState.requestStatus).toBe('loading');
    expect(nextState.orders).toEqual([]);
    expect(nextState.total).toBe(0);
    expect(nextState.totalToday).toBe(0);
  });

  it('should set requestStatus to "success" and save orders when fetchOrders.fulfilled', () => {
    const nextState = feedSlice.reducer(initialState, {
      type: fetchOrders.fulfilled.type,
      payload: ordersData
    });

    expect(nextState.requestStatus).toBe('success');
    expect(nextState.orders).toEqual(ordersData.orders);
    expect(nextState.total).toBe(ordersData.total);
    expect(nextState.totalToday).toBe(ordersData.totalToday);
  });

  it('should set requestStatus to "failed" when fetchOrders.rejected', () => {
    const nextState = feedSlice.reducer(initialState, {
      type: fetchOrders.rejected.type,
      error: { message: 'Failed to fetch orders' }
    });

    expect(nextState.requestStatus).toBe('failed');
    expect(nextState.orders).toEqual([]);
    expect(nextState.total).toBe(0);
    expect(nextState.totalToday).toBe(0);
  });
});
