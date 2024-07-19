import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, allowedRoles, handleRoleChange, ...rest }) => {
  const userRole = sessionStorage.getItem('userRole');

  if (!allowedRoles.includes(userRole)) {
    handleRoleChange(null);
    return <Navigate to="/Sign-in" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
