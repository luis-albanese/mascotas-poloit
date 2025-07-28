import React, { useState, useEffect } from 'react';
import { useMascotas, resetMascotasCache } from '../utils/useMascotas';
import axios from 'axios';

function Dashboard() {
  const { mascotas, loading, error } = useMascotas();
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState('');

  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');


  const [currentPage, setCurrentPage] = useState(1);
  const mascotasPerPage = 6;

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mascotaAEliminar, setMascotaAEliminar] = useState(null);


  const totalPages = Math.ceil(mascotas.length / mascotasPerPage);
  const startIndex = (currentPage - 1) * mascotasPerPage;
  const endIndex = startIndex + mascotasPerPage;
  const mascotasOrdenadas = [...mascotas].sort((a, b) => b.id - a.id);
  const mascotasPaginadas = mascotasOrdenadas.slice(startIndex, endIndex);

  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => {
        setMensaje('');
        if (tipoMensaje === 'success') {
          window.location.reload();
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [mensaje, tipoMensaje]);

  const confirmarEliminar = (mascota) => {
    setMascotaAEliminar(mascota);
    setMostrarModal(true);
  };

  const handleDeleteConfirmado = async () => {
    try {
      await axios.delete(`https://api-pet-adopt.onrender.com/api/pets/${mascotaAEliminar.id}`);
      resetMascotasCache();
      setMensaje('Mascota eliminada correctamente');
      setTipoMensaje('success');
    } catch (err) {
      setMensaje('Error al eliminar la mascota');
      setTipoMensaje('error');
    } finally {
      setMostrarModal(false);
      setMascotaAEliminar(null);
    }
  };


  const handleEdit = (mascota) => {
    setEditandoId(mascota.id);
    setNuevoNombre(mascota.nombre);
  };

  const handleSave = async (id) => {
    try {
      await axios.patch(`https://api-pet-adopt.onrender.com/api/pets/${id}`, {
        name: nuevoNombre
      });
      resetMascotasCache();
      setMensaje('Nombre actualizado con éxito');
      setTipoMensaje('success');
    } catch (err) {
      setMensaje('Error al actualizar el nombre');
      setTipoMensaje('error');
    }
  };

  if (loading) return <p className="p-4">Cargando...</p>;
  if (error) return <p className="p-4 text-red-500">Error al cargar mascotas.</p>;


  return (
    <div className="p-6">
      {mensaje && (
        <div className={`mb-4 p-3 rounded text-white ${tipoMensaje === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {mensaje}
        </div>
      )}

      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Panel de Administración de Mascotas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mascotasPaginadas.map((mascota) => (
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
                    onClick={() => confirmarEliminar(mascota)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>

                  <button
  onClick={() => handleEdit(mascota)}
  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
>
  Editar nombre
</button>

              </div>
          </>
        )}
      </div>
        ))}
       </div> {/* Cierre del grid de mascotas */}

{mascotas.length > mascotasPerPage && (
  <div className="flex justify-center mt-8">
    <nav className="inline-flex rounded-md shadow">
      <button
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-l-md border ${currentPage === 1
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-white hover:bg-gray-50 text-gray-700'}`}
      >
        Anterior
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-4 py-2 border-t border-b ${currentPage === page
            ? 'bg-orange-500 text-white'
            : 'bg-white hover:bg-gray-50 text-gray-700'}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-r-md border ${currentPage === totalPages
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-white hover:bg-gray-50 text-gray-700'}`}
      >
        Siguiente
      </button>
    </nav>
  </div>
)}

{/* Modal de confirmación */}
{mostrarModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
      <h2 className="text-lg font-semibold mb-4">¿Eliminar mascota?</h2>
      <p className="mb-4">¿Estás seguro de que querés eliminar a <strong>{mascotaAEliminar?.nombre}</strong>?</p>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setMostrarModal(false)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
        >
          Cancelar
        </button>
        <button
          onClick={handleDeleteConfirmado}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Sí, eliminar
        </button>
      </div>
    </div>
  </div>
)}
</div> 
);
}

export default Dashboard;
