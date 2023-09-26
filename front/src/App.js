import Home from './Pages/Home/Home';
import Vente from './Pages/SecondHandCars/SecondHandCars';
import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import Contact from './Pages/Contact/BasicContact/Contact';
import CarContact from './Pages/Contact/CarContact/CarContact';
import Login from './Pages/Login/Login';
import Admin from './Pages/Admin/Admin';
import Car from './Pages/Car/Car';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState({});
  
  const getUser = async () => {
    console.log('get user');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/user`, { withCredentials: true });
      if (response.status === 200) {
        setUser(response.data);
      } 
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setUser({});
      }
    }
  }

  useEffect(() => {
    getUser();
  }, []);
  
  return (
    <BrowserRouter>
      <NavBar user={user} setUser={setUser} />  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vente" element={<Vente />} />
        <Route path="/carcontact/:id" element={<CarContact />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login setUser={setUser} />} />          
        <Route path="/admin" element={<Admin user={user} />} />       
        <Route path="/car/:id" element={<Car />} />               
      </Routes>       
      <Footer />
    </BrowserRouter>
  );
}

export default App;