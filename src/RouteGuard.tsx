import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuthToken } from './utils/auth';

interface RouteGuardProps {
  element: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ element }) => {
  const isAuthenticated = () => {
    return getAuthToken();
  };

  return isAuthenticated() ? <>{element}</> : <Navigate to="/login" />;
};

export default RouteGuard;
