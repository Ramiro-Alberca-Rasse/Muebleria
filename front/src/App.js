import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuPrincipal from './components/js/MenuPrincipal';
import GestionarMuebles from './components/js/Muebles/GestionarMuebles';
import GestionVentas from './components/js/Ventas/GestionarVentas'; // Importa el nuevo archivo
import ListarMuebles from './components/js/Muebles/ListarMuebles';
import AgregarMueble from './components/js/Muebles/AgregarMueble';
import AgregarStock from './components/js/Muebles/AgregarStock';
import ListarVentas from './components/js/Ventas/ListarVentas';
import RegistrarVenta from './components/js/Ventas/RegistrarVenta';
import ListarClientes from './components/js/Ventas/ListarClientes';
import RegistrarCliente from './components/js/Ventas/RegistrarCliente';
import GenerarReportes from './components/js/Muebles/GenerarReportes'; // Importa el nuevo componente
import StockActual from './components/js/Muebles/StockActual'; // Importa el nuevo componente
import CambiosStock from './components/js/Muebles/CambiosStock';
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
        <Route path="/stock/cambios" element={<CambiosStock />} />
        <Route path="/stock/agregar" element={<AgregarStock />} />
        <Route path="/stock/generar-reportes" element={<GenerarReportes />} /> {/* Nueva ruta para generar reportes */}
        <Route path="/stock/actual" element={<StockActual />} /> {/* Nueva ruta para stock actual */}

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
