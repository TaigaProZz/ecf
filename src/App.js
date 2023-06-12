import React from 'react';
import Home from './Pages/Home/Home';
import Vente from './Pages/Vente/Vente';
import Contact from './Pages/Contact/Contact';
import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import Login from './Pages/Login/Login';
import Admin from './Pages/Admin/Admin';
import Car from './Pages/Car/Car';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <NavBar />  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vente" element={<Vente />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />          
        <Route path="/admin" element={<Admin />} />       
        <Route path="/cardetails" element={<Car />} />               
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}



export default App;
