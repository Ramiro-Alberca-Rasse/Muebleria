import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/js/Layout";
import ListarMuebles from "./components/js/Muebles/ListarMuebles";
import BuscarMuebles from "./components/js/Muebles/BuscarMuebles";
import AgregarMueble from "./components/js/Muebles/AgregarMueble";
import EliminarMueble from "./components/js/Muebles/EliminarMueble";
import AgregarStock from "./components/js/Stock/AgregarStock";
import NotificarStock from "./components/js/Stock/NotificarStock.js";
import ReportesStock from "./components/js/Stock/ReportesStock";
import RegistrarVenta from "./components/js/Ventas/RegistrarVenta";
import ListarVentas from "./components/js/Ventas/ListarVentas";
import RegistrarCliente from "./components/js/Clientes/RegistrarCliente";
import ListarClientes from "./components/js/Clientes/ListarClientes";
import BuscarCliente from "./components/js/Clientes/BuscarCliente";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Muebles */}
          <Route path="/muebles/listar" element={<ListarMuebles />} />
          <Route path="/muebles/buscar" element={<BuscarMuebles />} />
          <Route path="/muebles/agregar" element={<AgregarMueble />} />
          <Route path="/muebles/eliminar" element={<EliminarMueble />} />

          {/* Stock */}
          <Route path="/stock/agregar" element={<AgregarStock />} />
          <Route path="/stock/notificar" element={<NotificarStock />} />
          <Route path="/stock/reportes" element={<ReportesStock />} />

          {/* Ventas */}
          <Route path="/ventas/registrar" element={<RegistrarVenta />} />
          <Route path="/ventas/listar" element={<ListarVentas />} />

          {/* Clientes */}
          <Route path="/clientes/registrar" element={<RegistrarCliente />} />
          <Route path="/clientes/listar" element={<ListarClientes />} />
          <Route path="/clientes/buscar" element={<BuscarCliente />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
