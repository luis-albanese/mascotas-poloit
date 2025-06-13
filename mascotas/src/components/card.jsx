import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PetCard = ({ mascota, isImagePreloaded = false }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(isImagePreloaded);

  // Función mejorada para validar URLs de Contentful
  const isValidImageUrl = (url) => {
    if (!url) return false;
    
    try {
      new URL(url); // Verifica que sea una URL válida
      // Acepta URLs de Contentful (ctfassets.net) o con extensiones de imagen
      return url.includes('images.ctfassets.net') || 
             /\.(jpe?g|png|webp|gif|svg)$/i.test(url);
    } catch {
      return false;
    }
  };

  // Optimiza la URL de Contentful (opcional)
  const getOptimizedImageUrl = (url) => {
    if (url.includes('images.ctfassets.net')) {
      return `${url}?w=500&h=500&fit=fill&q=80`; // Parámetros de optimización
    }
    return url;
  };

  useEffect(() => {
    setImageError(false);
    setImageLoaded(isImagePreloaded);

    if (!isImagePreloaded && isValidImageUrl(mascota.imagen)) {
      const img = new Image();
      img.src = getOptimizedImageUrl(mascota.imagen);
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageError(true);
    }
  }, [mascota.imagen, isImagePreloaded]);

  return (
    <Link to={`/mascota/${mascota.id}`} className="block">
      <div className="bg-white rounded-xl shadow-md overflow-hidden w-72 
        hover:shadow-lg transition-all duration-300 
        hover:opacity-90 cursor-pointer
        transform hover:scale-[1.05]">
        
        {/* Contenedor de la imagen */}
        <div className="relative bg-gray-100 h-48">
          {isValidImageUrl(mascota.imagen) && !imageError ? (
            <>
              <img
                src={getOptimizedImageUrl(mascota.imagen)}
                alt={mascota.nombre}
                className={`object-cover w-full h-full transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full w-full text-gray-400">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full capitalize">
            {mascota.tipo}
          </span>
        </div>

        {/* Información de la mascota */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{mascota.nombre}</h3>
          <p className="text-sm text-gray-500 mb-2">📍 {mascota.ubicacion}</p>
          <div className="font-bold flex flex-wrap gap-2 text-xs mb-2">
            <span className="bg-gray-100 px-2 py-1 rounded-full text-gray-700">{mascota.edad}</span>
            <span className="bg-gray-100 px-2 py-1 rounded-full text-gray-700">{mascota.genero}</span>
            <span className="bg-gray-100 px-2 py-1 rounded-full text-gray-700 capitalize">{mascota.tamaño}</span>
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