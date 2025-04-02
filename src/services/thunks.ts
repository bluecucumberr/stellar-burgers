import {
  getFeedsApi,
  getIngredientsApi,
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  updateUserApi,
  TAuthResponse,
  TLoginData,
  TRegisterData,
  getOrderByNumberApi,
  orderBurgerApi,
  getOrdersApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCookie } from '../utils/cookie';

// const storeTokens = (accessToken: string, refreshToken: string) => {
//   setCookie('accessToken', accessToken);
//   localStorage.setItem('refreshToken', refreshToken);
// };

const handleThunkError = (error: unknown, defaultMessage: string) =>
  error instanceof Error ? error.message : defaultMessage;

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const ingredients = await getIngredientsApi();
    return ingredients;
  }
);

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredients: string[], { rejectWithValue }) => {
    try {
      const { order } = await orderBurgerApi(ingredients);
      return order;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при создании заказа');
    }
  }
);

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchOrderByNumber',
  async (orderNumber: number, { rejectWithValue }) => {
    try {
      const { orders } = await getOrderByNumberApi(orderNumber);
      return orders.length ? orders[0] : rejectWithValue('Заказ не найден');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при получении заказа');
    }
  }
);

export const fetchOrders = createAsyncThunk(
  'feed/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFeedsApi();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const registerUser = createAsyncThunk<TAuthResponse, TRegisterData>(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(userData);
      // storeTokens(response.accessToken, response.refreshToken);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        handleThunkError(error.message, 'Ошибка регистрации')
      );
    }
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();
      return response;
    } catch (error) {
      return rejectWithValue(
        handleThunkError(error, 'Ошибка загрузки пользователя')
      );
    }
  }
);

export const loginUser = createAsyncThunk<TAuthResponse, TLoginData>(
  'user/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(userData);
      // storeTokens(response.accessToken, response.refreshToken);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response;
    } catch (error) {
      return rejectWithValue(handleThunkError(error, 'Ошибка входа'));
    }
  }
);

export const logoutUser = createAsyncThunk<void, void>(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      localStorage.removeItem('refreshToken');
      document.cookie = 'accessToken=; Max-Age=0; path=/';
    } catch (error) {
      return rejectWithValue('Ошибка выхода');
    }
  }
);

export const updateUser = createAsyncThunk<
  TAuthResponse['user'],
  Partial<TRegisterData>
>('user/updateUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await updateUserApi(userData);
    return response.user;
  } catch (error) {
    return rejectWithValue(handleThunkError(error, 'Ошибка обновления данных'));
  }
});

export const forgotPassword = createAsyncThunk<void, { email: string }>(
  'user/forgotPassword',
  async (data, { rejectWithValue }) => {
    try {
      await forgotPasswordApi(data);
    } catch (error) {
      return rejectWithValue(
        handleThunkError(error, 'Ошибка восстановления пароля')
      );
    }
  }
);

export const resetPassword = createAsyncThunk<
  void,
  { password: string; token: string }
>('user/resetPassword', async (data, { rejectWithValue }) => {
  try {
    await resetPasswordApi(data);
  } catch (error) {
    return rejectWithValue(handleThunkError(error, 'Ошибка смены пароля'));
  }
});

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const orders = await getOrdersApi();
      return orders;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Ошибка загрузки заказов пользователя'
      );
    }
  }
);
