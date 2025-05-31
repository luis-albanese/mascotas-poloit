import React from 'react';
import { PawPrint } from 'lucide-react'; // O usa tu propio ícono de huella

const Login = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        {/* Icono */}
        <div className="flex justify-center mb-6">
          <PawPrint className="text-orange-500 w-10 h-10" />
        </div>

        {/* Título */}
        <h2 className="text-center text-2xl font-semibold text-gray-900 mb-8">
          Inicia sesión en tu cuenta
        </h2>

        {/* Formulario */}
        <form className="space-y-6">
          {/* Correo */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="tucorreo@ejemplo.com"
            />
          </div>

          {/* Contraseña */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <a href="#" className="text-sm text-orange-500 hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="********"
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-md transition duration-200"
          >
            Iniciar sesión
          </button>
        </form>

        {/* Registro */}
        <p className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{' '}
          <a href="#" className="text-orange-500 font-medium hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </section>
  );
};

export default Login;
