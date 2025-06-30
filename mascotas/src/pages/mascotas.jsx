import React, { useState } from 'react';
import PetCard from '../components/card';
import { useMascotas } from "../utils/useMascotas";

const MascotasPage = () => {
  const { mascotas, loading, error, isImagePreloaded } = useMascotas();
  const [currentPage, setCurrentPage] = useState(1);
  const mascotasPerPage = 8;

 
  const indexOfLastMascota = currentPage * mascotasPerPage;
  const indexOfFirstMascota = indexOfLastMascota - mascotasPerPage;
  const currentMascotas = mascotas.slice(indexOfFirstMascota, indexOfLastMascota);
  const totalPages = Math.ceil(mascotas.length / mascotasPerPage);

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
        {currentMascotas.map((mascota) => (
          <PetCard
            key={mascota.id}
            mascota={mascota}
            isImagePreloaded={isImagePreloaded(mascota.imagen)}
          />
        ))}
      </div>

      {mascotas.length > mascotasPerPage && (
        <div className="flex justify-center mt-8">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-l-md border ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-50 text-gray-700'}`}
            >
              Anterior
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 border-t border-b ${currentPage === page ? 'bg-orange-500 text-white' : 'bg-white hover:bg-gray-50 text-gray-700'}`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-r-md border ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-50 text-gray-700'}`}
            >
              Siguiente
            </button>
          </nav>
        </div>
      )}
    </main>
  );
};

export default MascotasPage;