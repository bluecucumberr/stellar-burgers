import { fetchUserOrders } from '../../thunks';
import { profileOrderSlice, initialState } from './profileOrdersSlice';
import { userOrders } from '../mockData';

describe('profileOrderSlice reducer', () => {
  it('should set requestStatus to "loading" when fetchUserOrders.pending', () => {
    const nextState = profileOrderSlice.reducer(initialState, {
      type: fetchUserOrders.pending.type
    });

    expect(nextState.requestStatus).toBe('loading');
    expect(nextState.orders).toEqual([]);
  });

  it('should set requestStatus to "success" and save orders when fetchUserOrders.fulfilled', () => {
    const nextState = profileOrderSlice.reducer(initialState, {
      type: fetchUserOrders.fulfilled.type,
      payload: userOrders.orders
    });

    expect(nextState.requestStatus).toBe('success');
    expect(nextState.orders).toEqual(userOrders.orders);
  });

  it('should set requestStatus to "failed" when fetchUserOrders.rejected', () => {
    const nextState = profileOrderSlice.reducer(initialState, {
      type: fetchUserOrders.rejected.type,
      error: { message: 'Failed to fetch user orders' }
    });

    expect(nextState.requestStatus).toBe('failed');
    expect(nextState.orders).toEqual([]);
  });
});
