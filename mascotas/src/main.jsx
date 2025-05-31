import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import Home from './pages/home.jsx';
import Login from './pages/login.jsx'; 
import Register from './pages/register.jsx';
import PetDetail from './pages/mascota.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mascota/:id" element={<PetDetail />} />

      </Routes>
      
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);
