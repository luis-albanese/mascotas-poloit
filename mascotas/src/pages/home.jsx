import React from 'react';
import PetCard from '../components/card';
import mascotas from '../utils/mascotas';
import Hero from '../components/hero';
import WhyAdopt from '../components/WhyAdopt';


function Home() {
    return (

        <div className="font-sans min-h-screen bg-white flex flex-col items-center">

            <Hero />

            <div className="border-t border-gray-200 my-8"></div>

            <section className="py-8 w-full">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Mascotas Destacadas</h2>
                <p className="text-gray-600 text-center mb-12">
                    Estas adorables mascotas están esperando encontrar un hogar amoroso.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
                    {mascotas.map((mascota) => (
                        <PetCard key={mascota.id} mascota={mascota} />
                    ))}
                </div>
            </section>

            <WhyAdopt/>

        </div>

    );
}

export default Home;