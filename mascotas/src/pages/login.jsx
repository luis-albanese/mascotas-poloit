import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PawPrint, AlertTriangle, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => setErrorMsg(''), 2500);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:2010/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        navigate("/");
      } else {
        setErrorMsg(data.error || "Error al iniciar sesión");
      }
    } catch (error) {
      setErrorMsg("Hubo un problema con el servidor");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md relative">
        {errorMsg && (
          <div className="absolute top-0 left-0 right-0 bg-red-100 text-red-700 border border-red-300 rounded-md px-4 py-3 flex items-center gap-2 animate-fade-in-down z-10">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm">{errorMsg}</span>
          </div>
        )}

        <div className="flex justify-center mb-6 mt-6">
          <PawPrint className="text-orange-500 w-10 h-10" />
        </div>

        <h2 className="text-center text-2xl font-semibold text-gray-900 mb-8">
          Inicia sesión en tu cuenta
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="tucorreo@ejemplo.com"
            className="w-full px-4 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className="w-full px-4 py-2 border rounded pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-md transition duration-200"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
