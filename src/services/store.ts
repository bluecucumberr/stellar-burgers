import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import {burgerConstructorSlice} from './slice/burger-constructor/burgerConstructorSlice'
// import {ingredientsSlice} from './slice/ingridents/ingredientsSlice'
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  // [ingredientsSlice.name]: ingredientsSlice.reducer,
  // [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
})

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
