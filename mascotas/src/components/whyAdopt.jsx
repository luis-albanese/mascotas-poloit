import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RequireLoginPopup = ({ show, setShow }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setShow(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [show, setShow]);

  return show ? (
    <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50">
      🔒 Debes iniciar sesión para realizar esta acción.
    </div>
  ) : null;
};

export default function WhyAdopt() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setShowPopup(true);
      return;
    }

    navigate('/mascotas-adopcion');
  };

  return (
    <section className="bg-[#fef6ee] w-full py-12">
      <RequireLoginPopup show={showPopup} setShow={setShowPopup} />

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
                <span className="text-orange-500">✔</span> Salvas una vida
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500">✔</span> Reduces la sobrepoblación de animales
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-500">✔</span> Ganas un compañero leal
              </li>
            </ul>

            <button
              onClick={handleClick}
              className="inline-block bg-orange-500 text-white px-6 py-3 mt-6 rounded-lg hover:bg-orange-600 transition"
            >
              Pon en adopción una mascota
            </button>
          </div>

          <div className="md:w-1/2 w-full flex justify-center">
            <div className="bg-white w-full max-w-md h-[350px] md:h-[350px] rounded-xl overflow-hidden shadow-lg">
              <img
                 src="/logo.png"
                alt="Equipo PetAdopt"
                className="w-full h-full object-contain"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
