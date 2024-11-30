import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuPrincipal from './components/js/MenuPrincipal';
import GestionarMuebles from './components/js/Muebles/GestionarMuebles';
import GestionarStock from './components/js/Stock/GestionarStock';
import GestionarVentas from './components/js/Ventas/GestionarVentas';
import GestionarClientes from './components/js/Clientes/GestionarClientes';
import ListarMuebles from './components/js/Muebles/ListarMuebles';
import AgregarMueble from './components/js/Muebles/AgregarMueble';
import EliminarMueble from './components/js/Muebles/EliminarMueble';
import ReportesStock from './components/js/Stock/ReportesStock';
import AgregarStock from './components/js/Stock/AgregarStock';
import ListarVentas from './components/js/Ventas/ListarVentas';
import RegistrarVenta from './components/js/Ventas/RegistrarVenta';
import ListarClientes from './components/js/Clientes/ListarClientes';
import RegistrarCliente from './components/js/Clientes/RegistrarCliente';

function App() {
  return (
    <Router>
      <MenuPrincipal />
      <Routes>
        {/* Rutas principales */}
        <Route path="/muebles" element={<GestionarMuebles />} />
        <Route path="/stock" element={<GestionarStock />} />
        <Route path="/ventas" element={<GestionarVentas />} />
        <Route path="/clientes" element={<GestionarClientes />} />

        {/* Subrutas de muebles */}
        <Route path="/muebles/listar" element={<ListarMuebles />} />
        <Route path="/muebles/agregar" element={<AgregarMueble />} />
        <Route path="/muebles/eliminar" element={<EliminarMueble />} />

        {/* Subrutas de stock */}
        <Route path="/stock/reportes" element={<ReportesStock />} />
        <Route path="/stock/agregar" element={<AgregarStock />} />

        {/* Subrutas de ventas */}
        <Route path="/ventas/listar" element={<ListarVentas />} />
        <Route path="/ventas/registrar" element={<RegistrarVenta />} />


        {/* Subrutas de clientes */}
        <Route path="/clientes/listar" element={<ListarClientes />} />
        <Route path="/clientes/registrar" element={<RegistrarCliente />} />

      </Routes>
    </Router>
  );
}

export default App;
