import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, PawPrint, Calendar, PhoneCall, Heart } from "lucide-react";

const PetDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('sobre');
  const [mascota, setMascota] = useState(null);

  useEffect(() => {
    // Simulación: buscá la mascota desde un array local
    const mascotas = JSON.parse(localStorage.getItem('mascotas')) || [];

    const encontrada = mascotas.find((m) => m.id.toString() === id);
    setMascota(encontrada);
  }, [id]);

  if (!mascota) {
    return <div className="text-center py-10">Cargando mascota...</div>;
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
      {/* Imágenes */}
      <div>
        <div className="bg-gray-200 h-64 rounded-xl flex items-center justify-center overflow-hidden mb-4">
          {mascota.imagen ? (
            <img
              src={mascota.imagen}
              alt={mascota.nombre}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500">[Imagen Principal]</span>
          )}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 h-24 rounded-xl flex items-center justify-center"
            >
              <span className="text-gray-500">[Img {i + 1}]</span>
            </div>
          ))}
        </div>
      </div>

      {/* Info de la mascota */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-gray-900">{mascota.nombre}</h2>
          <span className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-1 rounded-full uppercase">
            {mascota.tipo}
          </span>
        </div>
        <p className="flex items-center text-sm text-gray-500">
          <MapPin className="w-4 h-4 mr-1" /> {mascota.ubicacion}
        </p>

        {/* Edad y raza */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <Calendar className="w-4 h-4 text-orange-500" /> Edad
            </div>
            <div className="text-lg font-medium text-gray-800">{mascota.edad}</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <PawPrint className="w-4 h-4 text-orange-500" /> Raza
            </div>
            <div className="text-lg font-medium text-gray-800">{mascota.raza || 'No especificada'}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b mt-6">
          {['sobre', 'detalles', 'dueño'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium capitalize ${
                activeTab === tab
                  ? 'text-gray-900 border-b-2 border-orange-500'
                  : 'text-gray-500'
              }`}
            >
              {tab === 'sobre' ? `Sobre ${mascota.nombre}` : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Contenido del tab */}
        {activeTab === 'sobre' && (
          <p className="text-gray-700 text-base">{mascota.descripcion}</p>
        )}
        {activeTab === 'detalles' && (
          <ul className="text-gray-700 list-disc list-inside">
            <li>Género: {mascota.genero}</li>
            <li>Tamaño: {mascota.tamaño}</li>
            <li>Vacunas: {mascota.vacunas || 'No informado'}</li>
          </ul>
        )}
        {activeTab === 'dueño' && (
          <div className="text-gray-700">
            <p>Contacto: {mascota.contacto || 'No disponible'}</p>
          </div>
        )}

        {/* Botones */}
        <div className="mt-6 space-y-3">
          <a
            href={`https://wa.me/${mascota.whatsapp || '1234567890'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex justify-center items-center gap-2 bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            <PhoneCall className="w-4 h-4" /> Contactar por WhatsApp
          </a>
          <button className="w-full flex justify-center items-center gap-2 border border-gray-300 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition">
            <Heart className="w-4 h-4" /> Guardar como favorito
          </button>
        </div>
      </div>
    </section>
  );
};

export default PetDetail;
