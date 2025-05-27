import React from 'react';
import { CheckCircle } from "lucide-react";

const WhyAdopt = () => {
  return (
    <section className="bg-[#fef6ee] w-full py-12">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          
          <div className="md:w-1/2 text-left">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              ¿Por qué adoptar?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Adoptar una mascota no solo salva una vida, sino que también enriquece la tuya.
              Las mascotas adoptadas suelen ser más leales y agradecidas.
            </p>
            <ul className="space-y-4 text-gray-800 text-base">
              <li className="flex items-center gap-3">
                <CheckCircle className="text-orange-500 w-5 h-5" />
                Salvas una vida
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="text-orange-500 w-5 h-5" />
                Reduces la sobrepoblación de animales
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="text-orange-500 w-5 h-5" />
                Ganas un compañero leal
              </li>
            </ul>
          </div>

          <div className="md:w-1/2 w-full flex justify-center">
            <div className="bg-gray-200 w-full max-w-md h-[300px] md:h-[350px] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-gray-500 text-sm">[Imagen o ilustración aquí]</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyAdopt;
