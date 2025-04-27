// src/components/UserRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const UserRoute = ({ children }) => {
  const userToken = localStorage.getItem("userToken");
  return userToken ? children : <Navigate to="/UserLogin" />;
};

export default UserRoute;
