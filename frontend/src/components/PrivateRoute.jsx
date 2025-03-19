import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // If token is not present, redirect to LGUAdminLogin page
    return <Navigate to="/LguAdminLogin" />;
  }

  return children;
};

export default PrivateRoute;
