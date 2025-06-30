import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const MascotasAdopcion = () => {
  const [nombre, setNombre] = useState('');
  const [raza, setRaza] = useState('');
  const [color, setColor] = useState('');
  const [edad, setEdad] = useState('');
  const [tamaño, setTamaño] = useState('');
  const [imagen, setImagen] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensajeModal, setMensajeModal] = useState('');
  const [tipoModal, setTipoModal] = useState('');


  useEffect(() => {
    if (mostrarModal) {
      const timer = setTimeout(() => setMostrarModal(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [mostrarModal]);



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
      setMensajeModal(validationError);
      setTipoModal('error');
      setMostrarModal(true);
      return;
    }
    const token = localStorage.getItem('accessToken'); 
    if (!token) {
      setMensajeModal('Debes iniciar sesión para enviar una mascota.');
      setTipoModal('error');
      setMostrarModal(true);
      return;
    }

    let userId;
    try {
      const decoded = jwtDecode(token);
      userId = decoded.id;
    } catch (err) {
      setMensajeModal('Token inválido. Inicia sesión nuevamente.');
      setTipoModal('error');
      setMostrarModal(true);
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
      setMensajeModal('Mascota puesta en adopción con éxito');
      setTipoModal('success');
      setMostrarModal(true);
      setNombre('');
      setRaza('');
      setColor('');
      setEdad('');
      setTamaño('');
      setImagen('');
      setTimeout(() => {
        window.location.href = '/mascotas';
      }, 3000); // espera 1 segundo y redirige a /mascotas
      
      
    } catch (err) {
      setMensajeModal('Error al poner la mascota en adopción');
      setTipoModal('error');
      setMostrarModal(true);
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
          <label className="block font-semibold">Imagen (solo acepta URL con terminación en .png, .jpg y variables).</label>
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
          className="bg-orange-500 text-white px-6 py-3 mt-6 rounded-lg hover:bg-orange-600 transition"
        >
          Poner en adopción
        </button>
      </form>
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">
              {tipoModal === 'success' ? '¡Éxito!' : 'Error'}
            </h2>
            <p className="mb-4">{mensajeModal}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setMostrarModal(false)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MascotasAdopcion;
