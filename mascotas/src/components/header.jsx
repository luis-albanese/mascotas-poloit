import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const navigate = useNavigate();

  const getUserFromToken = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) return null;
      return decoded;
    } catch (error) {
      return null;
    }
  };


  const user = getUserFromToken();
  const isLoggedIn = !!user;

  const userRole = user ? user.rol : null;

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <header className="w-full bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => window.location.href = "/"}
        >
          <img
            src="https://i.ibb.co/3mLVtRzk/logo-removebg-preview.png"
            alt="Logo PetAdopt"
            className="h-12 w-auto object-contain"
          />

        </div>

        <nav className="hidden md:flex space-x-8 text-base font-medium text-gray-700">
          <a href="/" className="dark:text-white font-bold hover:text-orange-500 transition-colors duration-200">Inicio</a>
          <a href="/mascotas" className="dark:text-white font-bold hover:text-orange-500 transition-colors duration-200">Mascotas</a>
          <a href="/sobre-nosotros" className="dark:text-white font-bold hover:text-orange-500 transition-colors duration-200">Sobre Nosotros</a>
        </nav>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <span className="text-gray-700 dark:text-white font-semibold hidden md:inline">
                👤 ¡Hola, {user.name}!
              </span>
              {userRole === 'ADMIN' && (
                <Link
                  to="/dashboard"
                  className="hidden md:inline-block font-semibold bg-orange-500 hover:opacity-70 text-white text-base px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 font-semibold bg-gray-100 dark:bg-gray-700 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="dark:text-white font-semibold border border-gray-300 text-base px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="font-semibold bg-orange-500 hover:bg-orange-600 text-white text-base px-4 py-2 rounded-lg transition-colors duration-200">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
