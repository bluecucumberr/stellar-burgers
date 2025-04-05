import { rootReducer } from '../services/store';
import { initialState as burgerConstructorInit } from './slice/burgerConstructorSlice/burgerConstructorSlice';
import { initialState as ingredientsInit } from './slice/ingredientsSlice/ingredientsSlice';
import { initialState as orderInit } from './slice/orderSlice/orderSlice';
import { initialState as profileOrdersInit } from './slice/profileOrderSlice/profileOrdersSlice';
import { initialState as feedInit } from './slice/feedSlice/feedSlice';
import { initialState as userInit } from './slice/userSlice/userSlice';

describe('rootReducer', () => {
  it('should return the initial state when passed an unknown action', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };

    const nextState = rootReducer(undefined, unknownAction);

    expect(nextState).toEqual({
      ingredients: ingredientsInit,
      'burger-constructor': burgerConstructorInit,
      order: orderInit,
      feed: feedInit,
      user: userInit,
      'profile-orders': profileOrdersInit
    });
  });
});
