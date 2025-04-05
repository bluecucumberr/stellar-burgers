import { fetchUser } from '../../thunks';
import { userSlice, initialState } from './userSlice';
import { user } from '../mockData';

describe('userSlice reducer', () => {
  it('should set requestStatus to "loading" when fetchUser.pending', () => {
    const nextState = userSlice.reducer(initialState, {
      type: fetchUser.pending.type
    });

    expect(nextState.requestStatus).toBe('loading');
    expect(nextState.data).toBeNull();
    expect(nextState.isAuthChecked).toBe(false);
  });

  it('should set requestStatus to "success" and save user data when fetchUser.fulfilled', () => {
    const nextState = userSlice.reducer(initialState, {
      type: fetchUser.fulfilled.type,
      payload: user
    });

    expect(nextState.requestStatus).toBe('success');
    expect(nextState.data).toEqual(user.user);
    expect(nextState.isAuthChecked).toBe(true);
  });

  it('should set requestStatus to "failed" and set error message when fetchUser.rejected', () => {
    const errorMessage = 'Failed to fetch user data';
    const nextState = userSlice.reducer(initialState, {
      type: fetchUser.rejected.type,
      payload: errorMessage
    });

    expect(nextState.requestStatus).toBe('failed');
    expect(nextState.error).toBe(errorMessage);
    expect(nextState.isAuthChecked).toBe(true);
  });
});
