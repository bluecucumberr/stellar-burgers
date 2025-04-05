import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../services/store';
import {
  initialState as burgerConstructorInit,
  burgerConstructorSlice
} from './slice/burgerConstructorSlice/burgerConstructorSlice';
import { initialState as ingredientsInit } from './slice/ingredientsSlice/ingredientsSlice';
import { initialState as orderInit } from './slice/orderSlice/orderSlice';
import { initialState as profileOrdersInit } from './slice/profileOrderSlice/profileOrdersSlice';
import { initialState as feedInit } from './slice/feedSlice/feedSlice';
import { initialState as userInit } from './slice/userSlice/userSlice';

describe('should initialize with the correct default state rootReducer', () => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      'burger-constructor': burgerConstructorInit,
      ingredients: ingredientsInit,
      order: orderInit,
      'profile-orders': profileOrdersInit,
      feed: feedInit,
      user: userInit
    }
  });

  test('burgerConstructor', () => {
    expect(store.getState()['burger-constructor']).toEqual(
      burgerConstructorSlice.reducer(burgerConstructorInit, {
        type: 'UNKNOWN_ACTION'
      })
    );

    const addIngredient = { type: 'addIngredient' };
    store.dispatch(addIngredient);
    expect(store.getState()['burger-constructor']).toEqual(
      burgerConstructorInit
    );

    const removeIngredient = { type: 'removeIngredient' };
    store.dispatch(removeIngredient);
    expect(store.getState()['burger-constructor']).toEqual(
      burgerConstructorInit
    );

    const moveIngredient = { type: 'moveIngredient' };
    store.dispatch(moveIngredient);
    expect(store.getState()['burger-constructor']).toEqual(
      burgerConstructorInit
    );

    const clearConstructor = { type: 'clearConstructor' };
    store.dispatch(clearConstructor);
    expect(store.getState()['burger-constructor']).toEqual(
      burgerConstructorInit
    );
  });
});
