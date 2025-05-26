import React from 'react';

const Header = () => {
  return (
    <header className=" w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <div className="flex items-center space-x-3">
          <span className="text-orange-500 text-3xl font-bold">🐾</span>
          <span className="text-2xl font-semibold text-gray-900 space-x-4">PetAdopt</span>
        </div>

      
        <nav className="hidden md:flex space-x-8 text-base font-medium text-gray-700">
          <a href="#" className="hover:text-orange-500 transition-colors duration-200">Inicio</a>
          <a href="#" className="hover:text-orange-500 transition-colors duration-200">Mascotas</a>
          <a href="#" className="hover:text-orange-500 transition-colors duration-200">Sobre Nosotros</a>
        </nav>

       
        <div className="flex items-center space-x-4">
          <button className=" space-x-4 border border-gray-300 text-base px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            Iniciar Sesión
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white text-base px-4 py-2 rounded-lg transition-colors duration-200">
            Registrarse
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;