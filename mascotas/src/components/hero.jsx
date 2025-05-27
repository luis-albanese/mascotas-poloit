import React, { useState, useEffect } from 'react';
import mascotas from '../utils/mascotas';

const Hero = () => {
  const mascotaAleatoria = mascotas[Math.floor(Math.random() * mascotas.length)];
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isValidImageUrl = (url) => {
    return url && (url.startsWith('http') || url.startsWith('/'));
  };

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [mascotaAleatoria.imagen]);

  return (
    <section className="bg-[#fef6ee] w-full py-12">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">

          <div className="md:w-1/2 text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Encuentra a tu compañero perfecto
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Adopta una mascota y cambia dos vidas: la suya y la tuya. <br />
              Nuestra plataforma conecta mascotas que necesitan un hogar con personas que buscan un nuevo amigo.
            </p>
            <div className="flex gap-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
                Ver Mascotas
              </button>
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-6 border border-gray-300 rounded-lg transition duration-200">
                Registrarse
              </button>
            </div>
          </div>

          <div className="md:w-1/2 w-full flex justify-center">
            {isValidImageUrl(mascotaAleatoria.imagen) && !imageError ? (
              <img
                src={mascotaAleatoria.imagen}
                alt={mascotaAleatoria.nombre}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                className={`rounded-xl w-full max-w-md shadow-lg object-cover transition-opacity duration-300 h-[300px] md:h-[350px] ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ) : (
              <div className="w-full max-w-md h-[300px] md:h-[350px] bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
                Imagen no disponible
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
