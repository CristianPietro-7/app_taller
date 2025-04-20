// src/components/RoleRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../utils/auth';

const RoleRoute = ({ children, allowedRoles }) => {
  const auth = isAuthenticated();
  const userRole = getUserRole();

  if (!auth) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default RoleRoute;
