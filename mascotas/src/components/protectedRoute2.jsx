import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute2 = ({ children }) => {
  const [alertShown, setAlertShown] = useState(false); // Estado para controlar si el alert ya se mostró

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!token && !alertShown) {
      // Mostrar alert solo una vez
      alert("Debes iniciar sesión para acceder a esta página.");
      setAlertShown(true); // Marcar como mostrado
    }
  }, [token, alertShown]); // Solo se ejecuta cuando el token cambia

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
