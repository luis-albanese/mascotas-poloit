import React, { useState } from 'react';
import { useMascotas, resetMascotasCache } from '../utils/useMascotas';
import axios from 'axios';

function Dashboard() {
  const { mascotas, loading, error } = useMascotas();
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState('');

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta mascota?')) return;
    try {
      await axios.delete(`http://localhost:2010/api/pets/${id}`);
      resetMascotasCache();
      window.location.reload();
    } catch (err) {
      alert('Error al eliminar');
    }
  };

  const handleEdit = (mascota) => {
    setEditandoId(mascota.id);
    setNuevoNombre(mascota.nombre);
  };

  const handleSave = async (id) => {
    try {
      await axios.patch(`http://localhost:2010/api/pets/${id}`, {
        name: nuevoNombre
      });
      
      resetMascotasCache();
      window.location.reload();
    } catch (err) {
      alert('Error al actualizar nombre');
    }
  };

  if (loading) return <p className="p-4">Cargando...</p>;
  if (error) return <p className="p-4 text-red-500">Error al cargar mascotas.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Panel de Administración de Mascotas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mascotas.map((mascota) => (
          <div key={mascota.id} className="border rounded-lg shadow p-4 bg-white">
            <img
              src={mascota.imagen}
              alt={mascota.nombre}
              className="w-full h-48 object-cover rounded"
            />

            {editandoId === mascota.id ? (
              <>
                <input
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  className="w-full border px-2 py-1 mt-2"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleSave(mascota.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditandoId(null)}
                    className="bg-gray-300 px-3 py-1 rounded"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold mt-2">{mascota.nombre}</h2>
                <p className="text-sm text-gray-500">{mascota.descripcion}</p>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleDelete(mascota.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => handleEdit(mascota)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Editar nombre
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
