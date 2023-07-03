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

function App() {
  
  return (
    <BrowserRouter>
      <NavBar />  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vente" element={<Vente />} />
        <Route path="/carcontact/:id" element={<CarContact />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />          
        <Route path="/admin" element={<Admin />} />       
        <Route path="/car/:id" element={<Car />} />               
      </Routes>       
      <Footer />
    </BrowserRouter>
  );
}

export default App;