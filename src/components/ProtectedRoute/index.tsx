import { Preloader } from '@ui';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { userSelectors } from '../../services/slice/userSlice';
import { useAppSelector, useSelector } from '../../services/store';

type ProtectedRouteProps = {
  isPublic?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children, isPublic }: ProtectedRouteProps) => {
  const location = useLocation();
  const user = useAppSelector(userSelectors.selectUser);
  const isAuthChecked = useAppSelector(userSelectors.selectUserCheck);
  const loginRequest = useSelector((state) => state.user.data);

  if (!isAuthChecked && loginRequest) {
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
