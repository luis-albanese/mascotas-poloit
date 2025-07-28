import { useState, useEffect } from 'react';
import axios from 'axios';

const mascotasCache = {
  data: null,
  promise: null,
  imagesLoaded: new Set()
};

const precargarImagenes = (mascotas) => {
  mascotas.forEach(mascota => {
    if (mascota.imagen && !mascotasCache.imagesLoaded.has(mascota.imagen)) {
      const img = new Image();
      img.src = mascota.imagen;
      mascotasCache.imagesLoaded.add(mascota.imagen);
    }
  });
};

export const resetMascotasCache = () => {
  mascotasCache.data = null;
  mascotasCache.promise = null;
  mascotasCache.imagesLoaded.clear();
};

export const useMascotas = () => {
  const [mascotas, setMascotas] = useState(mascotasCache.data || []);
  const [loading, setLoading] = useState(!mascotasCache.data);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (mascotasCache.data) {
      precargarImagenes(mascotasCache.data);
      return;
    }

    if (!mascotasCache.promise) {
      mascotasCache.promise = axios.get('https://api-pet-adopt.onrender.com/api/pets')
        .then(response => {
          const formattedMascotas = response.data.pets
            .map((pet, index) => ({
              id: pet.id || index,
              nombre: pet.name,
              imagen: pet.image,
              edad: `${pet.age} años`,
              genero: pet.gender || 'Desconocido',
              tamaño: pet.size,
              tipo: pet.race.toLowerCase().includes('gato') ? 'Gato' : 'Perro',
              ubicacion: pet.location || 'Sin ubicación',
              descripcion: `${pet.race}, color ${pet.color}`,
              user: pet.user || null,       // para saber quién la adoptó
              status: pet.status || 'ACTIVE' // para saber si ya fue adoptada
            }))
            .sort((a, b) => b.id - a.id); //  Orden por ID descendente

          mascotasCache.data = formattedMascotas;
          precargarImagenes(formattedMascotas);
          return formattedMascotas;
        })
        .catch(err => {
          throw err;
        });
    }

    mascotasCache.promise
      .then(data => {
        setMascotas(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });

  }, []);

  return { 
    mascotas, 
    loading, 
    error,
    isImagePreloaded: (imageUrl) => mascotasCache.imagesLoaded.has(imageUrl)
  };
};
