import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PetCard = ({ mascota }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isValidImageUrl = (url) => {
    return url && (url.startsWith('http') || url.startsWith('/'));
  };

  useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
  }, [mascota.imagen]);

  return (
    <Link to={`/mascota/${mascota.id}`}>
      <div className="bg-white rounded-xl shadow-md overflow-hidden w-72 
      hover:shadow-lg transition-all duration-300 
      hover:opacity-90 cursor-pointer
      transform hover:scale-[1.05]">
      
        <div className="relative bg-gray-100 h-48">
          {isValidImageUrl(mascota.imagen) && !imageError ? (
            <img
              src={mascota.imagen}
              alt={mascota.nombre}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`object-cover w-full h-full transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            <div className="flex items-center justify-center h-full w-full text-gray-400 text-sm">
              Imagen no disponible
            </div>
          )}
          <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full capitalize">
            {mascota.tipo}
          </span>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{mascota.nombre}</h3>
          <p className="text-sm text-gray-500 mb-2">📍 {mascota.ubicacion}</p>
          <div className="font-bold flex flex-wrap gap-2 text-xs mb-2">
            <span className="bg-gray-100 px-2 py-1 rounded-full text-gray-700">{mascota.edad}</span>
            <span className="bg-gray-100 px-2 py-1 rounded-full text-gray-700">{mascota.genero}</span>
            <span className="bg-gray-100 px-2 py-1 rounded-full text-gray-700">{mascota.tamaño}</span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {mascota.descripcion}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PetCard;
