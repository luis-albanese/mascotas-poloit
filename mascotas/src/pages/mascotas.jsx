import React from 'react';
import PetCard from '../components/card';
import { useMascotas } from "../utils/useMascotas";

const MascotasPage = () => {
  const { mascotas, loading, error, isImagePreloaded } = useMascotas();

  if (loading) {
    return (
      <main className="p-6 bg-white dark:bg-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Mascotas en Adopción</h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">Encontrá tu compañero perfecto</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full max-w-8xl mx-auto">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 h-80 animate-pulse"></div>
          ))}
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-6 bg-white dark:bg-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Mascotas en Adopción</h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">Encontrá tu compañero perfecto</p>
        <div className="text-red-500 dark:text-red-400 p-4 rounded bg-red-50 dark:bg-red-900/30">
          Error al cargar las mascotas: {error.message}
        </div>
      </main>
    );
  }

  return (
    <main className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Mascotas en Adopción</h1>
      <p className="mb-6 text-gray-700 dark:text-gray-300">Encontrá tu compañero perfecto</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full max-w-8xl mx-auto">
        {mascotas.map((mascota) => (
          <PetCard
            key={mascota.id}
            mascota={mascota}
            isImagePreloaded={isImagePreloaded(mascota.imagen)}
          />
        ))}
      </div>
    </main>
  );
};

export default MascotasPage;