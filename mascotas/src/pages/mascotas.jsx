import React from 'react';
import mascotas from '../utils/mascotas';
import PetCard from '../components/card';

const mascotasDestacadas = mascotas.slice(0, 6);

const MascotasPage = () => {
  return (
    <main className="p-6 bg-white dark:bg-gray-900 min-h-screen">
    <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Mascotas en Adopción</h1>
    <p className="mb-6 text-gray-700 dark:text-gray-300">Encontrá tu compañero perfecto</p>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full max-w-8xl mx-auto">
      {mascotasDestacadas.map((mascota) => (
        <PetCard key={mascota.id} mascota={mascota} />
      ))}
    </div>
  </main>
  );
};

export default MascotasPage;
