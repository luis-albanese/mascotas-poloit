import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const MascotasAdopcion = () => {
  const [nombre, setNombre] = useState('');
  const [raza, setRaza] = useState('');
  const [color, setColor] = useState('');
  const [edad, setEdad] = useState('');
  const [tamaño, setTamaño] = useState('');
  const [imagen, setImagen] = useState('');

  const validateForm = () => {
    if (!/^[a-zA-Z\s]+$/.test(nombre) || nombre.length > 20) {
      return 'El nombre solo puede contener letras y espacios, máximo 20 caracteres.';
    }
    if (!/^[a-zA-Z\s]+$/.test(raza) || raza.length > 20) {
      return 'La raza solo puede contener letras y espacios, máximo 20 caracteres.';
    }
    if (!/^[a-zA-Z\s]+$/.test(color) || color.length > 20) {
      return 'El color solo puede contener letras y espacios, máximo 20 caracteres.';
    }
    if (!['SMALL', 'MEDIUM', 'BIG'].includes(tamaño)) {
      return 'El tamaño debe ser SMALL, MEDIUM o BIG.';
    }
    if (!/\.(jpg|jpeg|png|gif)$/i.test(imagen)) {
      return 'La imagen debe ser una URL válida de imagen.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('Debes iniciar sesión para enviar una mascota.');
      return;
    }

    let userId;
    try {
      const decoded = jwtDecode(token);
      userId = decoded.id;
    } catch (err) {
      alert('Token inválido. Inicia sesión nuevamente.');
      return;
    }

    try {
      await axios.post('http://localhost:2010/api/pets/create', {
        name: nombre,
        race: raza,
        color: color,
        age: parseInt(edad),
        size: tamaño,
        image: imagen,
        userId: userId,
      });
      alert('Mascota puesta en adopción con éxito');
      // Limpiar el formulario si querés
      setNombre('');
      setRaza('');
      setColor('');
      setEdad('');
      setTamaño('');
      setImagen('');
    } catch (err) {
      alert('Error al poner la mascota en adopción');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Pon una mascota en adopción</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Nombre</label>
          <input
            type="text"
            className="w-full p-3 mt-2 border rounded-lg"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Raza</label>
          <input
            type="text"
            className="w-full p-3 mt-2 border rounded-lg"
            value={raza}
            onChange={(e) => setRaza(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Color</label>
          <input
            type="text"
            className="w-full p-3 mt-2 border rounded-lg"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Edad</label>
          <input
            type="number"
            className="w-full p-3 mt-2 border rounded-lg"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Tamaño</label>
          <select
            className="w-full p-3 mt-2 border rounded-lg"
            value={tamaño}
            onChange={(e) => setTamaño(e.target.value)}
            required
          >
            <option value="">Selecciona tamaño</option>
            <option value="SMALL">Pequeño</option>
            <option value="MEDIUM">Mediano</option>
            <option value="BIG">Grande</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Imagen (URL)</label>
          <input
            type="text"
            className="w-full p-3 mt-2 border rounded-lg"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 mt-6 rounded-lg hover:bg-blue-600 transition"
        >
          Poner en adopción
        </button>
      </form>
    </div>
  );
};

export default MascotasAdopcion;
