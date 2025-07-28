import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PawPrint, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [popup, setPopup] = useState({ type: '', message: '' });

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  useEffect(() => {
    if (popup.message) {
      const timer = setTimeout(() => setPopup({ type: '', message: '' }), 2500);
      return () => clearTimeout(timer);
    }
  }, [popup]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setPopup({ type: 'error', message: 'Las contraseñas no coinciden' });
      return;
    }

    try {
      const { name, email, password, phone } = form;
      await axios.post('https://api-pet-adopt.onrender.com/api/users/create', {
        name,
        email,
        password,
        phone
      });

      setPopup({ type: 'success', message: 'Cuenta creada correctamente 🎉' });
      setTimeout(() => navigate('/login'), 2500);
    } catch (error) {
      setPopup({ type: 'error', message: 'Error al registrar el usuario. Verifica los datos.' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <PawPrint className="text-orange-500 w-10 h-10" />
        </div>

        <h2 className="text-center text-2xl font-semibold text-gray-900 mb-6">Crea tu cuenta</h2>

        {popup.message && (
          <div
            className={`mb-4 text-white px-4 py-2 rounded-md text-sm ${
              popup.type === 'error' ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            {popup.message}
          </div>
        )}

        <form  autoComplete="off" className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nombre completo"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Teléfono"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Contraseña"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirmar contraseña"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-md font-semibold hover:bg-orange-600 transition duration-200"
          >
            Registrarse
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-orange-500 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
