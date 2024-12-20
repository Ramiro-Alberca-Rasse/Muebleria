import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuPrincipal from './components/js/MenuPrincipal';
import GestionarMuebles from './components/js/Muebles/GestionarMuebles';
import GestionVentas from './components/js/Ventas/GestionarVentas'; // Importa el nuevo archivo
import ListarMuebles from './components/js/Muebles/ListarMuebles';
import AgregarMueble from './components/js/Muebles/AgregarMueble';
import ReportesStock from './components/js/Muebles/ReportesStock';
import AgregarStock from './components/js/Muebles/AgregarStock';
import ListarVentas from './components/js/Ventas/ListarVentas';
import RegistrarVenta from './components/js/Ventas/RegistrarVenta';
import ListarClientes from './components/js/Ventas/ListarClientes';
import RegistrarCliente from './components/js/Ventas/RegistrarCliente';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <MenuPrincipal />
      <Routes>
        {/* Rutas principales */}
        <Route path="/" element={<GestionarMuebles/>} />
        <Route path="/ventas" element={<GestionVentas />} /> {/* Actualiza la ruta */}

        {/* Subrutas de muebles */}
        <Route path="/muebles/listar" element={<ListarMuebles />} />
        <Route path="/muebles/agregar" element={<AgregarMueble />} />

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
