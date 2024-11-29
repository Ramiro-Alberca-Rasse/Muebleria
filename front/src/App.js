import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuPrincipal from './components/js/MenuPrincipal';
import GestionarMuebles from './components/js/GestionarMuebles';
import GestionarStock from './components/js/GestionarStock';
import GestionarVentas from './components/js/GestionarVentas';
import GestionarClientes from './components/js/GestionarClientes';

function App() {
  return (
    <Router>
      <MenuPrincipal />
      <Routes>
        <Route path="/muebles" element={<GestionarMuebles />} />
        <Route path="/stock" element={<GestionarStock />} />
        <Route path="/ventas" element={<GestionarVentas />} />
        <Route path="/clientes" element={<GestionarClientes />} />
        {/* Agrega aquí las rutas para cada opción de listado, agregar, etc. */}
      </Routes>
    </Router>
  );
}

export default App;
