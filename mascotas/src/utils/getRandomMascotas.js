import { useEffect, useState } from 'react';

export const useRandomMascotas = (mascotas, count = 6) => {
  const [randomMascotas, setRandomMascotas] = useState([]);

  useEffect(() => {
    if (mascotas && mascotas.length > 0) {
      const shuffled = [...mascotas];
      // Algoritmo Fisher-Yates para mezclar
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setRandomMascotas(shuffled.slice(0, count));
    }
  }, [mascotas, count]);

  return randomMascotas;
};