import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-4">¡Ups! La página que buscás no existe.</p>
      <Link
        to="/"
        className="mt-4 inline-block px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
      >
        Volver al Inicio
      </Link>
    </div>
  );
};

export default Error404;
