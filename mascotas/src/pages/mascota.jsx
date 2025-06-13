import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, PawPrint, Calendar, PhoneCall, Heart, X } from "lucide-react";
import { useMascotas } from '../utils/useMascotas';

const PetDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('sobre');
  const { mascotas, loading, error } = useMascotas();
  const [fullscreenImage, setFullscreenImage] = useState(null);

  // Buscar la mascota específica
  const mascota = mascotas.find(m => m.id.toString() === id);

  if (loading) {
    return <div className="text-center py-10">Cargando mascotas...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error.message}</div>;
  }

  if (!mascota) {
    return <div className="text-center py-10">Mascota no encontrada</div>;
  }

  return (
    <>
      <section className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
        <div>
          <div 
            className="bg-gray-200 h-96 rounded-xl flex items-center justify-center overflow-hidden mb-4 cursor-pointer hover:opacity-90 transition"
            onClick={() => setFullscreenImage(mascota.imagen)}
          >
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
        </div>

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

      {/* Modal para imagen en pantalla completa */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <div className="relative max-w-6xl w-full max-h-[90vh]">
            <button 
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition"
              onClick={(e) => {
                e.stopPropagation();
                setFullscreenImage(null);
              }}
            >
              <X size={32} />
            </button>
            <img
              src={fullscreenImage}
              alt={mascota.nombre}
              className="w-full h-full object-contain max-h-[80vh] mx-auto rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PetDetail;