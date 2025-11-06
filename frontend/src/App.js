import './App.css';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Collections from './pages/Collections';
import Contact from './pages/Contact';
import PlaceOrder from './pages/PlaceOrder';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Orders from './pages/Orders';
import About from './pages/About';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VerifyStripe from './pages/VerifyStripe';
import Profile from './pages/Profile';
import Privacy from './pages/Privacy';

function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer/>
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/placeOrder" element={<PlaceOrder />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
        <Route path='/verify' element={<VerifyStripe/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/privacy' element={<Privacy/>}/>
      </Routes>
      <Footer/>
      
    </div>
  );
}

export default App;
