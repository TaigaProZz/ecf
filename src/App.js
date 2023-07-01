import Home from './Pages/Home/Home';
import Vente from './Pages/SecondHandCars/SecondHandCars';
import Contact from './Pages/Contact/Contact';
import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import CarContact from './Pages/Contact/CarContact/CarContact';
import Login from './Pages/Login/Login';
import Admin from './Pages/Admin/Admin';
import Car from './Pages/Car/Car';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  axios.defaults.withCredentials = true;
  const [isAdmin, setAdmin] = useState(null);

  useEffect(() => {
    getPermission();
  }, []);

  const getPermission = async () => {
    try {
      // get cookie token
      const cookieResponse = await axios.get("http://localhost:3307/api/getcookie");
      const token = cookieResponse.data.session;

      // check if token is valid
      if (!token) {
        return alert('Veuillez réssayer');
      }
      // get permission
      const response = await axios.get("http://localhost:3307/api/getpermission", { 
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      const permission = response.data.permission;
      if (permission === 1) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <BrowserRouter>
      <NavBar />  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vente" element={<Vente />} />
        <Route path="/carcontact/:id" element={<CarContact />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />          
        <Route path="/admin" element={<Admin setAdmin={setAdmin} isAdmin={isAdmin} />} />       
        <Route path="/car/:id" element={<Car />} />               
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
