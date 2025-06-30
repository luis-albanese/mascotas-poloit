import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapPin, PawPrint, Calendar, PhoneCall, X } from "lucide-react";
import { useMascotas } from "../utils/useMascotas";
import { jwtDecode } from "jwt-decode";
import React from "react";
const PetDetail = () => {
  const { id } = useParams();
  const { mascotas, loading, error } = useMascotas();
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [petStatus, setPetStatus] = useState(null);

  const mascota = mascotas.find((m) => m.id.toString() === id);

  useEffect(() => {
    if (mascota) {
      setPetStatus(mascota.status); // 👈 sincronizamos el estado inicial
    }
  }, [mascota]);

  const userId = useMemo(() => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const decoded = jwtDecode(token);
        return decoded.userId || decoded.id;
      }
    } catch (error) {
      console.error("Error al decodificar token:", error);
    }
    return null;
  }, []);

  const handleAdopt = async () => {
    if (!userId) {
      setMensaje("Debes iniciar sesión para adoptar.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:2010/api/pets/adopt/${mascota.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );

      if (!response.ok) throw new Error("No se pudo adoptar la mascota");

      setPetStatus("INACTIVE"); // 👈 actualizamos status localmente
      setMensaje("¡Adoptaste exitosamente a esta mascota!");
    } catch (err) {
      console.error(err);
      setMensaje("Ocurrió un error al intentar adoptar.");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Cargando mascotas...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error: {error.message}
      </div>
    );
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
            <h2 className="text-2xl font-bold text-gray-900">
              {mascota.nombre}
            </h2>
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
              <div className="text-lg font-medium text-gray-800">
                {mascota.edad}
              </div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <PawPrint className="w-4 h-4 text-orange-500" /> Raza
              </div>
              <div className="text-lg font-medium text-gray-800">
                {mascota.raza || "No especificada"}
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <a
              href={`https://wa.me/${mascota.whatsapp || "1234567890"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex justify-center items-center gap-2 bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              <PhoneCall className="w-4 h-4" /> Contactar por WhatsApp
            </a>

            <button
              onClick={handleAdopt}
              disabled={petStatus === "INACTIVE"}
              className={`w-full inline-flex justify-center items-center gap-2 py-3 px-4 rounded-lg font-semibold transition ${
                petStatus === "INACTIVE"
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              <PawPrint className="w-4 h-4" />
              {petStatus === "INACTIVE" ? "Adoptado" : "ADOPTAR"}
            </button>

            {mensaje && (
              <p className="text-sm text-center text-green-600 font-medium">
                {mensaje}
              </p>
            )}
          </div>
        </div>
      </section>

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
