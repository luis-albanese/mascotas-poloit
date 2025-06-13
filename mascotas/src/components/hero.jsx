import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useMascotas } from '../utils/useMascotas';

const Hero = () => {
  const { mascotas, loading, error } = useMascotas();
  const [mascotaAleatoria, setMascotaAleatoria] = useState(null);
  const [imageStatus, setImageStatus] = useState('loading');
  const imgRef = useRef(null);

  useEffect(() => {
    if (mascotas && mascotas.length > 0) {
      const randomIndex = Math.floor(Math.random() * mascotas.length);
      setMascotaAleatoria(mascotas[randomIndex]);
      setImageStatus('loading');
    }
  }, [mascotas]);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setImageStatus('loaded');
    }
  }, [mascotaAleatoria]);

  const handleImageLoad = () => {
    console.log("Imagen cargada exitosamente");
    setImageStatus('loaded');
  };

  const handleImageError = () => {
    console.log("Error al cargar imagen");
    setImageStatus('error');
  };

  // Función mejorada para validar URLs de Contentful y otras
  const isValidImageUrl = (url) => {
    if (!url) return false;
    try {
      new URL(url); // Verifica que sea una URL válida
      // Acepta URLs de Contentful o con extensiones de imagen
      return url.includes('images.ctfassets.net') || 
             /\.(jpe?g|png|webp|gif|svg)$/i.test(url);
    } catch {
      return false;
    }
  };

  // Optimiza la URL de Contentful
  const getOptimizedImageUrl = (url) => {
    if (url?.includes('images.ctfassets.net')) {
      // Añade parámetros de optimización para Contentful
      return `${url}?w=800&h=600&fit=fill&q=80`;
    }
    return url;
  };

  if (loading) {
    return (
      <section className="bg-[#fef6ee] w-full py-12">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">

            {/* Contenido de texto */}
            <div className="md:w-1/2 text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Encuentra a tu compañero perfecto
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Adopta una mascota y cambia dos vidas: la suya y la tuya. <br />
                Nuestra plataforma conecta mascotas que necesitan un hogar con personas que buscan un nuevo amigo.
              </p>
              <div className="flex gap-4">
                <div className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg opacity-70">
                  Ver Mascotas
                </div>
                <div className="bg-white text-gray-800 font-semibold py-3 px-6 border border-gray-300 rounded-lg opacity-70">
                  Registrarse
                </div>
              </div>
            </div>

            {/* Placeholder solo para la imagen */}
            <div className="md:w-1/2 w-full flex justify-center">
              <div className="w-full max-w-md h-[300px] md:h-[350px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl animate-pulse flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-gray-300 animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[#fef6ee] w-full py-12">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="text-red-500 text-center">Error al cargar mascotas</div>
        </div>
      </section>
    );
  }

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
              <Link
                to="/mascotas"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
              >
                Ver Mascotas
              </Link>
              <Link
                to="/register"
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-6 border border-gray-300 rounded-lg transition duration-200"
              >
                Registrarse
              </Link>
            </div>
          </div>

          <div className="md:w-1/2 w-full flex justify-center">
            {mascotaAleatoria && isValidImageUrl(mascotaAleatoria.imagen) && imageStatus !== 'error' ? (
              <>
                <img
                  ref={imgRef}
                  src={getOptimizedImageUrl(mascotaAleatoria.imagen)}
                  alt={mascotaAleatoria.nombre || "Mascota en adopción"}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  className={`rounded-xl w-full max-w-md shadow-lg object-cover transition-opacity duration-300 h-[300px] md:h-[350px] ${
                    imageStatus === 'loaded' ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                {imageStatus === 'loading' && (
                  <div className="absolute w-full max-w-md h-[300px] md:h-[350px] flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full max-w-md h-[300px] md:h-[350px] bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;