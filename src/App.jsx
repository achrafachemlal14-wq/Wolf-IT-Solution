import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Category from './pages/Category';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <ParticleBackground />
      <Navbar />
      <main style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          
          <Route path="/computers" element={<Category title="Computers" />} />
          <Route path="/phones" element={<Category title="Phones" />} />
          <Route path="/cables" element={<Category title="Cables" />} />
          <Route path="/speakers" element={<Category title="Speakers" />} />
          
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}

export default App;

