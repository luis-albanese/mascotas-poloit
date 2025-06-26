import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      return <Navigate to="/login" replace />;
    }

    if (decoded.rol !== 'ADMIN') {
      return <Navigate to="/" replace />;
    }

    return children;

  } catch (error) {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
