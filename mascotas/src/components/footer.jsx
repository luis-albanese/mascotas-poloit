import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <span className="font-semibold text-orange-500">🐾 PetAdopt</span>
          <span>© 2025 PetAdopt. Todos los derechos reservados.</span>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Términos</a>
          <a href="#" className="hover:underline">Privacidad</a>
          <a href="#" className="hover:underline">Contacto</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
