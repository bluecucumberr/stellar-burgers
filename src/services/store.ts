import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from './slice/ingredientsSlice/ingredientsSlice';
import { burgerConstructorSlice } from './slice/burgerConstructorSlice/burgerConstructorSlice';
import { orderSlice } from './slice/orderSlice/orderSlice';
import { feedSlice } from './slice/feedSlice/feedSlice';
import { userSlice } from './slice/userSlice/userSlice';
import { profileOrderSlice } from './slice/profileOrderSlice/profileOrdersSlice';

export const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [profileOrderSlice.name]: profileOrderSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
