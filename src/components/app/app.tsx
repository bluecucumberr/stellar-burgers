import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute';
import { getCookie } from '../../utils/cookie';
import { fetchUser } from '../../services/thunks';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { UnknownAction, Dispatch } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';
import { ThunkDispatch } from 'redux-thunk';
import { ConstructorState } from 'src/services/slice/burgerConstructorSlice';
import { UserState } from 'src/services/slice/userSlice';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseModal = () => {
    navigate(-1);
  };

  const location = useLocation();
  const backgroundLocation = location.state?.background;

  const checkAuthOnLoad = async (
    dispatch: ThunkDispatch<
      {
        ingredients: {
          ingredients: TIngredient[];
          isLoading: boolean;
          error: string | null;
        };
        'burger-constructor': ConstructorState;
        order: {
          infoOrder: TOrder | null;
          newOrder: TOrder | null;
          requestStatus: 'idle' | 'loading' | 'success' | 'failed';
        };
        feed: {
          orders: TOrder[];
          total: number;
          totalToday: number;
          requestStatus: 'idle' | 'loading' | 'success' | 'failed';
        };
        user: UserState;
        'profile-orders': {
          orders: TOrder[];
          requestStatus: 'idle' | 'loading' | 'success' | 'failed';
        };
      },
      undefined,
      UnknownAction
    > &
      Dispatch<UnknownAction>
  ) => {
    const accessToken = getCookie('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      try {
        await dispatch(fetchUser());
      } catch (error) {
        console.error('Ошибка при восстановлении авторизации:', error);
      }
    }
  };

  useEffect(() => {
    checkAuthOnLoad(dispatch);
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute isPublic>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute isPublic>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute isPublic>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute isPublic>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Детали заказа' onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title='История заказа' onClose={handleCloseModal}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
