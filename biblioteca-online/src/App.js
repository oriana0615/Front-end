import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Livros from './pages/Livros';
import Autores from './pages/Autores';
import Categorias from './pages/Categorias';
import Usuarios from './pages/Usuarios';
import Emprestimos from './pages/Emprestimos';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      minHeight="100vh"
    >
      <Router>
        <Navbar />
        <Box component="main" flexGrow={1}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/livros" element={<Livros />} />
            <Route path="/autores" element={<Autores />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/emprestimos" element={<Emprestimos />} />
          </Routes>
        </Box>
        <Footer />
      </Router>
    </Box>
  );
}

export default App;
