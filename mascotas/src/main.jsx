import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import Home from "./pages/home.jsx"
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <Home />
    <Footer/>
  </React.StrictMode>
);
