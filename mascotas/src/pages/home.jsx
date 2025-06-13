import React from 'react';
import PetCard from '../components/card';
import Hero from '../components/hero';
import WhyAdopt from '../components/WhyAdopt';
import { useMascotas } from "../utils/useMascotas"
import { useRandomMascotas } from '../utils/getRandomMascotas';

function Home() {
  const { mascotas, loading, error } = useMascotas();
  const randomMascotas = useRandomMascotas(mascotas, 6); // Usamos el hook

  return (
    <div className="font-sans min-h-screen bg-white flex flex-col items-center">
      <Hero />
      <div className="border-t border-gray-200 my-8"></div>

      <section className="py-8 w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Adopta tu próximo compañero</h2>
        <p className="text-gray-600 text-center mb-12">
          Estas adorables mascotas están esperando encontrar un hogar amoroso.
        </p>

        {error && (
          <div className="flex justify-center items-center py-12">
            <div className="text-xl text-red-500">Error al cargar las mascotas: {error.message}</div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
          {loading ? (
            [...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-200 rounded-lg p-4 h-80 animate-pulse"></div>
            ))
          ) : (
            randomMascotas.map((mascota) => (
              <PetCard key={mascota.id} mascota={mascota} />
            ))
          )}
        </div>
      </section>

      <WhyAdopt />
    </div>
  );
}

export default Home;