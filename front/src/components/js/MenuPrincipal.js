import React from "react";
import { Link } from "react-router-dom";
import "../css/MenuPrincipal.css"; // Archivo para los estilos

const MenuPrincipal = () => {
  return (
    <nav className="menu-principal">
      <ul className="menu-lista">
        <li className="menu-item">
          <Link to="/muebles">Gestionar Muebles</Link>
          <ul className="submenu">
            <li><Link to="/muebles/listar">Listar Muebles</Link></li>
            <li><Link to="/muebles/buscar">Buscar Muebles</Link></li>
            <li><Link to="/muebles/agregar">Agregar Mueble</Link></li>
            <li><Link to="/muebles/eliminar">Eliminar Mueble</Link></li>
          </ul>
        </li>
        <li className="menu-item">
          <Link to="/stock">Gestionar Stock</Link>
          <ul className="submenu">
            <li><Link to="/stock/agregar">Agregar Stock</Link></li>
            <li><Link to="/stock/notificar">Notificar Stock</Link></li>
            <li><Link to="/stock/reportes">Generar Reportes</Link></li>
          </ul>
        </li>
        <li className="menu-item">
          <Link to="/ventas">Gestionar Ventas</Link>
          <ul className="submenu">
            <li><Link to="/ventas/registrar">Registrar Venta</Link></li>
            <li><Link to="/ventas/listar">Listar Ventas</Link></li>
          </ul>
        </li>
        <li className="menu-item">
          <Link to="/clientes">Gestionar Clientes</Link>
          <ul className="submenu">
            <li><Link to="/clientes/registrar">Registrar Cliente</Link></li>
            <li><Link to="/clientes/listar">Listar Clientes</Link></li>
            <li><Link to="/clientes/buscar">Buscar Cliente</Link></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default MenuPrincipal;
