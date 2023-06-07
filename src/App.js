import React from 'react';
import Home from './Pages/Home/Home';
import Vente from './Pages/Ventes/Ventes';
import Contact from './Pages/Contact/Contact';
import NavBar from './Components/NavBar/NavBar';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
      <NavBar />  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vente" element={<Vente />} />
        <Route path="/contact" element={<Contact />} />          
      </Routes>
    </BrowserRouter>
  );
}

export default App;
