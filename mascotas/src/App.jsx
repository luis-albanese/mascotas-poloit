import React from 'react';

function App() {
  return (
    
<div className="font-sans min-h-screen bg-white flex flex-col items-center">


     

      <div className="container mx-auto px-4 py-8">

        
        <section className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Encuentra a tu compañero perfecto</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Adopta una mascota y cambia dos vidas: la suya y la tuya.<br />
            Nuestra plataforma conecta mascotas que necesitan un hogar con personas que buscan un nuevo amigo.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
              Ver Mascotas
            </button>
            <button className="bg-white hover:bg-gray-100 text-blue-500 font-semibold py-3 px-6 border border-blue-500 rounded-lg transition duration-200">
              Registrarse
            </button>
          </div>
        </section>

        <div className="border-t border-gray-200 my-8"></div>

       
        <section className="py-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Mascotas Destacadas</h2>
          <p className="text-gray-600 text-center mb-12">
            Estas adorables mascotas están esperando encontrar un hogar amoroso.
          </p>

          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="font-bold text-xl mb-2">Max</h3>
                <p className="text-gray-600">Labrador de 2 años, juguetón y cariñoso</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="font-bold text-xl mb-2">Luna</h3>
                <p className="text-gray-600">Gata siamesa de 1 año, tranquila y curiosa</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="font-bold text-xl mb-2">Rocky</h3>
                <p className="text-gray-600">Perro mestizo de 3 años, protector y leal</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;