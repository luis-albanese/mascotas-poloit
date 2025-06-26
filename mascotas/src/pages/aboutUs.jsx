import React from 'react';

function AboutUs() {  // <-- Cambiado a PascalCase
    return (
        <section className="bg-white py-16 px-6 text-center">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Nuestra Misión
                </h2>
                <p className="text-gray-700 text-lg mb-8">
                    En <strong>PetAdopt</strong>, creemos que cada mascota merece un hogar lleno de amor. Nuestra plataforma fue creada para facilitar el encuentro entre animales que necesitan una segunda oportunidad y personas dispuestas a brindárselas.
                </p>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    ¿Quiénes somos?
                </h2>
                <p className="text-gray-700 text-lg mb-8">
                    Somos un grupo de amantes de los animales comprometidos con reducir el abandono y promover la adopción responsable. Trabajamos en conjunto con refugios y voluntarios de todo el país para asegurar el bienestar de cada mascota.
                </p>
                <img
                    src="https://media.discordapp.net/attachments/731770161425809459/1383231293697032272/1933671850875277312.png?ex=684e0a07&is=684cb887&hm=7e3f7b2a5550436c4d35f0ab095dae5cab5d17191197fca5b00c031468674541&=&format=webp&quality=lossless" 
                    alt="Equipo PetAdopt"
                    className="rounded-2xl shadow-lg mx-auto mb-8 w-full max-w-md"
                />
                <p className="text-gray-600 italic mb-8">
                    “Salvar una vida no cambia el mundo, pero sí cambia el mundo de esa vida.”
                </p>
                <a href="/mascotas" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition">
                    Ver Mascotas en Adopción
                </a>
            </div>
        </section>
    );
}

export default AboutUs;  // <-- También actualizado aquí