import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint } from 'lucide-react';

const Register = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <PawPrint className="text-orange-500 w-10 h-10" />
        </div>

        {/* Título */}
        <h2 className="text-center text-2xl font-semibold text-gray-900 mb-6">Crea tu cuenta</h2>

        {/* Formulario */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Nombre completo"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-md font-semibold hover:bg-orange-600 transition duration-200"
          >
            Registrarse
          </button>
        </form>

        {/* Link inferior */}
        <p className="text-center text-sm text-gray-600 mt-6">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-orange-500 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
