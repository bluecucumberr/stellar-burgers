import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  isPublic?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children, isPublic }: ProtectedRouteProps) => {
  const location = useLocation();
  // const user = useSelector(getUser);
  // const isAuthChecked = useSelector(getIsAuthChecked);

  return children;
};
