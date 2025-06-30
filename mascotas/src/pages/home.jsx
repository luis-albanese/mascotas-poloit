import React from "react";
import PetCard from "../components/card";
import Hero from "../components/hero";
import WhyAdopt from "../components/whyAdopt";
import { useMascotas } from "../utils/useMascotas";
import { useRandomMascotas } from "../utils/getRandomMascotas";

function Home() {
  const { mascotas, loading, error } = useMascotas();
  const randomMascotas = useRandomMascotas(mascotas, 6);

  return (
    <div className="font-sans min-h-screen bg-white flex flex-col items-center">
      <Hero />
      <div className="border-t border-gray-200 my-8"></div>

      <section className="py-8 w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Adopta tu próximo compañero
        </h2>
        <p className="text-gray-600 text-center mb-12">
          Estas adorables mascotas están esperando encontrar un hogar amoroso.
        </p>

        {error && (
          <div className="flex justify-center items-center py-12">
            <div className="text-xl text-red-500">
              Error al cargar las mascotas: {error.message}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
          {loading
            ? [...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-200 rounded-lg p-4 h-80 animate-pulse"
                ></div>
              ))
            : randomMascotas.map((mascota) => (
                <PetCard key={mascota.id} mascota={mascota} />
              ))}
        </div>
      </section>

      <WhyAdopt />

      <section className="w-full bg-orange-100 mt-12 py-8">
        <div className="max-w-4xl mx-auto text-center px-4">
          <img
            src="https://static.wixstatic.com/media/f7a32c_1e4c47160de94f15b091352c78489b13~mv2.png/v1/fill/w_183,h_58,al_c,lg_1,q_85,enc_avif,quality_auto/logo.png"
            alt="Logo PoloIT"
            className="mx-auto mb-4 w-48 h-auto"
          />
          <h3 className="text-xl md:text-2xl font-semibold text-orange-700 mb-2">
            Gracias PoloIT 🧡
          </h3>
          <p className="text-gray-700">
            Este proyecto fue desarrollado como parte del desafío técnico
            propuesto por PoloIT. ¡Gracias por la oportunidad de crecer,
            aprender y construir algo con propósito!
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
