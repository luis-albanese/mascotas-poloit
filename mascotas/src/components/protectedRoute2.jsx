import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute2 = ({ children }) => {
  const [alertShown, setAlertShown] = useState(false); 

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!token && !alertShown) {
     
      alert("Debes iniciar sesión para acceder a esta página.");
      setAlertShown(true);
    }
  }, [token, alertShown]); 

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      return <Navigate to="/login" replace />;
    }

    if (decoded.rol !== 'ADMIN' && decoded.rol !== 'USER') {
      return <Navigate to="*" replace />;
    }

    return children;
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute2;
