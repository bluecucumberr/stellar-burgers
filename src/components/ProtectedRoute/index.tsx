import { Preloader } from '@ui';
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { userSelectors } from '../../services/slice/userSlice';
import { useAppSelector, useDispatch } from '../../services/store';
import { fetchUser } from '../../services/thunks';

type ProtectedRouteProps = {
  isPublic?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children, isPublic }: ProtectedRouteProps) => {
  const location = useLocation();
  const user = useAppSelector(userSelectors.selectUser);
  const isAuthChecked = useAppSelector(userSelectors.selectUserCheck);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthChecked) {
      dispatch(fetchUser());
    }
  }, [isAuthChecked, dispatch]);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (isPublic && user) {
    const from = location.state?.from?.pathname || '/profile';
    return <Navigate to={from} />;
  }

  if (!isPublic && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
